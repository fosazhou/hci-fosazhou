"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  brightness: number
  size: number
}

interface ParticleAvatarProps {
  imageSrc: string
  className?: string
}

export function ParticleAvatar({ imageSrc, className = "" }: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Create particles from image - NO mouse interaction
  const createParticles = useCallback((img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    // Temp canvas to read pixels
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    if (!tempCtx) return
    
    // Center crop image
    const imgRatio = img.width / img.height
    const canvasRatio = width / height
    
    let drawWidth, drawHeight, offsetX, offsetY
    
    if (imgRatio > canvasRatio) {
      drawHeight = height
      drawWidth = height * imgRatio
      offsetX = (width - drawWidth) / 2
      offsetY = 0
    } else {
      drawWidth = width
      drawHeight = width / imgRatio
      offsetX = 0
      offsetY = (height - drawHeight) / 2
    }
    
    tempCanvas.width = width
    tempCanvas.height = height
    tempCtx.fillStyle = "#000"
    tempCtx.fillRect(0, 0, width, height)
    tempCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    
    const imageData = tempCtx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    
    const particles: Particle[] = []
    const gap = 4 // Increased density from gap=5
    
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const i = (y * width + x) * 4
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        const brightness = (r + g + b) / 3 / 255
        
        if (brightness > 0.1) {
          particles.push({
            x: x,
            y: y,
            brightness,
            size: 0.9 + brightness * 0.9, // Smaller dots for higher density
          })
        }
      }
    }
    
    particlesRef.current = particles
    setIsLoaded(true)
  }, [])
  
  // Static render - no animation needed for static dots
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    
    ctx.fillStyle = "rgba(5, 5, 8, 1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const particles = particlesRef.current
    
    for (const p of particles) {
      const gray = Math.floor(100 + p.brightness * 155)
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${0.4 + p.brightness * 0.6})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])
  
  // Initialize
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        createParticles(img, canvas)
      }
      img.src = imageSrc
    }
    
    updateSize()
    window.addEventListener("resize", updateSize)
    
    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [imageSrc, createParticles])
  
  // Render when loaded
  useEffect(() => {
    if (isLoaded) {
      render()
    }
  }, [isLoaded, render])
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[rgba(255,255,255,0.1)]" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[rgba(255,255,255,0.1)]" />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      
      {/* Label */}
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-muted-foreground/30">
        PROFILE.MATRIX
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-mono text-muted-foreground/40">LOADING...</div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  brightness: number
  size: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
  opacity: number
}

interface ParticleAvatarProps {
  imageSrc: string
  className?: string
}

export function ParticleAvatar({ imageSrc, className = "" }: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const trailRef = useRef<TrailPoint[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, isInside: false })
  const animationRef = useRef<number>(0)
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
  
  // Animated render with mouse trail
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    
    // Clear with slight fade for trail effect
    ctx.fillStyle = "rgba(5, 5, 8, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const particles = particlesRef.current
    const trail = trailRef.current
    const mouse = mouseRef.current
    
    // Update trail points
    if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
      // Add new trail point
      trail.push({
        x: mouse.x,
        y: mouse.y,
        age: 0,
        opacity: 1
      })
    }
    
    // Update and filter trail points
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].age += 1
      trail[i].opacity = Math.max(0, 1 - trail[i].age / 30) // Fade over 30 frames
      if (trail[i].opacity <= 0) {
        trail.splice(i, 1)
      }
    }
    
    // Draw trail with blue glow
    if (trail.length > 1) {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      for (let i = 1; i < trail.length; i++) {
        const p1 = trail[i - 1]
        const p2 = trail[i]
        
        // Main trail line
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        gradient.addColorStop(0, `rgba(34, 211, 238, ${p1.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(34, 211, 238, ${p2.opacity * 0.8})`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2 + p2.opacity * 2
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
        
        // Outer glow
        ctx.strokeStyle = `rgba(34, 211, 238, ${p2.opacity * 0.3})`
        ctx.lineWidth = 6 + p2.opacity * 4
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
      
      // Draw glow dots at trail points
      for (const point of trail) {
        if (point.opacity > 0.3) {
          // Core dot
          ctx.fillStyle = `rgba(34, 211, 238, ${point.opacity})`
          ctx.beginPath()
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
          ctx.fill()
          
          // Glow
          const glowGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 15
          )
          glowGradient.addColorStop(0, `rgba(34, 211, 238, ${point.opacity * 0.5})`)
          glowGradient.addColorStop(1, 'rgba(34, 211, 238, 0)')
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(point.x, point.y, 15, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    
    // Draw particles
    for (const p of particles) {
      const gray = Math.floor(100 + p.brightness * 155)
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${0.4 + p.brightness * 0.6})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(render)
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
  
  // Mouse tracking
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true
      }
    }
    
    const handleMouseEnter = () => {
      mouseRef.current.isInside = true
    }
    
    const handleMouseLeave = () => {
      mouseRef.current.isInside = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  // Start animation when loaded
  useEffect(() => {
    if (isLoaded) {
      render()
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
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

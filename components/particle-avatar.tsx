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

interface TrailPoint {
  x: number
  y: number
  age: number
}

export function ParticleAvatar({ imageSrc, className = "" }: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
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
    const gap = 5 // Increased from 4 for better performance
    
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
            size: 1 + brightness * 0.8, // Slightly larger to compensate for fewer particles
          })
        }
      }
    }
    
    particlesRef.current = particles
    setIsLoaded(true)
  }, [])
  
  // Static render for particles - unchanged
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
  
  // Trail animation loop - simplified for performance
  const renderTrail = useCallback(() => {
    const canvas = trailCanvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    
    const trail = trailRef.current
    const mouse = mouseRef.current
    
    // Stop animation if mouse left and trail is empty
    if (!mouse.isInside && trail.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animationRef.current = 0
      return
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Add new trail point if mouse is inside (throttle to every other frame)
    if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
      const lastPoint = trail[trail.length - 1]
      // Only add point if moved enough distance
      if (!lastPoint || Math.hypot(mouse.x - lastPoint.x, mouse.y - lastPoint.y) > 3) {
        trail.push({ x: mouse.x, y: mouse.y, age: 0 })
        if (trail.length > 25) trail.shift() // Reduced from 50
      }
    }
    
    // Update ages and remove old points
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].age += 2 // Faster fade
      if (trail[i].age > 30) { // Reduced from 40
        trail.splice(i, 1)
      }
    }
    
    // Draw trail - simplified single pass
    if (trail.length > 1) {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      // Single gradient stroke instead of multiple passes
      ctx.beginPath()
      ctx.moveTo(trail[0].x, trail[0].y)
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y)
      }
      
      const lastOpacity = Math.max(0, 1 - trail[trail.length - 1].age / 30)
      ctx.strokeStyle = `rgba(34, 211, 238, ${lastOpacity * 0.5})`
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Glow at cursor position
      if (mouse.isInside && trail.length > 0) {
        const last = trail[trail.length - 1]
        ctx.fillStyle = `rgba(34, 211, 238, 0.3)`
        ctx.beginPath()
        ctx.arc(last.x, last.y, 12, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    animationRef.current = requestAnimationFrame(renderTrail)
  }, [])
  
  // Initialize
  useEffect(() => {
    const canvas = canvasRef.current
    const trailCanvas = trailCanvasRef.current
    const container = containerRef.current
    if (!canvas || !trailCanvas || !container) return
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      trailCanvas.width = rect.width
      trailCanvas.height = rect.height
      
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
  
  // Mouse tracking - start animation only on mouse enter
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
      // Start animation if not running
      if (!animationRef.current) {
        renderTrail()
      }
    }
    
    const handleMouseLeave = () => {
      mouseRef.current.isInside = false
    }
    
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [renderTrail])
  
  // Render particles when loaded (trail starts on mouse enter)
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
      
      {/* Trail canvas overlay */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
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

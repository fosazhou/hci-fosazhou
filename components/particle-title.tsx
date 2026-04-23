"use client"

import React, { useRef, useEffect, useCallback } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
}

interface ParticleTitleProps {
  text: string
  className?: string
}

export function ParticleTitle({ text, className = "" }: ParticleTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const animationRef = useRef<number>()

  // Initialize particles from text
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Draw text to sample pixels
    const fontSize = Math.min(rect.width / text.length * 1.6, rect.height * 0.8)
    ctx.fillStyle = "#fff"
    ctx.font = `900 ${fontSize}px system-ui, sans-serif`
    ctx.textAlign = "left"
    ctx.textBaseline = "bottom"
    ctx.fillText(text, 4, rect.height - 8)

    // Sample pixels - LOW DENSITY for performance
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const particles: Particle[] = []
    
    // Gap of 6 = much fewer particles = smoother performance
    const gap = 6
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i + 3] > 100) {
          particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    particlesRef.current = particles
    ctx.clearRect(0, 0, rect.width, rect.height)
  }, [text])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const mouse = mouseRef.current
    const particles = particlesRef.current
    const mouseRadius = 60

    for (const p of particles) {
      if (mouse.active) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius
          p.vx -= (dx / dist) * force * 1.5
          p.vy -= (dy / dist) * force * 1.5
        }
      }

      // Spring back
      p.vx += (p.originX - p.x) * 0.05
      p.vy += (p.originY - p.y) * 0.05
      
      // Friction
      p.vx *= 0.9
      p.vy *= 0.9
      
      p.x += p.vx
      p.y += p.vy

      // Draw - all WHITE particles
      const offset = Math.sqrt(Math.pow(p.x - p.originX, 2) + Math.pow(p.y - p.originY, 2))
      const alpha = offset > 10 ? 1 : 0.85
      
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseEnter = useCallback(() => {
    mouseRef.current.active = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false
    mouseRef.current.x = -9999
    mouseRef.current.y = -9999
  }, [])

  useEffect(() => {
    initParticles()
    animationRef.current = requestAnimationFrame(animate)

    const handleResize = () => initParticles()
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [initParticles, animate])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block cursor-crosshair" />
    </div>
  )
}

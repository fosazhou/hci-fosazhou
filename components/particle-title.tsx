"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  color: string
  vx: number
  vy: number
  ease: number
  friction: number
  springFactor: number
}

interface ParticleTitleProps {
  text: string
  className?: string
}

export function ParticleTitle({ text, className = "" }: ParticleTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 })
  const animationRef = useRef<number>()
  const [isHovered, setIsHovered] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Play subtle hover sound
  const playHoverSound = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1)
    oscillator.type = "sine"
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }, [])

  // Initialize particles from text
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.scale(dpr, dpr)

    // Draw text to get pixel data
    const fontSize = Math.min(rect.width / text.length * 1.5, rect.height * 0.8)
    ctx.fillStyle = "#E91E63"
    ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, rect.width / 2, rect.height / 2)

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const particles: Particle[] = []

    // Sample pixels to create particles
    const gap = 4
    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const index = (y * canvas.width + x) * 4
        const alpha = pixels[index + 3]
        
        if (alpha > 128) {
          const r = pixels[index]
          const g = pixels[index + 1]
          const b = pixels[index + 2]
          
          particles.push({
            x: x / dpr,
            y: y / dpr,
            originX: x / dpr,
            originY: y / dpr,
            size: Math.random() * 2 + 1.5,
            color: `rgb(${r}, ${g}, ${b})`,
            vx: 0,
            vy: 0,
            ease: 0.1 + Math.random() * 0.05,
            friction: 0.85 + Math.random() * 0.1,
            springFactor: 0.02 + Math.random() * 0.02
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
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)

    const mouse = mouseRef.current
    const particles = particlesRef.current

    particles.forEach((p) => {
      // Calculate distance from mouse
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < mouse.radius) {
        // Push particles away from mouse (explosion effect)
        const force = (mouse.radius - distance) / mouse.radius
        const angle = Math.atan2(dy, dx)
        const pushX = Math.cos(angle) * force * 8
        const pushY = Math.sin(angle) * force * 8
        
        p.vx -= pushX
        p.vy -= pushY
        
        // Add some random scatter for "star dust" effect
        p.vx += (Math.random() - 0.5) * 3
        p.vy += (Math.random() - 0.5) * 3
      }

      // Spring back to origin (bloom/gather effect)
      const homeX = p.originX - p.x
      const homeY = p.originY - p.y
      
      p.vx += homeX * p.springFactor
      p.vy += homeY * p.springFactor
      
      // Apply friction
      p.vx *= p.friction
      p.vy *= p.friction
      
      // Update position
      p.x += p.vx
      p.y += p.vy

      // Draw particle
      const distFromOrigin = Math.sqrt(homeX * homeX + homeY * homeY)
      const brightness = Math.min(1, distFromOrigin / 50)
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      
      // Color shifts towards white when scattered
      if (brightness > 0.3) {
        const white = Math.floor(brightness * 255)
        ctx.fillStyle = `rgb(${233 + (255-233)*brightness}, ${30 + (255-30)*brightness}, ${99 + (255-99)*brightness})`
      } else {
        ctx.fillStyle = p.color
      }
      ctx.fill()

      // Add glow effect
      if (distFromOrigin > 5) {
        ctx.shadowBlur = 15 * brightness
        ctx.shadowColor = "#FF4081"
      } else {
        ctx.shadowBlur = 8
        ctx.shadowColor = "#E91E63"
      }
    })

    // Draw connecting lines for nearby particles (tech web effect)
    ctx.shadowBlur = 0
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 25) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(233, 30, 99, ${0.15 * (1 - distance / 25)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    playHoverSound()
  }, [playHoverSound])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000
    mouseRef.current.y = -1000
    setIsHovered(false)
  }, [])

  // Initialize
  useEffect(() => {
    initParticles()
    animationRef.current = requestAnimationFrame(animate)

    const handleResize = () => {
      initParticles()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [initParticles, animate])

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ 
          filter: isHovered ? "drop-shadow(0 0 30px rgba(233, 30, 99, 0.6))" : "drop-shadow(0 0 15px rgba(233, 30, 99, 0.4))",
          transition: "filter 0.3s ease"
        }}
      />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#E91E63]/30 transition-all duration-300"
        style={{ transform: isHovered ? "translate(-4px, -4px)" : "translate(0, 0)" }} />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#E91E63]/30 transition-all duration-300"
        style={{ transform: isHovered ? "translate(4px, -4px)" : "translate(0, 0)" }} />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#E91E63]/30 transition-all duration-300"
        style={{ transform: isHovered ? "translate(-4px, 4px)" : "translate(0, 0)" }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#E91E63]/30 transition-all duration-300"
        style={{ transform: isHovered ? "translate(4px, 4px)" : "translate(0, 0)" }} />
    </div>
  )
}

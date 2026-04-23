"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  vx: number
  vy: number
  color: string
  alpha: number
}

interface ParticleTitleProps {
  text: string
  className?: string
}

// Debussy-style music box notes (pentatonic scale for dreamy feel)
const MUSIC_NOTES = [
  { freq: 523.25, duration: 0.3 },  // C5
  { freq: 587.33, duration: 0.25 }, // D5
  { freq: 659.25, duration: 0.35 }, // E5
  { freq: 783.99, duration: 0.3 },  // G5
  { freq: 880.00, duration: 0.4 },  // A5
  { freq: 1046.50, duration: 0.25 }, // C6
  { freq: 1174.66, duration: 0.3 }, // D6
  { freq: 1318.51, duration: 0.35 }, // E6
]

export function ParticleTitle({ text, className = "" }: ParticleTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, isActive: false })
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastNoteTimeRef = useRef(0)
  const noteIndexRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)

  // Play dreamy music box note
  const playMusicBoxNote = useCallback(() => {
    const now = Date.now()
    if (now - lastNoteTimeRef.current < 150) return // Rate limit
    lastNoteTimeRef.current = now

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const note = MUSIC_NOTES[noteIndexRef.current % MUSIC_NOTES.length]
      noteIndexRef.current++

      // Create oscillator for bell-like tone
      const osc = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filterNode = ctx.createBiquadFilter()

      // Music box timbre: fundamental + harmonic
      osc.type = 'sine'
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime)
      
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(note.freq * 2, ctx.currentTime) // Octave harmonic

      // Soft high-pass filter for clarity
      filterNode.type = 'highpass'
      filterNode.frequency.setValueAtTime(400, ctx.currentTime)

      // Gentle envelope
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.duration)

      osc.connect(filterNode)
      osc2.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc2.start(ctx.currentTime)
      osc.stop(ctx.currentTime + note.duration)
      osc2.stop(ctx.currentTime + note.duration)
    } catch (e) {
      // Audio not available, fail silently
    }
  }, [])

  // Initialize particles from text
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.scale(dpr, dpr)

    // Draw text to sample pixels - LEFT ALIGNED
    const fontSize = Math.min(rect.width / text.length * 1.8, rect.height * 0.85)
    ctx.fillStyle = "#E91E63"
    ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`
    ctx.textAlign = "left"
    ctx.textBaseline = "bottom"
    
    // Position text at bottom-left, with small padding
    const textX = 4
    const textY = rect.height - 8
    ctx.fillText(text, textX, textY)

    // Sample pixels with very fine resolution
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const particles: Particle[] = []

    // Much smaller gap = more particles = finer detail
    const gap = 1.5
    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4
        const alpha = pixels[index + 3]
        
        if (alpha > 100) {
          // Mix of white and magenta particles
          const isWhite = Math.random() > 0.6
          const color = isWhite 
            ? `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`
            : `rgba(233, 30, 99, ${0.8 + Math.random() * 0.2})`
          
          particles.push({
            x: x / dpr,
            y: y / dpr,
            originX: x / dpr,
            originY: y / dpr,
            size: 0.3 + Math.random() * 0.5, // Very small particles
            vx: 0,
            vy: 0,
            color,
            alpha: 0.8 + Math.random() * 0.2,
          })
        }
      }
    }

    particlesRef.current = particles
    ctx.clearRect(0, 0, rect.width, rect.height)
  }, [text])

  // Smooth animation loop with easing
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)

    const mouse = mouseRef.current
    const particles = particlesRef.current
    const mouseRadius = 80

    // Subtle ambient glow
    const gradient = ctx.createRadialGradient(
      rect.width * 0.2, rect.height * 0.5, 0,
      rect.width * 0.2, rect.height * 0.5, rect.width * 0.6
    )
    gradient.addColorStop(0, 'rgba(233, 30, 99, 0.02)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)

    particles.forEach((p) => {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (mouse.isActive && distance < mouseRadius) {
        // Gentle push away with easing
        const force = Math.pow((mouseRadius - distance) / mouseRadius, 2)
        const angle = Math.atan2(dy, dx)
        
        p.vx -= Math.cos(angle) * force * 2
        p.vy -= Math.sin(angle) * force * 2
        
        // Subtle scatter
        p.vx += (Math.random() - 0.5) * 0.5
        p.vy += (Math.random() - 0.5) * 0.5
      }

      // Very smooth spring return with cubic easing
      const homeX = p.originX - p.x
      const homeY = p.originY - p.y
      const homeDist = Math.sqrt(homeX * homeX + homeY * homeY)
      
      // Eased spring: stronger pull when closer to home
      const springStrength = 0.015 + (1 - Math.min(homeDist / 50, 1)) * 0.01
      p.vx += homeX * springStrength
      p.vy += homeY * springStrength
      
      // High friction for smooth deceleration
      p.vx *= 0.92
      p.vy *= 0.92
      
      // Update position
      p.x += p.vx
      p.y += p.vy

      // Draw particle with glow
      const distFromOrigin = Math.sqrt(homeX * homeX + homeY * homeY)
      const scatter = Math.min(distFromOrigin / 30, 1)
      
      ctx.save()
      
      // Glow effect - stronger when scattered
      if (scatter > 0.1) {
        ctx.shadowBlur = 3 + scatter * 6
        ctx.shadowColor = distFromOrigin > 20 ? 'rgba(255,255,255,0.8)' : 'rgba(233,30,99,0.6)'
      } else {
        ctx.shadowBlur = 2
        ctx.shadowColor = 'rgba(233,30,99,0.4)'
      }
      
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * (1 + scatter * 0.3), 0, Math.PI * 2)
      
      // Color shifts to white when scattered
      if (scatter > 0.3) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + scatter * 0.4})`
      } else {
        ctx.fillStyle = p.color
      }
      ctx.fill()
      ctx.restore()
    })

    // Draw subtle connecting lines for nearby scattered particles
    ctx.strokeStyle = 'rgba(233, 30, 99, 0.06)'
    ctx.lineWidth = 0.3
    
    for (let i = 0; i < particles.length; i += 3) {
      const p1 = particles[i]
      const d1 = Math.sqrt(Math.pow(p1.originX - p1.x, 2) + Math.pow(p1.originY - p1.y, 2))
      if (d1 < 5) continue // Only draw lines for scattered particles
      
      for (let j = i + 3; j < particles.length; j += 3) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 15 && distance > 3) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Handle mouse events
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const newX = e.clientX - rect.left
    const newY = e.clientY - rect.top
    
    // Play note when mouse moves significantly
    const dx = newX - mouseRef.current.x
    const dy = newY - mouseRef.current.y
    const movement = Math.sqrt(dx * dx + dy * dy)
    
    if (movement > 20 && mouseRef.current.isActive) {
      playMusicBoxNote()
    }
    
    mouseRef.current.x = newX
    mouseRef.current.y = newY
  }, [playMusicBoxNote])

  const handleMouseEnter = useCallback(() => {
    mouseRef.current.isActive = true
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -9999
    mouseRef.current.y = -9999
    mouseRef.current.isActive = false
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
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="block cursor-crosshair"
      />
      
      {/* Floating system status labels */}
      <div 
        className="absolute -top-1 -right-1 text-[8px] font-mono text-primary/40 tracking-widest transition-all duration-700"
        style={{ 
          opacity: isHovered ? 1 : 0.4,
          transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)'
        }}
      >
        PARTICLE.SYS
      </div>
      
      <div 
        className="absolute bottom-0 -right-1 text-[8px] font-mono text-brand/40 tracking-widest transition-all duration-700"
        style={{ 
          opacity: isHovered ? 1 : 0.3,
          transform: isHovered ? 'translate(2px, 2px)' : 'translate(0, 0)'
        }}
      >
        {isHovered ? 'ACTIVE' : 'IDLE'}
      </div>
    </div>
  )
}

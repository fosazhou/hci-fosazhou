"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const resizeFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    const handleResize = () => {
      if (resizeFrameRef.current !== null) return
      resizeFrameRef.current = requestAnimationFrame(() => {
        resizeCanvas()
        resizeFrameRef.current = null
      })
    }
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize particles
    const createParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })

    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle())
    }

    const drawGrid = () => {
      const gridSize = 50
      ctx.strokeStyle = "rgba(34, 211, 238, 0.04)"
      ctx.lineWidth = 0.5

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const drawParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Fade based on life
        const lifeRatio = particle.life / particle.maxLife
        const fadeOpacity = particle.opacity * (1 - lifeRatio)

        // Mouse interaction - subtle attraction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 0 && dist < 200) {
          particle.vx += (dx / dist) * 0.01
          particle.vy += (dy / dist) * 0.01
        }

        // Limit velocity
        const maxVel = 1
        particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx))
        particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy))

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${fadeOpacity})`
        ctx.fill()

        // Add glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `rgba(34, 211, 238, ${fadeOpacity * 0.3})`)
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)")
        ctx.fillStyle = gradient
        ctx.fill()

        // Reset particle if out of bounds or life ended
        if (
          particle.x < -50 || particle.x > canvas.width + 50 ||
          particle.y < -50 || particle.y > canvas.height + 50 ||
          particle.life >= particle.maxLife
        ) {
          particlesRef.current[index] = createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        }
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 移除网格效果，只保留粒子
      drawParticles()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initial clear
    ctx.fillStyle = "#050508"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (resizeFrameRef.current !== null) {
        cancelAnimationFrame(resizeFrameRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "#050508" }}
    />
  )
}

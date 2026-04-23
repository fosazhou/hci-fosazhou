"use client"

import { useEffect, useRef, useState } from "react"

// ============================================
// DATA SECTION - 在此处修改您的内容
// ============================================

// Personal Info
const heroData = {
  nameEn: "FOSA",
  nameCn: "\u5468\u4ea6\u6960",
  headline: "\u5efa\u7b51\u5b66\u751f\uff0c\u63a2\u7d22\u4f4e\u7a7a\u57ce\u5e02\u57fa\u7840\u8bbe\u65bd\u3001\u751f\u6210\u5f0f\u7a7a\u95f4\u7cfb\u7edf\u4e0e\u4ea4\u4e92\u73af\u5883\u3002",
  subheadline: "\u6211\u7684\u7814\u7a76\u8de8\u8d8a\u5efa\u7b51\u3001\u6570\u5b57\u7cfb\u7edf\u4e0e\u57ce\u5e02\u57fa\u7840\u8bbe\u65bd\u3002\u9879\u76ee\u6d89\u53ca\u4f4e\u7a7a\u7269\u6d41\u7f51\u7edc\u3001\u751f\u6210\u5f0f\u7a7a\u95f4\u8bbe\u8ba1\u4ee5\u53ca\u54cd\u5e94\u4eba\u7c7b\u884c\u4e3a\u7684\u4ea4\u4e92\u73af\u5883\u3002",
  backgroundImage: "/images/hero-bg.jpg",
}

// Marquee Text
const marqueeData = {
  topMarquee: [
    "Stay Hungry. Stay Foolish.",
    "Less is More.",
    "Form Follows Function.",
  ],
  middleMarquee: ["\u5efa\u7b51 \u2022 \u4f4e\u7a7a\u57ce\u5e02\u7cfb\u7edf \u2022 \u751f\u6210\u5f0f\u8bbe\u8ba1 \u2022 \u4ea4\u4e92\u73af\u5883"],
  bottomMarquee: ["\u957f\u5b89\u5927\u5b66\u5efa\u7b51\u5b66\u9662", "University of Auckland"],
}

// ============================================
// COMPONENT SECTION - 以下为结构代码，修改排版时编辑此处
// ============================================

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number}[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  // Set mounted and window size
  useEffect(() => {
    setMounted(true)
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Smooth cursor following
  useEffect(() => {
    if (!mounted) return
    
    let animationId: number
    
    const animate = () => {
      setCursorPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }))
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mousePos, mounted])

  // Mouse move handler with trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePos(newPos)
      setMouseTrail(prev => {
        const newTrail = [...prev, newPos]
        // 保留最近20个点形成轨迹
        return newTrail.slice(-20)
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Particle animation
  useEffect(() => {
    if (!mounted) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles - 速度再放慢100倍，加入多种颜色
    const particleCount = 70
    const colors = ['indigo', 'orange', 'green'] as const
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      size: Math.random() * 4 + 0.5,
      opacity: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction - 更柔和的交互，像水流一样
        const dx = particle.x - mousePos.x
        const dy = particle.y - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 120

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance
          particle.vx += (dx / distance) * force * 0.00008
          particle.vy += (dy / distance) * force * 0.00008
        }

        // Apply velocity with stronger damping for smoother flow
        particle.vx *= 0.99995
        particle.vy *= 0.99995
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with color
        const colorMap = {
          indigo: { r: 99, g: 102, b: 241 },
          orange: { r: 249, g: 115, b: 22 },
          green: { r: 34, g: 197, b: 94 },
        }
        const c = colorMap[particle.color as keyof typeof colorMap]
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${particle.opacity})`
        ctx.fill()

        // Draw connections with mixed colors
        particlesRef.current.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const otherC = colorMap[other.color as keyof typeof colorMap]
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(${(c.r + otherC.r) / 2}, ${(c.g + otherC.g) / 2}, ${(c.b + otherC.b) / 2}, ${0.12 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePos, mounted])

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Particle Canvas - 在背景之上 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* Mouse Trail - 鼠标延时轨迹 */}
      {mouseTrail.map((point, index) => {
        const opacity = (index + 1) / mouseTrail.length
        const size = 2 + (index / mouseTrail.length) * 6
        return (
          <div
            key={index}
            className="absolute rounded-full pointer-events-none z-40 hidden md:block"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              background: `rgba(99, 102, 241, ${opacity * 0.6})`,
              boxShadow: `0 0 ${size * 2}px rgba(99, 102, 241, ${opacity * 0.4})`,
            }}
          />
        )
      })}
      
      {/* Custom Cursor Follower - Only visible in hero section */}
      <div
        className="absolute w-10 h-10 rounded-full border-2 border-indigo-400/60 pointer-events-none z-50 hidden md:block"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
        }}
      />
      <div
        className="absolute w-4 h-4 rounded-full bg-indigo-500 pointer-events-none z-50 hidden md:block"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
        }}
      />

      {/* Background - 纯白背景 */}
      <div className="absolute inset-0 bg-white" style={{ zIndex: -10 }} />

      {/* Marquee Banners */}
      <div className="relative z-10 pt-20">
        <MarqueeBanner 
          texts={marqueeData.topMarquee} 
          direction="left" 
          className="border-y border-slate-200 bg-white/60 backdrop-blur-sm"
        />
        <MarqueeBanner 
          texts={marqueeData.middleMarquee} 
          direction="right" 
          className="border-b border-slate-200 bg-slate-900 text-white"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl w-full">
          <a
            href="#about"
            className="block cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              transform: mounted 
                ? `translate(${(mousePos.x - windowSize.width / 2) * 0.01}px, ${(mousePos.y - windowSize.height / 2) * 0.01}px)`
                : undefined,
            }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-none tracking-tight text-slate-900">
              {heroData.nameEn}
            </h1>
            <p className="text-base md:text-lg text-slate-700 mt-2 tracking-widest font-medium">
              {heroData.nameCn}
            </p>
          </a>
          
          <p className="mt-4 text-base md:text-lg text-slate-900 max-w-xl leading-relaxed font-medium">
            {heroData.headline}
          </p>
          
          <p className="mt-4 text-sm md:text-base text-slate-700 max-w-xl leading-relaxed">
            {heroData.subheadline}
          </p>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 pb-8">
        <MarqueeBanner 
          texts={marqueeData.bottomMarquee} 
          direction="left" 
          className="border-y border-slate-200 bg-white/60 backdrop-blur-sm text-slate-500"
        />
      </div>
    </section>
  )
}

function MarqueeBanner({ 
  texts, 
  direction = "left",
  className = ""
}: { 
  texts: string[]
  direction?: "left" | "right"
  className?: string
}) {
  const content = texts.join(" \u2022 ")
  const repeatedContent = Array(20).fill(content).join(" \u2022 ")

  return (
    <div className={`overflow-hidden py-3 ${className}`}>
      <div 
        className="flex whitespace-nowrap text-sm tracking-wider"
        style={{
          animation: `marquee-${direction} 60s linear infinite`,
        }}
      >
        <span className="px-4">{repeatedContent}</span>
        <span className="px-4">{repeatedContent}</span>
      </div>
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

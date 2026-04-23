"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { TerminalCursor, StatusIndicator } from "@/components/scan-line"

// ============================================
// DATA SECTION
// ============================================

const heroData = {
  nameEn: "FOSA",
  nameCn: "周亦楠",
  headline: "建筑学生，探索低空城市基础设施、生成式空间系统与交互环境。",
  subheadline: "我的研究跨越建筑、数字系统与城市基础设施。项目涉及低空物流网络、生成式空间设计以及响应人类行为的交互环境。",
}

const marqueeData = {
  topMarquee: [
    "Stay Hungry. Stay Foolish.",
    "Less is More.",
    "Form Follows Function.",
  ],
  middleMarquee: ["建筑 • 低空城市系统 • 生成式设计 • 交互环境"],
  bottomMarquee: ["长安大学建筑学院", "University of Auckland"],
}

// ============================================
// COMPONENT
// ============================================

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "ADAPTIVE_PORTFOLIO_V2.0"

  useEffect(() => {
    setMounted(true)
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!mounted) return
    let index = 0
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [mounted])

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-10 h-10 rounded-full border border-primary/40 pointer-events-none z-50 hidden md:block mix-blend-difference"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          boxShadow: '0 0 20px var(--primary-glow)',
        }}
      />
      <div
        className="fixed w-2 h-2 rounded-full bg-primary pointer-events-none z-50 hidden md:block"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          boxShadow: '0 0 10px var(--primary-glow)',
        }}
      />

      {/* Marquee Banners */}
      <div className="relative z-10 pt-20">
        <MarqueeBanner 
          texts={marqueeData.topMarquee} 
          direction="left" 
          className="border-y border-[rgba(34,211,238,0.1)] bg-[rgba(10,10,15,0.6)] backdrop-blur-sm text-muted-foreground"
        />
        <MarqueeBanner 
          texts={marqueeData.middleMarquee} 
          direction="right" 
          className="border-b border-[rgba(34,211,238,0.1)] bg-primary/5 text-primary"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl w-full">
          {/* System status */}
          <div className="flex items-center gap-3 mb-6">
            <StatusIndicator status="active" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
              {typedText}
              {typedText.length < fullText.length && <TerminalCursor />}
            </span>
          </div>
          
          <a
            href="#about"
            className="block cursor-pointer group"
            style={{
              transform: mounted 
                ? `translate(${(mousePos.x - windowSize.width / 2) * 0.01}px, ${(mousePos.y - windowSize.height / 2) * 0.01}px)`
                : undefined,
            }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-none tracking-tight text-foreground">
              <span className="text-gradient">{heroData.nameEn}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-2 tracking-widest font-mono">
              <span className="text-primary/60">[</span>
              {heroData.nameCn}
              <span className="text-primary/60">]</span>
            </p>
          </a>
          
          <p className="mt-6 text-base md:text-lg text-foreground max-w-xl leading-relaxed">
            {heroData.headline}
          </p>
          
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
            {heroData.subheadline}
          </p>
          
          {/* Quick links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#projects"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-mono",
                "bg-primary/10 border border-primary/30 text-primary",
                "hover:bg-primary/20 transition-all duration-300",
                "hover-glow"
              )}
            >
              VIEW_PROJECTS
            </a>
            <a 
              href="#about"
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-mono",
                "bg-transparent border border-[rgba(34,211,238,0.2)] text-muted-foreground",
                "hover:border-primary/40 hover:text-foreground transition-all duration-300"
              )}
            >
              ABOUT_ME
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 pb-8">
        <MarqueeBanner 
          texts={marqueeData.bottomMarquee} 
          direction="left" 
          className="border-y border-[rgba(34,211,238,0.1)] bg-[rgba(10,10,15,0.6)] backdrop-blur-sm text-muted-foreground"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-primary/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
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
  const content = texts.join(" • ")
  const repeatedContent = Array(20).fill(content).join(" • ")

  return (
    <div className={cn("overflow-hidden py-3", className)}>
      <div 
        className="flex whitespace-nowrap text-sm tracking-wider font-mono"
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

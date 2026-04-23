"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { StatusIndicator } from "@/components/scan-line"
import { ParticleTitle } from "@/components/particle-title"
import { ParticleAvatar } from "@/components/particle-avatar"

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
// FLOATING DECORATIVE ELEMENTS
// ============================================

function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(233,30,99,0.8) 0%, transparent 70%)',
          top: '10%',
          right: '15%',
          animation: 'float-slow 20s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)',
          bottom: '20%',
          left: '10%',
          animation: 'float-slow 25s ease-in-out infinite reverse',
        }}
      />
      
      {/* Floating lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <line 
          x1="20%" y1="30%" x2="35%" y2="45%" 
          stroke="url(#line-gradient)" 
          strokeWidth="0.5"
          className="animate-pulse"
        />
        <line 
          x1="70%" y1="20%" x2="85%" y2="35%" 
          stroke="url(#line-gradient)" 
          strokeWidth="0.5"
          style={{ animationDelay: '1s' }}
          className="animate-pulse"
        />
        <line 
          x1="80%" y1="60%" x2="90%" y2="70%" 
          stroke="url(#line-gradient)" 
          strokeWidth="0.5"
          style={{ animationDelay: '2s' }}
          className="animate-pulse"
        />
        <defs>
          <linearGradient id="line-gradient">
            <stop offset="0%" stopColor="rgba(233,30,99,0)" />
            <stop offset="50%" stopColor="rgba(233,30,99,1)" />
            <stop offset="100%" stopColor="rgba(233,30,99,0)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float-dot ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes float-dot {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

// ============================================
// FLOATING STATUS LABELS
// ============================================

function FloatingLabels() {
  const [time, setTime] = useState("")
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Top left */}
      <div className="absolute top-24 left-6 lg:left-8 text-[9px] font-mono text-muted-foreground/50 tracking-widest space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" />
          <span>SYS.TIME: {time}</span>
        </div>
        <div className="pl-3 text-primary/30">LOCALE: CN/NZ</div>
      </div>
      
      {/* Top right */}
      <div className="absolute top-24 right-6 lg:right-8 text-[9px] font-mono text-right text-muted-foreground/50 tracking-widest space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span>VER.2.0_ADAPTIVE</span>
          <span className="w-1 h-1 rounded-full bg-brand/50" />
        </div>
        <div className="text-brand/30">MODE: EXPLORE</div>
      </div>
      
      {/* Bottom left */}
      <div className="absolute bottom-20 left-6 lg:left-8 text-[9px] font-mono text-muted-foreground/30 tracking-widest">
        <div>LAT: 34.2667</div>
        <div>LNG: 108.9167</div>
      </div>
      
      {/* Bottom right */}
      <div className="absolute bottom-20 right-6 lg:right-8 text-[9px] font-mono text-right text-muted-foreground/30 tracking-widest">
        <div>FIELD: ARCHITECTURE</div>
        <div>FOCUS: SYSTEMS</div>
      </div>
    </>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "ADAPTIVE_PORTFOLIO_V2.0"

  useEffect(() => {
    setMounted(true)
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
    }, 60)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingElements />
      
      {/* Floating status labels */}
      <FloatingLabels />

      {/* Marquee Banners */}
      <div className="relative z-10 pt-20">
        <MarqueeBanner 
          texts={marqueeData.topMarquee} 
          direction="left" 
          className="border-y border-[rgba(34,211,238,0.08)] bg-[rgba(10,10,15,0.4)] backdrop-blur-sm text-muted-foreground/60"
        />
        <MarqueeBanner 
          texts={marqueeData.middleMarquee} 
          direction="right" 
          className="border-b border-[rgba(34,211,238,0.08)] bg-brand/[0.03] text-brand/60"
        />
      </div>

      {/* Main Content - Left/Right Layout */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1">
              {/* System status */}
              <div className="flex items-center gap-3 mb-4">
                <StatusIndicator status="active" />
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
                  {typedText}
                  {typedText.length < fullText.length && (
                    <span className="inline-block w-1.5 h-3 bg-primary/60 ml-0.5 animate-pulse" />
                  )}
                </span>
              </div>
              
              {/* Particle Title - Left aligned, above Chinese name */}
              <div className="relative">
                <ParticleTitle 
                  text={heroData.nameEn}
                  className="w-full max-w-xl h-24 md:h-32 lg:h-40"
                />
                
                {/* Chinese name - directly below particle title, left aligned */}
                <p className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] font-light mt-2 pl-1">
                  <span className="text-brand/40">[</span>
                  <span className="text-foreground/80">{heroData.nameCn}</span>
                  <span className="text-brand/40">]</span>
                </p>
              </div>
              
              <p className="mt-8 text-base md:text-lg text-foreground/90 max-w-xl leading-relaxed">
                {heroData.headline}
              </p>
              
              <p className="mt-4 text-sm md:text-base text-muted-foreground/70 max-w-xl leading-relaxed">
                {heroData.subheadline}
              </p>
              
              {/* Quick links */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a 
                  href="#projects"
                  className={cn(
                    "group px-5 py-2.5 rounded text-sm font-mono tracking-wider",
                    "bg-brand/10 border border-brand/30 text-brand",
                    "hover:bg-brand/20 hover:border-brand/50 transition-all duration-500",
                    "relative overflow-hidden"
                  )}
                >
                  <span className="relative z-10">VIEW_PROJECTS</span>
                  <span className="absolute inset-0 bg-brand/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </a>
                <a 
                  href="#about"
                  className={cn(
                    "px-5 py-2.5 rounded text-sm font-mono tracking-wider",
                    "bg-transparent border border-[rgba(34,211,238,0.15)] text-muted-foreground/70",
                    "hover:border-primary/30 hover:text-foreground/90 transition-all duration-500"
                  )}
                >
                  ABOUT_ME
                </a>
              </div>
            </div>
            
            {/* Right Side - Particle Avatar */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <ParticleAvatar 
                imageSrc="/images/avatar.png"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 pb-8">
        <MarqueeBanner 
          texts={marqueeData.bottomMarquee} 
          direction="left" 
          className="border-y border-[rgba(34,211,238,0.08)] bg-[rgba(10,10,15,0.4)] backdrop-blur-sm text-muted-foreground/50"
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] font-mono text-muted-foreground/30 tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent animate-pulse" />
        </div>
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
    <div className={cn("overflow-hidden py-2.5", className)}>
      <div 
        className="flex whitespace-nowrap text-[11px] tracking-[0.15em] font-mono"
        style={{
          animation: `marquee-${direction} 80s linear infinite`,
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

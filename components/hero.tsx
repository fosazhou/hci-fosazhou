"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { StatusIndicator } from "@/components/scan-line"
import { ParticleTitle } from "@/components/particle-title"
import { ParticleAvatar } from "@/components/particle-avatar"
import { useLanguage } from "@/contexts/language-context"

export type ViewType = "projects" | "about"

interface HeroProps {
  currentView?: ViewType
  onViewChange?: (view: ViewType) => void
}

// ============================================
// DATA SECTION
// ============================================

const heroData = {
  nameEn: "FOSA",
  nameCn: "周亦楠",
  headline: "Cross-Scale Intelligent Interaction & Design Computing",
  headlineCn: "跨尺度智能交互与设计计算",
  subheadline: "我学建筑出身，却总在琢磨同一件事：当空间开始'察觉'我们、并且愿意回应，会发生什么？我的工作在很小和很大的尺度之间来回——小到一块随你动作变化的屏幕，大到一座能读懂自己数据的城市。我用代码、数据和一些算法，把人的动作、声音和周围的环境，变成系统能读懂、也能回话的东西。从实时交互界面到像在呼吸的装置，我其实想弄明白一件事：技术能不能让人和空间相处得更自然一点。",
  subheadlineEn: "I trained as an architect, but I keep circling back to one question: what happens when a space starts to notice us and actually responds? My work moves between very small and very large scales—from a screen that shifts with your movement to a city that can read its own data. Using code, data, and a bit of algorithm, I turn our gestures, sounds, and surroundings into something a system can understand and answer back. From real-time interfaces to installations that seem to breathe, what I'm really trying to figure out is whether technology can make people and space get along a little more naturally.",
}

const marqueeData = {
  topMarquee: [
    "From Body to City.",
    "From Data to Design.",
    "From Computation to Interaction.",
  ],
  middleMarquee: {
    zh: ["跨尺度智能交互 · 设计计算 · 响应式系统"],
    "zh-hk": ["跨尺度智能交互 · 設計計算 · 響應式系統"],
    en: ["Cross-Scale Intelligent Interaction · Design Computing · Responsive Systems"],
  },
  bottomMarquee: {
    zh: ["长安大学建筑学院", "奥克兰大学"],
    "zh-hk": ["長安大學建築學院", "奧克蘭大學"],
    en: ["Chang'an University School of Architecture", "University of Auckland"],
  },
}

// ============================================
// FLOATING DECORATIVE ELEMENTS - Simplified for performance
// ============================================

function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs - reduced and static */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(233,30,99,0.8) 0%, transparent 70%)',
          top: '10%',
          right: '15%',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.8) 0%, transparent 70%)',
          bottom: '20%',
          left: '10%',
        }}
      />

      {/* Static lines instead of animated */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <line
          x1="20%" y1="30%" x2="35%" y2="45%"
          stroke="url(#line-gradient)"
          strokeWidth="0.5"
        />
        <line
          x1="70%" y1="20%" x2="85%" y2="35%"
          stroke="url(#line-gradient)"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="line-gradient">
            <stop offset="0%" stopColor="rgba(233,30,99,0)" />
            <stop offset="50%" stopColor="rgba(233,30,99,1)" />
            <stop offset="100%" stopColor="rgba(233,30,99,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Reduced static dots - no animation */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand/20"
          style={{
            left: `${20 + i * 25}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// FLOATING STATUS LABELS - Simplified, no time update
// ============================================

function FloatingLabels() {
  return (
    <>
      {/* Top left */}
      <div className="absolute top-24 left-6 lg:left-8 text-[9px] font-mono text-muted-foreground/50 tracking-widest space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span>SYS.STATUS: ONLINE</span>
        </div>
        <div className="pl-3 text-primary/30">LOCALE: CN/NZ</div>
      </div>

      {/* Top right */}
      <div className="absolute top-24 right-6 lg:right-8 text-[9px] font-mono text-right text-muted-foreground/50 tracking-widest space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span>VER.2.0_RESPONSIVE</span>
          <span className="w-1 h-1 rounded-full bg-brand/50" />
        </div>
        <div className="text-brand/30">MODE: DESIGN_COMPUTING</div>
      </div>

      {/* Bottom left */}
      <div className="absolute bottom-20 left-6 lg:left-8 text-[9px] font-mono text-muted-foreground/30 tracking-widest">
        <div>LAT: 34.2667</div>
        <div>LNG: 108.9167</div>
      </div>

      {/* Bottom right */}
      <div className="absolute bottom-20 right-6 lg:right-8 text-[9px] font-mono text-right text-muted-foreground/30 tracking-widest">
        <div>FIELD: INTELLIGENT INTERACTION</div>
        <div>FOCUS: CROSS-SCALE COMPUTING</div>
      </div>
    </>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Hero({ currentView = "projects", onViewChange }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "CROSS_SCALE_INTERACTION"
  const { language, t } = useLanguage()

  const handleViewChange = (view: ViewType) => {
    if (onViewChange) {
      onViewChange(view)
    }
  }

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

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Floating status labels */}
      <FloatingLabels />

      {/* Marquee Banners - Not fixed, scrolls with content */}
      <div className="relative z-10 pt-6">
        <MarqueeBanner
          texts={marqueeData.topMarquee}
          direction="left"
          className="border-y border-[rgba(34,211,238,0.08)] bg-[rgba(10,10,15,0.4)] backdrop-blur-sm text-muted-foreground/60"
        />
        <MarqueeBanner
          texts={marqueeData.middleMarquee[language] || marqueeData.middleMarquee.en}
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
                <span className="block text-xl md:text-2xl font-bold tracking-wide text-foreground mb-2">
                  {language === "zh" ? heroData.headlineCn : language === "zh-hk" ? "跨尺度智能交互與設計計算" : heroData.headline}
                </span>
              </p>

              <p className="mt-6 text-sm md:text-base text-muted-foreground/70 max-w-xl leading-relaxed">
                {language === "zh" ? heroData.subheadline : heroData.subheadlineEn}
              </p>

              {/* Quick links - View switchers */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => handleViewChange("projects")}
                  className={cn(
                    "group px-5 py-2.5 rounded text-sm font-mono tracking-wider",
                    "transition-all duration-500 relative overflow-hidden",
                    currentView === "projects"
                      ? "bg-brand/20 border-2 border-brand text-brand shadow-[0_0_20px_rgba(233,30,99,0.3)]"
                      : "bg-brand/5 border border-brand/30 text-brand/70 hover:bg-brand/10 hover:border-brand/50"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {currentView === "projects" && (
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                    )}
                    VIEW_PROJECTS
                  </span>
                  <span className="absolute inset-0 bg-brand/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
                <button
                  onClick={() => handleViewChange("about")}
                  className={cn(
                    "group px-5 py-2.5 rounded text-sm font-mono tracking-wider",
                    "transition-all duration-500 relative overflow-hidden",
                    currentView === "about"
                      ? "bg-primary/20 border-2 border-primary text-primary shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                      : "bg-transparent border border-[rgba(34,211,238,0.15)] text-muted-foreground/70 hover:border-primary/30 hover:text-foreground/90"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {currentView === "about" && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                    ABOUT_ME
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Particle Avatar */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <ParticleAvatar
                imageSrc="/images/avatar.png"
                className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 pb-8">
        <MarqueeBanner
          texts={marqueeData.bottomMarquee[language] || marqueeData.bottomMarquee.en}
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

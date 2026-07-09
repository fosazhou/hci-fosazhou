"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const researchInterestsData = {
  zh: [
    "空间中的人机交互",
    "具身交互体验",
    "自适应界面",
    "实时反馈系统",
  ],
  en: [
    "Human-Computer Interaction in Space",
    "Embodied Interaction Experience",
    "Adaptive Interface",
    "Real-time Feedback System",
  ],
}

const bioData = {
  zh: "周亦楠 是一名建筑学背景的设计者，关注 Spatial HCI、具身交互与自适应界面。她的项目从音频驱动的实时视觉反馈、自适应作品集界面，到 1:1 响应式空间原型，探索身体行为、动态数据与空间感知如何被转译为可反馈、可调节的界面与环境系统。",
  en: "FOSA (Zhou Yinan) is a designer with an architecture background, focusing on Spatial HCI, embodied interaction, and adaptive interfaces. Her projects span from audio-driven real-time visual feedback, adaptive portfolio interfaces, to 1:1 responsive spatial prototypes, exploring how body behavior, dynamic data, and spatial perception can be translated into responsive and adjustable interface and environmental systems.",
}

export function About() {
  const { language } = useLanguage()
  const researchInterests = researchInterestsData[language] || researchInterestsData.en
  const bio = bioData[language] || bioData.en
  return (
    <section id="about" className="py-16 px-6 lg:px-8 border-t border-[rgba(34,211,238,0.1)]">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">A.02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            ABOUT_ME
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Photo */}
          <div className="lg:col-span-1 flex items-start justify-center lg:justify-start">
            <div 
              className={cn(
                "aspect-[3/4] w-28 md:w-32 overflow-hidden rounded-lg",
                "border border-[rgba(34,211,238,0.2)]",
                "bg-[rgba(10,10,15,0.6)]"
              )}
              style={{
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
              }}
            >
              <img
                src="/images/me.png"
                alt="周亦楠"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About & Research */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono text-primary/60">BIO/</span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                  BIOGRAPHY
                </span>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">
                {bio}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono text-primary/60">INT/</span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                  RESEARCH_INTERESTS
                </span>
              </div>

              <ul className="space-y-3">
                {researchInterests.map((interest, index) => (
                  <li
                    key={index}
                    className={cn(
                      "text-xs text-foreground/70 pl-4 py-1",
                      "border-l-2 border-primary/30",
                      "hover:border-primary/60 hover:text-foreground transition-all"
                    )}
                  >
                    <span className="text-primary/40 mr-2 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

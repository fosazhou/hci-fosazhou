"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const researchInterestsData = {
  zh: [
    "会回应人的空间与界面",
    "用计算和数据做设计",
    "让静态的东西动起来",
    "人和 AI 一起做决定",
  ],
  en: [
    "Spaces & interfaces that respond",
    "Designing with data and code",
    "Making static things move",
    "Deciding alongside AI",
  ],
}

const bioData = {
  zh: "我是周亦楠，学建筑出身。不过比起把图纸画得漂亮，我更好奇空间怎么和身处其中的人'打交道'。这几年我的兴趣慢慢往两头跑——一头缩小到一块会随你动作变化的屏幕，一头放大到一整座能读懂自己数据的城市。我喜欢用生成式设计、数据和一点代码，把人的行为和环境变成能被感知、也会回应的系统。说到底，我想做的事其实挺朴素：让人和空间之间多一点默契。",
  en: "I'm Zhou Yinan, trained as an architect—though I've always cared more about how a space gets along with the people inside it than about drawing the perfect plan. Lately my curiosity has stretched in two directions at once: down to a screen that shifts with your movement, and up to a whole city that can read its own data. I like working with generative design, data, and a little code to turn human behavior and environment into systems that can sense and respond. What I'm after is honestly pretty simple: a bit more understanding between people and the spaces they live in.",
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

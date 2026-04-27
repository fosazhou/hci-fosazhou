import { cn } from "@/lib/utils"

const researchInterests = [
  "空间中的人机交互",
  "交互式建筑环境",
  "建筑生成式设计",
  "计算设计与数字制造",
]

export function About() {
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
                FOSA 是一名建筑学学生，探索建筑设计与人机交互的交叉领域。通过设计实验与数字工具，研究空间如何感知、响应和增强人类体验。
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

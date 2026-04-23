import { cn } from "@/lib/utils"

// ============================================
// DATA SECTION
// ============================================

const educationData = [
  {
    school: "Chang'an University",
    schoolCn: "长安大学",
    department: "建筑学院",
    degree: "建筑学",
    period: "2022.9 - 至今",
    logo: "/images/chu.jpg",
  },
  {
    school: "University of Auckland",
    schoolCn: "奥克兰大学",
    department: "建筑与规划学院",
    degree: "交换生",
    period: "2025.7 - 2025.12",
    logo: "/images/uoa.png",
  },
]

// ============================================
// COMPONENT
// ============================================

export function Education() {
  return (
    <section className="py-12 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            EDUCATION
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        <div className="space-y-0">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 py-5",
                "border-b border-[rgba(34,211,238,0.1)] last:border-b-0",
                "hover:bg-[rgba(34,211,238,0.02)] transition-colors"
              )}
            >
              {/* Logo */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden",
                  "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.15)]"
                )}
              >
                {edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[8px] text-primary/40 font-mono">LOGO</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground">
                  {edu.school}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                  {edu.department} · {edu.degree}
                </p>
              </div>

              {/* Date */}
              <div className="flex-shrink-0 text-right">
                <p className="text-[10px] text-primary/60 font-mono tracking-wider">
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

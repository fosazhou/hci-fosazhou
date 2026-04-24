import { cn } from "@/lib/utils"

const skillCategories = [
  {
    label: "3D_MODELING",
    skills: ["Rhino", "Grasshopper", "SketchUp"]
  },
  {
    label: "CAD_DRAFTING",
    skills: ["AutoCAD", "Revit"]
  },
  {
    label: "VISUALIZATION",
    skills: ["D5 Render", "Adobe Suite", "Stable Diffusion", "ComfyUI"]
  },
  {
    label: "INTERACTIVE",
    skills: ["TouchDesigner", "Unity", "Arduino"]
  }
]

export function Skills() {
  return (
    <section className="py-16 px-6 lg:px-8 border-t border-[rgba(34,211,238,0.1)]">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">A.03/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            SKILLS_AND_TOOLS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.label}
              className={cn(
                "p-4 rounded-lg",
                "bg-[rgba(10,10,15,0.4)] border border-[rgba(34,211,238,0.1)]",
                "hover:border-[rgba(34,211,238,0.25)] transition-all"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-mono text-primary/40">
                  {String(catIndex + 1).padStart(2, '0')}/
                </span>
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                  {category.label}
                </span>
              </div>
              
              <div className="space-y-2">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="text-xs text-foreground/70 font-mono flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

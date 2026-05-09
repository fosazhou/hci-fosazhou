"use client"

import { cn } from "@/lib/utils"
import type { Project, GalleryImage } from "@/lib/projects-data"
import { GitBranch, Workflow, RefreshCw, Lightbulb, Zap, Search, ArrowRight } from "lucide-react"
import { useReadingMode } from "@/contexts/reading-mode-context"

interface ProcessViewProps {
  project: Project
  className?: string
  galleryComponent?: React.ReactNode
}

export function ProcessView({ project, className, galleryComponent }: ProcessViewProps) {
  const { setMode } = useReadingMode()
  const content = project.processContent

  if (!content) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground font-mono text-sm">
          Process view content not available
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-12", className)}>
      {/* Phases Timeline */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Workflow className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            DESIGN_PHASES
          </span>
        </div>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div 
            className="absolute left-[18px] top-0 bottom-0 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, var(--primary), transparent)"
            }}
          />
          
          <div className="space-y-8">
            {content.phases.map((phase, index) => (
              <div key={index} className="relative pl-12">
                {/* Timeline node */}
                <div 
                  className="absolute left-0 top-1 w-[38px] h-[38px] rounded-full border-2 border-primary bg-background flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 15px var(--primary-glow)"
                  }}
                >
                  <span className="text-[10px] font-mono text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Phase content */}
                <div 
                  className={cn(
                    "p-5 rounded-lg",
                    "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
                    "transition-all duration-300",
                    "hover:border-[rgba(34,211,238,0.25)]"
                  )}
                >
                  <h3 className="text-foreground font-medium mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
            <GitBranch className="h-4 w-4 text-secondary" />
          </div>
          <span className="text-[10px] font-mono text-secondary/60 tracking-widest uppercase">
            METHODOLOGY
          </span>
        </div>
        
        <p className="text-foreground/90 leading-relaxed pl-4 border-l-2 border-secondary/30">
          {content.methodology}
        </p>
      </div>

      {/* Iterations */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-accent/10 border border-accent/20">
            <RefreshCw className="h-4 w-4 text-accent" />
          </div>
          <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase">
            ITERATIONS
          </span>
        </div>
        
        <p className="text-foreground/90 leading-relaxed pl-4 border-l-2 border-accent/30">
          {content.iterations}
        </p>
      </div>

      {/* Key Decisions */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            KEY_DECISIONS
          </span>
        </div>
        
        <div className="grid gap-3">
          {content.decisions.map((decision, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                "bg-[rgba(10,10,15,0.4)] border border-[rgba(34,211,238,0.08)]"
              )}
            >
              <span className="text-primary text-lg leading-none">→</span>
              <p className="text-foreground/80 text-sm leading-relaxed">{decision}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery (passed from parent) */}
      {galleryComponent && (
        <div className="mt-16">
          {galleryComponent}
        </div>
      )}
      
      {/* Read time indicator - after gallery */}
      <div className="flex items-center justify-center gap-2 pt-8 mt-8 border-t border-[rgba(34,211,238,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
          ~5 MIN READ COMPLETE
        </span>
      </div>
      
      {/* Mode Entry Buttons */}
      <div className="pt-6 space-y-3">
        <p className="text-[10px] font-mono text-muted-foreground/60 text-center tracking-wider uppercase mb-4">
          EXPLORE_MORE
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Quick Entry */}
          <button
            onClick={() => {
              setMode("quick")
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) {
                  densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 100)
            }}
            className={cn(
              "group flex items-center justify-between p-4 rounded-lg",
              "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.15)]",
              "hover:border-[rgba(34,211,238,0.4)] hover:bg-[rgba(10,10,15,0.8)]",
              "transition-all duration-300"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10 border border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-primary/60 block">QUICK</span>
                <span className="text-xs text-muted-foreground">~1 min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
          
          {/* Research Entry */}
          <button
            onClick={() => {
              setMode("research")
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) {
                  densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 100)
            }}
            className={cn(
              "group flex items-center justify-between p-4 rounded-lg",
              "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.15)]",
              "hover:border-[rgba(34,211,238,0.4)] hover:bg-[rgba(10,10,15,0.8)]",
              "transition-all duration-300"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
                <Search className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-secondary/60 block">RESEARCH</span>
                <span className="text-xs text-muted-foreground">~10 min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-secondary/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}

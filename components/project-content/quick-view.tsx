"use client"

import { cn } from "@/lib/utils"
import type { Project } from "@/lib/projects-data"
import { Zap, Check, Target } from "lucide-react"

interface QuickViewProps {
  project: Project
  className?: string
}

export function QuickView({ project, className }: QuickViewProps) {
  const content = project.quickContent

  if (!content) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground font-mono text-sm">
          Quick view content not available
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Headline */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            CORE_CONCEPT
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-light text-foreground leading-relaxed">
          {content.headline}
        </h2>
      </div>

      {/* Key Points */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            KEY_POINTS
          </span>
        </div>
        
        <div className="grid gap-4">
          {content.keyPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
                "transition-all duration-300",
                "hover:border-[rgba(34,211,238,0.25)] hover:bg-[rgba(10,10,15,0.8)]"
              )}
            >
              <span className="text-[10px] font-mono text-primary/60 mt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground/90 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            OUTCOME
          </span>
        </div>
        
        <div 
          className={cn(
            "p-6 rounded-lg",
            "bg-primary/5 border border-primary/20"
          )}
          style={{
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)"
          }}
        >
          <p className="text-foreground text-lg font-light leading-relaxed">
            {content.outcome}
          </p>
        </div>
      </div>

      {/* Read time indicator */}
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-[rgba(34,211,238,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
          ~1 MIN READ COMPLETE
        </span>
      </div>
    </div>
  )
}

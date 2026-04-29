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
    <div className={cn("space-y-6", className)}>
      {/* Headline */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Zap className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            CORE_CONCEPT
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-normal text-foreground leading-relaxed">
          {content.headline}
        </h2>
      </div>

      {/* Key Points */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            KEY_POINTS
          </span>
        </div>
        
        <div className="grid gap-2">
          {content.keyPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-3 rounded-md",
                "bg-[rgba(10,10,15,0.5)] border border-[rgba(34,211,238,0.08)]",
                "transition-all duration-300",
                "hover:border-[rgba(34,211,238,0.2)] hover:bg-[rgba(10,10,15,0.7)]"
              )}
            >
              <span className="text-[9px] font-mono text-primary/50 mt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground/85 text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Target className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            OUTCOME
          </span>
        </div>
        
        <div 
          className={cn(
            "p-4 rounded-md",
            "bg-primary/5 border border-primary/15"
          )}
          style={{
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.08)"
          }}
        >
          <p className="text-foreground/90 text-sm leading-relaxed">
            {content.outcome}
          </p>
        </div>
      </div>

      {/* Read time indicator */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t border-[rgba(34,211,238,0.08)]">
        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-mono text-muted-foreground/70 tracking-wider">
          ~1 MIN READ
        </span>
      </div>
    </div>
  )
}

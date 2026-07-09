"use client"

import { cn } from "@/lib/utils"
import type { Project } from "@/lib/projects-data"
import { 
  Search, 
  HelpCircle, 
  Map, 
  Compass, 
  Route, 
  Brain, 
  Target,
  Sparkles,
  MessageSquare,
  Zap,
  Workflow,
  ArrowRight
} from "lucide-react"
import { useReadingMode } from "@/contexts/reading-mode-context"
import { useLanguage } from "@/contexts/language-context"

interface ResearchViewProps {
  project: Project
  className?: string
  galleryComponent?: React.ReactNode
}

export function ResearchView({ project, className, galleryComponent }: ResearchViewProps) {
  const { language } = useLanguage()
  const { setMode } = useReadingMode()
  const content = language === "en" && project.researchContentEn ? project.researchContentEn : project.researchContent

  if (!content) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground font-mono text-sm">
          Research view content not available
        </p>
      </div>
    )
  }

  const sections = [
    {
      icon: HelpCircle,
      label: "PROBLEM_STATEMENT",
      content: content.problemStatement,
      color: "primary"
    },
    {
      icon: Map,
      label: "CONTEXT",
      content: content.context,
      color: "secondary"
    },
    {
      icon: Compass,
      label: "HYPOTHESIS",
      content: content.hypothesis,
      color: "accent"
    },
    {
      icon: Route,
      label: "APPROACH",
      content: content.approach,
      color: "primary"
    }
  ]

  return (
    <div className={cn("space-y-10", className)}>
      {/* Main sections */}
      {sections.map((section, index) => (
        <div key={section.label} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "p-2 rounded border",
              section.color === "primary" && "bg-primary/10 border-primary/20",
              section.color === "secondary" && "bg-secondary/10 border-secondary/20",
              section.color === "accent" && "bg-accent/10 border-accent/20"
            )}>
              <section.icon className={cn(
                "h-4 w-4",
                section.color === "primary" && "text-primary",
                section.color === "secondary" && "text-secondary",
                section.color === "accent" && "text-accent"
              )} />
            </div>
            <span className={cn(
              "text-[10px] font-mono tracking-widest uppercase",
              section.color === "primary" && "text-primary/60",
              section.color === "secondary" && "text-secondary/60",
              section.color === "accent" && "text-accent/60"
            )}>
              {section.label}
            </span>
          </div>
          
          <p className="text-foreground/90 leading-relaxed text-base">
            {section.content}
          </p>
        </div>
      ))}

      {/* Logic chain */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded bg-primary/10 border border-primary/20">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
            LOGIC_CHAIN
          </span>
        </div>
        
        <div className="space-y-3">
          {content.logic.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
                "relative overflow-hidden"
              )}
            >
              {/* Connection line to next item */}
              {index < content.logic.length - 1 && (
                <div className="absolute left-[26px] bottom-0 w-[2px] h-3 bg-primary/30 translate-y-full" />
              )}
              
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-mono text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategies */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
            <Target className="h-4 w-4 text-secondary" />
          </div>
          <span className="text-[10px] font-mono text-secondary/60 tracking-widest uppercase">
            STRATEGIES
          </span>
        </div>
        
        <div className="grid gap-3">
          {content.strategies.map((strategy, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg",
                "bg-secondary/5 border border-secondary/10"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-secondary text-sm">◆</span>
                <p className="text-foreground/80 text-sm leading-relaxed">{strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Findings */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/60 tracking-widest uppercase">
            FINDINGS
          </span>
        </div>
        
        <div 
          className={cn(
            "p-6 rounded-lg",
            "bg-emerald-500/5 border border-emerald-500/20"
          )}
        >
          <p className="text-foreground text-base leading-relaxed">
            {content.findings}
          </p>
        </div>
      </div>

      {/* Reflection */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
            <MessageSquare className="h-4 w-4 text-amber-500" />
          </div>
          <span className="text-[10px] font-mono text-amber-500/60 tracking-widest uppercase">
            REFLECTION
          </span>
        </div>
        
        <div 
          className={cn(
            "p-6 rounded-lg",
            "bg-amber-500/5 border border-amber-500/20"
          )}
        >
          <p className="text-foreground/90 text-base leading-relaxed italic">
            {content.reflection}
          </p>
        </div>
      </div>

      {/* References (if available) */}
      {content.references && content.references.length > 0 && (
        <div className="relative pt-6 border-t border-[rgba(34,211,238,0.1)]">
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase block mb-3">
            REFERENCES
          </span>
          <ul className="space-y-1">
            {content.references.map((ref, index) => (
              <li key={index} className="text-xs text-muted-foreground">
                [{index + 1}] {ref}
              </li>
            ))}
          </ul>
        </div>
      )}

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
          ~10 MIN READ COMPLETE
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
          
          {/* Process Entry */}
          <button
            onClick={() => {
              setMode("process")
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
                <Workflow className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-primary/60 block">PROCESS</span>
                <span className="text-xs text-muted-foreground">~5 min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}

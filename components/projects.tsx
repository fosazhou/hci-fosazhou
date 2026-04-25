"use client"

import React, { useMemo, useState, useEffect } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { GlowCard } from "@/components/glow-card"
import { StatusIndicator, HoverScan } from "@/components/scan-line"
import { cn } from "@/lib/utils"
import { ExternalLink, Zap, GitBranch, Search } from "lucide-react"

interface ProjectsProps {
  filterIds?: string[]
}

// System Status Bar
function SystemStatus({ 
  isLoaded, 
  topTag, 
  totalClicks,
  sectionLabel,
  filteredCount,
  totalCount
}: { 
  isLoaded: boolean
  topTag: string | null
  totalClicks: number
  sectionLabel: string
  filteredCount: number
  totalCount: number
}) {
  const statusText = useMemo(() => {
    if (!isLoaded) {
      return "> INITIALIZING_BEHAVIOR_TRACKING..."
    }
    if (totalClicks === 0) {
      return `> TRACKING_ACTIVE. DISPLAYING ${filteredCount}/${totalCount} PROJECTS.`
    }
    return `> INTEREST_DETECTED: [${topTag}]. ADAPTIVE_REORDER_ENABLED. ${filteredCount}/${totalCount} VISIBLE.`
  }, [isLoaded, topTag, totalClicks, filteredCount, totalCount])

  return (
    <div className={cn(
      "mb-6 font-mono text-[10px]",
      "border border-[rgba(34,211,238,0.15)] bg-[rgba(10,10,15,0.6)]",
      "px-4 py-3 rounded-lg backdrop-blur-sm"
    )}>
      <div className="flex items-center gap-3">
        <StatusIndicator status={isLoaded ? "active" : "processing"} />
        <span className="text-primary/60">[SYS]</span>
        <span className="text-[rgba(34,211,238,0.3)]">|</span>
        <span className="text-muted-foreground/60 uppercase tracking-wider">{sectionLabel}</span>
        <span className="text-[rgba(34,211,238,0.3)]">|</span>
        <span className="flex-1 truncate text-muted-foreground">
          {statusText}
        </span>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ 
  project, 
  onTrack,
  index 
}: { 
  project: typeof projects[0]
  onTrack: (tags: string[]) => void
  index: number
}) {
  const { navigateWithTransition } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered])

  return (
    <div
      className="block cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowCard hover className="overflow-hidden">
        <div className="relative">
          {/* Image/Video container */}
          <div className="aspect-video w-full bg-[rgba(10,10,15,0.8)] overflow-hidden relative">
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  isHovered && project.previewVideo ? "opacity-0" : "opacity-100",
                  isHovered && "scale-105"
                )}
              />
            )}
            {project.previewVideo && (
              <video
                ref={videoRef}
                src={project.previewVideo}
                muted
                loop
                playsInline
                className={cn(
                  "w-full h-full object-cover absolute inset-0 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}
            
            {/* Scan line effect on hover */}
            <HoverScan active={isHovered} />
            
            {/* Year badge */}
            <div className="absolute top-4 left-4 px-2 py-1 rounded bg-[rgba(10,10,15,0.8)] border border-primary/20 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-primary">{project.year}</span>
            </div>
            
            {/* Reading modes indicator */}
            <div className="absolute top-4 right-4 flex gap-1">
              {project.quickContent && (
                <div className="p-1.5 rounded bg-[rgba(10,10,15,0.8)] border border-primary/20" title="Quick View">
                  <Zap className="h-3 w-3 text-primary/60" />
                </div>
              )}
              {project.processContent && (
                <div className="p-1.5 rounded bg-[rgba(10,10,15,0.8)] border border-secondary/20" title="Process View">
                  <GitBranch className="h-3 w-3 text-secondary/60" />
                </div>
              )}
              {project.researchContent && (
                <div className="p-1.5 rounded bg-[rgba(10,10,15,0.8)] border border-accent/20" title="Research View">
                  <Search className="h-3 w-3 text-accent/60" />
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            {/* Index */}
            <span className="text-[10px] font-mono text-primary/40 mb-2 block">
              {String(index + 1).padStart(2, '0')}/
            </span>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
              {project.title}
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {project.description}
            </p>
            
            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className={cn(
                    "px-2 py-0.5 text-[10px] font-mono tracking-wider",
                    "text-primary/70 border border-primary/20 rounded-full",
                    "bg-primary/5 uppercase",
                    "transition-all duration-300",
                    "hover:border-primary/40 hover:bg-primary/10"
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

export function Projects({ filterIds }: ProjectsProps) {
  const { 
    isLoaded, 
    topTag, 
    totalClicks, 
    trackClick, 
    sortByPreference,
  } = useUserBehavior()

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    // If filterIds provided, use it; otherwise show all
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id))
      : projects
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  return (
    <section id="projects" className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            SELECTED_PROJECTS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* System status */}
        <SystemStatus 
          isLoaded={isLoaded}
          topTag={topTag}
          totalClicks={totalClicks}
          sectionLabel="ADAPTIVE_SORT"
          filteredCount={filteredProjects.length}
          totalCount={projects.length}
        />
        
        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTrack={trackClick}
              index={index}
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-mono text-sm">
              NO_PROJECTS_IN_SELECTED_RANGE
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

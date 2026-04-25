"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface ProjectsProps {
  filterIds?: string[]
}

// Refined Project Card with elegant hover effects
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
  const [isPressed, setIsPressed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }

  useEffect(() => {
    if (videoRef.current && project.previewVideo) {
      if (isPressed) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPressed, project.previewVideo])

  return (
    <article
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "border-b border-[rgba(255,255,255,0.04)]",
          "hover:bg-[rgba(255,255,255,0.02)]"
        )}
      >
        <div className="flex items-center gap-6 py-6">
          {/* Index */}
          <span 
            className={cn(
              "w-8 text-sm font-light tabular-nums transition-colors duration-300",
              isHovered ? "text-brand" : "text-muted-foreground/20"
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-4">
              <h3 
                className={cn(
                  "text-lg font-medium transition-colors duration-300",
                  isHovered ? "text-foreground" : "text-foreground/70"
                )}
              >
                {project.title}
              </h3>
              <span className="text-xs text-muted-foreground/30 font-mono">
                {project.year}
              </span>
            </div>
            
            {/* Description - revealed on hover */}
            <div 
              className={cn(
                "overflow-hidden transition-all duration-400 ease-out",
                isHovered ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <p className="text-sm text-muted-foreground/50 leading-relaxed max-w-2xl">
                {project.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                {project.keywords.slice(0, 3).map((keyword, i) => (
                  <span 
                    key={i}
                    className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-wider"
                  >
                    {keyword}
                    {i < Math.min(project.keywords.length, 3) - 1 && (
                      <span className="ml-2 text-muted-foreground/15">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Thumbnail */}
          <div 
            className={cn(
              "w-24 h-16 flex-shrink-0 overflow-hidden rounded transition-all duration-500",
              "bg-muted/10",
              isHovered && "w-32"
            )}
          >
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  isHovered && "scale-105",
                  isPressed && project.previewVideo && "opacity-0"
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
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  isPressed ? "opacity-100" : "opacity-0"
                )}
              />
            )}
          </div>
          
          {/* Arrow */}
          <ArrowUpRight 
            className={cn(
              "w-4 h-4 flex-shrink-0 transition-all duration-300",
              isHovered 
                ? "text-brand opacity-100 translate-x-0" 
                : "text-muted-foreground/20 opacity-0 -translate-x-2"
            )}
          />
        </div>
        
        {/* Hover accent line */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-px bg-brand/50 transition-all duration-500",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </article>
  )
}

export function Projects({ filterIds }: ProjectsProps) {
  const { 
    isLoaded, 
    trackClick, 
    sortByPreference,
  } = useUserBehavior()

  const filteredProjects = useMemo(() => {
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id))
      : projects
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-muted-foreground/30">02</span>
            <div className="w-8 h-px bg-muted-foreground/10" />
          </div>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Selected Projects
          </h2>
        </header>
        
        {/* Behavior tracker */}
        <BehaviorTrackerDisplay section="projects" itemCount={filteredProjects.length} />
        
        {/* Projects list */}
        <div className="divide-y divide-transparent">
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
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground/30">
              No projects in selected range
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

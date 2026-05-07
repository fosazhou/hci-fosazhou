"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  filterIds?: string[]
}

// Project Card with hover reveal deeper layer
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

  // Play video when hovered (for projects with preview video)
  useEffect(() => {
    if (videoRef.current && project.previewVideo) {
      if (isHovered) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered, project.previewVideo])

  return (
    <div
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
          "relative overflow-hidden rounded-lg transition-all duration-500",
          "border border-[rgba(255,255,255,0.06)]",
          "bg-[rgba(10,10,15,0.4)]",
          isHovered && "border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,15,0.6)]"
        )}
      >
        {/* Main content row */}
        <div className="flex items-stretch">
          {/* Left: Index number */}
          <div 
            className={cn(
              "w-16 md:w-20 flex-shrink-0 flex items-center justify-center",
              "border-r border-[rgba(255,255,255,0.06)]",
              "bg-[rgba(255,255,255,0.02)]",
              "transition-colors duration-300",
              isHovered && "bg-[rgba(233,30,99,0.05)]"
            )}
          >
            <span 
              className={cn(
                "text-2xl md:text-3xl font-light transition-colors duration-300",
                isHovered ? "text-brand" : "text-muted-foreground/30"
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Center: Title and info */}
          <div className="flex-1 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 
                  className={cn(
                    "text-lg md:text-xl font-medium transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-foreground/80"
                  )}
                >
                  {project.title}
                </h3>
                
                {/* Subtitle - English name if exists */}
                {project.keywords[0] && (
                  <p className="text-sm text-muted-foreground/50 mt-0.5">
                    {project.keywords[0]}
                  </p>
                )}
              </div>
              
              {/* Year badge */}
              <div 
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono",
                  "border transition-all duration-300",
                  isHovered 
                    ? "border-brand/30 text-brand bg-brand/5" 
                    : "border-[rgba(255,255,255,0.1)] text-muted-foreground/50"
                )}
              >
                {project.year}
              </div>
            </div>
            
            {/* Hover reveal: Description and tags */}
            <div 
              className={cn(
                "overflow-hidden transition-all duration-500 ease-out",
                isHovered ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
              )}
            >
              {/* Description */}
              <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4">
                {project.description}
              </p>
              
              {/* Keywords tags */}
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, i) => (
                  <span 
                    key={i}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase",
                      "border border-[rgba(255,255,255,0.1)] rounded-full",
                      "text-muted-foreground/60 bg-[rgba(255,255,255,0.02)]",
                      "transition-colors duration-300",
                      "hover:border-primary/30 hover:text-primary/70"
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              

            </div>
          </div>
          
          {/* Right: Thumbnail image */}
          <div 
            className={cn(
              "w-32 md:w-48 flex-shrink-0 relative overflow-hidden",
              "transition-all duration-500",
              isHovered && "w-40 md:w-56"
            )}
          >
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isHovered && !project.previewVideo && "scale-110",
                  isHovered && project.previewVideo && "opacity-0"
                )}
              />
            )}
            
            {/* Video preview on hover - only load when hovered */}
            {project.previewVideo && isHovered && (
              <video
                ref={videoRef}
                src={project.previewVideo}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Gradient overlay */}
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.8)] via-transparent to-transparent",
                "transition-opacity duration-300",
                isHovered ? "opacity-30" : "opacity-60"
              )}
            />
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-500 ease-out",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
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
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id))
      : projects
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            SELECTED_PROJECTS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* Behavior tracker display */}
        <BehaviorTrackerDisplay section="projects" itemCount={filteredProjects.length} />
        
        {/* Instruction hint */}
        <p className="text-[10px] font-mono text-muted-foreground/30 mb-6 tracking-wider">
          HOVER_TO_VIEW | CLICK_TO_ENTER
        </p>
        
        {/* Projects list */}
        <div className="space-y-3">
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
            <p className="text-muted-foreground/50 font-mono text-sm">
              NO_PROJECTS_IN_SELECTED_RANGE
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

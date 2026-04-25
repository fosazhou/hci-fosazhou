"use client"

import React, { useMemo, useState, useEffect, useRef } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  filterIds?: string[]
}

// Project Card with hover reveal effect
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
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }

  // Long press to preview video
  const handleMouseDown = () => {
    pressTimerRef.current = setTimeout(() => {
      setIsPressed(true)
    }, 300)
  }

  const handleMouseUp = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
    }
    setIsPressed(false)
  }

  useEffect(() => {
    if (videoRef.current) {
      if (isPressed && project.previewVideo) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPressed, project.previewVideo])

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      className="block cursor-pointer group relative"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg",
          "bg-[rgba(10,10,15,0.6)] border border-[rgba(255,255,255,0.05)]",
          "transition-all duration-500 ease-out",
          isHovered && "border-primary/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
        )}
      >
        {/* Image/Video container */}
        <div className="aspect-[16/10] w-full overflow-hidden relative">
          {project.coverImage && (
            <img 
              src={project.coverImage} 
              alt={project.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out",
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
                "w-full h-full object-cover absolute inset-0 transition-opacity duration-300",
                isPressed ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {/* Gradient overlay */}
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              "bg-gradient-to-t from-[rgba(5,5,8,0.95)] via-[rgba(5,5,8,0.4)] to-transparent",
              isHovered ? "opacity-100" : "opacity-60"
            )}
          />
          
          {/* Index badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-mono text-white/40">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Year badge */}
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-mono text-primary/80 px-2 py-0.5 rounded bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
              {project.year}
            </span>
          </div>
          
          {/* Title - always visible at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 
              className={cn(
                "text-xl font-semibold text-white transition-all duration-500",
                isHovered && "text-primary"
              )}
            >
              {project.title}
            </h3>
            
            {/* Subtitle/English title if available */}
            {project.titleEn && (
              <p className="text-xs font-mono text-white/40 mt-1 uppercase tracking-wider">
                {project.titleEn}
              </p>
            )}
          </div>
        </div>
        
        {/* Reveal layer on hover - description and tags */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isHovered ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="p-5 pt-0 space-y-4">
            {/* Description */}
            <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3">
              {project.description}
            </p>
            
            {/* Keywords/Tags */}
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase",
                    "text-primary/70 border border-primary/20 rounded-full",
                    "bg-primary/5"
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            {/* Hint text */}
            <p className="text-[9px] font-mono text-muted-foreground/40 tracking-wider">
              {project.previewVideo ? "HOLD_TO_PREVIEW · CLICK_TO_ENTER" : "CLICK_TO_ENTER"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects({ filterIds }: ProjectsProps) {
  const { 
    isLoaded, 
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
    <section id="projects" className="py-12">
      <div className="mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            SELECTED_PROJECTS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* Instruction hint */}
        <p className="text-[10px] font-mono text-muted-foreground/50 mb-8 tracking-wider">
          悬停查看概要，按住预览过程，点击进入项目详情。
        </p>
        
        {/* Projects grid - 2 columns on desktop */}
        <div className="grid gap-6 md:grid-cols-2">
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

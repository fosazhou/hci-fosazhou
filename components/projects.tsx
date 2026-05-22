"use client"

import React, { useMemo, useState, useRef } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { ArrowRight, Sparkles } from "lucide-react"

interface ProjectsProps {
  filterIds?: string[]
}

// Featured Project Card - Veilspace (larger, more prominent)
function FeaturedProjectCard({ 
  project, 
  onTrack 
}: { 
  project: typeof projects[0]
  onTrack: (tags: string[]) => void
}) {
  const { navigateWithTransition, prefetch } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const [hasPrefetched, setHasPrefetched] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { language } = useLanguage()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasPrefetched) {
      prefetch(`/projects/${project.id}`)
      setHasPrefetched(true)
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-500",
          "border-2 border-[rgba(233,30,99,0.15)]",
          "bg-gradient-to-br from-[rgba(10,10,15,0.8)] to-[rgba(20,20,30,0.6)]",
          isHovered && "border-[rgba(233,30,99,0.4)] shadow-[0_0_60px_rgba(233,30,99,0.12)]"
        )}
      >
        {/* Main content */}
        <div className="flex items-stretch">
          {/* Left: Index number with featured badge */}
          <div 
            className={cn(
              "w-20 md:w-24 flex-shrink-0 flex flex-col items-center justify-center gap-2",
              "border-r border-[rgba(233,30,99,0.15)]",
              "bg-[rgba(233,30,99,0.03)]",
              "transition-colors duration-300",
              isHovered && "bg-[rgba(233,30,99,0.08)]"
            )}
          >
            <Sparkles className={cn(
              "w-4 h-4 transition-colors duration-300",
              isHovered ? "text-brand" : "text-brand/40"
            )} />
            <span 
              className={cn(
                "text-3xl md:text-4xl font-light transition-colors duration-300",
                isHovered ? "text-brand" : "text-brand/50"
              )}
            >
              01
            </span>
          </div>
          
          {/* Center: Title and info */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Featured label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand/70 uppercase">
                    Featured Project
                  </span>
                </div>
                
                {/* Title */}
                <h3 
                  className={cn(
                    "text-2xl md:text-3xl font-medium transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-foreground/90"
                  )}
                >
                  {language === "en" && project.titleEn ? project.titleEn : project.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-sm text-muted-foreground/60 mt-1">
                  {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).slice(0, 2).join(' · ')}
                </p>
              </div>
              
              {/* Year badge */}
              <div 
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-mono",
                  "border transition-all duration-300",
                  isHovered 
                    ? "border-brand/50 text-brand bg-brand/10" 
                    : "border-brand/20 text-brand/60"
                )}
              >
                {project.year}
              </div>
            </div>
            
            {/* Hover reveal content */}
            <div 
              className={cn(
                "overflow-hidden transition-all duration-500 ease-out",
                isHovered ? "max-h-48 opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4 max-w-2xl">
                {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
              </p>
              
              {/* Keywords and action */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).map((keyword, i) => (
                    <span 
                      key={i}
                      className={cn(
                        "px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase",
                        "border border-brand/20 rounded-full",
                        "text-brand/60 bg-brand/5"
                      )}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <div className={cn(
                  "flex items-center gap-2 text-brand text-sm font-medium",
                  "transition-transform duration-300",
                  isHovered ? "translate-x-0" : "translate-x-4 opacity-0"
                )}>
                  <span>{language === "en" ? "View Project" : "查看项目"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Large thumbnail */}
          <div 
            className={cn(
              "w-48 md:w-72 flex-shrink-0 relative overflow-hidden",
              "transition-all duration-500",
              isHovered && "w-56 md:w-80"
            )}
          >
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                loading="eager"
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isHovered && !project.previewVideo && "scale-110",
                  isHovered && project.previewVideo && "opacity-0"
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
                preload="auto"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}
            
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.8)] via-transparent to-transparent",
              "transition-opacity duration-300",
              isHovered ? "opacity-20" : "opacity-50"
            )} />
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand/50 transition-all duration-500 ease-out",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </div>
  )
}

// Compact Project Card for TD and Adaptive (side by side)
function CompactProjectCard({ 
  project, 
  onTrack,
  displayIndex 
}: { 
  project: typeof projects[0]
  onTrack: (tags: string[]) => void
  displayIndex: string
}) {
  const { navigateWithTransition, prefetch } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const [hasPrefetched, setHasPrefetched] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { language } = useLanguage()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasPrefetched) {
      prefetch(`/projects/${project.id}`)
      setHasPrefetched(true)
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      className="group cursor-pointer flex-1"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-500 h-full",
          "border border-[rgba(255,255,255,0.06)]",
          "bg-[rgba(10,10,15,0.4)]",
          isHovered && "border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,15,0.6)]"
        )}
      >
        {/* Thumbnail at top */}
        <div className="relative h-36 md:h-44 overflow-hidden">
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
          
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {/* Index badge */}
          <div className={cn(
            "absolute top-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center",
            "bg-black/60 border transition-all duration-300",
            isHovered ? "border-brand/50 text-brand" : "border-white/10 text-muted-foreground/50"
          )}>
            <span className="text-lg font-light">{displayIndex}</span>
          </div>
          
          {/* Year badge */}
          <div className={cn(
            "absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono",
            "bg-black/60 border transition-all duration-300",
            isHovered ? "border-brand/30 text-brand" : "border-white/10 text-muted-foreground/50"
          )}>
            {project.year}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className={cn(
            "text-base md:text-lg font-medium transition-colors duration-300 mb-1",
            isHovered ? "text-foreground" : "text-foreground/80"
          )}>
            {language === "en" && project.titleEn ? project.titleEn : project.title}
          </h3>
          
          <p className="text-xs text-muted-foreground/50 mb-3">
            {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).slice(0, 2).join(' · ')}
          </p>
          
          {/* Hover reveal description */}
          <div className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          )}>
            <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-3">
              {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
            </p>
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

// Standard Project Card (unchanged from before)
function ProjectCard({ 
  project, 
  onTrack,
  index 
}: { 
  project: typeof projects[0]
  onTrack: (tags: string[]) => void
  index: number
}) {
  const { navigateWithTransition, prefetch } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [hasPrefetched, setHasPrefetched] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { language } = useLanguage()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasPrefetched) {
      prefetch(`/projects/${project.id}`)
      setHasPrefetched(true)
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <div className="flex items-stretch">
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
          
          <div className="flex-1 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 
                  className={cn(
                    "text-lg md:text-xl font-medium transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-foreground/80"
                  )}
                >
                  {language === "en" && project.titleEn ? project.titleEn : project.title}
                </h3>
                
                {(language === "en" ? project.keywordsEn?.[0] : project.keywords[0]) && (
                  <p className="text-sm text-muted-foreground/50 mt-0.5">
                    {language === "en" ? project.keywordsEn?.[0] : project.keywords[0]}
                  </p>
                )}
              </div>
              
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
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-500 ease-out",
                isHovered ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4">
                {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).map((keyword, i) => (
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
            
            {project.previewVideo && (
              <video
                ref={videoRef}
                src={project.previewVideo}
                muted
                loop
                playsInline
                preload="auto"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}
            
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.8)] via-transparent to-transparent",
                "transition-opacity duration-300",
                isHovered ? "opacity-30" : "opacity-60"
              )}
            />
          </div>
        </div>
        
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
    trackClick, 
    sortByPreference,
  } = useUserBehavior()

  // Separate Veilspace (locked at position 01)
  const veilspaceProject = useMemo(() => {
    return projects.find(p => p.id === "veilspace")
  }, [])

  // TD and Adaptive projects (positions 02 and 03)
  const tdProject = useMemo(() => projects.find(p => p.id === "td-music-visualization"), [])
  const adaptiveProject = useMemo(() => projects.find(p => p.id === "adaptive-archive"), [])

  // Other projects (excluding the three main ones) - these participate in adaptive sorting
  const otherProjects = useMemo(() => {
    const excluded = ["veilspace", "td-music-visualization", "adaptive-archive"]
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id) && !excluded.includes(p.id))
      : projects.filter(p => !excluded.includes(p.id))
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  // Check which projects should be shown based on filter
  const showVeilspace = !filterIds || filterIds.includes("veilspace")
  const showTD = !filterIds || filterIds.includes("td-music-visualization")
  const showAdaptive = !filterIds || filterIds.includes("adaptive-archive")

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
        <BehaviorTrackerDisplay section="projects" itemCount={projects.length} />
        
        {/* Instruction hint */}
        <p className="text-[10px] font-mono text-muted-foreground/30 mb-6 tracking-wider">
          HOVER_TO_VIEW | CLICK_TO_ENTER
        </p>
        
        {/* 01. Veilspace - Featured, full width */}
        {showVeilspace && veilspaceProject && (
          <div className="mb-4">
            <FeaturedProjectCard
              project={veilspaceProject}
              onTrack={trackClick}
            />
          </div>
        )}
        
        {/* 02. TD and 03. Adaptive - Side by side */}
        {(showTD || showAdaptive) && (
          <div className="flex gap-4 mb-4">
            {showTD && tdProject && (
              <CompactProjectCard
                project={tdProject}
                onTrack={trackClick}
                displayIndex="02"
              />
            )}
            {showAdaptive && adaptiveProject && (
              <CompactProjectCard
                project={adaptiveProject}
                onTrack={trackClick}
                displayIndex="03"
              />
            )}
          </div>
        )}
        
        {/* Other projects - standard cards, adaptive sorted */}
        {otherProjects.length > 0 && (
          <div className="space-y-3">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onTrack={trackClick}
                index={index + 4} // Start from 04
              />
            ))}
          </div>
        )}
        
        {!showVeilspace && !showTD && !showAdaptive && otherProjects.length === 0 && (
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

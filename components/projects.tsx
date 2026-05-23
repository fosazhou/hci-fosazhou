"use client"

import React, { useMemo, useState, useRef } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  filterIds?: string[]
}

// Featured Project Card - larger, more prominent (for Veilspace)
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
          "border-2 border-[rgba(233,30,99,0.2)]",
          "bg-gradient-to-br from-[rgba(10,10,15,0.6)] to-[rgba(20,15,25,0.4)]",
          isHovered && "border-[rgba(233,30,99,0.4)] shadow-[0_0_40px_rgba(233,30,99,0.1)]"
        )}
      >
        {/* Mobile: Vertical layout with image on top */}
        <div className="md:hidden">
          {/* Top: Cover image */}
          <div className="relative h-48 overflow-hidden">
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                loading="eager"
                className="w-full h-full object-cover"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] via-[rgba(10,10,15,0.3)] to-transparent" />
            
            {/* Featured badge overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-[9px] font-mono text-brand/80 tracking-widest bg-black/50 px-2 py-1 rounded">FEATURED</span>
              <span className="text-xl font-light text-brand/80 bg-black/50 px-2 py-1 rounded">01</span>
            </div>
            
            {/* Year badge */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono border border-brand/30 text-brand bg-black/50">
              {project.year}
            </div>
          </div>
          
          {/* Bottom: Content */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-foreground/90">
              {language === "en" && project.titleEn ? project.titleEn : project.title}
            </h3>
            <p className="text-xs text-muted-foreground/60 mt-1">
              {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).slice(0, 2).join(' · ')}
            </p>
            <p className="text-sm text-muted-foreground/50 leading-relaxed mt-3 line-clamp-3">
              {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
            </p>
          </div>
        </div>
        
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex items-stretch">
          {/* Left: Index with featured indicator */}
          <div 
            className={cn(
              "w-24 flex-shrink-0 flex flex-col items-center justify-center gap-1",
              "border-r border-[rgba(233,30,99,0.15)]",
              "bg-[rgba(233,30,99,0.03)]",
              "transition-colors duration-300",
              isHovered && "bg-[rgba(233,30,99,0.08)]"
            )}
          >
            <span className="text-[9px] font-mono text-brand/50 tracking-widest">FEATURED</span>
            <span 
              className={cn(
                "text-4xl font-light transition-colors duration-300",
                isHovered ? "text-brand" : "text-brand/60"
              )}
            >
              01
            </span>
          </div>
          
          {/* Center: Title and info */}
          <div className="flex-1 p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 
                  className={cn(
                    "text-2xl font-medium transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-foreground/90"
                  )}
                >
                  {language === "en" && project.titleEn ? project.titleEn : project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground/60 mt-1">
                  {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).slice(0, 2).join(' · ')}
                </p>
              </div>
              
              <div 
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-mono",
                  "border transition-all duration-300",
                  isHovered 
                    ? "border-brand/40 text-brand bg-brand/10" 
                    : "border-brand/20 text-brand/70"
                )}
              >
                {project.year}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground/60 leading-relaxed mt-4 max-w-xl">
              {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
            </p>
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-500 ease-out",
                isHovered ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <div className="flex flex-wrap gap-2">
                {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).map((keyword, i) => (
                  <span 
                    key={i}
                    className={cn(
                      "px-3 py-1 text-[10px] font-mono tracking-wider uppercase",
                      "border border-brand/20 rounded-full",
                      "text-brand/70 bg-brand/5"
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Larger thumbnail */}
          <div 
            className={cn(
              "w-64 flex-shrink-0 relative overflow-hidden",
              "transition-all duration-500",
              isHovered && "w-72"
            )}
          >
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                loading="eager"
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isHovered && !project.previewVideo && "scale-105",
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
                "absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.7)] via-transparent to-transparent",
                "transition-opacity duration-300",
                isHovered ? "opacity-20" : "opacity-40"
              )}
            />
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand via-brand/80 to-primary/50 transition-all duration-500 ease-out",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </div>
  )
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
    // 首次 hover 时预取详情页
    if (!hasPrefetched) {
      prefetch(`/projects/${project.id}`)
      setHasPrefetched(true)
    }
    // 播放视频
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    // 暂停视频
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
        {/* Mobile: Vertical layout */}
        <div className="md:hidden">
          {/* Top: Cover image */}
          <div className="relative h-36 overflow-hidden">
            {project.coverImage && (
              <img 
                src={project.coverImage} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] via-transparent to-transparent" />
            
            {/* Index badge */}
            <div className="absolute top-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center bg-black/50 border border-white/10">
              <span className="text-lg font-light text-muted-foreground/60">{String(index + 1).padStart(2, '0')}</span>
            </div>
            
            {/* Year badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono border border-white/10 text-muted-foreground/50 bg-black/50">
              {project.year}
            </div>
          </div>
          
          {/* Bottom: Content */}
          <div className="p-4">
            <h3 className="text-base font-medium text-foreground/80">
              {language === "en" && project.titleEn ? project.titleEn : project.title}
            </h3>
            <p className="text-xs text-muted-foreground/50 mt-1">
              {language === "en" ? project.keywordsEn?.[0] : project.keywords[0]}
            </p>
          </div>
        </div>
        
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex items-stretch">
          {/* Left: Index number */}
          <div 
            className={cn(
              "w-20 flex-shrink-0 flex items-center justify-center",
              "border-r border-[rgba(255,255,255,0.06)]",
              "bg-[rgba(255,255,255,0.02)]",
              "transition-colors duration-300",
              isHovered && "bg-[rgba(233,30,99,0.05)]"
            )}
          >
            <span 
              className={cn(
                "text-3xl font-light transition-colors duration-300",
                isHovered ? "text-brand" : "text-muted-foreground/30"
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Center: Title and info */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 
                  className={cn(
                    "text-xl font-medium transition-colors duration-300",
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
                      "text-muted-foreground/60 bg-[rgba(255,255,255,0.02)]"
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
              "w-48 flex-shrink-0 relative overflow-hidden",
              "transition-all duration-500",
              isHovered && "w-56"
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
    trackClick, 
    sortByPreference,
  } = useUserBehavior()

  // Veilspace is always first, excluded from adaptive sorting
  const veilspaceProject = useMemo(() => {
    return projects.find(p => p.id === "veilspace")
  }, [])

  // Other projects participate in adaptive sorting
  const otherProjects = useMemo(() => {
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id) && p.id !== "veilspace")
      : projects.filter(p => p.id !== "veilspace")
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  // Check if Veilspace should be shown
  const showVeilspace = !filterIds || filterIds.includes("veilspace")

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
        <BehaviorTrackerDisplay section="projects" itemCount={otherProjects.length + (showVeilspace ? 1 : 0)} />
        
        {/* Instruction hint - different for mobile/desktop */}
        <p className="text-[10px] font-mono text-muted-foreground/30 mb-6 tracking-wider">
          <span className="hidden md:inline">HOVER_TO_VIEW | CLICK_TO_ENTER</span>
          <span className="md:hidden">TAP_TO_ENTER</span>
        </p>
        
        {/* Projects list */}
        <div className="space-y-3">
          {/* Veilspace - Featured, always first */}
          {showVeilspace && veilspaceProject && (
            <FeaturedProjectCard
              project={veilspaceProject}
              onTrack={trackClick}
            />
          )}
          
          {/* Other projects - adaptive sorted */}
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTrack={trackClick}
              index={index + 1} // Start from 02 since Veilspace is 01
            />
          ))}
        </div>
        
        {otherProjects.length === 0 && !showVeilspace && (
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

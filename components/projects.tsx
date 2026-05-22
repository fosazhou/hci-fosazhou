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

// Featured Project Card - larger, more prominent display for Veilspace
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
      className="group cursor-pointer mb-8"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured badge */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className={cn(
          "w-3.5 h-3.5 transition-colors duration-300",
          isHovered ? "text-brand" : "text-primary/40"
        )} />
        <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase">
          Featured Project
        </span>
      </div>
      
      <div 
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-500",
          "border-2 border-[rgba(233,30,99,0.15)]",
          "bg-gradient-to-br from-[rgba(10,10,15,0.8)] to-[rgba(20,20,30,0.6)]",
          isHovered && "border-[rgba(233,30,99,0.4)] shadow-[0_0_60px_rgba(233,30,99,0.15)]"
        )}
      >
        {/* Large cover image/video area */}
        <div className="relative aspect-[21/9] overflow-hidden">
          {project.coverImage && (
            <img 
              src={language === "en" && project.coverImageEn ? project.coverImageEn : project.coverImage} 
              alt={project.title}
              loading="eager"
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isHovered && !project.previewVideo && "scale-105",
                isHovered && project.previewVideo && "opacity-0"
              )}
            />
          )}
          
          {/* Video preview */}
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="auto"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.95)] via-[rgba(10,10,15,0.3)] to-transparent" />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between gap-6">
              <div className="flex-1">
                {/* Year and category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300",
                    isHovered 
                      ? "border-brand/50 text-brand bg-brand/10" 
                      : "border-[rgba(255,255,255,0.15)] text-muted-foreground/70"
                  )}>
                    {project.year}
                  </span>
                  <span className="text-xs text-muted-foreground/50 font-mono uppercase tracking-wider">
                    {language === "en" ? "Core Project" : "核心项目"}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={cn(
                  "text-2xl md:text-3xl font-medium mb-2 transition-colors duration-300",
                  isHovered ? "text-foreground" : "text-foreground/90"
                )}>
                  {language === "en" && project.titleEn ? project.titleEn : project.title}
                </h3>
                
                {/* Keywords */}
                <p className="text-sm text-muted-foreground/60 mb-4">
                  {(language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords).slice(0, 3).join(' · ')}
                </p>
                
                {/* Description - visible on hover */}
                <div className={cn(
                  "overflow-hidden transition-all duration-500 ease-out",
                  isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-2xl">
                    {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
                  </p>
                </div>
              </div>
              
              {/* View button */}
              <div className={cn(
                "flex-shrink-0 transition-all duration-300",
                isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              )}>
                <div className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full",
                  "bg-brand/20 border border-brand/40 text-brand",
                  "text-sm font-medium"
                )}>
                  <span>{language === "en" ? "View Project" : "查看项目"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-brand via-primary to-brand/50 transition-all duration-700 ease-out",
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
                  {language === "en" && project.titleEn ? project.titleEn : project.title}
                </h3>
                
                {/* Subtitle - first keyword */}
                {(language === "en" ? project.keywordsEn?.[0] : project.keywords[0]) && (
                  <p className="text-sm text-muted-foreground/50 mt-0.5">
                    {language === "en" ? project.keywordsEn?.[0] : project.keywords[0]}
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
                {language === "en" && project.descriptionEn ? project.descriptionEn : project.description}
              </p>
              
              {/* Keywords tags */}
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
            
            {/* Video preview - always mounted, preloaded, shown on hover */}
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

  // Separate Veilspace as featured project
  const featuredProject = useMemo(() => {
    return projects.find(p => p.id === "veilspace")
  }, [])

  // Filter and sort remaining projects (excluding Veilspace)
  const filteredProjects = useMemo(() => {
    const filtered = filterIds 
      ? projects.filter(p => filterIds.includes(p.id) && p.id !== "veilspace")
      : projects.filter(p => p.id !== "veilspace")
    
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  // Check if Veilspace should be shown (either no filter, or filter includes it)
  const showFeatured = !filterIds || filterIds.includes("veilspace")

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
        <BehaviorTrackerDisplay section="projects" itemCount={filteredProjects.length + (showFeatured ? 1 : 0)} />
        
        {/* Instruction hint */}
        <p className="text-[10px] font-mono text-muted-foreground/30 mb-6 tracking-wider">
          HOVER_TO_VIEW | CLICK_TO_ENTER
        </p>
        
        {/* Featured Project - Veilspace */}
        {showFeatured && featuredProject && (
          <FeaturedProjectCard
            project={featuredProject}
            onTrack={trackClick}
          />
        )}
        
        {/* Other Projects list */}
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
        
        {filteredProjects.length === 0 && !showFeatured && (
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

"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, ExternalLink, Maximize, Minimize } from "lucide-react"
import { projects, getProjectById, type GalleryImage, type Project } from "@/lib/projects-data"
import { useEffect, useState, useRef, useCallback, Suspense } from "react"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { ReadingModeProvider, useReadingMode, type ReadingMode } from "@/contexts/reading-mode-context"
import { ReadingModeSwitcher, StickyReadingModeSwitcher } from "@/components/reading-mode-switcher"
import { ReadingModeSuggestion } from "@/components/reading-mode-suggestion"
import { QuickView } from "@/components/project-content/quick-view"
import { ProcessView } from "@/components/project-content/process-view"
import { ResearchView } from "@/components/project-content/research-view"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import { StatusIndicator } from "@/components/scan-line"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

// Gallery Image Component
function GalleryImageBox({ 
  image, 
  index,
  priority = false,
  className = "",
  onClick
}: { 
  image: GalleryImage
  index: number
  priority?: boolean
  className?: string
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <figure className={cn("group", className)}>
      <div 
        className={cn(
          "overflow-hidden rounded-lg cursor-zoom-in",
          "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
          "transition-all duration-300",
          "hover:border-[rgba(34,211,238,0.3)]"
        )}
        style={{
          boxShadow: isHovered ? "0 0 30px rgba(34, 211, 238, 0.15)" : "none"
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image.src}
          alt={image.caption || `Image ${index + 1}`}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground font-mono">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Default Gallery Layout
function DefaultGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {images.map((image, index) => (
        <GalleryImageBox key={index} image={image} index={index} priority={index === 0} onClick={() => onImageClick(index)} />
      ))}
    </div>
  )
}

// Veilspace Custom Gallery Layout
function VeilspaceGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  
  return (
    <div className="space-y-8">
      {/* Images 01-06: Normal full width */}
      {images.slice(0, 6).map((image, index) => (
        <GalleryImageBox key={index} image={image} index={index} priority={index === 0} onClick={() => onImageClick(index)} />
      ))}
      
      {/* Image 07: Half width, centered */}
      {images[6] && (
        <div className="flex justify-center">
          <div className="w-1/2">
            <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />
          </div>
        </div>
      )}
      
      {/* Images 08-09: Side by side, centered, items-start for top alignment */}
      {images[7] && images[8] && (
        <div className="flex justify-center gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[8]} index={8} onClick={() => onImageClick(8)} />
          </div>
        </div>
      )}
      
      {/* Images 10-11: Side by side, centered, items-start for top alignment */}
      {images[9] && images[10] && (
        <div className="flex justify-center gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[9]} index={9} onClick={() => onImageClick(9)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[10]} index={10} onClick={() => onImageClick(10)} />
          </div>
        </div>
      )}
      
      {/* Image 12: Normal full width */}
      {images[11] && (
        <GalleryImageBox image={images[11]} index={11} onClick={() => onImageClick(11)} />
      )}
    </div>
  )
}

// Portfolio Custom Gallery Layout
function PortfolioGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  
  return (
    <div className="space-y-8">
      {/* Images 01-06: Normal full width */}
      {images.slice(0, 6).map((image, index) => (
        <GalleryImageBox key={index} image={image} index={index} priority={index === 0} onClick={() => onImageClick(index)} />
      ))}
      
      {/* Images 07-08: Side by side, centered, items-start for top alignment */}
      {images[6] && images[7] && (
        <div className="flex justify-center items-start gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />
          </div>
        </div>
      )}
    </div>
  )
}

// Video Component with auto aspect ratio, audio fade out, and fullscreen support
function VideoPlayer({ 
  videoSrc, 
  aspectRatio = "auto"  // "auto" will detect from video, or specify like "16/9"
}: { 
  videoSrc: string
  aspectRatio?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [detectedRatio, setDetectedRatio] = useState("16/9")
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Detect video aspect ratio when metadata loads
  useEffect(() => {
    const video = videoRef.current
    if (!video || aspectRatio !== "auto") return
    
    const handleMetadata = () => {
      const { videoWidth, videoHeight } = video
      if (videoWidth && videoHeight) {
        setDetectedRatio(`${videoWidth}/${videoHeight}`)
      }
    }
    
    video.addEventListener('loadedmetadata', handleMetadata)
    // If already loaded
    if (video.readyState >= 1) {
      handleMetadata()
    }
    
    return () => video.removeEventListener('loadedmetadata', handleMetadata)
  }, [aspectRatio])
  
  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])
  
  // Intersection Observer to pause and fade out audio when leaving viewport
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying && !isFullscreen) {
            // Fade out audio over 500ms
            const fadeOut = () => {
              if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current)
              }
              
              let currentVolume = video.volume
              fadeIntervalRef.current = setInterval(() => {
                currentVolume -= 0.1
                if (currentVolume <= 0) {
                  video.volume = 0
                  video.pause()
                  setIsPlaying(false)
                  if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current)
                  }
                  // Reset volume for next play
                  video.volume = 1
                } else {
                  video.volume = currentVolume
                }
              }, 50)
            }
            
            fadeOut()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(container)
    
    return () => {
      observer.disconnect()
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [isPlaying, isFullscreen])
  
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.volume = 1
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])
  
  const toggleFullscreen = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    const container = containerRef.current
    if (!container) return
    
    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }, [])
  
  const finalAspectRatio = aspectRatio === "auto" ? detectedRatio : aspectRatio
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden rounded-lg relative cursor-pointer group",
        "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
        isFullscreen && "rounded-none"
      )}
      style={{ aspectRatio: isFullscreen ? undefined : finalAspectRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        preload="metadata"
        className={cn(
          "w-full h-full object-cover",
          isFullscreen && "object-contain"
        )}
      />
      {/* Play/Pause overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
        isPlaying ? "opacity-0 hover:opacity-100 bg-black/20" : "opacity-100 bg-black/40"
      )}>
        <div 
          className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
          style={{ boxShadow: "0 0 20px var(--primary-glow)" }}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </div>
      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className={cn(
          "absolute bottom-4 right-4 p-2 rounded-lg",
          "bg-black/60 border border-primary/30 text-primary",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "hover:bg-black/80 hover:border-primary/50",
          "z-10"
        )}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5" />
        ) : (
          <Maximize className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}

// Project Hero Content Component with language support
function ProjectHeroContent({ project }: { project: Project }) {
  const { language, t } = useLanguage()
  
  // Get localized content
  const keywords = language === "en" && project.keywordsEn ? project.keywordsEn : project.keywords
  const title = language === "en" && project.titleEn ? project.titleEn : project.title
  const location = language === "en" && project.locationEn ? project.locationEn : project.location
  const role = language === "en" && project.roleEn ? project.roleEn : project.role
  
  return (
    <div className="mx-auto max-w-4xl">
      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-6">
        {keywords.map((keyword, i) => (
          <span 
            key={i}
            className="px-3 py-1 text-[10px] font-mono text-primary/80 border border-primary/30 rounded-full bg-primary/5 uppercase tracking-wider"
          >
            {keyword}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
        {title}
      </h1>
      
      {/* Meta info */}
      <div className="flex flex-wrap gap-8 text-sm font-mono">
        <div>
          <span className="text-muted-foreground/60 mr-2">YEAR/</span>
          <span className="text-foreground">{project.year}</span>
        </div>
        <div>
          <span className="text-muted-foreground/60 mr-2">LOCATION/</span>
          <span className="text-foreground">{location}</span>
        </div>
        <div>
          <span className="text-muted-foreground/60 mr-2">ROLE/</span>
          <span className="text-foreground">{role}</span>
        </div>
      </div>
    </div>
  )
}

// Project Content Component
function ProjectContent() {
  const params = useParams()
  const id = params.id as string
  const project = getProjectById(id)
  const { mode, isTransitioning } = useReadingMode()
  const { language } = useLanguage()
  
  // Behavior tracking
  useBehaviorTracking()
  
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  // Get localized gallery images
  const galleryImages = language === "en" && project?.galleryImagesEn 
    ? project.galleryImagesEn 
    : project?.galleryImages || []
  
  // Get localized cover image
  const coverImage = language === "en" && project?.coverImageEn 
    ? project.coverImageEn 
    : project?.coverImage
  
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight
        setHeaderVisible(window.scrollY > heroHeight * 0.8)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    )
  }
  
  const parallaxOffset = scrollY * 0.4
  const heroOpacity = Math.max(0, 1 - (scrollY / 700) ** 1.2)
  const heroScale = 1 + Math.min(scrollY * 0.0002, 0.15)
  
  return (
    <main className="min-h-screen">
      {/* Lightbox */}
      <ImageLightbox 
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* Auto-suggestion toast */}
      <ReadingModeSuggestion />
      
      {/* Fixed Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "glass-strong border-b border-[rgba(34,211,238,0.1)]",
          "transition-all duration-500",
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-mono">BACK</span>
          </Link>
          
          <Logo size="sm" />
          
          {/* Language Switcher & CV Entry in header */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/cv"
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded",
                "border border-primary/20 bg-primary/5",
                "text-primary hover:bg-primary/10 transition-colors"
              )}
            >
              <span className="text-[10px] font-mono tracking-wider">CV</span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section - shorter on mobile */}
      <div ref={heroRef} className="relative h-[60vh] md:h-screen overflow-hidden">
        <div 
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
          }}
        >
          {project.coverImage ? (
            <img 
              src={coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        {/* Back button on hero */}
        <Link
          href="/#projects"
          className={cn(
            "absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-2",
            "text-foreground/70 hover:text-primary transition-all duration-300",
            headerVisible && "opacity-0"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-mono hidden md:inline">BACK_TO_PROJECTS</span>
        </Link>
        
        {/* Logo on hero */}
        <div className={cn(
          "absolute top-6 right-6 md:top-8 md:right-8 z-20 transition-all duration-300",
          headerVisible && "opacity-0"
        )}>
          <Logo size="md" linkToHome={false} />
        </div>
        
	// Hero content
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
          <ProjectHeroContent project={project} />
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary/60 animate-bounce"
          style={{ opacity: heroOpacity }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Content Area */}
      <article className="relative py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Mode Switcher - Sticky on scroll */}
          <StickyReadingModeSwitcher className="mb-12" />
          
          {/* Mode-specific content with transition */}
          <div className={cn(
            "transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            {mode === "quick" && <QuickView project={project} onImageClick={openLightbox} />}
            {mode === "process" && (
              <ProcessView 
                project={project} 
                galleryComponent={
                  <>
                    {/* Video before gallery */}
                    {project.video && (
                      <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_DEMO
                          </span>
                        </div>
                        <div className="max-w-[50%] mx-auto">
                          <VideoPlayer videoSrc={project.video} aspectRatio="auto" />
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery */}
                    {galleryImages && galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {project.id === "veilspace" ? (
                          <VeilspaceGallery images={galleryImages} onImageClick={openLightbox} />
                        ) : project.id === "portfolio-website" ? (
                          <PortfolioGallery images={galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={galleryImages} onImageClick={openLightbox} />
                        )}
                      </>
                    )}
                  </>
                }
              />
            )}
            {mode === "research" && (
              <ResearchView 
                project={project} 
                galleryComponent={
                  <>
                    {/* Video before gallery */}
                    {project.video && (
                      <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_DEMO
                          </span>
                        </div>
                        <div className="max-w-[50%] mx-auto">
                          <VideoPlayer videoSrc={project.video} aspectRatio="auto" />
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery */}
                    {galleryImages && galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {project.id === "veilspace" ? (
                          <VeilspaceGallery images={galleryImages} onImageClick={openLightbox} />
                        ) : project.id === "portfolio-website" ? (
                          <PortfolioGallery images={galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={galleryImages} onImageClick={openLightbox} />
                        )}
                      </>
                    )}
                  </>
                }
              />
            )}
          </div>
          

          

        </div>
      </article>
      
      {/* Footer */}
      <footer className="relative border-t border-[rgba(34,211,238,0.1)] py-12 px-6 lg:px-8">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <Link 
            href="/#projects" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            VIEW_ALL_PROJECTS
          </Link>
          
          <div className="flex items-center gap-3">
            <StatusIndicator status="active" />
            <p className="text-[10px] font-mono text-muted-foreground">
              FOSA_PORTFOLIO_V2.0
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Main Page Component with Provider
function ProjectPageContent() {
  return (
    <ReadingModeProvider>
      <ProjectContent />
    </ReadingModeProvider>
  )
}

export default function ProjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">LOADING...</span>
        </div>
      </div>
    }>
      <ProjectPageContent />
    </Suspense>
  )
}

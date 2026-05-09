"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { projects, getProjectById, type GalleryImage } from "@/lib/projects-data"
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

// Simple Video Player
function VideoPlayer({ 
  videoSrc, 
  aspectRatio = "16/9"
}: { 
  videoSrc: string
  aspectRatio?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  return (
    <div 
      className={cn(
        "w-full overflow-hidden rounded-lg relative cursor-pointer",
        "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]"
      )}
      style={{ aspectRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        muted
        preload="none"
        className="w-full h-full object-cover"
      />
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        isPlaying ? "opacity-0" : "opacity-100 bg-black/40"
      )}>
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
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
  
  // Behavior tracking
  useBehaviorTracking()
  
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
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
        images={project.galleryImages || []}
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
          
          {/* CV Entry in header */}
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
      </header>
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
          }}
        >
          {project.coverImage ? (
            <img 
              src={project.coverImage}
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
            "absolute top-8 left-8 z-20 flex items-center gap-2",
            "text-foreground/70 hover:text-primary transition-all duration-300",
            headerVisible && "opacity-0"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-mono">BACK_TO_PROJECTS</span>
        </Link>
        
        {/* Logo on hero */}
        <div className={cn(
          "absolute top-8 right-8 z-20 transition-all duration-300",
          headerVisible && "opacity-0"
        )}>
          <Logo size="md" linkToHome={false} />
        </div>
        
        {/* Hero content */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-4xl">
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.keywords.map((keyword, i) => (
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
              {project.title}
            </h1>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 text-sm font-mono">
              <div>
                <span className="text-muted-foreground/60 mr-2">YEAR/</span>
                <span className="text-foreground">{project.year}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">LOCATION/</span>
                <span className="text-foreground">{project.location}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">ROLE/</span>
                <span className="text-foreground">{project.role}</span>
              </div>
            </div>
          </div>
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
                    {project.galleryImages && project.galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {project.id === "veilspace" ? (
                          <VeilspaceGallery images={project.galleryImages} onImageClick={openLightbox} />
                        ) : project.id === "portfolio-website" ? (
                          <PortfolioGallery images={project.galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={project.galleryImages} onImageClick={openLightbox} />
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
                    {project.galleryImages && project.galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {project.id === "veilspace" ? (
                          <VeilspaceGallery images={project.galleryImages} onImageClick={openLightbox} />
                        ) : project.id === "portfolio-website" ? (
                          <PortfolioGallery images={project.galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={project.galleryImages} onImageClick={openLightbox} />
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

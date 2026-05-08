"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { otherWorks, type GalleryImage, type OtherWork } from "@/lib/other-works-data"
import { useEffect, useState, useRef, useCallback, Suspense } from "react"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { ReadingModeProvider, useReadingMode } from "@/contexts/reading-mode-context"
import { ReadingModeSwitcher } from "@/components/reading-mode-switcher"
import { ReadingModeSuggestion } from "@/components/reading-mode-suggestion"
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
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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

// Nestide Custom Gallery: 01, 02+05, 03+04, 06
function NestideGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {/* Image 01: Full width */}
      {images[0] && (
        <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
      )}
      
      {/* Images 02+05: Side by side */}
      {images[1] && images[4] && (
        <div className="flex justify-center items-start gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />
          </div>
        </div>
      )}
      
      {/* Images 03+04: Side by side */}
      {images[2] && images[3] && (
        <div className="flex justify-center items-start gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />
          </div>
        </div>
      )}
      
      {/* Image 06: Full width */}
      {images[5] && (
        <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />
      )}
    </div>
  )
}

// Xicang Custom Gallery: 01, 02+04, 03, 05-12
function XicangGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {/* Image 01: Full width */}
      {images[0] && (
        <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
      )}
      
      {/* Images 02+04: Side by side */}
      {images[1] && images[3] && (
        <div className="flex justify-center items-start gap-6">
          <div className="w-[40%]">
            <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />
          </div>
          <div className="w-[40%]">
            <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />
          </div>
        </div>
      )}
      
      {/* Image 03: Full width */}
      {images[2] && (
        <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />
      )}
      
      {/* Images 05-12: Full width */}
      {images.slice(4).map((image, i) => (
        <GalleryImageBox key={i + 4} image={image} index={i + 4} onClick={() => onImageClick(i + 4)} />
      ))}
    </div>
  )
}

// AIGC Custom Gallery: 01+02+03 side by side
function AigcGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {/* Images 01+02+03: Three in a row */}
      {images[0] && images[1] && images[2] && (
        <div className="flex justify-center items-start gap-4">
          <div className="w-[30%]">
            <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
          </div>
          <div className="w-[30%]">
            <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />
          </div>
          <div className="w-[30%]">
            <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />
          </div>
        </div>
      )}
      
      {/* Remaining images: Full width */}
      {images.slice(3).map((image, i) => (
        <GalleryImageBox key={i + 3} image={image} index={i + 3} onClick={() => onImageClick(i + 3)} />
      ))}
    </div>
  )
}

// Video Component with auto aspect ratio and audio fade out
function VideoPlayer({ 
  videoSrc, 
  aspectRatio = "auto"
}: { 
  videoSrc: string
  aspectRatio?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [detectedRatio, setDetectedRatio] = useState("16/9")
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
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
    if (video.readyState >= 1) handleMetadata()
    
    return () => video.removeEventListener('loadedmetadata', handleMetadata)
  }, [aspectRatio])
  
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            let currentVolume = video.volume
            fadeIntervalRef.current = setInterval(() => {
              currentVolume -= 0.1
              if (currentVolume <= 0) {
                video.volume = 0
                video.pause()
                setIsPlaying(false)
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
                video.volume = 1
              } else {
                video.volume = currentVolume
              }
            }, 50)
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(container)
    return () => {
      observer.disconnect()
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [isPlaying])
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.volume = 1
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const finalAspectRatio = aspectRatio === "auto" ? detectedRatio : aspectRatio
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden rounded-lg relative cursor-pointer",
        "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]"
      )}
      style={{ aspectRatio: finalAspectRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        className="w-full h-full object-cover"
      />
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
    </div>
  )
}

// First image component for QuickView
function FirstImageBox({ 
  image, 
  onClick 
}: { 
  image: GalleryImage
  onClick?: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <figure className="group">
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
          alt={image.caption || "Project image"}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="eager"
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

// Quick View Component
function QuickView({ work, onImageClick }: { work: OtherWork, onImageClick?: (index: number) => void }) {
  const { setMode } = useReadingMode()
  const firstImage = work.galleryImages?.[0]
  const hasVideo = !!(work.video || work.demoVideo)
  const videoSrc = work.video || work.demoVideo || ''
  // td-music-visualization shows video in quick view
  const showVideoInQuick = work.id === "td-music-visualization"
  
  if (!work.quickContent) {
    return (
      <div className="space-y-8">
        {/* Video Preview for td */}
        {showVideoInQuick && hasVideo && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                PROJECT_DEMO
              </span>
            </div>
            <div className="max-w-[50%] mx-auto">
              <VideoPlayer videoSrc={videoSrc} aspectRatio="auto" />
            </div>
          </div>
        )}
        
        {/* First Image Preview (only if no video) */}
        {firstImage && !showVideoInQuick && !hasVideo && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">PREVIEW/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                PROJECT_IMAGE
              </span>
            </div>
            <FirstImageBox image={firstImage} onClick={() => onImageClick?.(0)} />
          </div>
        )}
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {work.fullDescription}
        </p>
        <div className="space-y-4">
          {work.details.map((detail, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-primary/40 font-mono text-sm">0{i + 1}</span>
              <span className="text-muted-foreground">{detail}</span>
            </div>
          ))}
        </div>
        
        {/* Read time indicator */}
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-[rgba(34,211,238,0.08)]">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-muted-foreground/70 tracking-wider">
            ~1 MIN READ COMPLETE
          </span>
        </div>
        
        {/* Mode Entry Buttons */}
        <div className="pt-6 space-y-3">
          <p className="text-[10px] font-mono text-muted-foreground/60 text-center tracking-wider uppercase mb-4">
            EXPLORE_MORE
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setMode("process")
                setTimeout(() => {
                  const densitySection = document.getElementById('reading-density-section')
                  if (densitySection) densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
                <span className="text-[10px] font-mono text-primary/60">PROCESS</span>
                <span className="text-xs text-muted-foreground">~5 min</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-primary/40 group-hover:text-primary rotate-180 group-hover:translate-x-1 transition-all" />
            </button>
            
            <button
              onClick={() => {
                setMode("research")
                setTimeout(() => {
                  const densitySection = document.getElementById('reading-density-section')
                  if (densitySection) densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
                <span className="text-[10px] font-mono text-secondary/60">RESEARCH</span>
                <span className="text-xs text-muted-foreground">~10 min</span>
              </div>
              <ArrowLeft className="w-4 h-4 text-secondary/40 group-hover:text-secondary rotate-180 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Video Preview for td */}
      {showVideoInQuick && hasVideo && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
            <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
              PROJECT_DEMO
            </span>
          </div>
          <div className="max-w-[50%] mx-auto">
            <VideoPlayer videoSrc={videoSrc} aspectRatio="auto" />
          </div>
        </div>
      )}
      
      {/* First Image Preview (only if no video) */}
      {firstImage && !showVideoInQuick && !hasVideo && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-primary/60 tracking-widest">PREVIEW/</span>
            <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
              PROJECT_IMAGE
            </span>
          </div>
          <FirstImageBox image={firstImage} onClick={() => onImageClick?.(0)} />
        </div>
      )}
      
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">OVERVIEW/</span>
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            PROJECT_SUMMARY
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
          {work.quickContent.headline}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">KEY_POINTS</h3>
          <ul className="space-y-3">
            {work.quickContent.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-primary/40 font-mono text-sm">0{i + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">OUTCOME</h3>
          <p className="text-muted-foreground leading-relaxed">
            {work.quickContent.outcome}
          </p>
          {work.awards && (
            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-xs font-mono text-primary/60">AWARD: </span>
              <span className="text-foreground">{work.awards}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Read time indicator */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t border-[rgba(34,211,238,0.08)]">
        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-mono text-muted-foreground/70 tracking-wider">
          ~1 MIN READ COMPLETE
        </span>
      </div>
      
      {/* Mode Entry Buttons */}
      <div className="pt-6 space-y-3">
        <p className="text-[10px] font-mono text-muted-foreground/60 text-center tracking-wider uppercase mb-4">
          EXPLORE_MORE
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setMode("process")
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
              <span className="text-[10px] font-mono text-primary/60">PROCESS</span>
              <span className="text-xs text-muted-foreground">~5 min</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-primary/40 group-hover:text-primary rotate-180 group-hover:translate-x-1 transition-all" />
          </button>
          
          <button
            onClick={() => {
              setMode("research")
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
              <span className="text-[10px] font-mono text-secondary/60">RESEARCH</span>
              <span className="text-xs text-muted-foreground">~10 min</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-secondary/40 group-hover:text-secondary rotate-180 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Process View Component
function ProcessView({ work, galleryComponent }: { work: OtherWork, galleryComponent?: React.ReactNode }) {
  if (!work.processContent) {
    return <QuickView work={work} />
  }

  return (
    <div className="space-y-16">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">PROCESS/</span>
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            DESIGN_PHASES
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {work.processContent.phases.map((phase, i) => (
            <div key={i} className="p-6 rounded-lg bg-[rgba(10,10,15,0.4)] border border-[rgba(34,211,238,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary/40 font-mono text-sm">0{i + 1}</span>
                <h3 className="text-foreground font-medium">{phase.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">METHODOLOGY</h3>
        <p className="text-muted-foreground leading-relaxed">{work.processContent.methodology}</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">KEY_DECISIONS</h3>
        <ul className="space-y-3">
          {work.processContent.decisions.map((decision, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-primary">-</span>
              <span>{decision}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Gallery */}
      {galleryComponent && (
        <div className="mt-16">
          {galleryComponent}
        </div>
      )}
      
      {/* Read time indicator - after gallery */}
      <div className="flex items-center justify-center gap-2 pt-8 mt-8 border-t border-[rgba(34,211,238,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
          ~5 MIN READ COMPLETE
        </span>
      </div>
    </div>
  )
}

// Research View Component
function ResearchView({ work, galleryComponent }: { work: OtherWork, galleryComponent?: React.ReactNode }) {
  if (!work.researchContent) {
    return <QuickView work={work} />
  }

  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">RESEARCH/</span>
          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
            PROBLEM_STATEMENT
          </span>
        </div>
        <p className="text-xl text-foreground leading-relaxed">{work.researchContent.problemStatement}</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">CONTEXT</h3>
        <p className="text-muted-foreground leading-relaxed">{work.researchContent.context}</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">HYPOTHESIS</h3>
        <p className="text-muted-foreground leading-relaxed italic">{work.researchContent.hypothesis}</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">DESIGN_LOGIC</h3>
        <ul className="space-y-3">
          {work.researchContent.logic.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-primary/40 font-mono text-sm">0{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">STRATEGIES</h3>
          <ul className="space-y-2">
            {work.researchContent.strategies.map((strategy, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary">-</span>
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">FINDINGS</h3>
          <p className="text-muted-foreground leading-relaxed">{work.researchContent.findings}</p>
        </div>
      </div>

      <div className="space-y-4 p-6 rounded-lg bg-[rgba(10,10,15,0.4)] border border-[rgba(34,211,238,0.1)]">
        <h3 className="text-xs font-mono text-primary/60 uppercase tracking-wider">REFLECTION</h3>
        <p className="text-muted-foreground leading-relaxed">{work.researchContent.reflection}</p>
      </div>
      
      {/* Gallery */}
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
    </div>
  )
}

// Work Content Component
function WorkContent() {
  const params = useParams()
  const id = params.id as string
  const work = otherWorks.find((w) => w.id === id)
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
  
  if (!work) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Work Not Found</h1>
          <Link href="/#other-works" className="text-primary hover:underline">
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
        images={work.galleryImages || []}
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
            href="/#other-works"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-mono">BACK</span>
          </Link>
          
          <Logo size="sm" />
          
          {/* Compact mode switcher in header */}
          <ReadingModeSwitcher compact />
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
          {work.coverImage ? (
            <img 
              src={work.coverImage}
              alt={work.title}
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
          href="/#other-works"
          className={cn(
            "absolute top-8 left-8 z-20 flex items-center gap-2",
            "text-foreground/70 hover:text-primary transition-all duration-300",
            headerVisible && "opacity-0"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-mono">BACK_TO_WORKS</span>
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
              {work.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-[10px] font-mono text-primary/80 border border-primary/30 rounded-full bg-primary/5 uppercase tracking-wider"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
              {work.title}
            </h1>
            
            {/* Chinese title */}
            <p className="text-xl text-foreground/70 mb-6">{work.titleCn}</p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 text-sm font-mono">
              <div>
                <span className="text-muted-foreground/60 mr-2">YEAR/</span>
                <span className="text-foreground">{work.year}</span>
              </div>
              {work.location && (
                <div>
                  <span className="text-muted-foreground/60 mr-2">LOCATION/</span>
                  <span className="text-foreground">{work.location}</span>
                </div>
              )}
              {work.role && (
                <div>
                  <span className="text-muted-foreground/60 mr-2">ROLE/</span>
                  <span className="text-foreground">{work.role}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground/60 mr-2">CATEGORY/</span>
                <span className="text-foreground">{work.category}</span>
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
          {/* Mode Switcher */}
          <div className="mb-12">
            <ReadingModeSwitcher />
          </div>
          
          {/* Mode-specific content with transition */}
          <div className={cn(
            "transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            {mode === "quick" && <QuickView work={work} onImageClick={openLightbox} />}
            {mode === "process" && (
              <ProcessView 
                work={work} 
                galleryComponent={
                  <>
                    {/* Video before gallery */}
                    {(work.video || work.demoVideo) && (
                      <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_DEMO
                          </span>
                        </div>
                        <div className="max-w-[50%] mx-auto">
                          <VideoPlayer videoSrc={work.video || work.demoVideo || ''} aspectRatio="auto" />
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery */}
                    {work.galleryImages && work.galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {work.id === "nestide" ? (
                          <NestideGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : work.id === "integrates-hans-hui-nationality" ? (
                          <XicangGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : work.id === "zhihui-jiangxia" ? (
                          <AigcGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={work.galleryImages} onImageClick={openLightbox} />
                        )}
                      </>
                    )}
                  </>
                }
              />
            )}
            {mode === "research" && (
              <ResearchView 
                work={work} 
                galleryComponent={
                  <>
                    {/* Video before gallery */}
                    {(work.video || work.demoVideo) && (
                      <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_DEMO
                          </span>
                        </div>
                        <div className="max-w-[50%] mx-auto">
                          <VideoPlayer videoSrc={work.video || work.demoVideo || ''} aspectRatio="auto" />
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery */}
                    {work.galleryImages && work.galleryImages.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                          <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
                          <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                            PROJECT_IMAGES
                          </span>
                          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
                        </div>
                        {work.id === "nestide" ? (
                          <NestideGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : work.id === "integrates-hans-hui-nationality" ? (
                          <XicangGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : work.id === "zhihui-jiangxia" ? (
                          <AigcGallery images={work.galleryImages} onImageClick={openLightbox} />
                        ) : (
                          <DefaultGallery images={work.galleryImages} onImageClick={openLightbox} />
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
            href="/#other-works" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            VIEW_ALL_WORKS
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
function WorkPageContent() {
  return (
    <ReadingModeProvider>
      <WorkContent />
    </ReadingModeProvider>
  )
}

export default function WorkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">LOADING...</span>
        </div>
      </div>
    }>
      <WorkPageContent />
    </Suspense>
  )
}

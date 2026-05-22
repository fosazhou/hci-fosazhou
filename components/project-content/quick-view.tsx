"use client"

import { cn } from "@/lib/utils"
import type { Project, GalleryImage } from "@/lib/projects-data"
import { Zap, Check, Target, ArrowRight, Workflow, Search } from "lucide-react"
import { useReadingMode } from "@/contexts/reading-mode-context"
import { useLanguage } from "@/contexts/language-context"
import { useState, useRef, useEffect } from "react"

interface QuickViewProps {
  project: Project
  className?: string
  onImageClick?: (index: number) => void
}

// Video Player for Quick View
function QuickVideoPlayer({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [detectedRatio, setDetectedRatio] = useState("16/9")
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    const handleMetadata = () => {
      const { videoWidth, videoHeight } = video
      if (videoWidth && videoHeight) {
        setDetectedRatio(`${videoWidth}/${videoHeight}`)
      }
    }
    
    video.addEventListener('loadedmetadata', handleMetadata)
    if (video.readyState >= 1) handleMetadata()
    
    return () => video.removeEventListener('loadedmetadata', handleMetadata)
  }, [])
  
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
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden rounded-lg relative cursor-pointer mx-auto",
        "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
        "max-w-[50%]"
      )}
      style={{ aspectRatio: detectedRatio }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        preload="metadata"
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

// First image component
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
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
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

export function QuickView({ project, className, onImageClick }: QuickViewProps) {
  const { language } = useLanguage()
  const content = language === "en" && project.quickContentEn ? project.quickContentEn : project.quickContent
  const { setMode } = useReadingMode()
  const firstImage = project.galleryImages?.[0]

  if (!content) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground font-mono text-sm">
          Quick view content not available
        </p>
      </div>
    )
  }

  // veilspace and td show video in quick view
  const hasVideo = !!project.video
  const showVideoInQuick = project.id === "veilspace" || project.id === "td-music-visualization"
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Video Preview for veilspace */}
      {showVideoInQuick && hasVideo && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-primary/60 tracking-widest">VIDEO/</span>
            <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
              PROJECT_DEMO
            </span>
          </div>
          <QuickVideoPlayer videoSrc={project.video!} />
        </div>
      )}
      
      {/* First Image Preview (only for projects without video) */}
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
      
      {/* Headline */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Zap className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            CORE_CONCEPT
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-normal text-foreground leading-relaxed">
          {content.headline}
        </h2>
      </div>

      {/* Key Points */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            KEY_POINTS
          </span>
        </div>
        
        <div className="grid gap-2">
          {content.keyPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-3 rounded-md",
                "bg-[rgba(10,10,15,0.5)] border border-[rgba(34,211,238,0.08)]",
                "transition-all duration-300",
                "hover:border-[rgba(34,211,238,0.2)] hover:bg-[rgba(10,10,15,0.7)]"
              )}
            >
              <span className="text-[9px] font-mono text-primary/50 mt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-foreground/85 text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
            <Target className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[9px] font-mono text-primary/60 tracking-widest uppercase">
            OUTCOME
          </span>
        </div>
        
        <div 
          className={cn(
            "p-4 rounded-md",
            "bg-primary/5 border border-primary/15"
          )}
          style={{
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.08)"
          }}
        >
          <p className="text-foreground/90 text-sm leading-relaxed">
            {content.outcome}
          </p>
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
          {/* Process Entry */}
          <button
            onClick={() => {
              setMode("process")
              // Scroll to READING_DENSITY section after mode change
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) {
                  densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
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
              <div className="p-2 rounded bg-primary/10 border border-primary/20">
                <Workflow className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-primary/60 block">PROCESS</span>
                <span className="text-xs text-muted-foreground">~5 min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
          
          {/* Research Entry */}
          <button
            onClick={() => {
              setMode("research")
              // Scroll to READING_DENSITY section after mode change
              setTimeout(() => {
                const densitySection = document.getElementById('reading-density-section')
                if (densitySection) {
                  densitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
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
              <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
                <Search className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-secondary/60 block">RESEARCH</span>
                <span className="text-xs text-muted-foreground">~10 min read</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-secondary/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}

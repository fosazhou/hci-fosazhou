"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { otherWorks, type OtherWork } from "@/lib/other-works-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { GlowCard } from "@/components/glow-card"
import { StatusIndicator, HoverScan } from "@/components/scan-line"
import { cn } from "@/lib/utils"
import { ExternalLink, Play } from "lucide-react"

function WorkMedia({ 
  coverImage, 
  previewVideo, 
  alt, 
  isHovered 
}: { 
  coverImage?: string
  previewVideo?: string
  alt: string
  isHovered: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && previewVideo) {
      if (isHovered) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered, previewVideo])

  return (
    <>
      {coverImage && (
        <img 
          src={coverImage} 
          alt={alt} 
          className={cn(
            "w-full h-full object-cover absolute inset-0 transition-all duration-500",
            isHovered && previewVideo ? 'opacity-0' : 'opacity-100',
            isHovered && "scale-105"
          )}
        />
      )}
      {previewVideo && (
        <video
          ref={videoRef}
          src={previewVideo}
          muted
          loop
          playsInline
          className={cn(
            "w-full h-full object-cover absolute inset-0 transition-opacity duration-300",
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      {!coverImage && !previewVideo && (
        <div className="w-full h-full bg-muted/20" />
      )}
    </>
  )
}

function WorkCard({ 
  work, 
  index,
  onTrack 
}: { 
  work: OtherWork
  index: number
  onTrack: (tags: string[]) => void
}) {
  const { navigateWithTransition } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  
  const isReversed = index % 2 !== 0

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(work.keywords)
    navigateWithTransition(`/works/${work.id}`)
  }

  return (
    <div 
      className="cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowCard hover className="overflow-hidden">
        <div className={cn(
          "flex flex-col md:flex-row",
          isReversed && "md:flex-row-reverse"
        )}>
          {/* Image */}
          <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto md:h-48 bg-[rgba(10,10,15,0.8)] overflow-hidden">
            <WorkMedia 
              coverImage={work.coverImage}
              previewVideo={work.previewVideo}
              alt={work.title}
              isHovered={isHovered}
            />
            <HoverScan active={isHovered} />
            
            {/* Video indicator */}
            {work.previewVideo && (
              <div className="absolute bottom-3 right-3 p-1.5 rounded bg-[rgba(10,10,15,0.8)] border border-primary/20">
                <Play className="h-3 w-3 text-primary/60" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className={cn(
            "flex-1 p-5 flex flex-col justify-center",
            isReversed ? "md:text-right" : "md:text-left"
          )}>
            <span className="text-[10px] font-mono text-primary/40 mb-2">
              {String(index + 1).padStart(2, '0')}/
            </span>
            
            <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2 group-hover:text-primary transition-colors" suppressHydrationWarning>
              {isReversed && <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity md:order-first" />}
              {work.title}
              {!isReversed && <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </h3>
            
            <p className="text-[10px] text-muted-foreground/60 mb-2 font-mono" suppressHydrationWarning>
              {work.titleCn}
            </p>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2" suppressHydrationWarning>
              {work.description}
            </p>
            
            <div className={cn(
              "flex flex-wrap gap-1.5",
              isReversed && "md:justify-end"
            )}>
              {work.keywords.slice(0, 3).map((tag, i) => (
                <span 
                  key={i}
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-mono tracking-wider",
                    "text-primary/70 border border-primary/20 rounded-full",
                    "bg-primary/5 uppercase"
                  )}
                  suppressHydrationWarning
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

export function OtherWorks() {
  const { 
    isLoaded, 
    totalClicks, 
    trackClick, 
    sortByPreference,
    topTag
  } = useUserBehavior()

  const sortedWorks = useMemo(() => {
    if (!isLoaded) return otherWorks
    return sortByPreference(otherWorks)
  }, [isLoaded, sortByPreference])

  const statusText = useMemo(() => {
    if (!isLoaded) return "> INITIALIZING_TRACKING..."
    if (totalClicks === 0) return `> TRACKING_ACTIVE. ${otherWorks.length} ENTRIES INDEXED.`
    return `> INTEREST: [${topTag}]. ADAPTIVE_SORT_ENABLED.`
  }, [isLoaded, totalClicks, topTag])

  return (
    <section id="other-works" className="py-16 border-t border-[rgba(34,211,238,0.1)]">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">03/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            OTHER_WORKS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* System status */}
        <div className={cn(
          "mb-6 font-mono text-[10px]",
          "border border-[rgba(34,211,238,0.15)] bg-[rgba(10,10,15,0.6)]",
          "px-4 py-3 rounded-lg backdrop-blur-sm"
        )}>
          <div className="flex items-center gap-3">
            <StatusIndicator status={isLoaded ? "active" : "processing"} />
            <span className="text-primary/60">[SYS]</span>
            <span className="text-[rgba(34,211,238,0.3)]">|</span>
            <span className="text-muted-foreground/60 uppercase tracking-wider">ARCHIVE</span>
            <span className="text-[rgba(34,211,238,0.3)]">|</span>
            <span className="flex-1 truncate text-muted-foreground">
              {statusText}
            </span>
          </div>
        </div>
        
        {/* Works list */}
        <div className="space-y-6">
          {sortedWorks.slice(0, 6).map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onTrack={trackClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

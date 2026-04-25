"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { otherWorks, type OtherWork } from "@/lib/other-works-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Play } from "lucide-react"

interface OtherWorksProps {
  filterIds?: string[]
}

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
            "w-full h-full object-cover transition-all duration-700",
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
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      {!coverImage && !previewVideo && (
        <div className="w-full h-full bg-muted/5" />
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(work.keywords)
    navigateWithTransition(`/works/${work.id}`)
  }

  return (
    <article 
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "border-b border-[rgba(255,255,255,0.04)]",
          "hover:bg-[rgba(255,255,255,0.02)]"
        )}
      >
        <div className="flex items-center gap-5 py-5">
          {/* Index */}
          <span 
            className={cn(
              "w-6 text-sm font-light tabular-nums transition-colors duration-300",
              isHovered ? "text-primary" : "text-muted-foreground/15"
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          
          {/* Thumbnail */}
          <div 
            className={cn(
              "w-16 h-12 flex-shrink-0 overflow-hidden rounded relative",
              "bg-muted/5 transition-all duration-500",
              isHovered && "w-20"
            )}
          >
            <WorkMedia 
              coverImage={work.coverImage}
              previewVideo={work.previewVideo}
              alt={work.title}
              isHovered={isHovered}
            />
            
            {work.previewVideo && isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-4 h-4 text-white/80" />
              </div>
            )}
          </div>
          
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3">
              <h3 
                className={cn(
                  "text-base font-medium transition-colors duration-300",
                  isHovered ? "text-foreground" : "text-foreground/60"
                )}
              >
                {work.title}
              </h3>
              <span className="text-[10px] text-muted-foreground/25 font-mono hidden sm:inline">
                {work.category}
              </span>
            </div>
            
            {/* Description - revealed on hover */}
            <div 
              className={cn(
                "overflow-hidden transition-all duration-400 ease-out",
                isHovered ? "max-h-16 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <p className="text-sm text-muted-foreground/40 leading-relaxed line-clamp-2">
                {work.description}
              </p>
            </div>
          </div>
          
          {/* Year */}
          <span className="text-xs text-muted-foreground/20 font-mono tabular-nums flex-shrink-0">
            {work.year}
          </span>
          
          {/* Arrow */}
          <ArrowUpRight 
            className={cn(
              "w-4 h-4 flex-shrink-0 transition-all duration-300",
              isHovered 
                ? "text-primary opacity-100" 
                : "text-muted-foreground/20 opacity-0"
            )}
          />
        </div>
        
        {/* Hover accent */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-px bg-primary/30 transition-all duration-500",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </article>
  )
}

export function OtherWorks({ filterIds }: OtherWorksProps) {
  const { 
    isLoaded, 
    trackClick, 
    sortByPreference
  } = useUserBehavior()

  const sortedWorks = useMemo(() => {
    const filtered = filterIds 
      ? otherWorks.filter(w => filterIds.includes(w.id))
      : otherWorks
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  return (
    <section id="other-works" className="py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-muted-foreground/30">04</span>
            <div className="w-8 h-px bg-muted-foreground/10" />
          </div>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            Other Works
          </h2>
        </header>
        
        {/* Behavior tracker */}
        <BehaviorTrackerDisplay section="works" itemCount={sortedWorks.length} />
        
        {/* Works list */}
        <div className="divide-y divide-transparent">
          {sortedWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onTrack={trackClick}
            />
          ))}
        </div>
        
        {sortedWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground/30">
              No works in selected range
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

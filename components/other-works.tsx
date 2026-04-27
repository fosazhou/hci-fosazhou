"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { otherWorks, type OtherWork } from "@/lib/other-works-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"

interface OtherWorksProps {
  filterIds?: string[]
}

// Work Card - same style as Projects
function WorkCard({ 
  work, 
  onTrack,
  index 
}: { 
  work: OtherWork
  onTrack: (tags: string[]) => void
  index: number
}) {
  const { navigateWithTransition } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(work.keywords)
    navigateWithTransition(`/works/${work.id}`)
  }

  // Play video when pressed (holding)
  useEffect(() => {
    if (videoRef.current && work.previewVideo) {
      if (isPressed) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPressed, work.previewVideo])

  return (
    <div
      className="group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
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
              isHovered && "bg-[rgba(156,39,176,0.05)]"
            )}
          >
            <span 
              className={cn(
                "text-2xl md:text-3xl font-light transition-colors duration-300",
                isHovered ? "text-[#9c27b0]" : "text-muted-foreground/30"
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
                  {work.title}
                </h3>
                
                {/* Chinese name */}
                {work.titleCn && (
                  <p className="text-sm text-muted-foreground/50 mt-0.5">
                    {work.titleCn}
                  </p>
                )}
              </div>
              
              {/* Year badge */}
              <div 
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono",
                  "border transition-all duration-300",
                  isHovered 
                    ? "border-[#9c27b0]/30 text-[#9c27b0] bg-[#9c27b0]/5" 
                    : "border-[rgba(255,255,255,0.1)] text-muted-foreground/50"
                )}
              >
                {work.year}
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
                {work.description}
              </p>
              
              {/* Keywords tags */}
              <div className="flex flex-wrap gap-2">
                {work.keywords.map((keyword, i) => (
                  <span 
                    key={i}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase",
                      "border border-[rgba(255,255,255,0.1)] rounded-full",
                      "text-muted-foreground/60 bg-[rgba(255,255,255,0.02)]",
                      "transition-colors duration-300",
                      "hover:border-[#9c27b0]/30 hover:text-[#9c27b0]/70"
                    )}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              
              {/* Press hint */}
              {work.previewVideo && (
                <p className="mt-4 text-[10px] font-mono text-muted-foreground/40 tracking-wider">
                  HOLD_TO_PREVIEW
                </p>
              )}
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
            {work.coverImage && (
              <img 
                src={work.coverImage} 
                alt={work.title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isHovered && "scale-110",
                  isPressed && work.previewVideo && "opacity-0"
                )}
              />
            )}
            
            {/* Video preview on press */}
            {work.previewVideo && (
              <video
                ref={videoRef}
                src={work.previewVideo}
                muted
                loop
                playsInline
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  isPressed ? "opacity-100" : "opacity-0"
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
        
        {/* Bottom accent line - purple for works */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-[#9c27b0] transition-all duration-500 ease-out",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </div>
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
    <section id="other-works" className="py-12">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.04/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            ARCHITECTURAL_WORKS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* Behavior tracker display */}
        <BehaviorTrackerDisplay section="works" itemCount={sortedWorks.length} />
        
        {/* Instruction hint */}
        <p className="text-[10px] font-mono text-muted-foreground/30 mb-6 tracking-wider">
          HOVER_TO_VIEW_SUMMARY | HOLD_TO_PREVIEW | CLICK_TO_ENTER
        </p>
        
        {/* Works list - same style as Projects */}
        <div className="space-y-3">
          {sortedWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              onTrack={trackClick}
              index={index}
            />
          ))}
        </div>
        
        {sortedWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground/50 font-mono text-sm">
              NO_WORKS_IN_SELECTED_RANGE
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

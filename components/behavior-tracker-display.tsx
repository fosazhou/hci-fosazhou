"use client"

import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useUserBehavior } from "@/hooks/use-user-behavior"

interface BehaviorTrackerDisplayProps {
  section: "projects" | "exchanges" | "works"
  itemCount: number
}

// 动态检测状态短语
const SCANNING_PHRASES = [
  "SCANNING_INTERACTION_PATTERNS",
  "ANALYZING_DWELL_TIME",
  "MAPPING_INTEREST_VECTORS",
  "TRACKING_ENGAGEMENT_DEPTH",
  "MONITORING_SCROLL_VELOCITY",
  "INDEXING_CLICK_SEQUENCES",
]

const DETECTED_PHRASES = [
  "INTEREST_PATTERN_DETECTED",
  "PREFERENCE_PROFILE_UPDATED",
  "ADAPTIVE_SORT_ENABLED",
  "BEHAVIORAL_MODEL_ACTIVE",
]

export function BehaviorTrackerDisplay({ section, itemCount }: BehaviorTrackerDisplayProps) {
  const { isLoaded, totalClicks, topTag } = useUserBehavior()
  const [currentPhrase, setCurrentPhrase] = useState(SCANNING_PHRASES[0])
  const [dotCount, setDotCount] = useState(1)
  const [scanValue, setScanValue] = useState(0)

  // 循环显示扫描短语
  useEffect(() => {
    if (totalClicks === 0) {
      const phraseInterval = setInterval(() => {
        setCurrentPhrase(prev => {
          const currentIndex = SCANNING_PHRASES.indexOf(prev)
          return SCANNING_PHRASES[(currentIndex + 1) % SCANNING_PHRASES.length]
        })
      }, 2000)
      
      const dotInterval = setInterval(() => {
        setDotCount(prev => prev >= 3 ? 1 : prev + 1)
      }, 400)
      
      const scanInterval = setInterval(() => {
        setScanValue(prev => (prev + 1) % 100)
      }, 50)
      
      return () => {
        clearInterval(phraseInterval)
        clearInterval(dotInterval)
        clearInterval(scanInterval)
      }
    } else {
      setCurrentPhrase(DETECTED_PHRASES[Math.floor(Math.random() * DETECTED_PHRASES.length)])
    }
  }, [totalClicks])

  const sectionLabels = {
    projects: { code: "PRJ", name: "PROJECT_DATABASE" },
    exchanges: { code: "EXP", name: "GLOBAL_EXPERIENCE" },
    works: { code: "ARC", name: "ARCHIVE_INDEX" },
  }

  const statusColor = useMemo(() => {
    if (!isLoaded) return "text-yellow-400/70"
    if (totalClicks === 0) return "text-primary/70"
    return "text-green-400/70"
  }, [isLoaded, totalClicks])

  const statusIndicator = useMemo(() => {
    if (!isLoaded) return "INIT"
    if (totalClicks === 0) return "SCAN"
    return "LIVE"
  }, [isLoaded, totalClicks])

  return (
    <div 
      className={cn(
        "mb-6 font-mono text-[10px]",
        "border border-[rgba(34,211,238,0.12)] bg-[rgba(10,10,15,0.5)]",
        "px-4 py-3 rounded-lg backdrop-blur-sm",
        "overflow-hidden relative"
      )}
    >
      {/* 扫描动画背景 */}
      {totalClicks === 0 && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `linear-gradient(90deg, transparent ${scanValue}%, var(--primary) ${scanValue + 2}%, transparent ${scanValue + 4}%)`,
          }}
        />
      )}
      
      <div className="flex items-center gap-3 relative">
        {/* 状态指示灯 */}
        <div className="flex items-center gap-1.5">
          <div 
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              !isLoaded && "bg-yellow-400 animate-pulse",
              isLoaded && totalClicks === 0 && "bg-primary animate-pulse",
              isLoaded && totalClicks > 0 && "bg-green-400"
            )}
          />
          <span className={cn("tracking-wider", statusColor)}>
            [{statusIndicator}]
          </span>
        </div>
        
        <span className="text-[rgba(34,211,238,0.2)]">|</span>
        
        {/* 区块标识 */}
        <span className="text-primary/50">
          {sectionLabels[section].code}
        </span>
        
        <span className="text-[rgba(34,211,238,0.2)]">|</span>
        
        {/* 数据库名称 */}
        <span className="text-muted-foreground/50 uppercase tracking-wider hidden sm:inline">
          {sectionLabels[section].name}
        </span>
        
        <span className="text-[rgba(34,211,238,0.2)] hidden sm:inline">|</span>
        
        {/* 动态状态文字 */}
        <span className="flex-1 truncate text-muted-foreground/60">
          {!isLoaded ? (
            <span>{">"} INITIALIZING_BEHAVIOR_ENGINE{".".repeat(dotCount)}</span>
          ) : totalClicks === 0 ? (
            <span>{">"} {currentPhrase}{".".repeat(dotCount)}</span>
          ) : (
            <span>
              {">"} {currentPhrase} 
              <span className="text-brand ml-2">[{topTag}]</span>
              <span className="text-muted-foreground/40 ml-2">
                {totalClicks} interactions logged
              </span>
            </span>
          )}
        </span>
        
        {/* 记录数 */}
        <span className="text-muted-foreground/30 tabular-nums">
          {itemCount.toString().padStart(2, '0')} REC
        </span>
      </div>
      
      {/* 底部微光效果 */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 h-[1px]",
          "bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0",
          "transition-all duration-1000",
          totalClicks === 0 ? "w-full opacity-100" : "w-0 opacity-0"
        )}
        style={{
          transform: totalClicks === 0 ? `translateX(${(scanValue - 50) * 2}%)` : "none"
        }}
      />
    </div>
  )
}

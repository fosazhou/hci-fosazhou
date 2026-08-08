"use client"

import React, { useMemo, useState, useRef, useEffect } from "react"
import { projects } from "@/lib/projects-data"
import { otherWorks } from "@/lib/other-works-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  filterIds?: string[]
}

// 卡片可接受的最小数据结构（同时兼容 projects 与 otherWorks）
type CardProject = {
  id: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  keywords: string[]
  keywordsEn?: string[]
  coverImage?: string
  previewVideo?: string
  year: string
  comingSoon?: boolean
}

type ClusterItem = { id: string; source: "project" | "work" }

// 三个研究簇：Design Computing × Human-AI Interaction × Embodied Systems
const researchClusters: {
  number: string
  title: string
  subtitle: { zh: string; "zh-hk": string; en: string }
  oneLiner: { zh: string; "zh-hk": string; en: string }
  items: ClusterItem[]
}[] = [
  {
    number: "01",
    title: "AI & DECISION SYSTEMS",
    subtitle: {
      zh: "从城市复杂问题到人机协同决策",
      "zh-hk": "從城市複雜問題到人機協同決策",
      en: "From Urban Complexity to Human–AI Decision-Making",
    },
    oneLiner: {
      zh: "将城市数据、规则约束与 AI Agent 转化为可交互的设计与决策支持系统。",
      "zh-hk": "將城市數據、規則約束與 AI Agent 轉化為可互動的設計與決策支援系統。",
      en: "Turning urban data, rule-based constraints, and AI agents into interactive design and decision-support systems.",
    },
    items: [{ id: "airsite", source: "project" }],
  },
  {
    number: "02",
    title: "EMBODIED & PHYSICAL INTERACTION",
    subtitle: {
      zh: "从身体感知到物理环境反馈",
      "zh-hk": "從身體感知到物理環境反饋",
      en: "From Bodily Sensing to Physical Environmental Feedback",
    },
    oneLiner: {
      zh: "通过身体行为、传感器、计算控制与实体执行建立感知—判断—反馈闭环。",
      "zh-hk": "通過身體行為、傳感器、計算控制與實體執行建立感知—判斷—反饋閉環。",
      en: "Building sense–decide–actuate loops through bodily behavior, sensors, computational control, and physical execution.",
    },
    items: [
      { id: "veilspace", source: "project" },
      { id: "td-music-visualization", source: "project" },
    ],
  },
  {
    number: "03",
    title: "COMPUTATIONAL & ADAPTIVE DESIGN",
    subtitle: {
      zh: "从数据输入到动态设计系统",
      "zh-hk": "從數據輸入到動態設計系統",
      en: "From Data Input to Dynamic Design Systems",
    },
    oneLiner: {
      zh: "探索声音、行为等动态数据如何通过计算规则影响空间形态与数字界面。",
      "zh-hk": "探索聲音、行為等動態數據如何通過計算規則影響空間形態與數字介面。",
      en: "Exploring how dynamic data such as sound and behavior reshape spatial form and digital interfaces through computational rules.",
    },
    items: [
      { id: "fu", source: "work" },
      { id: "portfolio-website", source: "project" },
    ],
  },
]

// 被研究簇收录的「其他作品」id（用于在 Other Works 区块中去重）
export const clusteredWorkIds = researchClusters
  .flatMap((c) => c.items)
  .filter((it) => it.source === "work")
  .map((it) => it.id)

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
  const [isMobilePlaying, setIsMobilePlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const visibilityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { language } = useLanguage()

  // Mobile: Auto-play video when card is visible for 0.5s
  useEffect(() => {
    const card = cardRef.current
    const video = mobileVideoRef.current
    if (!card || !video || !project.previewVideo) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Start timer when card is 50%+ visible
            visibilityTimerRef.current = setTimeout(() => {
              video.currentTime = 0
              video.play().catch(() => {})
              setIsMobilePlaying(true)
            }, 500)
          } else {
            // Clear timer and pause when leaving viewport
            if (visibilityTimerRef.current) {
              clearTimeout(visibilityTimerRef.current)
              visibilityTimerRef.current = null
            }
            video.pause()
            setIsMobilePlaying(false)
          }
        })
      },
      { threshold: [0.5] }
    )

    observer.observe(card)
    return () => {
      observer.disconnect()
      if (visibilityTimerRef.current) {
        clearTimeout(visibilityTimerRef.current)
      }
    }
  }, [project.previewVideo])

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
      ref={cardRef}
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
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isMobilePlaying && project.previewVideo ? "opacity-0" : "opacity-100"
                )}
              />
            )}
            {project.previewVideo && (
              <video
                ref={mobileVideoRef}
                src={project.previewVideo}
                muted
                loop
                playsInline
                preload="none"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  isMobilePlaying ? "opacity-100" : "opacity-0"
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
                preload="none"
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
  index = 0,
  routeBase = "/projects/",
  hideIndex = false,
}: { 
  project: CardProject
  onTrack: (tags: string[]) => void
  index?: number
  routeBase?: string
  hideIndex?: boolean
}) {
  const { navigateWithTransition, prefetch } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [hasPrefetched, setHasPrefetched] = useState(false)
  const [isMobilePlaying, setIsMobilePlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const visibilityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { language } = useLanguage()

  // Mobile: Auto-play video when card is visible for 0.5s
  useEffect(() => {
    const card = cardRef.current
    const video = mobileVideoRef.current
    if (!card || !video || !project.previewVideo) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Start timer when card is 50%+ visible
            visibilityTimerRef.current = setTimeout(() => {
              video.currentTime = 0
              video.play().catch(() => {})
              setIsMobilePlaying(true)
            }, 500)
          } else {
            // Clear timer and pause when leaving viewport
            if (visibilityTimerRef.current) {
              clearTimeout(visibilityTimerRef.current)
              visibilityTimerRef.current = null
            }
            video.pause()
            setIsMobilePlaying(false)
          }
        })
      },
      { threshold: [0.5] }
    )

    observer.observe(card)
    return () => {
      observer.disconnect()
      if (visibilityTimerRef.current) {
        clearTimeout(visibilityTimerRef.current)
      }
    }
  }, [project.previewVideo])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`${routeBase}${project.id}`)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!hasPrefetched) {
      prefetch(`${routeBase}${project.id}`)
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
      ref={cardRef}
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
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isMobilePlaying && project.previewVideo ? "opacity-0" : "opacity-100"
                )}
              />
            )}
            {project.previewVideo && (
              <video
                ref={mobileVideoRef}
                src={project.previewVideo}
                muted
                loop
                playsInline
                preload="none"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                  isMobilePlaying ? "opacity-100" : "opacity-0"
                )}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] via-transparent to-transparent" />
            
            {/* Coming soon badge */}
            {project.comingSoon && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest border border-brand/40 text-brand bg-black/60">
                COMING SOON
              </div>
            )}
            
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
        <div className="hidden md:flex items-stretch min-h-[8.5rem]">
          {/* Left: Index number (hidden inside research clusters) */}
          {!hideIndex && (
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
          )}
          
          {/* Center: Title and info */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 
                    className={cn(
                      "text-xl font-medium transition-colors duration-300",
                      isHovered ? "text-foreground" : "text-foreground/80"
                    )}
                  >
                    {language === "en" && project.titleEn ? project.titleEn : project.title}
                  </h3>
                  {project.comingSoon && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest border border-brand/40 text-brand bg-brand/5 whitespace-nowrap">
                      COMING SOON
                    </span>
                  )}
                </div>
                
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
                  "absolute inset-0 w-full h-full object-cover transition-all duration-700",
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
                preload="none"
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
  const { trackClick } = useUserBehavior()
  const { language } = useLanguage()

  // 语言键（与簇文案的 key 对齐）
  const langKey = language === "en" ? "en" : "zh"

  // 根据时间轴过滤：filterIds 为空表示全部可见
  const isVisible = (id: string) => !filterIds || filterIds.includes(id)

  // 从 projects / otherWorks 解析卡片数据
  const resolveItem = (id: string, source: "project" | "work"): CardProject | undefined => {
    if (source === "work") return otherWorks.find((w) => w.id === id) as CardProject | undefined
    return projects.find((p) => p.id === id) as CardProject | undefined
  }

  // 构建带有可见项的研究簇
  const clustersWithItems = useMemo(() => {
    return researchClusters.map((cluster) => {
      const resolvedItems = cluster.items
        .map((it) => {
          const data = resolveItem(it.id, it.source)
          return data ? { data, source: it.source } : null
        })
        .filter((entry): entry is { data: CardProject; source: "project" | "work" } => entry !== null)
        .filter((entry) => isVisible(entry.data.id))
      return { ...cluster, resolvedItems }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIds])

  const totalVisible = clustersWithItems.reduce((sum, c) => sum + c.resolvedItems.length, 0)

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.02/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            RESEARCH_CLUSTERS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>

        {/* Behavior tracker display */}
        <BehaviorTrackerDisplay section="projects" itemCount={totalVisible} />

        {/* Positioning statement */}
        <div className="mb-12">
          <p className="text-base md:text-lg font-light text-foreground/80 tracking-tight text-balance">
            <span className="text-brand">Design Computing</span>
            <span className="mx-2 text-muted-foreground/30">×</span>
            <span className="text-primary">Human–AI Interaction</span>
            <span className="mx-2 text-muted-foreground/30">×</span>
            <span className="text-foreground/70">Embodied Systems</span>
          </p>
          <p className="text-[11px] font-mono text-muted-foreground/40 mt-2 tracking-wider">
            {langKey === "en"
              ? "Three research clusters across scales — from body to city."
              : "三个跨尺度研究簇 — 从身体到城市。"}
          </p>
        </div>

        {totalVisible > 0 ? (
          <div className="space-y-16">
            {clustersWithItems.map((cluster) =>
              cluster.resolvedItems.length > 0 ? (
                <div key={cluster.number} className="relative">
                  {/* Cluster header */}
                  <div className="mb-5 rounded-lg border border-brand/20 bg-gradient-to-r from-brand/10 via-brand/5 to-transparent px-5 py-4 border-l-2 border-l-brand/60">
                    {/* Number tag + localized title on one line */}
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-lg md:text-xl font-semibold tracking-[0.1em] text-brand tabular-nums leading-none">
                        {cluster.number}
                      </span>
                      <span className="w-6 h-px bg-brand/30 hidden md:inline-block" />
                      <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground text-balance leading-snug">
                        {cluster.subtitle[langKey]}
                      </h3>
                    </div>

                    {/* English category label */}
                    <p className="text-xs md:text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground/70 mt-2">
                      {cluster.title}
                    </p>

                    {/* One-liner description */}
                    <p className="text-sm text-muted-foreground/60 leading-relaxed mt-3 max-w-2xl text-pretty">
                      {cluster.oneLiner[langKey]}
                    </p>
                  </div>

                  {/* Cluster items */}
                  <div className="space-y-3">
                    {cluster.resolvedItems.map((entry) => (
                      <ProjectCard
                        key={entry.data.id}
                        project={entry.data}
                        onTrack={trackClick}
                        routeBase={entry.source === "work" ? "/works/" : "/projects/"}
                        hideIndex
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
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

"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { exchanges, getExchangeById, type GalleryImage } from "@/lib/exchange-data"
import { projects } from "@/lib/projects-data"
import { otherWorks } from "@/lib/other-works-data"
import { useEffect, useState, useRef, useCallback } from "react"
import { isTransitioning, setTransitioning } from "@/components/page-transition"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { StatusIndicator } from "@/components/scan-line"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

// 获取作品封面信息
function getWorkCover(workId: string) {
  // 先从 projects 找
  const project = projects.find(p => p.id === workId)
  if (project) {
    return { 
      coverImage: project.coverImage, 
      title: project.title,
      link: `/projects/${workId}`
    }
  }
  // 再从 otherWorks 找
  const otherWork = otherWorks.find(w => w.id === workId)
  if (otherWork) {
    return { 
      coverImage: otherWork.coverImage, 
      title: otherWork.title,
      link: `/works/${workId}`
    }
  }
  return null
}

// inspiration link 组件 - 深色风格
function InspirationLink({ 
  workId, 
  direction = "right" 
}: { 
  workId: string
  direction?: "right" | "left"
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const workInfo = getWorkCover(workId)
  
  if (!workInfo) return null
  
  const handleClick = () => {
    setIsClicking(true)
    setTransitioning(true)
    setTimeout(() => {
      router.push(workInfo.link)
    }, 300)
  }
  
  return (
    <div className={`flex items-center gap-4 ${direction === "left" ? "flex-row-reverse" : ""}`}>
      {/* 连接线与文字 */}
      <div className={`flex items-center gap-2 ${direction === "left" ? "flex-row-reverse" : ""}`}>
        <div className="w-16 h-px bg-primary/30" />
        <span className="text-xs text-primary/60 italic whitespace-nowrap font-mono">inspiration_of</span>
        <div className="w-8 h-px bg-primary/30" />
      </div>
      
      {/* 作品封面缩略图 */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer bg-transparent border-none p-0 outline-none focus:outline-none"
      >
        <div 
          className={cn(
            "w-24 h-32 overflow-hidden rounded-sm transition-all duration-300",
            "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.2)]",
            isHovered && "scale-110 border-[rgba(34,211,238,0.5)]"
          )}
          style={{
            boxShadow: isHovered ? "0 0 20px rgba(34, 211, 238, 0.2)" : "none"
          }}
        >
          {workInfo.coverImage ? (
            <Image 
              src={workInfo.coverImage}
              alt={workInfo.title}
              fill
              sizes="96px"
              className="object-cover"
              loading="lazy"
              quality={60}
            />
          ) : (
            <div className="w-full h-full bg-muted/20 flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-mono">{workInfo.title}</span>
            </div>
          )}
          
          {/* 点击时的闪光效果 */}
          <div className={cn(
            "absolute inset-0 bg-primary/30 pointer-events-none transition-opacity duration-300 rounded-sm",
            isClicking ? "opacity-100" : "opacity-0"
          )} />
        </div>
        
        {/* 悬停时的标题 */}
        <div className={cn(
          "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <span className="text-xs text-primary/80 font-mono">{workInfo.title}</span>
        </div>
      </button>
    </div>
  )
}

// 图片组件 - 深色赛博朋克风格
function GalleryImageBox({ 
  image,
  aspectRatio, 
  label,
  className = "",
  priority = false,
  onClick
}: { 
  image?: GalleryImage
  aspectRatio: string
  label: string
  className?: string
  priority?: boolean
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  // 如果有图片数据，显示真实图片
  if (image?.src) {
    return (
      <div 
        className={cn(
          "overflow-hidden rounded-lg group relative cursor-zoom-in",
          "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
          "transition-all duration-300",
          "hover:border-[rgba(34,211,238,0.3)]",
          className
        )}
        style={{ 
          aspectRatio,
          boxShadow: isHovered ? "0 0 30px rgba(34, 211, 238, 0.15)" : "none"
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image.src}
          alt={image.caption || label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        
        {/* 悬停时显示标注 */}
        {image.caption && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
            <span className="text-primary/90 text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono">
              {image.caption}
            </span>
          </div>
        )}
      </div>
    )
  }
  
  // 如果没有图片数据，显示占位符
  return (
    <div 
      className={cn(
        "overflow-hidden rounded-lg flex items-center justify-center",
        "bg-[rgba(10,10,15,0.4)] border border-[rgba(34,211,238,0.1)]",
        "hover:border-[rgba(34,211,238,0.2)] transition-colors duration-300",
        className
      )}
      style={{ aspectRatio }}
    >
      <span className="text-muted-foreground/40 text-xs font-mono">{label}</span>
    </div>
  )
}

// Auckland 布局 - 保持原有排版
function AucklandGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-20">
      {/* 第一栏：学术成果 */}
      <section>
        <h3 className="text-[10px] uppercase tracking-widest text-primary/60 mb-8 font-mono">
          ACADEMIC_ACHIEVEMENTS
        </h3>
        <div className="space-y-8">
          {/* 4张竖幅 2:3 - 交错排列增加视觉层次 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GalleryImageBox image={images?.[0]} aspectRatio="2/3" label="V_01" onClick={() => onImageClick(0)} />
            <GalleryImageBox image={images?.[1]} aspectRatio="2/3" label="V_02" className="mt-12" onClick={() => onImageClick(1)} />
            <GalleryImageBox image={images?.[2]} aspectRatio="2/3" label="V_03" className="mt-6" onClick={() => onImageClick(2)} />
            <GalleryImageBox image={images?.[3]} aspectRatio="2/3" label="V_04" className="mt-16" onClick={() => onImageClick(3)} />
          </div>
          
          {/* 4张横幅 3:2 */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            <GalleryImageBox image={images?.[4]} aspectRatio="3/2" label="H_01" onClick={() => onImageClick(4)} />
            <GalleryImageBox image={images?.[5]} aspectRatio="3/2" label="H_02" className="mt-8" onClick={() => onImageClick(5)} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GalleryImageBox image={images?.[6]} aspectRatio="3/2" label="H_03" className="mt-4" onClick={() => onImageClick(6)} />
            <GalleryImageBox image={images?.[7]} aspectRatio="3/2" label="H_04" onClick={() => onImageClick(7)} />
          </div>
        </div>
      </section>
      
      {/* 分隔线 */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto" />
      
      {/* 第二栏：游玩体验 */}
      <section>
        <h3 className="text-[10px] uppercase tracking-widest text-primary/60 mb-8 font-mono">
          TRAVEL_EXPERIENCE
        </h3>
        <div className="space-y-8">
          {/* 1张横幅 16:9 - 全宽 */}
          <GalleryImageBox image={images?.[8]} aspectRatio="16/9" label="W_01" onClick={() => onImageClick(8)} />
          
          {/* 2张 1:1 - 错落排列 */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <GalleryImageBox image={images?.[9]} aspectRatio="1/1" label="S_01" onClick={() => onImageClick(9)} />
            <GalleryImageBox image={images?.[10]} aspectRatio="1/1" label="S_02" className="mt-16" onClick={() => onImageClick(10)} />
          </div>
        </div>
      </section>
    </div>
  )
}

// Russia 布局 - 保持原有排版
function RussiaGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-8">
      {/* 第一行：1张竖幅 + 2张横幅 */}
      <div className="grid grid-cols-3 gap-6 items-start">
        <GalleryImageBox image={images?.[0]} aspectRatio="2/3" label="V_01" onClick={() => onImageClick(0)} />
        <div className="col-span-2 space-y-4">
          <GalleryImageBox image={images?.[1]} aspectRatio="3/2" label="H_01" onClick={() => onImageClick(1)} />
          <GalleryImageBox image={images?.[2]} aspectRatio="3/2" label="H_02" onClick={() => onImageClick(2)} />
        </div>
      </div>
      
      {/* 第二行：4张横幅 3:2 */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[3]} aspectRatio="3/2" label="H_03" onClick={() => onImageClick(3)} />
        <GalleryImageBox image={images?.[4]} aspectRatio="3/2" label="H_04" className="mt-8" onClick={() => onImageClick(4)} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[5]} aspectRatio="3/2" label="H_05" className="mt-4" onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images?.[6]} aspectRatio="3/2" label="H_06" onClick={() => onImageClick(6)} />
      </div>
      
      {/* 第三行：2张横幅 16:9 */}
      <div className="space-y-6 mt-8">
        <GalleryImageBox image={images?.[7]} aspectRatio="16/9" label="W_01" onClick={() => onImageClick(7)} />
        <GalleryImageBox image={images?.[8]} aspectRatio="16/9" label="W_02" onClick={() => onImageClick(8)} />
      </div>
    </div>
  )
}

// Japan 布局 - 保持原有排版
function JapanGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-12">
      {/* 第一组：3张竖幅 + inspiration link to Arbor */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <GalleryImageBox image={images?.[0]} aspectRatio="3/4" label="V_01" onClick={() => onImageClick(0)} />
          <GalleryImageBox image={images?.[1]} aspectRatio="3/4" label="V_02" className="mt-6" onClick={() => onImageClick(1)} />
          <GalleryImageBox image={images?.[2]} aspectRatio="3/4" label="V_03" className="mt-12" onClick={() => onImageClick(2)} />
        </div>
        <div className="self-center">
          <InspirationLink workId="arbor-of-enduring-harmonics" direction="right" />
        </div>
      </div>
      
      {/* 第二组：1竖+1横 + inspiration link to FU */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="grid grid-cols-2 gap-4 flex-1 max-w-md">
          <GalleryImageBox image={images?.[3]} aspectRatio="3/4" label="V_04" onClick={() => onImageClick(3)} />
          <GalleryImageBox image={images?.[4]} aspectRatio="4/3" label="H_01" className="self-end" onClick={() => onImageClick(4)} />
        </div>
        <div className="self-center">
          <InspirationLink workId="fu" direction="right" />
        </div>
      </div>
      
      {/* 其余竖幅 3:4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <GalleryImageBox image={images?.[5]} aspectRatio="3/4" label="V_05" onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images?.[6]} aspectRatio="3/4" label="V_06" className="mt-8" onClick={() => onImageClick(6)} />
        <GalleryImageBox image={images?.[7]} aspectRatio="3/4" label="V_07" className="mt-4" onClick={() => onImageClick(7)} />
        <GalleryImageBox image={images?.[8]} aspectRatio="3/4" label="V_08" className="mt-12" onClick={() => onImageClick(8)} />
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
        <GalleryImageBox image={images?.[9]} aspectRatio="3/4" label="V_09" className="mt-6" onClick={() => onImageClick(9)} />
        <GalleryImageBox image={images?.[10]} aspectRatio="3/4" label="V_10" onClick={() => onImageClick(10)} />
        <GalleryImageBox image={images?.[11]} aspectRatio="3/4" label="V_11" className="mt-10" onClick={() => onImageClick(11)} />
      </div>
      
      {/* 其余横幅 4:3 */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[12]} aspectRatio="4/3" label="H_02" onClick={() => onImageClick(12)} />
        <GalleryImageBox image={images?.[13]} aspectRatio="4/3" label="H_03" className="mt-6" onClick={() => onImageClick(13)} />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <GalleryImageBox image={images?.[14]} aspectRatio="4/3" label="H_04" onClick={() => onImageClick(14)} />
        <GalleryImageBox image={images?.[15]} aspectRatio="4/3" label="H_05" className="mt-4" onClick={() => onImageClick(15)} />
        <GalleryImageBox image={images?.[16]} aspectRatio="4/3" label="H_06" className="mt-8" onClick={() => onImageClick(16)} />
      </div>
      
      {/* 2张宽幅 16:9 */}
      <div className="space-y-6">
        <GalleryImageBox image={images?.[17]} aspectRatio="16/9" label="W_01" onClick={() => onImageClick(17)} />
        <GalleryImageBox image={images?.[18]} aspectRatio="16/9" label="W_02" onClick={() => onImageClick(18)} />
      </div>
    </div>
  )
}

export default function ExchangePage() {
  const params = useParams()
  const id = params.id as string
  const exchange = getExchangeById(id)
  const { language } = useLanguage()
  
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [showEntryOverlay, setShowEntryOverlay] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Lightbox 状态
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])
  
  // 入场动画 - 立即渐出
  useEffect(() => {
    const fromTransition = isTransitioning()
    if (fromTransition) {
      requestAnimationFrame(() => {
        setShowEntryOverlay(false)
        setTransitioning(false)
      })
    } else {
      setShowEntryOverlay(false)
    }
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
  
  if (!exchange) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Exchange Not Found</h1>
          <Link href="/#exchanges" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    )
  }
  
  // 计算视差效果
  const parallaxOffset = scrollY * 0.4
  const heroOpacity = Math.max(0, 1 - (scrollY / 700) ** 1.2)
  const heroScale = 1 + Math.min(scrollY * 0.0002, 0.15)
  
  // Get localized content
  const keywords = language === "en" && exchange.keywordsEn ? exchange.keywordsEn : exchange.keywords
  const title = language === "en" && exchange.titleEn ? exchange.titleEn : exchange.title
  const subtitle = language === "en" && exchange.subtitleEn ? exchange.subtitleEn : exchange.subtitle
  const location = language === "en" && exchange.locationEn ? exchange.locationEn : exchange.location
  const program = language === "en" && exchange.programEn ? exchange.programEn : exchange.program
  const fullDescription = language === "en" && exchange.fullDescriptionEn ? exchange.fullDescriptionEn : exchange.fullDescription
  const details = language === "en" && exchange.detailsEn ? exchange.detailsEn : exchange.details
  
  // Get localized gallery images
  const galleryImages = language === "en" && exchange.galleryImagesEn 
    ? exchange.galleryImagesEn 
    : exchange.galleryImages
  
  // 根据 id 渲染不同的图库
  const renderGallery = () => {
    const images = galleryImages
    switch (id) {
      case "auckland-exchange":
        return <AucklandGallery images={images} onImageClick={openLightbox} />
      case "russia-workshop":
        return <RussiaGallery images={images} onImageClick={openLightbox} />
      case "japan-ando":
        return <JapanGallery images={images} onImageClick={openLightbox} />
      default:
        return <AucklandGallery images={images} onImageClick={openLightbox} />
    }
  }
  
  return (
    <main className="min-h-screen">
      {/* 图片放大查看器 */}
      <ImageLightbox 
        images={galleryImages || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* 入场黑色遮罩 */}
      <div 
        className={cn(
          "fixed inset-0 z-[9999] bg-background pointer-events-none transition-opacity duration-300 ease-out",
          showEntryOverlay ? 'opacity-100' : 'opacity-0'
        )}
      />
      
      {/* 固定顶部导航 - 玻璃态 */}
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
            href="/#exchanges"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-mono">BACK</span>
          </Link>
          
          <Logo size="sm" />
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </header>
      
      {/* Hero Section - 4:3 aspect ratio on mobile, full screen on desktop */}
      <div ref={heroRef} className="relative aspect-[4/3] md:aspect-auto md:h-screen overflow-hidden">
        <div 
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
          }}
        >
          {exchange.coverImage ? (
            <img 
              src={exchange.coverImage}
              alt={exchange.title}
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
          href="/#exchanges"
          className={cn(
            "absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-2",
            "text-foreground/70 hover:text-primary transition-all duration-300",
            headerVisible && "opacity-0"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-mono hidden md:inline">BACK_TO_EXCHANGES</span>
        </Link>
        
        {/* Logo on hero */}
        <div className={cn(
          "absolute top-6 right-6 md:top-8 md:right-8 z-20 transition-all duration-300",
          headerVisible && "opacity-0"
        )}>
          <Logo size="md" linkToHome={false} />
        </div>
        
        {/* Hero content */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-foreground/70 mb-6 font-light">
              {subtitle}
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 text-sm font-mono">
              <div>
                <span className="text-muted-foreground/60 mr-2">PERIOD/</span>
                <span className="text-foreground">{exchange.period}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">LOCATION/</span>
                <span className="text-foreground">{location}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">PROGRAM/</span>
                <span className="text-foreground">{program}</span>
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
          {/* Overview */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">OVERVIEW/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                PROGRAM_DESCRIPTION
              </span>
            </div>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {fullDescription}
            </p>
          </div>
          
          {/* Learning Content */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">LEARNING/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                KEY_TAKEAWAYS
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
            </div>
            
            <div className="grid gap-4">
              {details.map((detail, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg",
                    "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
                    "transition-all duration-300",
                    "hover:border-[rgba(34,211,238,0.25)] hover:bg-[rgba(10,10,15,0.8)]"
                  )}
                >
                  <span className="text-[10px] font-mono text-primary/60 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground/90 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gallery */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                PROJECT_IMAGES
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
            </div>
            
            <div className="max-w-5xl mx-auto">
              {renderGallery()}
            </div>
          </div>
        </div>
      </article>
      
      {/* Footer */}
      <footer className="relative border-t border-[rgba(34,211,238,0.1)] py-12 px-6 lg:px-8">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <Link 
            href="/#exchanges" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            VIEW_ALL_EXCHANGES
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

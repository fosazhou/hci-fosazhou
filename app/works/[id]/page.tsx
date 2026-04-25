"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { otherWorks, type GalleryImage } from "@/lib/other-works-data"
import { useEffect, useState, useRef, useCallback } from "react"
import { isTransitioning, setTransitioning } from "@/components/page-transition"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"

// 图片组件 - 简化版，使用原生懒加载，点击放大
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
  const needsFullHeight = className.includes('h-full')
  
  return (
    <figure className={`group ${className}`}>
      <div 
        className={`overflow-hidden rounded-sm bg-[rgba(20,20,25,0.6)] cursor-zoom-in ${needsFullHeight ? 'h-full' : ''}`}
        onClick={onClick}
      >
        <img 
          src={image.src}
          alt={image.caption || `图片 ${index + 1}`}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground/60">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

// TD 专用布局 - 最开始横幅16:9视频，最后居中1:1占位符，01.02上下排列，03在右侧
function TdGallery({ images, demoVideo, onImageClick }: { images: GalleryImage[], demoVideo?: string, onImageClick: (index: number) => void }) {
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
    <div className="space-y-10">
      {/* 顶部：16:9 演示视频 - 点击播放/暂停，有声音 */}
      {demoVideo && (
        <div>
          <p className="text-sm text-muted-foreground/60 mb-4 text-center">
            请将播放器调至合适音量观看
          </p>
          <div 
            className="w-full aspect-[16/9] bg-[rgba(20,20,25,0.6)] overflow-hidden rounded-sm relative cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={demoVideo}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* 播放/暂停按钮覆盖层 */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isPlaying ? 'opacity-0 hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/40'
            }`}>
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 flex items-center justify-center">
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
        </div>
      )}
      
      {/* 01.02上下排列 + 03在右侧同行 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-5 flex flex-col gap-6">
          {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
          {images[1] && <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />}
        </div>
        <div className="col-span-7">
          {images[2] && <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />}
        </div>
      </div>
      
      {/* 最后居中1:1占位符 */}
      <div className="flex justify-center">
        <div className="w-1/3 aspect-square bg-[rgba(20,20,25,0.6)] rounded-sm flex items-center justify-center border border-primary/10">
          <span className="text-muted-foreground/30 text-xs">1:1</span>
        </div>
      </div>
    </div>
  )
}

// Arbor 布局 - 11张图片，有设计感的错落排布
function ArborGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-10">
      {/* 01 全宽 */}
      {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
      
      {/* 02 + 03 错落 */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {images[1] && <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />}
        {images[2] && <GalleryImageBox image={images[2]} index={2} className="mt-12" onClick={() => onImageClick(2)} />}
      </div>
      
      {/* 04 偏右 */}
      <div className="w-4/5 ml-auto">
        {images[3] && <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />}
      </div>
      
      {/* 05 + 06 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          {images[4] && <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />}
        </div>
        <div className="col-span-5 mt-8">
          {images[5] && <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />}
        </div>
      </div>
      
      {/* 07 居中窄幅 */}
      <div className="w-2/3 mx-auto">
        {images[6] && <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />}
      </div>
      
      {/* 08 + 09 错落 */}
      <div className="grid grid-cols-2 gap-6 items-end">
        {images[7] && <GalleryImageBox image={images[7]} index={7} className="mt-6" onClick={() => onImageClick(7)} />}
        {images[8] && <GalleryImageBox image={images[8]} index={8} onClick={() => onImageClick(8)} />}
      </div>
      
      {/* 10 偏左 */}
      <div className="w-3/4">
        {images[9] && <GalleryImageBox image={images[9]} index={9} onClick={() => onImageClick(9)} />}
      </div>
      
      {/* 11 全宽 */}
      {images[10] && <GalleryImageBox image={images[10]} index={10} onClick={() => onImageClick(10)} />}
    </div>
  )
}

// Xicang 布局 - 12张图片
function XicangGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-10">
      {/* 01 全宽 */}
      {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
      
      {/* 02 + 03 */}
      <div className="grid grid-cols-2 gap-6">
        {images[1] && <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />}
        {images[2] && <GalleryImageBox image={images[2]} index={2} className="mt-10" onClick={() => onImageClick(2)} />}
      </div>
      
      {/* 04 偏右窄幅 */}
      <div className="w-3/5 ml-auto">
        {images[3] && <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />}
      </div>
      
      {/* 05 + 06 + 07 三列 */}
      <div className="grid grid-cols-3 gap-4">
        {images[4] && <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />}
        {images[5] && <GalleryImageBox image={images[5]} index={5} className="mt-6" onClick={() => onImageClick(5)} />}
        {images[6] && <GalleryImageBox image={images[6]} index={6} className="mt-12" onClick={() => onImageClick(6)} />}
      </div>
      
      {/* 08 全宽 */}
      {images[7] && <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />}
      
      {/* 09 + 10 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          {images[8] && <GalleryImageBox image={images[8]} index={8} onClick={() => onImageClick(8)} />}
        </div>
        <div className="col-span-7 mt-8">
          {images[9] && <GalleryImageBox image={images[9]} index={9} onClick={() => onImageClick(9)} />}
        </div>
      </div>
      
      {/* 11 居中 */}
      <div className="w-4/5 mx-auto">
        {images[10] && <GalleryImageBox image={images[10]} index={10} onClick={() => onImageClick(10)} />}
      </div>
      
      {/* 12 偏左 */}
      <div className="w-2/3">
        {images[11] && <GalleryImageBox image={images[11]} index={11} onClick={() => onImageClick(11)} />}
      </div>
    </div>
  )
}

// AIGC 布局 - 3张图片
function AigcGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-10">
      {/* 01 全宽 */}
      {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
      
      {/* 02 + 03 错落 */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {images[1] && <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />}
        {images[2] && <GalleryImageBox image={images[2]} index={2} className="mt-8" onClick={() => onImageClick(2)} />}
      </div>
    </div>
  )
}

// Lumley 布局 - 8张图片
function LumleyGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-10">
      {/* 01 全宽 */}
      {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
      
      {/* 02 + 03 */}
      <div className="grid grid-cols-2 gap-6">
        {images[1] && <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />}
        {images[2] && <GalleryImageBox image={images[2]} index={2} className="mt-6" onClick={() => onImageClick(2)} />}
      </div>
      
      {/* 04 偏右 */}
      <div className="w-4/5 ml-auto">
        {images[3] && <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />}
      </div>
      
      {/* 05 + 06 */}
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-7">
          {images[4] && <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />}
        </div>
        <div className="col-span-5">
          {images[5] && <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />}
        </div>
      </div>
      
      {/* 07 居中窄幅 */}
      <div className="w-2/3 mx-auto">
        {images[6] && <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />}
      </div>
      
      {/* 08 全宽 */}
      {images[7] && <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />}
    </div>
  )
}

// Energize 布局 - 8张图片
function EnergizeGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-10">
      {/* 01 全宽 */}
      {images[0] && <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />}
      
      {/* 02 + 03 错落 */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {images[1] && <GalleryImageBox image={images[1]} index={1} className="mt-10" onClick={() => onImageClick(1)} />}
        {images[2] && <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />}
      </div>
      
      {/* 04 偏左 */}
      <div className="w-3/4">
        {images[3] && <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />}
      </div>
      
      {/* 05 + 06 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 mt-6">
          {images[4] && <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />}
        </div>
        <div className="col-span-7">
          {images[5] && <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />}
        </div>
      </div>
      
      {/* 07 偏右窄幅 */}
      <div className="w-2/3 ml-auto">
        {images[6] && <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />}
      </div>
      
      {/* 08 全宽 */}
      {images[7] && <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />}
    </div>
  )
}

// 通用布局
function DefaultGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-8">
      {images.map((image, index) => (
        <GalleryImageBox key={index} image={image} index={index} priority={index === 0} onClick={() => onImageClick(index)} />
      ))}
    </div>
  )
}

export default function WorkPage() {
  const params = useParams()
  const id = params.id as string
  const work = otherWorks.find((w) => w.id === id)
  
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
  
  if (!work) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">未找到该作品</h1>
          <Link href="/#other-works" className="text-muted-foreground hover:text-primary underline">
            返回首页
          </Link>
        </div>
      </main>
    )
  }
  
  const parallaxOffset = scrollY * 0.4
  const heroOpacity = Math.max(0, 1 - (scrollY / 700) ** 1.2)
  const heroScale = 1 + Math.min(scrollY * 0.0002, 0.15)
  
  // 根据作品ID选择布局
  const renderGallery = () => {
    const images = work.galleryImages || []
    switch (id) {
      case "td-music-visualization":
        return <TdGallery images={images} demoVideo={(work as any).demoVideo} onImageClick={openLightbox} />
      case "arbor-of-enduring-harmonics":
        return <ArborGallery images={images} onImageClick={openLightbox} />
      case "integrates-hans-hui-nationality":
        return <XicangGallery images={images} onImageClick={openLightbox} />
      case "zhihui-jiangxia":
        return <AigcGallery images={images} onImageClick={openLightbox} />
      case "lumley-tower":
        return <LumleyGallery images={images} onImageClick={openLightbox} />
      case "energize-commons":
        return <EnergizeGallery images={images} onImageClick={openLightbox} />
      default:
        return <DefaultGallery images={images} onImageClick={openLightbox} />
    }
  }
  
  return (
    <main className="min-h-screen bg-background">
      {/* 图片放大查看器 */}
      <ImageLightbox 
        images={work.galleryImages || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* 入场黑色遮罩 - 匹配暗色主题 */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-300 ease-out ${
          showEntryOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* 固定顶部导航 */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10 transition-all duration-500 ease-out ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link
        href="/#other-works"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">返回</span>
      </Link>
      
      <Logo size="sm" />
      
      <div className="w-16" />
      </div>
      </header>
      
      {/* 全屏封面区域 */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-slate-900 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
            transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          {work.coverImage ? (
            <img 
              src={work.coverImage}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
      <Link
        href="/#other-works"
        className={`absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 ${
          headerVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">返回其他作品</span>
      </Link>
      
      {/* Logo - 封面右上角，白色反相 */}
      <div className={`absolute top-8 right-8 z-20 transition-all duration-300 ${
        headerVisible ? 'opacity-0' : 'opacity-100'
      }`}>
        <Logo size="md" inverted linkToHome={false} />
      </div>
      
      <div
        className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {work.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {work.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-6">
              {work.titleCn}
            </p>
            
            <div className="flex flex-wrap gap-8 text-sm text-white/70">
              <div>
                <span className="text-white/50 mr-2">年份</span>
                <span className="text-white">{work.year}</span>
              </div>
              <div>
                <span className="text-white/50 mr-2">类别</span>
                <span className="text-white">{work.category}</span>
              </div>
              {work.awards && (
                <div>
                  <span className="text-white/50 mr-2">获奖</span>
                  <span className="text-white">{work.awards}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 animate-bounce"
          style={{ opacity: heroOpacity }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* 内容区域 */}
      <article className="relative bg-background py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-none">
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-6 font-normal font-mono">
              概述
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-16">
              {work.fullDescription}
            </p>
            
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-6 font-normal font-mono">
              核心特点
            </h2>
            <ul className="space-y-4 mb-16">
              {work.details.map((detail, i) => (
                <li key={i} className="flex gap-4 text-muted-foreground">
                  <span className="text-primary/40 font-mono text-sm">0{i + 1}</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 作品图集 */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-8 font-normal font-mono">
              作品图集
            </h2>
            
            {work.galleryImages && work.galleryImages.length > 0 ? (
              renderGallery()
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground/40 text-sm">暂无图片</p>
              </div>
            )}
          </div>
        </div>
      </article>
      
      <footer className="border-t border-primary/10 py-12 px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <Link 
            href="/#other-works" 
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            查看所有作品
          </Link>
          
          <p className="text-muted-foreground/40 text-sm font-mono">
            FOSA 建筑作品集
          </p>
        </div>
      </footer>
    </main>
  )
}

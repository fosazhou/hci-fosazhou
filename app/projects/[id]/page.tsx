"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { projects, getProjectById, type GalleryImage } from "@/lib/projects-data"
import { useEffect, useState, useRef, useCallback } from "react"
import { isTransitioning, setTransitioning } from "@/components/page-transition"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"

// 简化的图片组件 - 使用原生懒加载，点击放大
function GalleryImageBox({ 
  image, 
  index,
  priority = false,
  className = "",
  showCaption = true,
  onClick
}: { 
  image: GalleryImage
  index: number
  priority?: boolean
  className?: string
  showCaption?: boolean
  onClick?: () => void
}) {
  const needsFullHeight = className.includes('h-full')
  
  return (
    <figure className={`group ${className}`}>
      <div 
        className={`overflow-hidden rounded-sm bg-slate-100 cursor-zoom-in ${needsFullHeight ? 'h-full' : ''}`}
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
      {showCaption && image.caption && (
        <figcaption className="mt-3 text-xs text-slate-400">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

// 判断图片是竖幅、横幅还是宽幅
function getImageOrientation(ratio: string): 'vertical' | 'horizontal' | 'wide' | 'square' {
  const [w, h] = ratio.split('/').map(Number)
  const r = w / h
  if (r < 0.9) return 'vertical'
  if (r > 1.8) return 'wide'
  if (r >= 0.9 && r <= 1.1) return 'square'
  return 'horizontal'
}

// 点击播放/暂停视频组件 - 有声音
function ClickToPlayVideo({ 
  videoSrc, 
  title, 
  aspectRatio = "16/9" 
}: { 
  videoSrc: string
  title: string
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
    <div className="mb-16">
      <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4 font-normal">
        {title}
      </h2>
      <p className="text-sm text-slate-500 mb-4 text-center">
        请将播放器调至合适音量观看
      </p>
      <div className="flex justify-center">
        <div 
          className="w-full max-w-2xl bg-slate-100 overflow-hidden rounded-lg shadow-lg relative cursor-pointer group"
          style={{ aspectRatio }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* 播放/暂停按钮覆盖层 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/30'
          }`}>
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              {isPlaying ? (
                <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// NESTIDE 专用布局
// 01全宽, 02+05一行(02大05小), 03+04一行缩小且上下对齐, 06全宽
function NestideGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {/* 01 全宽 */}
      <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
      
      {/* 02 + 05 一行，02大 05小 */}
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-8">
          <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />
        </div>
        <div className="col-span-4">
          <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />
        </div>
      </div>
      
      {/* 03 + 04 一行缩小，上下边缘对齐 */}
      <div className="flex gap-6 w-4/5 mx-auto items-stretch">
        <div className="flex-1">
          <GalleryImageBox image={images[2]} index={2} className="h-full" onClick={() => onImageClick(2)} />
        </div>
        <div className="flex-1">
          <GalleryImageBox image={images[3]} index={3} className="h-full" onClick={() => onImageClick(3)} />
        </div>
      </div>
      
      {/* 06 全宽 */}
      <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />
    </div>
  )
}

// FU 专用布局
// 01全宽, 02+07一行(上下对齐且与网页两端对齐), 03全宽, 04+05一行, 06+08一行
function FuGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-8">
      {/* 01 全宽 */}
      <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
      
      {/* 02 + 07 一行，上下对齐且与网页两端对齐 */}
      <div className="grid grid-cols-2 gap-6 items-start">
        <GalleryImageBox image={images[1]} index={1} onClick={() => onImageClick(1)} />
        <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />
      </div>
      
      {/* 03 全宽 */}
      <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />
      
      {/* 04 + 05 一行 */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />
        <GalleryImageBox image={images[4]} index={4} className="mt-8" onClick={() => onImageClick(4)} />
      </div>
      
      {/* 06 + 08 一行 */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images[5]} index={5} onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images[7]} index={7} className="mt-6" onClick={() => onImageClick(7)} />
      </div>
    </div>
  )
}

// VEILSPACE 专用布局 - 参考 Japan 的随机排布方式
// 01+02一行缩小, 03右边放04+05(同列一上一下，03和04+05上下对齐), 06+07一行, 08+09一行, 10-15随机错落排布
function VeilspaceGallery({ images, onImageClick }: { images: GalleryImage[], onImageClick: (index: number) => void }) {
  if (!images || images.length === 0) return null
  return (
    <div className="space-y-10">
      {/* 01 + 02 一行缩小 */}
      <div className="grid grid-cols-2 gap-6 w-4/5">
        <GalleryImageBox image={images[0]} index={0} priority onClick={() => onImageClick(0)} />
        <GalleryImageBox image={images[1]} index={1} className="mt-6" onClick={() => onImageClick(1)} />
      </div>
      
      {/* 03 右边放 04+05 (04.05同列一上一下，缩小03放大04.05使上下对齐) */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        <div className="col-span-4">
          <GalleryImageBox image={images[2]} index={2} onClick={() => onImageClick(2)} />
        </div>
        <div className="col-span-8 flex flex-col gap-4">
          <GalleryImageBox image={images[3]} index={3} onClick={() => onImageClick(3)} />
          <GalleryImageBox image={images[4]} index={4} onClick={() => onImageClick(4)} />
        </div>
      </div>
      
      {/* 06 + 07 一行 */}
      <div className="grid grid-cols-2 gap-6 w-11/12 ml-auto">
        <GalleryImageBox image={images[5]} index={5} className="mt-4" onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images[6]} index={6} onClick={() => onImageClick(6)} />
      </div>
      
      {/* 08 + 09 一行 */}
      <div className="grid grid-cols-2 gap-6 w-4/5 mx-auto">
        <GalleryImageBox image={images[7]} index={7} onClick={() => onImageClick(7)} />
        <GalleryImageBox image={images[8]} index={8} className="mt-8" onClick={() => onImageClick(8)} />
      </div>
      
      {/* 10-15 随机错落排布 - 参考 Japan 风格 */}
      {/* 10 偏右 */}
      <div className="w-3/4 ml-auto">
        <GalleryImageBox image={images[9]} index={9} onClick={() => onImageClick(9)} />
      </div>
      
      {/* 11 + 12 错落 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 mt-12">
          <GalleryImageBox image={images[10]} index={10} onClick={() => onImageClick(10)} />
        </div>
        <div className="col-span-6 col-start-7">
          <GalleryImageBox image={images[11]} index={11} onClick={() => onImageClick(11)} />
        </div>
      </div>
      
      {/* 13 居中窄幅 */}
      <div className="w-2/3 mx-auto">
        <GalleryImageBox image={images[12]} index={12} onClick={() => onImageClick(12)} />
      </div>
      
      {/* 14 偏左宽幅 */}
      <div className="w-11/12">
        <GalleryImageBox image={images[13]} index={13} onClick={() => onImageClick(13)} />
      </div>
      
      {/* 15 右下角 */}
      <div className="w-1/2 ml-auto">
        <GalleryImageBox image={images[14]} index={14} onClick={() => onImageClick(14)} />
      </div>
    </div>
  )
}

// 通用图库布局
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

export default function ProjectPage() {
  const params = useParams()
  const id = params.id as string
  const project = getProjectById(id)
  
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
  
  // 入场动画 - 白色遮罩立即渐出
  useEffect(() => {
    const fromTransition = isTransitioning()
    
    if (fromTransition) {
      // 立即开始渐出，不等待
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
      // 当滚动超过封面高度的80%时显示顶部导航
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">项目未找到</h1>
          <Link href="/#projects" className="text-slate-600 hover:text-slate-900 underline">
            返回首页
          </Link>
        </div>
      </main>
    )
  }
  
  // 计算视差效果 - 使用更平滑的曲线
  const parallaxOffset = scrollY * 0.4
  const heroOpacity = Math.max(0, 1 - (scrollY / 700) ** 1.2)
  const heroScale = 1 + Math.min(scrollY * 0.0002, 0.15)
  
  return (
    <main className="min-h-screen bg-white">
      {/* 图片放大查看器 */}
      <ImageLightbox 
        images={project.galleryImages || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* 入场白色遮罩 - 300ms渐出 */}
      <div 
        className={`fixed inset-0 z-[9999] bg-white pointer-events-none transition-opacity duration-300 ease-out ${
          showEntryOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* 固定顶部导航 - 滚动后显示 */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 transition-all duration-500 ease-out ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link
        href="/#projects"
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">返回</span>
      </Link>
      
      <Logo size="sm" />
      
      <div className="w-16" />
        </div>
      </header>
      
      {/* 全屏封面区域 - 带平滑视差效果 */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* 封面图片 - 使用 will-change 优化性能 */}
        <div 
          className="absolute inset-0 bg-slate-900 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
            transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          {project.coverImage ? (
            <img 
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* 返回按钮 - 封面上 */}
        <Link
        href="/#projects"
        className={`absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 ${
          headerVisible ? 'opacity-0' : 'opacity-100'
        }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">返回项目列表</span>
        </Link>
        
        {/* Logo - 封面右上角，白色反相 */}
        <div className={`absolute top-8 right-8 z-20 transition-all duration-300 ${
          headerVisible ? 'opacity-0' : 'opacity-100'
        }`}>
          <Logo size="md" inverted linkToHome={false} />
        </div>
        
        {/* 封面上的标题信息 */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-4xl">
            {/* 关键词标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            {/* 项目标题 */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {project.title}
            </h1>
            
            {/* 项目基本信息 */}
            <div className="flex flex-wrap gap-8 text-sm text-white/70">
              <div>
                <span className="text-white/50 mr-2">年份</span>
                <span className="text-white">{project.year}</span>
              </div>
              <div>
                <span className="text-white/50 mr-2">地点</span>
                <span className="text-white">{project.location}</span>
              </div>
              <div>
                <span className="text-white/50 mr-2">角色</span>
                <span className="text-white">{project.role}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 向下滚动提示 */}
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
      <article className="relative bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 项目描述 */}
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 font-normal">
              概述
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16">
              {project.fullDescription}
            </p>
            
            {/* 核心特点 */}
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 font-normal">
              核心特点
            </h2>
            <ul className="space-y-4 mb-16">
              {project.details.map((detail, i) => (
                <li key={i} className="flex gap-4 text-slate-600">
                  <span className="text-slate-300 font-mono text-sm">0{i + 1}</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 视频展示（如果有）- 点击播放/暂停，有声音 */}
          {project.video && <ClickToPlayVideo videoSrc={project.video} title="项目演示" aspectRatio="3/4" />}
          
          {/* 艺术化图库展示 - 按���片顺序严格排列，自适应长宽比 */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-8 font-normal">
              项目图集
            </h2>
            
            {project.galleryImages && project.galleryImages.length > 0 ? (
              // 根据项目 ID 选择不同的布局
              id === "nestide" ? <NestideGallery images={project.galleryImages} onImageClick={openLightbox} /> :
              id === "fu" ? <FuGallery images={project.galleryImages} onImageClick={openLightbox} /> :
              id === "veilspace" ? <VeilspaceGallery images={project.galleryImages} onImageClick={openLightbox} /> :
              <DefaultGallery images={project.galleryImages} onImageClick={openLightbox} />
            ) : (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm">暂无图片</p>
              </div>
            )}
          </div>
        </div>
      </article>
      
      {/* 底部导航 */}
      <footer className="border-t border-slate-200 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <Link 
            href="/#projects" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
          >
            查看所有项目
          </Link>
          
          <p className="text-slate-400 text-sm">
            FOSA 建筑作品集
          </p>
        </div>
      </footer>
    </main>
  )
}

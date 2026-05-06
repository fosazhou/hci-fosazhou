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

// inspiration link 组件
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
        <div className="w-16 h-px bg-slate-300" />
        <span className="text-xs text-slate-400 italic whitespace-nowrap">inspiration of</span>
        <div className="w-8 h-px bg-slate-300" />
      </div>
      
      {/* 作品封面缩略图 */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer bg-transparent border-none p-0 outline-none focus:outline-none"
      >
        <div 
          className={`w-24 h-32 bg-slate-100 overflow-hidden rounded-sm transition-all duration-300 ${
            isHovered ? "scale-110 shadow-lg" : ""
          }`}
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
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-xs text-slate-400">{workInfo.title}</span>
            </div>
          )}
          
          {/* 点击时的闪白效果 - 移到图片容器内 */}
          <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-300 rounded-sm ${
            isClicking ? "opacity-100" : "opacity-0"
          }`} />
        </div>
        
        {/* 悬停时的标题 */}
        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <span className="text-xs text-slate-500">{workInfo.title}</span>
        </div>
      </button>
    </div>
  )
}

// 简化的图片组件 - 使用原生懒加载提高性能，支持点击放大
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
  // 如果有图片数据，显示真实图片
  if (image?.src) {
    return (
      <div 
        className={`bg-slate-100 overflow-hidden rounded-sm group relative cursor-zoom-in ${className}`}
        style={{ aspectRatio }}
        onClick={onClick}
      >
        <img 
          src={image.src}
          alt={image.caption || label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        
        {/* 悬停时显示标注 */}
        {image.caption && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
            <span className="text-white text-xs p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      className={`bg-slate-100 overflow-hidden rounded-sm flex items-center justify-center hover:bg-slate-50 transition-colors duration-300 ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-slate-300 text-xs">{label}</span>
    </div>
  )
}

// Auckland 布局 - 纵向两栏：学术成果 + 游玩体验（上下排列）
// galleryImages 数组索引对应关系：
// [0-3] = 学术成果 竖幅 1-4 (比例2:3)
// [4-7] = 学术成果 横幅 1-4 (比例3:2)
// [8]   = 游玩体验 宽幅 (比例16:9)
// [9-10] = 游玩体验 方形 1-2 (比例1:1)
function AucklandGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-20">
      {/* 第一栏：学术成果 */}
      <section>
        <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 font-normal">
          学术成果
        </h3>
        <div className="space-y-8">
          {/* 4张竖幅 2:3 - 交错排列增加视觉层次 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <GalleryImageBox image={images?.[0]} aspectRatio="2/3" label="竖幅 1" onClick={() => onImageClick(0)} />
            <GalleryImageBox image={images?.[1]} aspectRatio="2/3" label="竖幅 2" className="mt-12" onClick={() => onImageClick(1)} />
            <GalleryImageBox image={images?.[2]} aspectRatio="2/3" label="竖幅 3" className="mt-6" onClick={() => onImageClick(2)} />
            <GalleryImageBox image={images?.[3]} aspectRatio="2/3" label="竖幅 4" className="mt-16" onClick={() => onImageClick(3)} />
          </div>
          
          {/* 4张横幅 3:2 */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            <GalleryImageBox image={images?.[4]} aspectRatio="3/2" label="横幅 1" onClick={() => onImageClick(4)} />
            <GalleryImageBox image={images?.[5]} aspectRatio="3/2" label="横幅 2" className="mt-8" onClick={() => onImageClick(5)} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GalleryImageBox image={images?.[6]} aspectRatio="3/2" label="横幅 3" className="mt-4" onClick={() => onImageClick(6)} />
            <GalleryImageBox image={images?.[7]} aspectRatio="3/2" label="横幅 4" onClick={() => onImageClick(7)} />
          </div>
        </div>
      </section>
      
      {/* 分隔线 */}
      <div className="w-24 h-px bg-slate-200 mx-auto" />
      
      {/* 第二栏：游玩体验 */}
      <section>
        <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-8 font-normal">
          游玩体验
        </h3>
        <div className="space-y-8">
          {/* 1张横幅 16:9 - 全宽 */}
          <GalleryImageBox image={images?.[8]} aspectRatio="16/9" label="宽幅 16:9" onClick={() => onImageClick(8)} />
          
          {/* 2张 1:1 - 错落排列 */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <GalleryImageBox image={images?.[9]} aspectRatio="1/1" label="方形 1" onClick={() => onImageClick(9)} />
            <GalleryImageBox image={images?.[10]} aspectRatio="1/1" label="方形 2" className="mt-16" onClick={() => onImageClick(10)} />
          </div>
        </div>
      </section>
    </div>
  )
}

// Russia 布局
// galleryImages 数组索引对应关系：
// [0]   = 竖幅 (比例2:3)
// [1-6] = 横幅 1-6 (比例3:2)
// [7-8] = 宽幅 1-2 (比例16:9)
function RussiaGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-8">
      {/* 第一行：1张竖幅 + 2张横幅 */}
      <div className="grid grid-cols-3 gap-6 items-start">
        <GalleryImageBox image={images?.[0]} aspectRatio="2/3" label="竖幅 2:3" onClick={() => onImageClick(0)} />
        <div className="col-span-2 space-y-4">
          <GalleryImageBox image={images?.[1]} aspectRatio="3/2" label="横幅 1" onClick={() => onImageClick(1)} />
          <GalleryImageBox image={images?.[2]} aspectRatio="3/2" label="横幅 2" onClick={() => onImageClick(2)} />
        </div>
      </div>
      
      {/* 第二行：4张横幅 3:2 */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[3]} aspectRatio="3/2" label="横幅 3" onClick={() => onImageClick(3)} />
        <GalleryImageBox image={images?.[4]} aspectRatio="3/2" label="横幅 4" className="mt-8" onClick={() => onImageClick(4)} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[5]} aspectRatio="3/2" label="横幅 5" className="mt-4" onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images?.[6]} aspectRatio="3/2" label="横幅 6" onClick={() => onImageClick(6)} />
      </div>
      
      {/* 第三行：2张横幅 16:9 */}
      <div className="space-y-6 mt-8">
        <GalleryImageBox image={images?.[7]} aspectRatio="16/9" label="宽幅 16:9 - 1" onClick={() => onImageClick(7)} />
        <GalleryImageBox image={images?.[8]} aspectRatio="16/9" label="宽幅 16:9 - 2" onClick={() => onImageClick(8)} />
      </div>
    </div>
  )
}

// Japan 布局 - 带 inspiration links
// galleryImages 数组索引对应关系：
// [0-2]  = Arbor组 竖幅 1-3 (比例3:4) - 连接到 Arbor 作品
// [3]    = FU组 竖幅 (比例3:4) - 连接到 FU 作品
// [4]    = FU组 横幅 (比例4:3) - 连接到 FU 作品
// [5-11] = 其他竖幅 5-11 (比例3:4)
// [12-16]= 其他横幅 2-6 (比例4:3)
// [17-18]= 宽幅 1-2 (比例16:9)
function JapanGallery({ images, onImageClick }: { images?: GalleryImage[], onImageClick: (index: number) => void }) {
  return (
    <div className="space-y-12">
      {/* 第一组：3张竖幅 + inspiration link to Arbor */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <GalleryImageBox image={images?.[0]} aspectRatio="3/4" label="竖幅 1" onClick={() => onImageClick(0)} />
          <GalleryImageBox image={images?.[1]} aspectRatio="3/4" label="竖幅 2" className="mt-6" onClick={() => onImageClick(1)} />
          <GalleryImageBox image={images?.[2]} aspectRatio="3/4" label="竖幅 3" className="mt-12" onClick={() => onImageClick(2)} />
        </div>
        <div className="self-center">
          <InspirationLink workId="arbor-of-enduring-harmonics" direction="right" />
        </div>
      </div>
      
      {/* 第二组：1竖+1横 + inspiration link to FU */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="grid grid-cols-2 gap-4 flex-1 max-w-md">
          <GalleryImageBox image={images?.[3]} aspectRatio="3/4" label="竖幅 4" onClick={() => onImageClick(3)} />
          <GalleryImageBox image={images?.[4]} aspectRatio="4/3" label="横幅 1" className="self-end" onClick={() => onImageClick(4)} />
        </div>
        <div className="self-center">
          <InspirationLink workId="fu" direction="right" />
        </div>
      </div>
      
      {/* 其余竖幅 3:4（共11张，已用4张，剩7张） */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <GalleryImageBox image={images?.[5]} aspectRatio="3/4" label="竖幅 5" onClick={() => onImageClick(5)} />
        <GalleryImageBox image={images?.[6]} aspectRatio="3/4" label="竖幅 6" className="mt-8" onClick={() => onImageClick(6)} />
        <GalleryImageBox image={images?.[7]} aspectRatio="3/4" label="竖幅 7" className="mt-4" onClick={() => onImageClick(7)} />
        <GalleryImageBox image={images?.[8]} aspectRatio="3/4" label="竖幅 8" className="mt-12" onClick={() => onImageClick(8)} />
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
        <GalleryImageBox image={images?.[9]} aspectRatio="3/4" label="竖幅 9" className="mt-6" onClick={() => onImageClick(9)} />
        <GalleryImageBox image={images?.[10]} aspectRatio="3/4" label="竖幅 10" onClick={() => onImageClick(10)} />
        <GalleryImageBox image={images?.[11]} aspectRatio="3/4" label="竖幅 11" className="mt-10" onClick={() => onImageClick(11)} />
      </div>
      
      {/* 其余横幅 4:3（共6张，已用1张，剩5张） */}
      <div className="grid grid-cols-2 gap-6">
        <GalleryImageBox image={images?.[12]} aspectRatio="4/3" label="横幅 2" onClick={() => onImageClick(12)} />
        <GalleryImageBox image={images?.[13]} aspectRatio="4/3" label="横幅 3" className="mt-6" onClick={() => onImageClick(13)} />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <GalleryImageBox image={images?.[14]} aspectRatio="4/3" label="横幅 4" onClick={() => onImageClick(14)} />
        <GalleryImageBox image={images?.[15]} aspectRatio="4/3" label="横幅 5" className="mt-4" onClick={() => onImageClick(15)} />
        <GalleryImageBox image={images?.[16]} aspectRatio="4/3" label="横幅 6" className="mt-8" onClick={() => onImageClick(16)} />
      </div>
      
      {/* 2张宽幅 16:9 */}
      <div className="space-y-6">
        <GalleryImageBox image={images?.[17]} aspectRatio="16/9" label="宽幅 16:9 - 1" onClick={() => onImageClick(17)} />
        <GalleryImageBox image={images?.[18]} aspectRatio="16/9" label="宽幅 16:9 - 2" onClick={() => onImageClick(18)} />
      </div>
    </div>
  )
}

export default function ExchangePage() {
  const params = useParams()
  const id = params.id as string
  const exchange = getExchangeById(id)
  
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">未找到该项目</h1>
          <Link href="/#exchanges" className="text-slate-600 hover:text-slate-900 underline">
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
  
  // 根据 id 渲染不同的图库，传递 galleryImages 数据
  const renderGallery = () => {
    const images = exchange.galleryImages
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
    <main className="min-h-screen bg-white">
      {/* 图片放大查看器 */}
      <ImageLightbox 
        images={exchange.galleryImages || []}
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
      
      {/* 固定顶部导航 */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 transition-all duration-500 ease-out ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link
        href="/#exchanges"
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
        <div 
          className="absolute inset-0 bg-slate-900 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${heroScale})`,
            opacity: heroOpacity,
            transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          {exchange.coverImage ? (
            <img 
              src={exchange.coverImage}
              alt={exchange.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
      <Link
        href="/#exchanges"
        className={`absolute top-8 left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 ${
          headerVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">返回国际经历</span>
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
              {exchange.keywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs text-white/80 border border-white/30 rounded-full backdrop-blur-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {exchange.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-6">
              {exchange.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-8 text-sm text-white/70">
              <div>
                <span className="text-white/50 mr-2">时间</span>
                <span className="text-white">{exchange.period}</span>
              </div>
              <div>
                <span className="text-white/50 mr-2">地点</span>
                <span className="text-white">{exchange.location}</span>
              </div>
              <div>
                <span className="text-white/50 mr-2">项目</span>
                <span className="text-white">{exchange.program}</span>
              </div>
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
      <article className="relative bg-white py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 font-normal">
              概述
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16">
              {exchange.fullDescription}
            </p>
            
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 font-normal">
              学习内容
            </h2>
            <ul className="space-y-4 mb-16">
              {exchange.details.map((detail, i) => (
                <li key={i} className="flex gap-4 text-slate-600">
                  <span className="text-slate-300 font-mono text-sm">0{i + 1}</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 图库展示区域 - 根据不同项目显示不同布局 */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-8 font-normal">
              项目图集
            </h2>
            
            <div className="max-w-5xl mx-auto">
              {renderGallery()}
            </div>
          </div>
        </div>
      </article>
      
      <footer className="border-t border-slate-200 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <Link 
            href="/#exchanges" 
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm"
          >
            查看所有经历
          </Link>
          
          <p className="text-slate-400 text-sm">
            FOSA 建筑作品集
          </p>
        </div>
      </footer>
    </main>
  )
}

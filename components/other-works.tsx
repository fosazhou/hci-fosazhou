"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { otherWorks, type OtherWork } from "@/lib/other-works-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"

// ============================================
// COMPONENT SECTION - 以下为结构代码
// 数据请在 lib/other-works-data.ts 中修改
// ============================================

// 带视频预览的图片/视频渲染组件
function WorkMedia({ 
  coverImage, 
  previewVideo, 
  alt, 
  isHovered,
  dark = false 
}: { 
  coverImage?: string
  previewVideo?: string
  alt: string
  isHovered: boolean
  dark?: boolean
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
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovered && previewVideo ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      {previewVideo && (
        <video
          ref={videoRef}
          src={previewVideo}
          muted
          loop
          playsInline
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {!coverImage && !previewVideo && (
        <div className={`w-full h-full ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />
      )}
    </>
  )
}

// 单个作品卡片组件 - 一刀斜切设计
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
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isTitleHovered, setIsTitleHovered] = useState(false)
  
  // 奇偶行决定图片在左还是右
  const isImageLeft = index % 2 === 0
  const isDark = work.id === "td-music-visualization"

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(work.keywords)
    navigateWithTransition(`/works/${work.id}`)
  }

  return (
    <div 
      className="cursor-pointer relative"
      onClick={handleClick}
    >
      {/* 主容器 - 全宽，带一刀斜切 */}
      <div className={`flex ${isImageLeft ? 'flex-row' : 'flex-row-reverse'} w-full h-48 md:h-56 relative`}>
        
        {/* 图片区域 - 占45%宽度，带大斜率斜切 */}
        <div 
          className={`
            relative h-full overflow-hidden
            ${isDark ? 'bg-slate-900' : 'bg-slate-100'}
            transition-transform duration-500 ease-out
            ${isImageLeft ? 'origin-left' : 'origin-right'}
            ${isImageHovered ? 'scale-[1.075]' : 'scale-100'}
          `}
          style={{
            width: '45%',
            clipPath: isImageLeft 
              ? 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'  // 右下角更大斜切
              : 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'  // 左下角更大斜切
          }}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <WorkMedia 
            coverImage={work.coverImage}
            previewVideo={work.previewVideo}
            alt={work.title}
            isHovered={isImageHovered}
            dark={isDark}
          />
        </div>
        
        {/* 文字信息区域 - 占55%宽度，内边距确保不被遮挡 */}
        <div 
          className={`
            h-full flex flex-col justify-center
            ${isImageLeft ? 'pl-6 md:pl-10 pr-4 text-left' : 'pr-6 md:pr-10 pl-4 text-right'}
          `}
          style={{ width: '55%' }}
        >
          <h3 
            className={`
              text-lg md:text-xl font-semibold text-slate-900 mb-1
              transition-all duration-300
              ${isImageLeft ? 'origin-left' : 'origin-right'}
              ${isTitleHovered ? 'text-black scale-[1.075]' : ''}
              inline-block
            `}
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
            suppressHydrationWarning
          >
            {work.title}
          </h3>
          <p className="text-xs text-slate-400 mb-2" suppressHydrationWarning>{work.titleCn}</p>
          <p className={`text-xs text-slate-500 leading-relaxed line-clamp-2 ${isImageLeft ? '' : 'ml-auto'}`} suppressHydrationWarning>
            {work.description}
          </p>
          
          {/* 关键词标签 */}
          <div className={`flex flex-wrap gap-1 mt-3 ${isImageLeft ? '' : 'justify-end'}`}>
            {work.keywords.slice(0, 2).map((tag, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 text-[10px] text-slate-400 border border-slate-200 rounded-full"
                suppressHydrationWarning
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
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
    if (!isLoaded) return "> 正在初始化行为追踪系统..."
    if (totalClicks === 0) return "> 系统追踪已启动，正在分析您的浏览偏好..."
    return `> Behavior analyzed. Top: [${topTag}]. Adaptive reordering enabled.`
  }, [isLoaded, totalClicks, topTag])

  return (
    <section id="other-works" className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
          Other Works
        </h2>
        
        {/* 自适应追踪状态 */}
        <div className="mb-8 font-mono text-[11px] text-slate-400 border border-slate-100 bg-slate-50/80 px-3 py-2 rounded">
          <div className="flex items-center gap-2">
            <span className="text-violet-400/80">[SYS]</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400/60">其他作品·智能排序</span>
            <span className="text-slate-300">|</span>
            <span className="flex-1 truncate">{statusText}</span>
          </div>
        </div>
        
        {/* 左右交错布局 - 一刀斜切设计 */}
        <div className="space-y-8 md:space-y-10">
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

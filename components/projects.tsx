"use client"

import React, { useMemo, useState, useEffect } from "react"
import { projects } from "@/lib/projects-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { usePageTransition } from "@/components/page-transition"

// ============================================
// COMPONENT SECTION - 以下为结构代码
// 项目数据请在 lib/projects-data.ts 中修改
// ============================================

// System Status Bar - 自适应追踪状态
function SystemStatus({ 
  isLoaded, 
  topTag, 
  totalClicks,
  weightsDisplay,
  sectionLabel 
}: { 
  isLoaded: boolean
  topTag: string | null
  totalClicks: number
  weightsDisplay: string
  sectionLabel: string
}) {
  const statusText = useMemo(() => {
    if (!isLoaded) {
      return "> 正在初始化行为追踪系统..."
    }
    if (totalClicks === 0) {
      return "> 系统追踪已启动，正在分析您的浏览偏好..."
    }
    return `> Behavior analyzed. Top interest: [${topTag}]. Adaptive UI reordering enabled. ${weightsDisplay ? `// ${weightsDisplay}` : ""}`
  }, [isLoaded, topTag, totalClicks, weightsDisplay])

  return (
    <div className="mb-6 font-mono text-[11px] text-slate-400 border border-slate-100 bg-slate-50/80 px-3 py-2 rounded">
      <div className="flex items-center gap-2">
        <span className="text-violet-400/80">[SYS]</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-400/60">{sectionLabel}</span>
        <span className="text-slate-300">|</span>
        <span className="flex-1 truncate">
          {statusText}
        </span>
      </div>
    </div>
  )
}

// Project Card Component with Video Preview
function ProjectCard({ 
  project, 
  onTrack,
  index 
}: { 
  project: typeof projects[0]
  onTrack: (tags: string[]) => void
  index: number
}) {
  const { navigateWithTransition } = usePageTransition()
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onTrack(project.keywords)
    navigateWithTransition(`/projects/${project.id}`)
  }

  // Handle video preview on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered])

  return (
    <div
      className="block cursor-pointer transition-all duration-500 ease-out"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <article>
        <div className="aspect-video w-full bg-slate-100 mb-4 overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.075] origin-center relative">
          {/* Cover Image */}
          {project.coverImage && (
            <img 
              src={project.coverImage} 
              alt={project.title}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovered && project.previewVideo ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
          {/* Preview Video (shows on hover) */}
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {/* Fallback */}
          {!project.coverImage && !project.previewVideo && (
            <div className="w-full h-full bg-slate-200" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 mb-2 transition-all duration-300 origin-left hover:text-black hover:scale-[1.075] inline-block" suppressHydrationWarning>
          {project.title}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-3" suppressHydrationWarning>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.keywords.map((keyword, i) => (
            <span 
              key={i}
              className="px-2 py-0.5 text-xs text-slate-500 border border-slate-200 rounded-full transition-colors duration-300 hover:border-slate-400"
              suppressHydrationWarning
            >
              {keyword}
            </span>
          ))}
        </div>
      </article>
    </div>
  )
}

export function Projects() {
  const { 
    isLoaded, 
    topTag, 
    totalClicks, 
    trackClick, 
    sortByPreference,
    getWeightsDisplay 
  } = useUserBehavior()

  // Sort projects by user preference
  const sortedProjects = useMemo(() => {
    if (!isLoaded) return projects
    return sortByPreference(projects)
  }, [isLoaded, sortByPreference])

  return (
    <section id="projects" className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-10">
          Selected Projects
        </h2>
        
        {/* 自适应追踪状态 - 核心作品展示 */}
        <SystemStatus 
          isLoaded={isLoaded}
          topTag={topTag}
          totalClicks={totalClicks}
          weightsDisplay={getWeightsDisplay()}
          sectionLabel="核心作品·自适应排序"
        />
        
        <div className="flex flex-col gap-10">
          {sortedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTrack={trackClick}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

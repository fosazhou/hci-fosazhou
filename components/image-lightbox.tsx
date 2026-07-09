"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxImage {
  src: string
  caption?: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])
  
  // 键盘导航
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
    }
  }, [isOpen, images.length, onClose])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
  
  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  if (!isOpen || images.length === 0) return null
  
  const currentImage = images[currentIndex]
  
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }
  
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button 
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </button>
      
      {/* 图片计数 */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
      
      {/* 左箭头 */}
      {images.length > 1 && (
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          onClick={goToPrev}
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
      )}
      
      {/* 图片容器 */}
      <div 
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={currentImage.src}
          alt={currentImage.caption || `图片 ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
        {currentImage.caption && (
          <p className="text-white/70 text-sm mt-4 text-center max-w-2xl">
            {currentImage.caption}
          </p>
        )}
      </div>
      
      {/* 右箭头 */}
      {images.length > 1 && (
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
          onClick={goToNext}
        >
          <ChevronRight className="w-10 h-10" />
        </button>
      )}
    </div>
  )
}

// 创建一个 Context 来管理 Lightbox 状态
import { createContext, useContext, ReactNode } from "react"

interface LightboxContextType {
  openLightbox: (images: LightboxImage[], index: number) => void
}

const LightboxContext = createContext<LightboxContextType | null>(null)

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider")
  }
  return context
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<LightboxImage[]>([])
  const [initialIndex, setInitialIndex] = useState(0)
  
  const openLightbox = useCallback((imgs: LightboxImage[], index: number) => {
    setImages(imgs)
    setInitialIndex(index)
    setIsOpen(true)
  }, [])
  
  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])
  
  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <ImageLightbox 
        images={images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
      />
    </LightboxContext.Provider>
  )
}

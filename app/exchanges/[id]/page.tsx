"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getExchangeById, type GalleryImage } from "@/lib/exchange-data"
import { useEffect, useState, useRef, useCallback, Suspense } from "react"
import { ImageLightbox } from "@/components/image-lightbox"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"
import { StatusIndicator } from "@/components/scan-line"

// Gallery Image Component
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
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <figure className={cn("group", className)}>
      <div 
        className={cn(
          "overflow-hidden rounded-lg cursor-zoom-in",
          "bg-[rgba(10,10,15,0.6)] border border-[rgba(34,211,238,0.1)]",
          "transition-all duration-300",
          "hover:border-[rgba(34,211,238,0.3)]"
        )}
        style={{
          boxShadow: isHovered ? "0 0 30px rgba(34, 211, 238, 0.15)" : "none"
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image.src}
          alt={image.caption || `Image ${index + 1}`}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground font-mono">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

// Default Gallery Layout
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

// Exchange Content Component
function ExchangeContent() {
  const params = useParams()
  const id = params.id as string
  const exchange = getExchangeById(id)
  
  // Behavior tracking
  useBehaviorTracking()
  
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
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
  
  const parallaxOffset = scrollY * 0.4
  const heroOpacity = Math.max(0, 1 - (scrollY / 700) ** 1.2)
  const heroScale = 1 + Math.min(scrollY * 0.0002, 0.15)
  
  return (
    <main className="min-h-screen">
      {/* Lightbox */}
      <ImageLightbox 
        images={exchange.galleryImages || []}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* Fixed Header */}
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
          
          <div className="w-16" />
        </div>
      </header>
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
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
            "absolute top-8 left-8 z-20 flex items-center gap-2",
            "text-foreground/70 hover:text-primary transition-all duration-300",
            headerVisible && "opacity-0"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-mono">BACK_TO_EXCHANGES</span>
        </Link>
        
        {/* Logo on hero */}
        <div className={cn(
          "absolute top-8 right-8 z-20 transition-all duration-300",
          headerVisible && "opacity-0"
        )}>
          <Logo size="md" linkToHome={false} />
        </div>
        
        {/* Hero content */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-4xl">
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-6">
              {exchange.keywords.map((keyword, i) => (
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
              {exchange.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-foreground/70 mb-6">{exchange.subtitle}</p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 text-sm font-mono">
              <div>
                <span className="text-muted-foreground/60 mr-2">PERIOD/</span>
                <span className="text-foreground">{exchange.period}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">LOCATION/</span>
                <span className="text-foreground">{exchange.location}</span>
              </div>
              <div>
                <span className="text-muted-foreground/60 mr-2">PROGRAM/</span>
                <span className="text-foreground">{exchange.program}</span>
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
          {/* Overview Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">OVERVIEW/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                PROGRAM_SUMMARY
              </span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {exchange.fullDescription}
            </p>
          </div>
          
          {/* Learning Content Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">LEARNING/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                KEY_EXPERIENCES
              </span>
            </div>
            <div className="space-y-4">
              {exchange.details.map((detail, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg",
                    "bg-[rgba(10,10,15,0.5)] border border-[rgba(34,211,238,0.08)]",
                    "transition-all duration-300",
                    "hover:border-[rgba(34,211,238,0.2)] hover:bg-[rgba(10,10,15,0.7)]"
                  )}
                >
                  <span className="text-[10px] font-mono text-primary/50 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground/85 text-sm leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gallery */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-mono text-primary/60 tracking-widest">GALLERY/</span>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
                EXCHANGE_IMAGES
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
            </div>
            
            {exchange.galleryImages && exchange.galleryImages.length > 0 ? (
              <DefaultGallery images={exchange.galleryImages} onImageClick={openLightbox} />
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground text-sm font-mono">NO_IMAGES_AVAILABLE</p>
              </div>
            )}
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

// Main Page Component
export default function ExchangePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">LOADING...</span>
        </div>
      </div>
    }>
      <ExchangeContent />
    </Suspense>
  )
}

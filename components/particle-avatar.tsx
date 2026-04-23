"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  brightness: number
  size: number
  char: string
}

interface ParticleAvatarProps {
  imageSrc: string
  className?: string
}

// ASCII 字符集，按亮度排序
const ASCII_CHARS = " .,:;i1tfLCG08@"

export function ParticleAvatar({ imageSrc, className = "" }: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // 从图片创建粒子
  const createParticles = useCallback((img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    // 创建临时 canvas 来读取图片像素
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    if (!tempCtx) return
    
    // 计算图片在 canvas 中的位置（居中裁剪）
    const imgRatio = img.width / img.height
    const canvasRatio = width / height
    
    let drawWidth, drawHeight, offsetX, offsetY
    
    if (imgRatio > canvasRatio) {
      drawHeight = height
      drawWidth = height * imgRatio
      offsetX = (width - drawWidth) / 2
      offsetY = 0
    } else {
      drawWidth = width
      drawHeight = width / imgRatio
      offsetX = 0
      offsetY = (height - drawHeight) / 2
    }
    
    tempCanvas.width = width
    tempCanvas.height = height
    tempCtx.fillStyle = "#000"
    tempCtx.fillRect(0, 0, width, height)
    tempCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    
    const imageData = tempCtx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    
    const particles: Particle[] = []
    const gap = 4 // 粒子间距
    
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const i = (y * width + x) * 4
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        
        // 计算亮度
        const brightness = (r + g + b) / 3 / 255
        
        // 只保留有一定亮度的像素
        if (brightness > 0.08) {
          const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1))
          
          particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            brightness,
            size: 1 + brightness * 1.5,
            char: ASCII_CHARS[charIndex]
          })
        }
      }
    }
    
    particlesRef.current = particles
    setIsLoaded(true)
  }, [])
  
  // 动画循环
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    
    ctx.fillStyle = "rgba(5, 5, 8, 0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const particles = particlesRef.current
    const mouse = mouseRef.current
    const mouseRadius = 80
    
    for (const p of particles) {
      // 计算与鼠标的距离
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < mouseRadius && dist > 0) {
        // 鼠标靠近时粒子被推开
        const force = (mouseRadius - dist) / mouseRadius
        const angle = Math.atan2(dy, dx)
        p.vx -= Math.cos(angle) * force * 2
        p.vy -= Math.sin(angle) * force * 2
      }
      
      // 弹簧力回到原位
      const springX = (p.originX - p.x) * 0.03
      const springY = (p.originY - p.y) * 0.03
      
      p.vx += springX
      p.vy += springY
      
      // 摩擦力
      p.vx *= 0.92
      p.vy *= 0.92
      
      // 更新位置
      p.x += p.vx
      p.y += p.vy
      
      // 计算当前偏移量（用于颜色变化）
      const offsetDist = Math.sqrt(
        Math.pow(p.x - p.originX, 2) + 
        Math.pow(p.y - p.originY, 2)
      )
      const colorMix = Math.min(offsetDist / 30, 1)
      
      // 绘制粒子（点阵风格）
      const baseAlpha = 0.3 + p.brightness * 0.7
      
      // 混合白色和玫红色
      if (colorMix > 0.3) {
        // 散开时变白
        ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha * (0.5 + colorMix * 0.5)})`
      } else {
        // 聚合时显示原始亮度（白色/灰色点阵）
        const gray = Math.floor(150 + p.brightness * 105)
        ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${baseAlpha})`
      }
      
      // 绘制小圆点
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // 添加扫描线效果
    const time = Date.now() * 0.001
    const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.height
    
    ctx.strokeStyle = "rgba(233, 30, 99, 0.03)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, scanY)
    ctx.lineTo(canvas.width, scanY)
    ctx.stroke()
    
    animationRef.current = requestAnimationFrame(animate)
  }, [])
  
  // 初始化
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      // 重新加载图片创建粒子
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => createParticles(img, canvas)
      img.src = imageSrc
    }
    
    updateSize()
    window.addEventListener("resize", updateSize)
    
    return () => {
      window.removeEventListener("resize", updateSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [imageSrc, createParticles])
  
  // 启动动画
  useEffect(() => {
    if (isLoaded) {
      animate()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded, animate])
  
  // 鼠标事件
  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  
  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 }
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[rgba(233,30,99,0.3)]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[rgba(233,30,99,0.3)]" />
      </div>
      
      {/* 粒子画布 */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      
      {/* 装饰性标签 */}
      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-muted-foreground/40 text-right">
        <div>PROFILE.RENDER</div>
        <div className="text-brand/40">PARTICLE_MATRIX</div>
      </div>
      
      {/* 角落装饰 */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-brand/20" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-brand/20" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-brand/20" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-brand/20" />
      
      {/* 加载状态 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-mono text-muted-foreground/50">
            LOADING...
          </div>
        </div>
      )}
    </div>
  )
}

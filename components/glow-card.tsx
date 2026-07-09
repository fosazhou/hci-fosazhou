"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "primary" | "secondary" | "accent"
  hover?: boolean
  pulse?: boolean
}

export function GlowCard({
  children,
  className,
  glowColor = "primary",
  hover = true,
  pulse = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const glowColors = {
    primary: "rgba(34, 211, 238, 0.15)",
    secondary: "rgba(59, 130, 246, 0.15)",
    accent: "rgba(14, 165, 233, 0.15)",
  }

  const borderColors = {
    primary: "rgba(34, 211, 238, 0.3)",
    secondary: "rgba(59, 130, 246, 0.3)",
    accent: "rgba(14, 165, 233, 0.3)",
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-lg overflow-hidden",
        "bg-[rgba(10,10,15,0.8)] backdrop-blur-xl",
        "border border-[rgba(34,211,238,0.1)]",
        "transition-all duration-300",
        hover && "hover:border-[rgba(34,211,238,0.3)]",
        pulse && "pulse-glow",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: isHovering && hover
          ? `0 0 30px ${glowColors[glowColor]}, inset 0 0 30px rgba(34, 211, 238, 0.03)`
          : `0 0 10px rgba(34, 211, 238, 0.05)`,
      }}
    >
      {/* Mouse follow glow effect */}
      {isHovering && hover && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
            opacity: 0.6,
          }}
        />
      )}
      
      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `linear-gradient(
            transparent 50%,
            rgba(34, 211, 238, 0.02) 50%
          )`,
          backgroundSize: "100% 4px",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Simple bordered card without mouse effects
export function TechCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden",
        "bg-[rgba(10,10,15,0.6)] backdrop-blur-md",
        "border border-[rgba(34,211,238,0.1)]",
        "transition-all duration-300",
        "hover:border-[rgba(34,211,238,0.25)]",
        "hover:bg-[rgba(10,10,15,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
}

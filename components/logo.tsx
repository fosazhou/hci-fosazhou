"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  inverted?: boolean
  linkToHome?: boolean
}

export function Logo({ 
  className = "", 
  size = "md", 
  inverted = false,
  linkToHome = true 
}: LogoProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl"
  }
  
  // Tech-style text logo
  const logoElement = (
    <div className={cn(
      "font-mono font-bold tracking-tight",
      sizeClasses[size],
      "text-foreground",
      className
    )}>
      <span className="text-primary">F</span>
      <span>OSA</span>
      <span className="text-primary/60 text-[0.6em] ml-1">_</span>
    </div>
  )
  
  if (linkToHome) {
    return (
      <Link 
        href="/" 
        className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {/* Decorative bracket */}
        <span className="text-primary/40 font-mono text-sm group-hover:text-primary/60 transition-colors">
          {"["}
        </span>
        {logoElement}
        <span className="text-primary/40 font-mono text-sm group-hover:text-primary/60 transition-colors">
          {"]"}
        </span>
      </Link>
    )
  }
  
  return logoElement
}

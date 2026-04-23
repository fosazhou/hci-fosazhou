"use client"

import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  inverted?: boolean // 白色版本，用于深色背景
  linkToHome?: boolean
}

export function Logo({ 
  className = "", 
  size = "md", 
  inverted = false,
  linkToHome = true 
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  }
  
  const logoElement = (
    <img 
      src="/images/logo.png"
      alt="Fosa Logo"
      className={`${sizeClasses[size]} object-contain ${inverted ? 'invert brightness-0 invert' : ''} ${className}`}
      style={inverted ? { filter: 'brightness(0) invert(1)' } : undefined}
    />
  )
  
  if (linkToHome) {
    return (
      <Link href="/" className="hover:opacity-70 transition-opacity">
        {logoElement}
      </Link>
    )
  }
  
  return logoElement
}

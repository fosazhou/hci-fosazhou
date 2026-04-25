"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { useRouter } from "next/navigation"

// 滚动位置存储 key
const SCROLL_KEY = "homepage-scroll-position"
// 过渡状态 key
const TRANSITION_KEY = "page-transitioning"

interface TransitionContextType {
  navigateWithTransition: (url: string) => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function usePageTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider")
  }
  return ctx
}

// 保存滚动位置
export function saveScrollPosition() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString())
  }
}

// 恢复滚动位置
export function restoreScrollPosition() {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      const position = parseInt(saved, 10)
      const attempts = [0, 50, 100, 200, 500]
      attempts.forEach((delay) => {
        setTimeout(() => {
          window.scrollTo({ top: position, behavior: "instant" })
        }, delay)
      })
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }
}

// 标记正在过渡
export function setTransitioning(value: boolean) {
  if (typeof window !== "undefined") {
    if (value) {
      sessionStorage.setItem(TRANSITION_KEY, "true")
    } else {
      sessionStorage.removeItem(TRANSITION_KEY)
    }
  }
}

// 检查是否正在过渡
export function isTransitioning(): boolean {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(TRANSITION_KEY) === "true"
  }
  return false
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [showOverlay, setShowOverlay] = useState(false)

  const navigateWithTransition = useCallback((url: string) => {
    // 保存滚动位置
    saveScrollPosition()
    // 标记正在过渡
    setTransitioning(true)
    // 显示白色遮罩并立即导航（不等待）
    setShowOverlay(true)
    router.push(url)
  }, [router])

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* 闪黑遮罩 - 即时显示，无过渡延迟，匹配深色主题 */}
      <div 
        className={`fixed inset-0 z-[9999] bg-[#0a0a0f] pointer-events-none ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transition: 'none' }}
      />
    </TransitionContext.Provider>
  )
}

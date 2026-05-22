"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export type Language = "zh" | "zh-hk" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (zh: string, en: string, zhHk?: string) => string
  isZh: boolean
  isZhHk: boolean
  isEn: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "preferred_language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")
  const [showOverlay, setShowOverlay] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language
      if (stored && (stored === "zh" || stored === "zh-hk" || stored === "en")) {
        setLanguageState(stored)
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return
    
    // 显示纯黑遮罩
    setShowOverlay(true)
    
    // 等待遮罩淡入后切换语言
    setTimeout(() => {
      setLanguageState(lang)
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      }
      
      // 等待内容更新后淡出遮罩
      setTimeout(() => {
        setShowOverlay(false)
      }, 100)
    }, 200)
  }, [language])

  // Translation helper
  const t = useCallback((zh: string, en: string, zhHk?: string) => {
    if (language === "zh-hk") return zhHk || zh
    return language === "zh" ? zh : en
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isZh: language === "zh",
    isZhHk: language === "zh-hk",
    isEn: language === "en",
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
      {/* 纯黑过渡遮罩 - 使用 fixed 定位覆盖整个页面 */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000',
          zIndex: 9999,
          pointerEvents: showOverlay ? 'auto' : 'none',
          opacity: showOverlay ? 1 : 0,
          transition: 'opacity 300ms ease-in-out',
        }}
        aria-hidden="true"
      />
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

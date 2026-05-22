"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (zh: string, en: string) => string
  isZh: boolean
  isEn: boolean
  isTransitioning: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "preferred_language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language
      if (stored && (stored === "zh" || stored === "en")) {
        setLanguageState(stored)
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return
    
    // 开始过渡动画
    setIsTransitioning(true)
    
    // 更快切换语言，过渡更平滑
    setTimeout(() => {
      setLanguageState(lang)
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      }
      
      // 完成过渡
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 100)
  }, [language])

  // Translation helper
  const t = useCallback((zh: string, en: string) => {
    return language === "zh" ? zh : en
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isZh: language === "zh",
    isEn: language === "en",
    isTransitioning,
  }

  return (
    <LanguageContext.Provider value={value}>
      <div 
        style={{
          opacity: isTransitioning ? 0.6 : 1,
          filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
          transform: isTransitioning ? 'scale(0.995)' : 'scale(1)',
          transition: 'opacity 150ms ease-out, filter 150ms ease-out, transform 150ms ease-out',
        }}
      >
        {children}
      </div>
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

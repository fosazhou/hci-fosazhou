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
    
    // 直接切换，不使用过渡动画（避免破坏 fixed 定位）
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    }
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

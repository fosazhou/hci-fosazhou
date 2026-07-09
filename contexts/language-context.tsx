"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react"

export type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (zh: string, en: string) => string
  isZh: boolean
  isEn: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "preferred_language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")
  const [showOverlay, setShowOverlay] = useState(false)
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current)
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current)

    setShowOverlay(true)

    switchTimerRef.current = setTimeout(() => {
      setLanguageState(lang)
      if (typeof window !== "undefined") {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      }

      overlayTimerRef.current = setTimeout(() => {
        setShowOverlay(false)
      }, 100)
    }, 200)
  }, [language])

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) clearTimeout(switchTimerRef.current)
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current)
    }
  }, [])

  const t = useCallback((zh: string, en: string) => {
    return language === "zh" ? zh : en
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isZh: language === "zh",
    isEn: language === "en",
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          zIndex: 9999,
          pointerEvents: showOverlay ? "auto" : "none",
          opacity: showOverlay ? 1 : 0,
          transition: "opacity 300ms ease-in-out",
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

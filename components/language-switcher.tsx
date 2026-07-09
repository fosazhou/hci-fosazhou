"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage, type Language } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const languageOptions: { value: Language; label: string; labelEn: string }[] = [
  { value: "zh", label: "简体中文", labelEn: "Simplified Chinese" },
  { value: "en", label: "English", labelEn: "English" },
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languageOptions.find(l => l.value === language) || languageOptions[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md",
          "border border-primary/30 bg-primary/10",
          "text-xs font-mono tracking-wider",
          "text-foreground/80 hover:text-foreground",
          "transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/15",
          isOpen && "border-primary/50 bg-primary/20"
        )}
      >
        <span className="text-primary">
          {language === "zh" ? "中" : "EN"}
        </span>
        <span className="text-muted-foreground/60">/</span>
        <span className="text-muted-foreground/60">
          {language === "zh" ? "EN" : "中"}
        </span>
        <ChevronDown className={cn(
          "h-3.5 w-3.5 text-primary/60 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute top-full right-0 mt-1 z-50",
            "min-w-[140px] py-1 rounded-md",
            "bg-[rgba(10,10,15,0.95)] backdrop-blur-md",
            "border border-primary/20",
            "shadow-lg shadow-black/20",
            "animate-in fade-in-0 slide-in-from-top-2 duration-200"
          )}
        >
          {languageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLanguage(option.value)
                setIsOpen(false)
              }}
              className={cn(
                "w-full px-3 py-2 text-left",
                "text-[11px] font-mono tracking-wider",
                "transition-colors duration-150",
                language === option.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

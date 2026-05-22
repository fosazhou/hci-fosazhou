"use client"

import { useLanguage, type Language } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div 
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded",
        "border border-primary/20 bg-primary/5",
        className
      )}
    >
      <button
        onClick={() => setLanguage("zh")}
        className={cn(
          "px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-all",
          language === "zh" 
            ? "bg-primary/20 text-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        中
      </button>
      <span className="text-muted-foreground/30">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-all",
          language === "en" 
            ? "bg-primary/20 text-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  )
}

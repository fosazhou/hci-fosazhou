"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Logo } from "@/components/logo"
import { StatusIndicator } from "@/components/scan-line"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"

export function Header() {
  const searchParams = useSearchParams()
  const currentView = searchParams.get("view") || "projects"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[rgba(34,211,238,0.1)]">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Left side - Logo and status */}
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[rgba(34,211,238,0.1)]">
              <StatusIndicator status="active" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
                SYS.ONLINE
              </span>
            </div>
          </div>
          
          {/* Center - Current view indicator */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/?view=projects"
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono tracking-wider transition-all duration-300 rounded",
                currentView === "projects"
                  ? "text-brand bg-brand/10 border border-brand/30"
                  : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/5"
              )}
            >
              {currentView === "projects" && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              )}
              PROJECTS
            </Link>
            <span className="text-muted-foreground/20 font-mono text-xs">/</span>
            <Link
              href="/?view=about"
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 text-[11px] font-mono tracking-wider transition-all duration-300 rounded",
                currentView === "about"
                  ? "text-primary bg-primary/10 border border-primary/30"
                  : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-white/5"
              )}
            >
              {currentView === "about" && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
              ABOUT
            </Link>
          </div>
          
          {/* Right side - Language switcher and CV link */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <Link
              href="/cv"
              className="group relative px-3 py-1.5 text-[11px] font-mono tracking-wider text-muted-foreground transition-all duration-300 hover:text-primary"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-primary/40 group-hover:text-primary transition-colors">
                  CV
                </span>
              </span>
              <span className="absolute inset-0 rounded bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            </Link>
            
            {/* Mobile view indicator */}
            <div className="lg:hidden flex items-center gap-1 px-2 py-1 rounded border border-[rgba(34,211,238,0.1)]">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                currentView === "projects" ? "bg-brand" : "bg-primary"
              )} />
              <span className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">
                {currentView === "projects" ? "PROJ" : "ABOUT"}
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Bottom border glow - color changes based on view */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent transition-all duration-500",
          currentView === "projects" 
            ? "via-brand/40" 
            : "via-primary/40"
        )} 
      />
    </header>
  )
}

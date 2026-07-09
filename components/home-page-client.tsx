"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Hero } from "@/components/hero"
import { Education } from "@/components/education"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Footer } from "@/components/footer"
import { HomeClientContent } from "@/components/home-client-content"

export type ViewType = "projects" | "about"

interface HomePageClientProps {
  initialView?: ViewType
}

export function HomePageClient({ initialView = "projects" }: HomePageClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentView, setCurrentView] = useState<ViewType>(initialView)
  
  // Sync with URL
  useEffect(() => {
    const viewParam = searchParams.get("view")
    if (viewParam === "projects" || viewParam === "about") {
      setCurrentView(viewParam)
    }
  }, [searchParams])
  
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
    router.push(`/?view=${view}`, { scroll: false })
  }

  return (
    <>
      <Hero currentView={currentView} onViewChange={handleViewChange} />
      
      <div className="w-[85%] lg:w-[75%] mx-auto">
        {/* View indicator bar - scrolls with content */}
        <div className="py-4 border-b border-[rgba(34,211,238,0.1)]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleViewChange("projects")}
              className={cn(
                "group flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300",
                currentView === "projects"
                  ? "text-brand border-b-2 border-brand"
                  : "text-muted-foreground/60 hover:text-muted-foreground border-b-2 border-transparent"
              )}
            >
              <span className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentView === "projects" ? "bg-brand animate-pulse" : "bg-muted-foreground/30"
              )} />
              VIEW_PROJECTS
            </button>
            
            <button
              onClick={() => handleViewChange("about")}
              className={cn(
                "group flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300",
                currentView === "about"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground/60 hover:text-muted-foreground border-b-2 border-transparent"
              )}
            >
              <span className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentView === "about" ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
              )} />
              ABOUT_ME
            </button>
            
            <div className="flex-1" />
            
            <span className="text-[9px] font-mono text-muted-foreground/40 tracking-widest">
              CURRENT_VIEW: {currentView.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Content based on view */}
        <div className="relative">
          {/* Projects View */}
          <div 
            className={cn(
              "transition-all duration-500",
              currentView === "projects" 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
            )}
          >
            {currentView === "projects" && <HomeClientContent />}
          </div>
          
          {/* About View */}
          <div 
            className={cn(
              "transition-all duration-500",
              currentView === "about" 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4 pointer-events-none absolute inset-0"
            )}
          >
            {currentView === "about" && (
              <>
                <Education />
                <About />
                <Skills />
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="w-[85%] lg:w-[75%] mx-auto">
        <Footer />
      </div>
    </>
  )
}

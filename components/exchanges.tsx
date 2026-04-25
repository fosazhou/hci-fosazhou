"use client"

import { exchanges, type Exchange } from "@/lib/exchange-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { useMemo, useState } from "react"
import { usePageTransition } from "@/components/page-transition"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface ExchangesProps {
  filterIds?: string[]
}

export function Exchanges({ filterIds }: ExchangesProps) {
  const { navigateWithTransition } = usePageTransition()
  const { 
    isLoaded, 
    trackClick, 
    sortByPreference 
  } = useUserBehavior()

  const sortedExchanges = useMemo(() => {
    const filtered = filterIds 
      ? exchanges.filter(e => filterIds.includes(e.id))
      : exchanges
    if (!isLoaded) return filtered
    return sortByPreference(filtered)
  }, [isLoaded, sortByPreference, filterIds])

  const handleClick = (e: React.MouseEvent, exchange: Exchange) => {
    e.preventDefault()
    trackClick(exchange.keywords)
    navigateWithTransition(`/exchanges/${exchange.id}`)
  }

  return (
    <section id="exchanges" className="py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] font-mono text-muted-foreground/30">03</span>
            <div className="w-8 h-px bg-muted-foreground/10" />
          </div>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
            International Experience
          </h2>
        </header>
        
        {/* Behavior tracker */}
        <BehaviorTrackerDisplay section="exchanges" itemCount={sortedExchanges.length} />
        
        {/* Exchanges grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedExchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              index={index}
              onClick={(e) => handleClick(e, exchange)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExchangeCard({ 
  exchange, 
  index,
  onClick 
}: { 
  exchange: Exchange
  index: number
  onClick: (e: React.MouseEvent) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article 
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-300",
          "border border-[rgba(255,255,255,0.04)]",
          "bg-[rgba(255,255,255,0.01)]",
          isHovered && "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
        )}
      >
        {/* Image */}
        <div className="aspect-[16/10] w-full overflow-hidden relative">
          {exchange.coverImage ? (
            <img 
              src={exchange.coverImage} 
              alt={exchange.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isHovered && "scale-105"
              )}
            />
          ) : (
            <div className="w-full h-full bg-muted/5" />
          )}
          
          {/* Gradient overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent",
              "transition-opacity duration-300",
              isHovered ? "opacity-70" : "opacity-90"
            )}
          />
          
          {/* Location badge */}
          <div className="absolute bottom-4 left-4">
            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">
              {exchange.location}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 
                className={cn(
                  "text-base font-medium transition-colors duration-300 mb-1",
                  isHovered ? "text-foreground" : "text-foreground/70"
                )}
              >
                {exchange.title}
              </h3>
              <p className="text-xs text-muted-foreground/40 font-mono">
                {exchange.period}
              </p>
            </div>
            
            <ArrowUpRight 
              className={cn(
                "w-4 h-4 flex-shrink-0 transition-all duration-300 mt-1",
                isHovered 
                  ? "text-primary opacity-100" 
                  : "text-muted-foreground/20 opacity-0"
              )}
            />
          </div>
          
          <p className="text-sm text-muted-foreground/40 leading-relaxed line-clamp-2 mb-4">
            {exchange.description}
          </p>
          
          <div className="flex items-center gap-2">
            {exchange.keywords.slice(0, 2).map((keyword, i) => (
              <span 
                key={i}
                className="text-[10px] font-mono text-muted-foreground/25 uppercase tracking-wider"
              >
                {keyword}
                {i < 1 && <span className="ml-2 text-muted-foreground/10">/</span>}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover accent */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 h-px bg-primary/30 transition-all duration-500",
            isHovered ? "w-full" : "w-0"
          )}
        />
      </div>
    </article>
  )
}

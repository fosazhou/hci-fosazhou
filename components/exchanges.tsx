"use client"

import { exchanges, type Exchange } from "@/lib/exchange-data"
import { useUserBehavior } from "@/hooks/use-user-behavior"
import { useMemo, useState } from "react"
import { usePageTransition } from "@/components/page-transition"
import { GlowCard } from "@/components/glow-card"
import { HoverScan } from "@/components/scan-line"
import { BehaviorTrackerDisplay } from "@/components/behavior-tracker-display"
import { cn } from "@/lib/utils"
import { MapPin, Calendar, ExternalLink } from "lucide-react"

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

  // Filter and sort by user preference
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
    <section id="exchanges" className="py-16 border-t border-[rgba(34,211,238,0.1)]">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">P.03/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            INTERNATIONAL_EXPERIENCE
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>
        
        {/* Behavior tracker display */}
        <BehaviorTrackerDisplay section="exchanges" itemCount={sortedExchanges.length} />
        
        {/* Exchanges grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div 
      className="block cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowCard hover className="overflow-hidden h-full">
        {/* Image */}
        <div className="aspect-[4/3] w-full bg-[rgba(10,10,15,0.8)] overflow-hidden relative">
          {exchange.coverImage ? (
            <img 
              src={exchange.coverImage} 
              alt={exchange.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                isHovered && "scale-105"
              )}
            />
          ) : (
            <div className="w-full h-full bg-muted/20" />
          )}
          
          <HoverScan active={isHovered} />
          
          {/* Location badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(10,10,15,0.8)] border border-primary/20 backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-primary/60" />
            <span className="text-[10px] font-mono text-primary" suppressHydrationWarning>
              {exchange.title.split(" ")[0]}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <span className="text-[10px] font-mono text-primary/40 mb-2 block">
            {String(index + 1).padStart(2, '0')}/
          </span>
          
          <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2 group-hover:text-primary transition-colors" suppressHydrationWarning>
            {exchange.title}
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span className="font-mono" suppressHydrationWarning>{exchange.period}</span>
          </div>
          
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2" suppressHydrationWarning>
            {exchange.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5">
            {exchange.keywords.slice(0, 3).map((keyword, i) => (
              <span 
                key={i}
                className={cn(
                  "px-2 py-0.5 text-[9px] font-mono tracking-wider",
                  "text-primary/70 border border-primary/20 rounded-full",
                  "bg-primary/5 uppercase"
                )}
                suppressHydrationWarning
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

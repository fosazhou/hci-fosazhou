"use client"

import { useEffect, useState } from "react"

// Horizontal scan effect for cards on hover
export function HoverScan({ active = false }: { active?: boolean }) {
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    if (active) {
      setIsScanning(true)
      const timer = setTimeout(() => setIsScanning(false), 600)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (!isScanning) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 bottom-0 w-[100px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.15) 50%, transparent 100%)`,
          animation: "hoverScan 0.6s ease-out forwards",
        }}
      />
      <style jsx>{`
        @keyframes hoverScan {
          0% {
            left: -100px;
          }
          100% {
            left: calc(100% + 100px);
          }
        }
      `}</style>
    </div>
  )
}

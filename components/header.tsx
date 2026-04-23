"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { StatusIndicator } from "@/components/scan-line"

const navItems = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "CV", href: "/cv", isCV: true },
  { label: "CONTACT", href: "#contact" },
]

export function Header() {
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
          
          {/* Right side - Navigation */}
          <ul className="flex items-center gap-1">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group relative px-3 py-1.5 text-[11px] font-mono tracking-wider text-muted-foreground transition-all duration-300 hover:text-primary"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="text-primary/40 group-hover:text-primary transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden sm:inline">/</span>
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.slice(0, 3)}</span>
                  </span>
                  {/* Hover glow effect */}
                  <span className="absolute inset-0 rounded bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  )
}

"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"

const navItems = [
  { label: "主页", href: "/" },
  { label: "项目", href: "#projects" },
  { label: "关于", href: "#about" },
  { label: "简历", href: "/cv", isCV: true },
  { label: "联系", href: "#contact" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between border-b border-slate-200">
          <Logo size="sm" />
          
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                {'isCV' in item && item.isCV ? (
                  <Link
                    href={item.href}
                    className="text-sm text-slate-900 transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm text-slate-900 transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

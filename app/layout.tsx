import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TechBackground } from '@/components/tech-background'
import { LanguageProvider } from '@/contexts/language-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: 'FOSA | Cross-Scale Intelligent Interaction & Design Computing',
  description: 'Designer with an architecture background exploring cross-scale intelligent interaction and design computing—from the body and interface to space and the city—through generative design, data-driven and parametric methods.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <LanguageProvider>
          <TechBackground />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

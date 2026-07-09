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
  title: 'FOSA | Adaptive Architecture Portfolio',
  description: 'Architecture Student Exploring Low-Altitude Urban Infrastructure, Generative Spatial Systems and Interactive Environments.',
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

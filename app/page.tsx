import { Suspense } from "react"
import { Header } from "@/components/header"
import { HomePageClient } from "@/components/home-page-client"

function HomePageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-muted-foreground/60 tracking-widest">LOADING...</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="relative pt-14">
        <Suspense fallback={<HomePageFallback />}>
          <HomePageClient />
        </Suspense>
      </main>
    </>
  )
}

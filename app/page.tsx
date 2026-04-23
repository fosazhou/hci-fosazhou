import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Education } from "@/components/education"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Footer } from "@/components/footer"
import { HomeClientContent } from "@/components/home-client-content"

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <div className="w-[85%] lg:w-[75%] mx-auto">
          {/* Projects with Timeline - client side */}
          <HomeClientContent />
          <Education />
          <About />
          <Skills />
        </div>
      </main>
      <div className="w-[85%] lg:w-[75%] mx-auto">
        <Footer />
      </div>
    </>
  )
}

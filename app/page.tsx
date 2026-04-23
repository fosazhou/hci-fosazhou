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
      <main>
        <Hero />
        <div className="w-[70%] mx-auto">
          <Education />
          <About />
          {/* 包含中文数据的组件完全在客户端渲染 */}
          <HomeClientContent />
          <Skills />
        </div>
      </main>
      <div className="w-[70%] mx-auto">
        <Footer />
      </div>
    </>
  )
}

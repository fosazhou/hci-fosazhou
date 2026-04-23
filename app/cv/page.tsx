import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Logo } from "@/components/logo"

// ============================================
// DATA SECTION - 在此处修改您的简历配置
// ============================================
//
// 简历 PDF 文件路径:
//   请将您的简历 PDF 放入 /public 文件夹
//   例如: /public/cv.pdf 或 /public/resume/FOSA-CV-2025.pdf
//
// ============================================

const cvData = {
  // 简历 PDF 文件路径 - 修改此处即可更换简历
  pdfPath: "/cv.pdf",
  // 页面标题
  pageTitle: "个人简历",
  // 下载时的文件名（可选，不填则使用原文件名）
  downloadFileName: "FOSA-简历.pdf",
}

// ============================================
// COMPONENT SECTION - 以下为结构代码
// ============================================

export const metadata = {
  title: "个人简历 | FOSA",
  description: "FOSA 的个人简历",
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">返回首页</span>
            </Link>
            
            <Logo size="sm" />
            
            <a 
              href={cvData.pdfPath}
              download={cvData.downloadFileName}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">下载文档</span>
            </a>
          </div>
        </div>
      </header>
      
      {/* 简历预览区域 */}
      <main className="pt-16 min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="bg-white shadow-lg rounded-sm overflow-hidden">
            <div className="aspect-[210/297] w-full bg-slate-50 flex items-center justify-center">
              <iframe
                src={cvData.pdfPath}
                className="w-full h-full"
                title="简历预览"
              />
            </div>
          </div>
          
          <p className="mt-6 text-center text-sm text-slate-500">
            如简历未能正常显示，请
            <a 
              href={cvData.pdfPath} 
              download={cvData.downloadFileName}
              className="text-slate-900 underline underline-offset-4 hover:opacity-60 transition-opacity ml-1"
            >
              点击此处下载 PDF 文档
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}

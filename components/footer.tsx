import { FileText } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">
          Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <p className="text-xs text-slate-500 mb-1">邮箱</p>
            <a
              href="mailto:fosazhou@gmail.com"
              className="text-sm text-slate-900 hover:opacity-60 transition-opacity underline underline-offset-4"
            >
              fosazhou@gmail.com
            </a>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">微信</p>
            <p className="text-sm text-slate-900">FFOOSSAA</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">简历</p>
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 text-sm text-slate-900 hover:opacity-60 transition-opacity underline underline-offset-4"
            >
              <FileText className="h-3.5 w-3.5" />
              查看简历
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} FOSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

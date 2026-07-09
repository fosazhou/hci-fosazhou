import { FileText, Mail, MessageSquare, ExternalLink } from "lucide-react"
import Link from "next/link"
import { StatusIndicator } from "@/components/scan-line"

export function Footer() {
  return (
    <footer id="contact" className="relative py-16 px-6 lg:px-8 border-t border-[rgba(34,211,238,0.1)]">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[10px] font-mono text-primary/60 tracking-widest">05/</span>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            CONTACT_PROTOCOLS
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Email */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-3 w-3 text-primary/60" />
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                EMAIL
              </p>
            </div>
            <a
              href="mailto:fosazhou@gmail.com"
              className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-mono"
            >
              fosazhou@gmail.com
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* WeChat */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-3 w-3 text-primary/60" />
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                WECHAT
              </p>
            </div>
            <p className="text-sm text-foreground font-mono">FFOOSSAA</p>
          </div>

          {/* CV */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-3 w-3 text-primary/60" />
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                CV_DOCUMENT
              </p>
            </div>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-mono"
            >
              VIEW_CV.pdf
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-6 border-t border-[rgba(34,211,238,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusIndicator status="active" />
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
              SYS.VERSION_2.0 | ADAPTIVE_INTERFACE
            </p>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground">
            © {new Date().getFullYear()} FOSA
          </p>
        </div>
      </div>
    </footer>
  )
}

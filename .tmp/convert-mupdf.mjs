import * as mupdf from "mupdf"
import fs from "node:fs/promises"
import path from "node:path"

const src = "/vercel/share/v0-project/.tmp/airsite-real.pdf"
const outDir = "/vercel/share/v0-project/public/images/works/airsite/pages"
await fs.mkdir(outDir, { recursive: true })

const data = await fs.readFile(src)
const doc = mupdf.Document.openDocument(data, "application/pdf")
const n = doc.countPages()
console.log("[v0] total pages:", n)

// scale ~2x for crisp output
const zoom = 2
const matrix = mupdf.Matrix.scale(zoom, zoom)

for (let i = 0; i < n; i++) {
  const page = doc.loadPage(i)
  const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true)
  const png = pixmap.asPNG()
  const file = path.join(outDir, `page-${String(i + 1).padStart(2, "0")}.png`)
  await fs.writeFile(file, png)
  console.log("[v0] wrote", file, png.length, "bytes")
  pixmap.destroy()
  page.destroy()
}
console.log("[v0] done")

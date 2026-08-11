import { pdf } from "pdf-to-img"
import fs from "node:fs/promises"
import path from "node:path"

const src = "/vercel/share/v0-project/.tmp/airsite.pdf"
const outDir = "/vercel/share/v0-project/public/images/works/airsite/pages"
await fs.mkdir(outDir, { recursive: true })

const document = await pdf(src, { scale: 2.5 })
let i = 0
for await (const image of document) {
  i++
  const file = path.join(outDir, `page-${String(i).padStart(2, "0")}.png`)
  await fs.writeFile(file, image)
  console.log("[v0] wrote", file, image.length, "bytes")
}
console.log("[v0] total pages:", i)

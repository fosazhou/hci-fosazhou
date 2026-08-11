import sharp from "sharp"
import fs from "node:fs/promises"
import path from "node:path"

const dir = "/vercel/share/v0-project/public/images/works/airsite/pages"
const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".png")).sort()

for (const f of files) {
  const src = path.join(dir, f)
  const out = path.join(dir, f.replace(/\.png$/, ".webp"))
  const meta = await sharp(src).metadata()
  await sharp(src)
    .resize({ width: Math.min(meta.width, 2000), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  const st = await fs.stat(out)
  console.log("[v0]", f, "->", path.basename(out), Math.round(st.size / 1024), "KB", `(orig ${meta.width}x${meta.height})`)
  await fs.rm(src)
}
console.log("[v0] compression done")

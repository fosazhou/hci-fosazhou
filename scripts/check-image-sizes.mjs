import fs from 'fs'
import path from 'path'

const imageDir = './public/images/projects'
const MAX_SIZE_KB = 500 // 建议最大尺寸 500KB

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files)
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

const files = getAllFiles(imageDir)
const largeFiles = []

console.log('\\n=== 图片大小检查 ===\\n')

for (const file of files) {
  const stats = fs.statSync(file)
  const sizeKB = Math.round(stats.size / 1024)
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  
  if (sizeKB > MAX_SIZE_KB) {
    largeFiles.push({ file, sizeKB, sizeMB })
    console.log(`[过大] ${file}: ${sizeKB}KB (${sizeMB}MB)`)
  } else {
    console.log(`[正常] ${file}: ${sizeKB}KB`)
  }
}

console.log('\\n=== 总结 ===')
console.log(`检查图片总数: ${files.length}`)
console.log(`超过 ${MAX_SIZE_KB}KB 的图片: ${largeFiles.length}`)

if (largeFiles.length > 0) {
  console.log('\\n=== 需要压缩的图片 ===')
  console.log('建议将以下图片压缩到 500KB 以内（宽度不超过 1920px）:\\n')
  largeFiles
    .sort((a, b) => b.sizeKB - a.sizeKB)
    .forEach(({ file, sizeMB }) => {
      console.log(`- ${file} (${sizeMB}MB)`)
    })
  console.log('\\n压缩建议:')
  console.log('- 使用 TinyPNG (tinypng.com) 或 Squoosh (squoosh.app)')
  console.log('- 将 PNG 转换为 JPG（如果不需要透明度）')
  console.log('- 图片宽度建议不超过 1920px')
  console.log('- 质量设置 80-85% 通常足够')
}

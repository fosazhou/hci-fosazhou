const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../public/images/projects');

function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / (1024 * 1024);
}

function scanDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, results);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      const sizeMB = getFileSizeInMB(filePath);
      const relativePath = path.relative(path.join(__dirname, '../public'), filePath);
      results.push({
        path: '/' + relativePath,
        sizeMB: sizeMB.toFixed(2),
        sizeKB: Math.round(sizeMB * 1024),
        needsCompression: sizeMB > 0.5
      });
    }
  }
  
  return results;
}

console.log('\n========== 图片大小检查报告 ==========\n');

const results = scanDirectory(projectsDir);
results.sort((a, b) => parseFloat(b.sizeMB) - parseFloat(a.sizeMB));

console.log('所有图片（按大小排序）:\n');
results.forEach(img => {
  const status = img.needsCompression ? '⚠️ 需要压缩' : '✓ OK';
  console.log(`${img.path}`);
  console.log(`   大小: ${img.sizeKB} KB (${img.sizeMB} MB) ${status}`);
});

const largeImages = results.filter(img => img.needsCompression);
console.log('\n========== 需要压缩的图片 ==========\n');
if (largeImages.length > 0) {
  console.log(`共 ${largeImages.length} 张图片超过 500KB，建议压缩到 300KB 以下:\n`);
  largeImages.forEach(img => {
    console.log(`- ${img.path} (${img.sizeKB} KB)`);
  });
  console.log('\n建议：');
  console.log('1. 使用 TinyPNG (tinypng.com) 或 Squoosh (squoosh.app) 压缩');
  console.log('2. 目标：每张图片 < 300KB，最大不超过 500KB');
  console.log('3. 建议分辨率：宽度不超过 1920px');
} else {
  console.log('所有图片大小都在合理范围内！');
}

console.log('\n========== 总计 ==========');
const totalSizeMB = results.reduce((sum, img) => sum + parseFloat(img.sizeMB), 0);
console.log(`图片总数: ${results.length}`);
console.log(`总大小: ${totalSizeMB.toFixed(2)} MB`);

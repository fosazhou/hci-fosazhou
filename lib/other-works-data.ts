// ============================================
// DATA SECTION - 在此处修改您的其他作品
// ============================================
// 
// 视频预览路径（悬停时自动播放）:
//   - TD音乐可视化: /public/videos/works/td-preview.mp4
//
// ============================================

// 图片对象类型 - 包含图片路径和标注
export interface GalleryImage {
  src: string      // 图片路径
  caption: string  // 图片标注
}

export interface OtherWork {
  id: string
  title: string
  titleCn: string
  description: string
  keywords: string[]
  fullDescription: string
  year: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2024.9"
  endDate: string    // 如 "2024.11"
  category: string
  awards?: string
  details: string[]
  // 封面图片路径（放入 public 文件夹，例如 "/images/works/arbor-cover.jpg"）
  coverImage?: string
  // 悬停预览视频路径（可选，悬停时自动播放约5秒）
  // 请将视频放入 /public/videos/works/ 文件夹
  previewVideo?: string
  // 详情页演示视频路径（可选，详情页顶部展示）
  demoVideo?: string
  // 详情页图片列表 - 每张图片都可以有标注
  galleryImages?: GalleryImage[]
  // 自定义封面比例（可选，如 "4/3", "16/9", "1/1" 等，不填则使用默认布局）
  aspectRatio?: string
}

export const otherWorks: OtherWork[] = [
  {
    id: "arbor-of-enduring-harmonics",
    // 英文标题
    title: "Arbor of Enduring Harmonics",
    // 中文标题
    titleCn: "栎渊泽",
    // 简短描述
    description: "2025 第十三届全国大学生数字媒体科技作品及创意竞赛，陕西省第三等奖（组长）",
    // 关键词标签
    keywords: ["竞赛", "建筑设计", "省级奖项"],
    // 封面图片 - 请替换为您的图片路径
    coverImage: "/images/works/arbor/cover.jpg",
    // 项目图集 - 11张图片
    galleryImages: [
      { src: "/images/works/arbor/01.jpg", caption: "" },
      { src: "/images/works/arbor/02.png", caption: "" },
      { src: "/images/works/arbor/03.png", caption: "" },
      { src: "/images/works/arbor/04.png", caption: "" },
      { src: "/images/works/arbor/05.png", caption: "" },
      { src: "/images/works/arbor/06.png", caption: "" },
      { src: "/images/works/arbor/07.jpg", caption: "" },
      { src: "/images/works/arbor/08.jpg", caption: "" },
      { src: "/images/works/arbor/09.jpg", caption: "" },
      { src: "/images/works/arbor/10.jpg", caption: "" },
      { src: "/images/works/arbor/11.jpg", caption: "" },
    ],
    fullDescription: "参与第十三届全国大学生数字媒体科技作品及创意竞赛，作品探索建筑与自然环境的和谐共生关系，获得陕西省三等奖。",
    year: "2024",
    startDate: "2024.9",
    endDate: "2024.11",
    category: "建筑设计竞赛",
    awards: "陕西省三等奖",
    details: [
      "探索建筑与自然环境的和谐共生",
      "结合传统建筑元素与现代设计语言",
      "关注空间序列与体验设计",
    ],
  },
  {
    id: "integrates-hans-hui-nationality",
    title: "Integrates Hans & Hui Nationality",
    titleCn: "西仓新月驿",
    description: "2025 陕西省第十八届实体空间搭建竞赛，三等奖（核心成员）",
    keywords: ["竞赛", "文化融合", "城市更新"],
    // 封面图片 - 请替换为您的图片路径
    coverImage: "/images/works/xicang/cover.png",
    // 项目图集 - 12张图片
    galleryImages: [
      { src: "/images/works/xicang/01.jpg", caption: "" },
      { src: "/images/works/xicang/02.jpg", caption: "" },
      { src: "/images/works/xicang/03.jpg", caption: "" },
      { src: "/images/works/xicang/04.jpg", caption: "" },
      { src: "/images/works/xicang/05.jpg", caption: "" },
      { src: "/images/works/xicang/06.jpg", caption: "" },
      { src: "/images/works/xicang/07.jpg", caption: "" },
      { src: "/images/works/xicang/08.jpg", caption: "" },
      { src: "/images/works/xicang/09.jpg", caption: "" },
      { src: "/images/works/xicang/10.jpg", caption: "" },
      { src: "/images/works/xicang/11.jpg", caption: "" },
      { src: "/images/works/xicang/12.jpg", caption: "" },
    ],
    fullDescription: "作品聚焦于汉回民族文化融合的空间表达，通过建筑设计促进社区和谐与文化交流。",
    year: "2025",
    startDate: "2025.4",
    endDate: "2025.4",
    category: "建筑设计竞赛",
    awards: "三等奖（核心成员）",
    details: [
      "探索汉回民族文化融合的空间表达",
      "城市更新视角下的社区设计",
      "促进社区和谐与文化交流",
    ],
  },
{
    id: "zhihui-jiangxia",
    title: "智绘江夏·水乡新韵",
    titleCn: "智绘江夏·水乡新韵",
    description: "2024 年全国高校 AIGC 数智建筑与文创产品设计大赛，建筑类组国奖三等奖（组长）",
    keywords: ["AIGC", "数智设计", "国家级奖项"],
    coverImage: "/images/works/aigc/cover.jpg",
    // 项目图集 - 3张图片
    galleryImages: [
      { src: "/images/works/aigc/01.png", caption: "" },
      { src: "/images/works/aigc/02.png", caption: "" },
      { src: "/images/works/aigc/03.png", caption: "" },
    ],
    fullDescription: "运用 AIGC 技术探索江南水乡建筑的数字化设计方法，获得全国三等奖。",
    year: "2024",
    startDate: "2024.9",
    endDate: "2024.11",
    category: "数智设计竞赛",
    awards: "国奖三等奖（组长）",
    details: [
      "运用 AIGC 技术进行建筑设计",
      "探索江南水乡建筑的数字化表达",
      "结合传统文化与智能设计方法",
    ],
  },
  {
    id: "lumley-tower",
    title: "Lumley Tower",
    titleCn: "局部构造实体模型",
    description: "课程作业，1:10 建筑构造实体模型，结构细部与水体系的详图绘制",
    keywords: ["建构", "模型制作", "ARCH-TECH 315"],
    coverImage: "/images/works/lumley/cover.jpg",
    // 项目图集 - 8张图片
    galleryImages: [
      { src: "/images/works/lumley/01.png", caption: "" },
      { src: "/images/works/lumley/02.jpg", caption: "" },
      { src: "/images/works/lumley/03.jpg", caption: "" },
      { src: "/images/works/lumley/04.jpg", caption: "" },
      { src: "/images/works/lumley/05.jpg", caption: "" },
      { src: "/images/works/lumley/06.jpg", caption: "" },
      { src: "/images/works/lumley/07.jpg", caption: "" },
      { src: "/images/works/lumley/08.jpg", caption: "" },
    ],
    fullDescription: "奥克兰大学 ARCH-TECH 315 课程作业，制作 Lumley Tower 的 1:10 局部构造实体模型，深入研究建筑结构细部与水体系的设计逻辑。",
    year: "2025",
    startDate: "2025.9",
    endDate: "2025.9",
    category: "课程作业",
    details: [
      "1:10 比例局部构造实体模型",
      "结构细部与连接节点研究",
      "水体系的详图绘制与分析",
    ],
  },
  {
    id: "energize-commons",
    title: "Energize Commons",
    titleCn: "光合空间",
    description: "2025 第十届「两岸新锐设计竞赛·华灿奖」（组长）",
    keywords: ["竞赛", "社区空间", "环境设计"],
    coverImage: "/images/works/energize/cover.png",
    // 项目图集 - 8张图片
    galleryImages: [
      { src: "/images/works/energize/01.png", caption: "" },
      { src: "/images/works/energize/02.png", caption: "" },
      { src: "/images/works/energize/03.png", caption: "" },
      { src: "/images/works/energize/04.png", caption: "" },
      { src: "/images/works/energize/05.png", caption: "" },
      { src: "/images/works/energize/06.png", caption: "" },
      { src: "/images/works/energize/07.png", caption: "" },
      { src: "/images/works/energize/08.png", caption: "" },
    ],
    fullDescription: "以 Grasshopper 为载体进行参数化环境设计，探索自然光与社区空间的关系，获台湾国家三等奖。",
    year: "2025",
    startDate: "2025.11",
    endDate: "2025.11",
    category: "环境设计竞赛",
    awards: "国家三等奖（组长）",
    details: [
      "以 Grasshopper 为载体进行参数化设计",
      "探索自然光与社区空间的关系",
      "可量化的环境设计策略",
    ],
  },

  {
    id: "portfolio-website",
    title: "Portfolio Website Design",
    titleCn: "个人作品集网站设计",
    description: "基于 Next.js 和 React 构建的交互式建筑作品集网站，采用自适应阅读模式和时间轴导航系统",
    keywords: ["Web Design", "Next.js", "Interactive"],
    coverImage: "/images/works/portfolio/cover.png",
    fullDescription: "设计并开发个人建筑作品集网站，集成自适应阅读模式系统，根据用户行为智能切换快速浏览、过程探索和研究深入三种阅读体验。采用时间轴导航、粒子效果头像、科技风格UI等创新交互设计。",
    year: "2026",
    startDate: "2026.3",
    endDate: "2026.5",
    category: "网页设计",
    details: [
      "自适应阅读模式系统设计",
      "时间轴导航与项目筛选",
      "响应式布局与动效设计",
      "Next.js + React + Tailwind CSS 技术栈",
    ],
  },
]

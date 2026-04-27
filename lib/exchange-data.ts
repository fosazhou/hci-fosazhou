// ============================================
// DATA SECTION - 在此处修改您的国际经历
// ============================================

// 图片对象类型 - 包含图片路径和标注
export interface GalleryImage {
  src: string      // 图片路径
  caption: string  // 图片标注
}

export interface Exchange {
  id: string
  title: string
  subtitle: string
  description: string
  keywords: string[]
  fullDescription: string
  period: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2025.7"
  endDate: string    // 如 "2025.11"
  location: string
  program: string
  details: string[]
  coverImage?: string
  // 详情页图片列表 - 每张图片都可以有标注
  galleryImages?: GalleryImage[]
}

export const exchanges: Exchange[] = [
  {
    id: "auckland-exchange",
    title: "University of Auckland exchange program · 新西兰 奥克兰",
    subtitle: "QS World Ranking #65",
    description: "为期半年的学术交流项目，参与城市设计工作室与可持续建筑研究。",
    keywords: ["Exchange Program", "Urban Design", "Sustainable Architecture"],
    coverImage: "/images/exchange/auckland/cover.JPG",
    // 项目图集 - 修改 src 和 caption
    galleryImages: [
      { src: "/images/exchange/auckland/01.jpg", caption: "奥克兰大学建筑学院" },
      { src: "/images/exchange/auckland/02.jpg", caption: "城市设计工作室课程" },
      { src: "/images/exchange/auckland/03.jpg", caption: "滨水区域考察" },
      { src: "/images/exchange/auckland/04.jpg", caption: "滨水区域考察" },
      { src: "/images/exchange/auckland/05.png", caption: "滨水区域考察" },
      { src: "/images/exchange/auckland/06.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/auckland/07.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/auckland/08.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/auckland/09.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/auckland/10.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/auckland/11.jpg", caption: "在此输入图片描述" },
    ],
    fullDescription: "在奥克兰大学建筑与规划学院的交换学习期间，深入参与了城市设计工作室课程，探索太平洋地区独特的建筑语境与可持续设计方法。",
    period: "2025.7 - 2025.11",
    startDate: "2025.7",
    endDate: "2025.11",
    location: "Auckland, New Zealand",
    program: "Exchange Program",
    details: [
      "参与城市设计工作室，研究奥克兰滨水区域更新方案",
      "学习新西兰本土毛利文化与建筑的融合实践",
      "完成可持续建筑材料与被动式设计策略课程",
      "与当地建筑事务所进行学术访问与交流",
      "参与学院组织的澳新地区建筑考察活动"
    ]
  },
  {
    id: "russia-workshop",
    title: "China–Russia International Winter Workshop · 俄罗斯 伊尔库兹克",
    subtitle: "Irkutsk State Technical University",
    description: "中俄国际联合冬季工作坊，探索极寒气候下的建筑设计与城市规划。",
    keywords: ["International Workshop", "Cold Climate Design", "Cross-cultural Collaboration"],
    coverImage: "/images/exchange/russia/cover.jpg",
    // 项目图集 - 修改 src 和 caption
    galleryImages: [
      { src: "/images/exchange/russia/01.jpg", caption: "冬季工作坊现场" },
      { src: "/images/exchange/russia/02.png", caption: "西伯利亚建筑考察" },
      { src: "/images/exchange/russia/03.jpg", caption: "联合设计成果汇报" },
      { src: "/images/exchange/russia/04.JPG", caption: "滨水区域考察" },
      { src: "/images/exchange/russia/05.jpg", caption: "滨水区域考察" },
      { src: "/images/exchange/russia/06.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/russia/07.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/russia/08.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/russia/09.jpg", caption: "在此输入图片描述" },
    ],
    fullDescription: "参与中俄高校联合举办的国际冬季工作坊，在西伯利亚独特的极寒环境中探索建筑与城市的关系。",
    period: "2025.3 - 2025.4",
    startDate: "2025.3",
    endDate: "2025.4",
    location: "Irkutsk, Russia",
    program: "International Workshop",
    details: [
      "参与极寒气候下的建筑设计工作坊",
      "研究西伯利亚传统木构建筑与现代建筑的融合",
      "与俄罗斯学生进行跨文化设计合作",
      "考察伊尔库茨克历史城区与贝加尔湖地区建筑",
      "完成联合设计成果并进行双语汇报展示"
    ]
  },
  {
    id: "japan-ando",
    title: "Tadao Ando Architectural Study Tour · 日本关西",
    subtitle: "Kansai Region, Japan",
    description: "日本关西地区安藤忠雄建筑专项考察，实地研习清水混凝土建筑与空间诗学。",
    keywords: ["Architecture Study Tour", "Tadao Ando", "Japanese Modernism"],
    coverImage: "/images/exchange/japan/cover.jpg",
    // 项目图集 - 修改 src 和 caption
    galleryImages: [
      { src: "/images/exchange/japan/01.jpg", caption: "光之教堂实景" },
      { src: "/images/exchange/japan/02.jpg", caption: "清水混凝土细部" },
      { src: "/images/exchange/japan/03.jpg", caption: "直岛艺术之旅" },
      { src: "/images/exchange/japan/04.jpg", caption: "滨水区域考察" },
      { src: "/images/exchange/japan/05.jpg", caption: "滨水区域考察" },
      { src: "/images/exchange/japan/06.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/07.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/08.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/09.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/10.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/11.jpg", caption: "光之教堂实景" },
      { src: "/images/exchange/japan/12.JPG", caption: "清水混凝土细部" },
      { src: "/images/exchange/japan/13.jpg", caption: "直岛艺术之旅" },
      { src: "/images/exchange/japan/14.JPG", caption: "滨水区域考察" },
      { src: "/images/exchange/japan/15.JPG", caption: "滨水区域考察" },
      { src: "/images/exchange/japan/16.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/17.jpg", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/18.JPG", caption: "在此输入图片描述" },
      { src: "/images/exchange/japan/19.JPG", caption: "在此输入图片描述" },
    ],
    fullDescription: "前往日本关西地区进行安藤忠雄建筑作品专项考察，深入研究其清水混凝土建筑语言、光影运用与空间序列设计。",
    period: "2024.7",
    startDate: "2024.7",
    endDate: "2024.7",
    location: "Osaka / Kobe / Awaji Island, Japan",
    program: "Architectural Study Tour",
    details: [
      "考察光之教堂、风之教堂、水之教堂三部曲",
      "参观直岛地中美术馆与李禹焕美术馆",
      "研究清水混凝土建造工艺与细部处理",
      "分析安藤忠雄作品中的光影与空间序列",
      "撰写建筑考察报告与设计反思"
    ]
  },
]

export function getExchangeById(id: string): Exchange | undefined {
  return exchanges.find(exchange => exchange.id === id)
}

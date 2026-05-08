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
    description: "为期半年的学术交流项目，成果获2025年建筑学院本科生优秀毕业设计。",
    keywords: ["Exchange Program", "Architectural Technology", "Sustainable Architecture"],
    coverImage: "/images/exchange/auckland/cover.JPG",
    // 项目图集 - 修改 src 和 caption
    galleryImages: [
      { src: "/images/exchange/auckland/01.jpg", caption: "车间加工钢板过程" },
      { src: "/images/exchange/auckland/02.jpg", caption: "钢板折弯" },
      { src: "/images/exchange/auckland/03.jpg", caption: "MEDIA课程成果" },
      { src: "/images/exchange/auckland/04.jpg", caption: "TECH课程成果" },
      { src: "/images/exchange/auckland/05.png", caption: "1:10 钢柱构造模型成果" },
      { src: "/images/exchange/auckland/06.JPG", caption: "与奥克兰导师Bill合照" },
      { src: "/images/exchange/auckland/07.JPG", caption: "Final Crit" },
      { src: "/images/exchange/auckland/08.jpg", caption: "获得优秀毕业设计" },
      { src: "/images/exchange/auckland/09.JPG", caption: "皇后镇体验跳伞" },
      { src: "/images/exchange/auckland/10.jpg", caption: "去汉密尔顿开卡丁车" },
      { src: "/images/exchange/auckland/11.jpg", caption: "船翻太平洋里了" },
    ],
    fullDescription: "在奥克兰大学建筑与规划学院的交换学习期间，深入参与了城市设计工作室课程，探索太平洋地区独特的建筑语境与可持续设计方法，并取得优秀毕业设计。",
    period: "2025.7 - 2025.11",
    startDate: "2025.7",
    endDate: "2025.11",
    location: "Auckland, New Zealand",
    program: "Exchange Program",
    details: [
      "参与城市设计工作室，研究奥克兰滨水区域更新方案",
      "学习新西兰本土毛利文化与建筑的融合实践",
      "1:10 实体构造模型制作",
      "与当地建筑事务所进行学术访问与交流",
      "参与学院组织的澳新地区建筑考察活动"
    ]
  },
  {
    id: "russia-workshop",
    title: "China–Russia International Winter Workshop · 俄罗斯 伊尔库兹克",
    subtitle: "Irkutsk State Technical University",
    description: "探索 AI 教育科研集群的空间组织关系，获中俄国际联合冬季工作坊工作坊三等奖。",
    keywords: ["International Workshop", "Artificial Intelligence Campus", "Cross-cultural Collaboration"],
    coverImage: "/images/exchange/russia/cover.jpg",
    // 项目图集 - 修改 src 和 caption
    galleryImages: [
      { src: "/images/exchange/russia/01.jpg", caption: "项目小组合影" },
      { src: "/images/exchange/russia/02.png", caption: "双语汇报展示联合设计成果" },
      { src: "/images/exchange/russia/03.jpg", caption: "工作坊现场" },
      { src: "/images/exchange/russia/04.JPG", caption: "学校团队合影" },
      { src: "/images/exchange/russia/05.jpg", caption: "工作坊中的合作伙伴" },
      { src: "/images/exchange/russia/06.jpg", caption: "在贝加尔湖畔看到了狼狗" },
      { src: "/images/exchange/russia/07.jpg", caption: "五颜六色地工作中..." },
      { src: "/images/exchange/russia/08.jpg", caption: "获工作坊三等奖" },
      { src: "/images/exchange/russia/09.jpg", caption: "irkutsk state technical university" },
    ],
    fullDescription: "参与 International Baikal Winter University of Urban Planning 国际冬季工作坊，以贝加尔湖畔人工智能校园为设计主题，提出面向 AI 教育、科研协作与节能运行的校园空间组织方案。获得工作坊三等奖。",
    period: "2025.3 - 2025.4",
    startDate: "2025.3",
    endDate: "2025.4",
    location: "Irkutsk, Russia",
    program: "International Workshop",
    details: [
      "研究 AI 教育科研集群的校园空间组织",
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
      { src: "/images/exchange/japan/01.jpg", caption: "在狭山池美术馆的水帘廊道" },
      { src: "/images/exchange/japan/02.jpg", caption: "两侧水流像瀑布一样倾泻而下" },
      { src: "/images/exchange/japan/03.jpg", caption: "水流像瀑布一样倾泻而下" },
      { src: "/images/exchange/japan/04.jpg", caption: "丰岛美术馆的天窗" },
      { src: "/images/exchange/japan/05.jpg", caption: "丰岛美术馆外景" },
      { src: "/images/exchange/japan/06.jpg", caption: "陶板名画庭" },
      { src: "/images/exchange/japan/07.JPG", caption: "陶板名画庭" },
      { src: "/images/exchange/japan/08.JPG", caption: "地中美术馆中庭" },
      { src: "/images/exchange/japan/09.jpg", caption: "安藤博物馆" },
      { src: "/images/exchange/japan/10.JPG", caption: "从横窗看向地中美术馆中庭" },
      { src: "/images/exchange/japan/11.jpg", caption: "在兵库县立美术馆捕捉到的建筑师团队合照" },
      { src: "/images/exchange/japan/12.JPG", caption: "从横窗看向地中美术馆中庭" },
      { src: "/images/exchange/japan/13.jpg", caption: "从横窗看向地中美术馆中庭" },
      { src: "/images/exchange/japan/14.JPG", caption: "在丰岛骑行" },
      { src: "/images/exchange/japan/15.JPG", caption: "李禹焕美术馆" },
      { src: "/images/exchange/japan/16.jpg", caption: "本福寺水御堂" },
      { src: "/images/exchange/japan/17.jpg", caption: "兵库县立美术馆" },
      { src: "/images/exchange/japan/18.JPG", caption: "李禹焕美术馆外景" },
      { src: "/images/exchange/japan/19.JPG", caption: "淡路梦舞台的落日" },
    ],
    fullDescription: "前往日本关西地区进行安藤忠雄建筑作品专项考察，深入研究其清水混凝土建筑语言、光影运用与空间序列设计。",
    period: "2024.7",
    startDate: "2024.7",
    endDate: "2024.7",
    location: "Osaka / Kobe / Awaji Island, Japan",
    program: "Architectural Study Tour",
    details: [
      "考察安藤忠雄建筑",
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

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
  titleEn?: string
  subtitle: string
  subtitleEn?: string
  description: string
  descriptionEn?: string
  keywords: string[]
  keywordsEn?: string[]
  fullDescription: string
  fullDescriptionEn?: string
  period: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2025.7"
  endDate: string    // 如 "2025.11"
  location: string
  locationEn?: string
  program: string
  programEn?: string
  details: string[]
  detailsEn?: string[]
  coverImage?: string
  // 详情页图片列表 - 每张图片都可以有标注
  galleryImages?: GalleryImage[]
  galleryImagesEn?: GalleryImage[]
}

export const exchanges: Exchange[] = [
  {
    id: "auckland-exchange",
    title: "University of Auckland exchange program · 新西兰 奥克兰",
    titleEn: "University of Auckland Exchange Program",
    subtitle: "QS World Ranking #65",
    subtitleEn: "QS World Ranking #65",
    description: "为期半年的学术交流项目，成果获2025年建筑学院本科生优秀毕业设计。",
    descriptionEn: "A half-year academic exchange program, awarded Outstanding Undergraduate Graduation Design of the School of Architecture 2025.",
    keywords: ["Exchange Program", "Architectural Technology", "Sustainable Architecture"],
    keywordsEn: ["Exchange Program", "Architectural Technology", "Sustainable Architecture"],
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
    galleryImagesEn: [
      { src: "/images/exchange/auckland/01.jpg", caption: "Steel plate processing in workshop" },
      { src: "/images/exchange/auckland/02.jpg", caption: "Steel plate bending" },
      { src: "/images/exchange/auckland/03.jpg", caption: "MEDIA course outcome" },
      { src: "/images/exchange/auckland/04.jpg", caption: "TECH course outcome" },
      { src: "/images/exchange/auckland/05.png", caption: "1:10 Steel column construction model" },
      { src: "/images/exchange/auckland/06.JPG", caption: "Photo with Auckland tutor Bill" },
      { src: "/images/exchange/auckland/07.JPG", caption: "Final Crit" },
      { src: "/images/exchange/auckland/08.jpg", caption: "Outstanding Graduation Design Award" },
      { src: "/images/exchange/auckland/09.JPG", caption: "Skydiving in Queenstown" },
      { src: "/images/exchange/auckland/10.jpg", caption: "Go-karting in Hamilton" },
      { src: "/images/exchange/auckland/11.jpg", caption: "Boat capsized in the Pacific" },
    ],
    fullDescription: "在奥克兰大学建筑与规划学院的交换学习期间，深入参与了城市设计工作室课程，探索太平洋地区独特的建筑语境与可持续设计方法，并取得优秀毕业设计。",
    fullDescriptionEn: "During the exchange at the University of Auckland School of Architecture and Planning, deeply participated in urban design studio courses, explored the unique architectural context and sustainable design methods of the Pacific region, and achieved Outstanding Graduation Design.",
    period: "2025.7 - 2025.11",
    startDate: "2025.7",
    endDate: "2025.11",
    location: "Auckland, New Zealand",
    locationEn: "Auckland, New Zealand",
    program: "Exchange Program",
    programEn: "Exchange Program",
    details: [
      "参与城市设计工作室，研究奥克兰滨水区域更新方案",
      "学习新西兰本土毛利文化与建筑的融合实践",
      "1:10 实体构造模型制作",
      "与当地建筑事务所进行学术访问与交流",
      "参与学院组织的澳新地区建筑考察活动"
    ],
    detailsEn: [
      "Participated in urban design studio, researching Auckland waterfront renewal",
      "Studied integration of New Zealand Maori culture and architecture",
      "1:10 physical construction model making",
      "Academic visits and exchanges with local architecture firms",
      "Participated in Australia-New Zealand architectural study tours"
    ]
  },
  {
    id: "russia-workshop",
    title: "China–Russia International Winter Workshop · 俄罗斯 伊尔库兹克",
    titleEn: "China-Russia International Winter Workshop",
    subtitle: "Irkutsk State Technical University",
    subtitleEn: "Irkutsk State Technical University",
    description: "探索 AI 教育科研集群的空间组织关系，获中俄国际联合冬季工作坊工作坊三等奖。",
    descriptionEn: "Exploring spatial organization of AI education research clusters, won Third Prize at China-Russia International Winter Workshop.",
    keywords: ["International Workshop", "Artificial Intelligence Campus", "Cross-cultural Collaboration"],
    keywordsEn: ["International Workshop", "Artificial Intelligence Campus", "Cross-cultural Collaboration"],
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
    galleryImagesEn: [
      { src: "/images/exchange/russia/01.jpg", caption: "Project team photo" },
      { src: "/images/exchange/russia/02.png", caption: "Bilingual presentation of joint design" },
      { src: "/images/exchange/russia/03.jpg", caption: "Workshop scene" },
      { src: "/images/exchange/russia/04.JPG", caption: "School team photo" },
      { src: "/images/exchange/russia/05.jpg", caption: "Workshop partners" },
      { src: "/images/exchange/russia/06.jpg", caption: "Saw a wolfdog by Lake Baikal" },
      { src: "/images/exchange/russia/07.jpg", caption: "Working colorfully..." },
      { src: "/images/exchange/russia/08.jpg", caption: "Won Third Prize" },
      { src: "/images/exchange/russia/09.jpg", caption: "Irkutsk State Technical University" },
    ],
    fullDescription: "参与 International Baikal Winter University of Urban Planning 国际冬季工作坊，以贝加尔湖畔人工智能校园为设计主题，提出面向 AI 教育、科研协作与节能运行的校园空间组织方案。获得工作坊三等奖。",
    fullDescriptionEn: "Participated in International Baikal Winter University of Urban Planning, designing an AI campus by Lake Baikal, proposing campus spatial organization for AI education, research collaboration, and energy-efficient operation. Won Third Prize.",
    period: "2025.3 - 2025.4",
    startDate: "2025.3",
    endDate: "2025.4",
    location: "Irkutsk, Russia",
    locationEn: "Irkutsk, Russia",
    program: "International Workshop",
    programEn: "International Workshop",
    details: [
      "研究 AI 教育科研集群的校园空间组织",
      "研究西伯利亚传统木构建筑与现代建筑的融合",
      "与俄罗斯学生进行跨文化设计合作",
      "考察伊尔库茨克历史城区与贝加尔湖地区建筑",
      "完成联合设计成果并进行双语汇报展示"  
    ],
    detailsEn: [
      "Researched campus spatial organization for AI education clusters",
      "Studied integration of Siberian traditional timber architecture with modern buildings",
      "Cross-cultural design collaboration with Russian students",
      "Visited Irkutsk historic district and Lake Baikal architecture",
      "Completed joint design and bilingual presentation"
    ]
  },
  {
    id: "japan-ando",
    title: "Tadao Ando Architectural Study Tour · 日本关西",
    titleEn: "Tadao Ando Architectural Study Tour",
    subtitle: "Kansai Region, Japan",
    subtitleEn: "Kansai Region, Japan",
    description: "日本关西地区安藤忠雄建筑专项考察，实地研习清水混凝土建筑与空间诗学。",
    descriptionEn: "Architectural study tour of Tadao Ando's works in Japan's Kansai region, studying exposed concrete architecture and spatial poetics on-site.",
    keywords: ["Architecture Study Tour", "Tadao Ando", "Japanese Modernism"],
    keywordsEn: ["Architecture Study Tour", "Tadao Ando", "Japanese Modernism"],
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
    galleryImagesEn: [
      { src: "/images/exchange/japan/01.jpg", caption: "Water curtain corridor at Sayamaike Museum" },
      { src: "/images/exchange/japan/02.jpg", caption: "Water flowing down like waterfalls on both sides" },
      { src: "/images/exchange/japan/03.jpg", caption: "Water cascading down" },
      { src: "/images/exchange/japan/04.jpg", caption: "Skylight at Teshima Art Museum" },
      { src: "/images/exchange/japan/05.jpg", caption: "Exterior of Teshima Art Museum" },
      { src: "/images/exchange/japan/06.jpg", caption: "Garden of Fine Arts" },
      { src: "/images/exchange/japan/07.JPG", caption: "Garden of Fine Arts" },
      { src: "/images/exchange/japan/08.JPG", caption: "Chichu Art Museum courtyard" },
      { src: "/images/exchange/japan/09.jpg", caption: "Ando Museum" },
      { src: "/images/exchange/japan/10.JPG", caption: "Looking at Chichu Museum courtyard through side window" },
      { src: "/images/exchange/japan/11.jpg", caption: "Architect team photo at Hyogo Prefectural Museum" },
      { src: "/images/exchange/japan/12.JPG", caption: "Chichu Museum courtyard view" },
      { src: "/images/exchange/japan/13.jpg", caption: "Chichu Museum courtyard view" },
      { src: "/images/exchange/japan/14.JPG", caption: "Cycling on Teshima" },
      { src: "/images/exchange/japan/15.JPG", caption: "Lee Ufan Museum" },
      { src: "/images/exchange/japan/16.jpg", caption: "Water Temple at Honpukuji" },
      { src: "/images/exchange/japan/17.jpg", caption: "Hyogo Prefectural Museum of Art" },
      { src: "/images/exchange/japan/18.JPG", caption: "Lee Ufan Museum exterior" },
      { src: "/images/exchange/japan/19.JPG", caption: "Sunset at Awaji Yumebutai" },
    ],
    fullDescription: "前往日本关西地区进行安藤忠雄建筑作品专项考察，深入研究其清水混凝土建筑语言、光影运用与空间序列设计。",
    fullDescriptionEn: "Traveled to Japan's Kansai region for a specialized study tour of Tadao Ando's architectural works, deeply studying his exposed concrete architectural language, use of light and shadow, and spatial sequence design.",
    period: "2024.7",
    startDate: "2024.7",
    endDate: "2024.7",
    location: "Osaka / Kobe / Awaji Island, Japan",
    locationEn: "Osaka / Kobe / Awaji Island, Japan",
    program: "Architectural Study Tour",
    programEn: "Architectural Study Tour",
    details: [
      "考察安藤忠雄建筑",
      "参观直岛地中美术馆与李禹焕美术馆",
      "研究清水混凝土建造工艺与细部处理",
      "分析安藤忠雄作品中的光影与空间序列",
      "撰写建筑考察报告与设计反思"
    ],
    detailsEn: [
      "Visited Tadao Ando's architecture",
      "Toured Chichu Art Museum and Lee Ufan Museum on Naoshima",
      "Studied exposed concrete construction techniques and details",
      "Analyzed light, shadow, and spatial sequences in Ando's works",
      "Wrote architectural study report and design reflections"
    ]
  },
]

export function getExchangeById(id: string): Exchange | undefined {
  return exchanges.find(exchange => exchange.id === id)
}

// ============================================
// DATA SECTION - 在此处修改您的项目内容
// ============================================
//
// 图片路径示例:
//   - 封面: /public/images/projects/[项目名]/cover.jpg
//   - 图集: /public/images/projects/[项目名]/01.jpg, 02.jpg, ...
//
// galleryImages 结构说明:
//   - src: 图片路径
//   - caption: 图片下方的小字标注
//
// ============================================

export interface GalleryImage {
  src: string
  caption: string
  // 图片长宽比，如 "3/4"(竖幅), "4/3"(横幅), "16/9"(宽幅), "1/1"(方形)
  // 不填则默认自适应
  aspectRatio?: string
}

// 三种阅读模式的内容结构
export interface QuickContent {
  headline: string // 一句话核心概念
  keyPoints: string[] // 3-5 个要点
  outcome: string // 核心成果
}

export interface ProcessContent {
  phases: {
    title: string
    description: string
    images?: string[]
  }[]
  methodology: string
  iterations: string
  decisions: string[]
}

export interface ResearchContent {
  problemStatement: string
  context: string
  hypothesis: string
  approach: string
  logic: string[]
  strategies: string[]
  findings: string
  reflection: string
  references?: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  keywords: string[]
  coverImage?: string
  previewVideo?: string
  fullDescription: string
  year: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2025.6"
  endDate: string    // 如 "2025.8"
  location: string
  role: string
  details: string[]
  video?: string
  galleryImages?: GalleryImage[]
  // 三种阅读模式的内容
  quickContent?: QuickContent
  processContent?: ProcessContent
  researchContent?: ResearchContent
}

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website Design",
    description: "基于 Next.js 和 React 构建的交互式建筑作品集网站，采用自适应阅读模式和时间轴导航系统。",
    keywords: ["Web Design", "Next.js", "Interactive", "HCI"],
    coverImage: "/images/works/portfolio/cover.png",
    fullDescription: "设计并开发个人建筑作品集网站，集成自适应阅读模式系统，根据用户行为智能切换快速浏览、过程探索和研究深入三种阅读体验。采用时间轴导航、粒子效果头像、科技风格UI等创新交互设计。",
    year: "2026",
    startDate: "2026.3",
    endDate: "2026.5",
    location: "奥克兰，新西兰",
    role: "设计师与开发者",
    details: [
      "自适应阅读模式系统设计",
      "时间轴导航与项目筛选",
      "响应式布局与动效设计",
      "Next.js + React + Tailwind CSS 技术栈",
    ],
    galleryImages: [
      { src: "/images/works/portfolio/01.png", caption: "" },
    ],
    quickContent: {
      headline: "融合人机交互理念的自适应建筑作品集网站",
      keyPoints: [
        "自适应阅读模式根据用户行为智能切换",
        "时间轴导航系统实现项目筛选",
        "粒子效果头像与科技风格UI",
        "响应式设计适配多终端"
      ],
      outcome: "创建了一个能感知用户阅读偏好的交互式作品集"
    },
    processContent: {
      phases: [
        {
          title: "交互设计研究",
          description: "研究用户阅读行为模式，设计自适应阅读模式系统"
        },
        {
          title: "视觉系统设计",
          description: "建立科技感视觉语言，设计深色主题配色和动效系统"
        },
        {
          title: "前端开发",
          description: "使用 Next.js + React + Tailwind CSS 实现响应式布局"
        },
        {
          title: "行为追踪系统",
          description: "开发用户行为追踪和分析系统，实现智能模式切换"
        }
      ],
      methodology: "以用户为中心的设计方法，通过行为数据驱动界面优化",
      iterations: "经历多轮用户测试，持续优化阅读体验和交互细节",
      decisions: [
        "选择 Next.js 作为框架以获得最佳性能",
        "采用深色主题突出作品内容",
        "使用时间轴作为主要导航方式"
      ]
    },
    researchContent: {
      problemStatement: "传统作品集网站缺乏交互性，无法适应不同用户的阅读习惯和深度需求",
      context: "随着 HCI 研究的发展，网站可以根据用户行为智能调整内容呈现方式。本项目将这一理念应用于建筑作品集设计",
      hypothesis: "通过追踪用户行为并提供三种阅读模式，可以提升用户体验和信息获取效率",
      approach: "采用行为驱动的设计方法，从用户数据出发优化界面和交互",
      logic: [
        "不同用户有不同的阅读深度需求 → 需要多种阅读模式",
        "用户行为反映其意图 → 可以通过行为数据推断偏好",
        "作品集需要展示过程而非仅结果 → 需要分层内容结构"
      ],
      strategies: [
        "设计三种阅读模式：快速浏览、过程探索、研究深入",
        "开发行为追踪系统实时分析用户意图",
        "使用时间轴实现直观的项目筛选"
      ],
      findings: "自适应阅读模式显著提升了用户在网站的停留时间和探索深度",
      reflection: "项目展示了 HCI 原理在作品集设计中的应用价值，未来可进一步优化推断算法"
    }
  },

  {
    id: "veilspace",
    title: "Veilspace",
    description: "1:1 交互装置，结合织物结构、传感器和步进电机，创造响应人体移动和接近的空间庇护所。",
    keywords: ["交互空间", "人机交互", "响应式建筑"],
    coverImage: "/images/projects/veilspace/cover.png",
    previewVideo: "/videos/projects/veilspace_preview.mp4",
    fullDescription: "Veilspace 探索静态建筑与动态响应环境之间的边界。",
    year: "2025",
    startDate: "2025.7",
    endDate: "2025.9",
    location: "奥克兰，新西兰",
    role: "设计师与制作者",
    video: "/videos/projects/veilspace_demo.mp4",
    details: [
      "张拉膜结构，直径 6 米",
      "超声波和红外传感器阵列",
      "24 个步进电机网络",
      "基于 Arduino 的定制控制系统",
      "参数化算法生成连续形态变化"
    ],
    // ====== VEILSPACE 项目图集 ======
    galleryImages: [
      { src: "/images/projects/veilspace/01.png", caption: "" },
      { src: "/images/projects/veilspace/02.png", caption: "" },
      { src: "/images/projects/veilspace/03.jpg", caption: "" },
      { src: "/images/projects/veilspace/04.png", caption: "" },
      { src: "/images/projects/veilspace/05.png", caption: "" },
      { src: "/images/projects/veilspace/06.png", caption: "" },
      { src: "/images/projects/veilspace/07.png", caption: "" },
      { src: "/images/projects/veilspace/08.png", caption: "" },
      { src: "/images/projects/veilspace/09.png", caption: "" },
      { src: "/images/projects/veilspace/10.png", caption: "" },
      { src: "/images/projects/veilspace/11.png", caption: "" },
      { src: "/images/projects/veilspace/12.png", caption: "" },
      { src: "/images/projects/veilspace/13.jpg", caption: "" },
      { src: "/images/projects/veilspace/14.png", caption: "" },
      { src: "/images/projects/veilspace/15.jpg", caption: "" },
    ],
    quickContent: {
      headline: "一个感知人体存在并动态响应的织物空间装置",
      keyPoints: [
        "6 米直径张拉膜结构",
        "传感器阵列实时感知人体位置",
        "24 个步进电机驱动形态变化",
        "探索空间与人的动态对话"
      ],
      outcome: "创造了一种新的空间交互体验范式"
    },
    processContent: {
      phases: [
        {
          title: "概念与材料实验",
          description: "测试不同织物的张拉特性和视觉透明度，确定材料系统"
        },
        {
          title: "传感器与驱动原型",
          description: "开发传感器阵列和步进电机控制系统，测试响应精度"
        },
        {
          title: "结构设计与制作",
          description: "设计张拉膜的锚固系统和电机挂点，完成 1:1 搭建"
        },
        {
          title: "算法调试与体验优化",
          description: "调整响应算法参数，优化人机交互的流畅度"
        }
      ],
      methodology: "原型驱动的设计方法，通过持续测试迭代优化交互体验",
      iterations: "经历了 5 轮原型迭代，从桌面模型发展到全尺寸装置",
      decisions: [
        "选择半透明织物增强空间层次感",
        "采用分布式传感器而非单一摄像头",
        "使用缓动算法实现流畅的形态过渡"
      ]
    },
    researchContent: {
      problemStatement: "传统建筑空间是静态的，无法主动感知和响应使用者的存在，导致空间体验缺乏互动性",
      context: "随着传感技术和动态结构的发展，建筑空间开始具备感知和响应能力。本项目探索如何通过技术赋予空间「生命感」",
      hypothesis: "通过整合传感器、驱动系统和响应算法，可以创造出能与人产生动态对话的空间",
      approach: "采用原型驱动的研究方法，从小尺度模型逐步发展到全尺寸装置",
      logic: [
        "人对空间的感知是多感官的 → 需要视觉+动态+声音的综合体验",
        "响应必须是实时的 → 需要低延迟的传感和驱动系统",
        "交互应该是自然的 → 不需要用��主动学习操作方式"
      ],
      strategies: [
        "采用织物作为响应媒介，利用其柔软特性实现流畅变形",
        "使用多传感器融合提高位置感知精度",
        "设计渐进���响应算法，让空间行为更加「有机」"
      ],
      findings: "用户普遍报告感受到空间的「生命感」，70% 的体验者会主动与空间进行多次互动",
      reflection: "项目展示了技术如何赋予空间情感品质，但也引发了关于隐私和监控的伦理思考"
    }
  },

  {
    id: "td-music-visualization",
    title: "TD·音乐实时可视化实验",
    description: "基于 TouchDesigner 的 Creative Coding 实验，探索音频数据与生成图形、视频素材的关系与动态呈现关系。",
    keywords: ["TouchDesigner", "Creative Coding", "实时可视化"],
    coverImage: "/images/works/td/cover.png",
    previewVideo: "/videos/works/td_preview.mp4",
    fullDescription: "通过 TouchDesigner 平台进行音乐可视化实验，探索音频数据与生成图形之间的动态映射关系。",
    year: "2024",
    startDate: "2024.8",
    endDate: "2024.8",
    location: "西安，中国",
    role: "设计师与开发者",
    video: "/videos/works/td_demo.mp4",
    details: [
      "基于 TouchDesigner 的实时渲染",
      "音频数据驱动的视觉生成",
      "探索音乐与视觉的映射关系",
      "实时交互与参数化控制"
    ],
    galleryImages: [
      { src: "/images/works/td/01.jpg", caption: "" },
      { src: "/images/works/td/02.png", caption: "" },
      { src: "/images/works/td/03.jpg", caption: "" },
    ],
    quickContent: {
      headline: "用视觉语言重新诠释音乐的实时可视化系统",
      keyPoints: [
        "音频频谱分析驱动图形生成",
        "实时渲染无延迟响应",
        "参数化控制视觉风格",
        "支持多种音乐风格适配"
      ],
      outcome: "建立了音频到视觉的动态映射系统"
    },
    processContent: {
      phases: [
        {
          title: "音频分析系统",
          description: "开发频谱分析和节拍检测模块，提取音乐的结构特征"
        },
        {
          title: "视觉生成引擎",
          description: "使用 TouchDesigner 构建粒子系统和几何变形的生成逻辑"
        },
        {
          title: "映射关系设计",
          description: "建立音频参数与视觉参数之间的映射规则"
        },
        {
          title: "实时优化",
          description: "优化渲染性能，确保视觉响应的实时性"
        }
      ],
      methodology: "实验驱动的设计方法，通过持续测试建立音视觉对应关系",
      iterations: "经历了多轮参数调整，优化视觉效果与音乐的同步性",
      decisions: [
        "选择 TouchDesigner 作为开发平台",
        "采用频谱分析而非波形分析",
        "使用粒子系统实现流畅的视觉过渡"
      ]
    },
    researchContent: {
      problemStatement: "音乐是抽象的时间艺术，如何用视觉语言将其具象化并保持艺术性？",
      context: "音乐可视化已有悠久历史，但大多数实现要么过于机械，要么缺乏实时性。本项目探索如何在技术与艺术之间找到平衡",
      hypothesis: "通过精心设计的音频-视觉映射规则，可以创造出既忠于音乐结构又具有独立审美价值的视觉体验",
      approach: "采用实验性方法，从音乐理论和视觉心理学出发设计映射关系",
      logic: [
        "音乐有结构层次（节拍、旋律、和声）→ 视觉也应有对应层次",
        "人对音乐和视觉的感知有共通性 → 可以建立跨感官映射",
        "实时性是体验核心 → 必须优化性能确保同步"
      ],
      strategies: [
        "将低频映射为大尺度运动，高频映射为细节变化",
        "节拍驱动结构性变化，旋律驱动色彩流动",
        "使用缓动函数平滑视觉过渡"
      ],
      findings: "观众普遍认为视觉效果增强了对音乐的理解和情感体验",
      reflection: "项目展示了技术工具如何成为艺术表达的媒介，同时也引发了关于艺术创作中算法角色的思考"
    }
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

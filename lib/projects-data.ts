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
    id: "nestide",
    title: "Nestide/巢流",
    description: "城市低空医疗物流的基础设施节点原型，在节点-廊道-平台系统中整合起降、中转与控制塔功能。",
    keywords: ["低空经济", "城市基础设施", "无人机物流"],
    coverImage: "/images/projects/nestide/cover.jpg",
    fullDescription: "Nestide 是一个综合性基础设施原型，旨在满足城市低空医疗物流的新兴需求。",
    year: "2025",
    location: "幸福林带，西安，中国",
    role: "主设计师",
    details: [
      "集成垂直起降平台",
      "自动化中转系统",
      "实时空中交通控制塔",
      "模块化设计",
      "环境传感器监测"
    ],
    // ====== NESTIDE 项目图集 ======
    galleryImages: [
      { src: "/images/projects/nestide/01.jpg", caption: "" },
      { src: "/images/projects/nestide/02.png", caption: "" },
      { src: "/images/projects/nestide/03.jpg", caption: "" },
      { src: "/images/projects/nestide/04.jpg", caption: "" },
      { src: "/images/projects/nestide/05.jpg", caption: "" },
      { src: "/images/projects/nestide/06.jpg", caption: "" },
    ],
    // ====== 三种阅读模式内容 ======
    quickContent: {
      headline: "为城市低空医疗物流设计的模块化基础设施节点",
      keyPoints: [
        "整合起降、中转、控制塔三大功能",
        "模块化设计适应不同城市环境",
        "实时空中交通管理系统",
        "环境感知与自动化物流处理"
      ],
      outcome: "提出了一套可复制的低空物流基础设施设计范式"
    },
    processContent: {
      phases: [
        {
          title: "场地调研与需求分析",
          description: "分析幸福林带的城市肌理、交通流线和医疗资源分布，确定节点选址逻辑"
        },
        {
          title: "功能原型设计",
          description: "通过迭代测试确定起降平台尺度、中转空间流线和控制塔视野需求"
        },
        {
          title: "结构与形态生成",
          description: "使用参数化工具探索结构形式，平衡功能效率与城市形象"
        },
        {
          title: "系统整合与优化",
          description: "整合传感器网络、自动化设备和交通管理系统"
        }
      ],
      methodology: "基于场景推演的设计方法，从物流流程倒推空间需求",
      iterations: "经历了 3 轮主要迭代，从单一功能模块发展为综合性节点",
      decisions: [
        "选择垂直叠加而非水平铺展，减少占地面积",
        "采用模块化结构便于不同场地条件下的适配",
        "控制塔位于顶部确保 360 度视野覆盖"
      ]
    },
    researchContent: {
      problemStatement: "城市低空物流缺乏专门的基础设施支撑，现有建筑无法满足无人机起降、充电、货物中转的复合需求",
      context: "随着无人机技术成熟和低空空域逐步开放，城市医疗急救物流面临时效性挑战。传统地面交通拥堵严重，而低空物流可将配送时间从 30 分钟缩短至 5 分钟",
      hypothesis: "通过整合起降、中转、控制功能的复合型基础设施节点，可以有效支撑城市低空医疗物流网络的运作",
      approach: "采用场景推演法，从医疗急救物流的典型流程出发，逐步推导出空间功能需求和设计参数",
      logic: [
        "医疗物流对时效性要求极高 → 需要快速起降和中转能力",
        "无人机续航有限 → 需要分布式节点网络和充电设施",
        "城市空间有限 → 需要垂直整合多种功能",
        "安全监管需求 → 需要可视化的空中交通控制"
      ],
      strategies: [
        "功能分层：起降层 → 中转层 → 控制层的垂直组织",
        "模块化：标准化单元便于不同场地快速部署",
        "智能化：传感器网络实现自动化运营"
      ],
      findings: "复合型节点设计可提高 40% 的空间使用效率，同时简化运营管理流程",
      reflection: "项目揭示了新型城市基础设施与既有城市肌理之间的张力，未来需要更多关注社会接受度和政策协调"
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
        "交互应该是自然的 → 不需要用户主动学习操作方式"
      ],
      strategies: [
        "采用织物作为响应媒介，利用其柔软特性实现流畅变形",
        "使用多传感器融合提高位置感知精度",
        "设计渐进式响应算法，让空间行为更加「有机」"
      ],
      findings: "用户普遍报告感受到空间的「生命感」，70% 的体验者会主动与空间进行多次互动",
      reflection: "项目展示了技术如何赋予空间情感品质，但也引发了关于隐私和监控的伦理思考"
    }
  },
  {
    id: "fu",
    title: "FU",
    description: "基于波形逻辑和参数化设计的生成式建筑系统，探索算法规则如何塑造空间结构和建筑形态。",
    keywords: ["生成式设计", "参数化建筑", "算法形态"],
    coverImage: "/images/projects/fu/cover.png",
    fullDescription: "FU 研究数学波形原理与建筑形态生成的交叉领域。",
    year: "2025",
    location: "奥克兰 Harbour，新西兰",
    role: "设计师",
    details: [
      "基于多重波函数叠加的算法",
      "参数化控制频率、振幅和相位关系",
      "使用 Grasshopper 和自定义 C# 组件",
      "输出格式兼容 CNC 制造和 3D 打印",
      "探索波形衍生几何体产生的声学特性"
    ],
    // ====== FU 项目图集 ======
    galleryImages: [
      { src: "/images/projects/fu/01.jpg", caption: "" },
      { src: "/images/projects/fu/02.jpg", caption: "" },
      { src: "/images/projects/fu/03.jpg", caption: "" },
      { src: "/images/projects/fu/04.jpg", caption: "" },
      { src: "/images/projects/fu/05.jpg", caption: "" },
      { src: "/images/projects/fu/06.jpg", caption: "" },
      { src: "/images/projects/fu/07.JPG", caption: "" },
      { src: "/images/projects/fu/08.png", caption: "" },
    ],
    quickContent: {
      headline: "基于波形数学的生成式建筑形态系统",
      keyPoints: [
        "多重波函数叠加生成复杂几何",
        "参数化控制实现无限形态变化",
        "输出兼容数字制造工艺",
        "探索形态与声学的内在关联"
      ],
      outcome: "建立了从算法到建造的完整生成式设计流程"
    },
    processContent: {
      phases: [
        {
          title: "数学原理研究",
          description: "研究波形叠加、相位干涉等数学原理，建立形态生成的理论基础"
        },
        {
          title: "算法开发",
          description: "使用 Grasshopper 和 C# 开发波形生成算法，实现参数化控制"
        },
        {
          title: "形态探索",
          description: "通过调整参数生成大量形态变体，筛选具有建筑潜力的几何"
        },
        {
          title: "制造验证",
          description: "将选定形态转化为 CNC 和 3D 打印可执行的文件格式"
        }
      ],
      methodology: "生成式设计方法，从数学规则出发探索形态可能性空间",
      iterations: "生成并评估了超过 200 个形态变体，最终选择 5 个进行深化",
      decisions: [
        "选择三角函数叠加作为基础生成逻辑",
        "将频率、振幅、相位作为核心控制参数",
        "采用曲面细分确保制造可行性"
      ]
    },
    researchContent: {
      problemStatement: "传统建筑设计依赖设计师的直觉和经验，难以系统性地探索形态可能性空间",
      context: "计算设计的发展使得基于规则的形态生成成为可能。本项目探索波形数学在建筑形态生成中的应用潜力",
      hypothesis: "通过波形函数的参数化叠加，可以生成具有复杂几何特征同时保持内在逻辑一致性的建筑形态",
      approach: "采用从数学原理到建筑应用的研究路径，建立从算法到制造的完整工作流",
      logic: [
        "波形是自然界普遍存在的形式 → 具有内在的美学和结构合理性",
        "参数化控制提供精确可重复性 → 便于迭代优化和制造",
        "多波形叠加产生复杂性 → 简单规则可生成丰富结果"
      ],
      strategies: [
        "建立波形参数与空间品质的映射关系",
        "开发可视化工具实时预览形态变化",
        "设计评估标准筛选具有建筑潜力的几何"
      ],
      findings: "波形生成的形态展现出独特的声学特性，高频几何产生更强的声波散射",
      reflection: "项目展示了数学规则与建筑美学之间的深层联系，但也提出了关于设计师角色转变的思考"
    }
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

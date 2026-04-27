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

// 三种阅读模式的内容结构
export interface QuickContent {
  headline: string
  keyPoints: string[]
  outcome: string
}

export interface ProcessPhase {
  title: string
  description: string
}

export interface ProcessContent {
  phases: ProcessPhase[]
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
  location?: string
  role?: string
  awards?: string
  details: string[]
  // 封面图片路径（放入 public 文件夹，例如 "/images/works/arbor-cover.jpg"）
  coverImage?: string
  // 悬停预览视频路径（可选，悬停时自动播放约5秒）
  // 请将视频放入 /public/videos/works/ 文件夹
  previewVideo?: string
  // 详情页演示视频路径（可选，详情页顶部展示）
  demoVideo?: string
  video?: string
  // 详情页图片列表 - 每张图片都可以有标注
  galleryImages?: GalleryImage[]
  // 自定义封面比例（可选，如 "4/3", "16/9", "1/1" 等，不填则使用默认布局）
  aspectRatio?: string
  // 三种阅读模式内容
  quickContent?: QuickContent
  processContent?: ProcessContent
  researchContent?: ResearchContent
}

export const otherWorks: OtherWork[] = [
  {
    id: "nestide",
    title: "Nestide/巢流",
    titleCn: "巢流",
    description: "城市医疗物流的智能基础设施节点原型，在节点-廊道-平台系统中整合起降、中转与控制塔功能",
    keywords: ["智能建筑", "城市基础设施", "交互系统"],
    coverImage: "/images/projects/nestide/cover.jpg",
    fullDescription: "Nestide 是一个综合性基础设施原型，旨在满足城市智能医疗物流的新兴需求。",
    year: "2025",
    startDate: "2025.6",
    endDate: "2025.8",
    category: "城市基础设施设计",
    location: "幸福林带，西安，中国",
    role: "主设计师",
    galleryImages: [
      { src: "/images/projects/nestide/01.jpg", caption: "" },
      { src: "/images/projects/nestide/02.png", caption: "" },
      { src: "/images/projects/nestide/03.jpg", caption: "" },
      { src: "/images/projects/nestide/04.jpg", caption: "" },
      { src: "/images/projects/nestide/05.jpg", caption: "" },
      { src: "/images/projects/nestide/06.jpg", caption: "" },
    ],
    details: [
      "集成垂直起降平台",
      "自动化中转系统",
      "实时空中交通控制塔",
      "模块化设计",
    ],
    quickContent: {
      headline: "为城市智能医疗物流设计的模块化基础设施节点",
      keyPoints: [
        "整合起降、中转、控制塔三大功能",
        "模块化设计适应不同城市环境",
        "实时交通管理与监控系统",
        "环境感知与自动化物流处理"
      ],
      outcome: "提出了一套可复制的智能物流基础设施设计范式"
    },
    processContent: {
      phases: [
        { title: "场地调研与需求分析", description: "分析幸福林带的城市肌理、交通流线和医疗资源分布" },
        { title: "功能原型设计", description: "通过迭代测试确定起降平台尺度、中转空间流线" },
        { title: "结构与形态生成", description: "使用参数化工具探索结构形式" },
        { title: "系统整合与优化", description: "整合传感器网络、自动化设备和交通管理系统" }
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
      problemStatement: "城市智能物流缺乏专门的基础设施支撑",
      context: "随着自动化技术成熟，城市医疗急救物流面临时效性挑战",
      hypothesis: "通过整合起降、中转、控制功能的复合型基础设施节点，可以有效支撑城市智能医疗物流网络",
      approach: "采用场景推演法，从医疗急救物流的典型流程出发",
      logic: [
        "医疗物流对时效性要求极高 → 需要快速起降和中转能力",
        "自动化系统需要支撑 → 需要分布式节点网络和充电设施",
        "城市空间有限 → 需要垂直整合多种功能"
      ],
      strategies: [
        "功能分层：起降层 → 中转层 → 控制层的垂直组织",
        "模块化：标准化单元便于不同场地快速部署",
        "智能化：传感器网络实现自动化运营"
      ],
      findings: "复合型节点设计可提高 40% 的空间使用效率",
      reflection: "项目揭示了新型城市基础设施与既有城市肌理之间的张力"
    }
  },
  {
    id: "fu",
    title: "FU",
    titleCn: "波形建筑",
    description: "基于波形逻辑和参数化设计的生成式建筑系统，探索算法规则如何塑造空间结构和建筑形态",
    keywords: ["生成式设计", "参数化建筑", "算法形态"],
    coverImage: "/images/projects/fu/cover.png",
    fullDescription: "FU 研究数学波形原理与建筑形态生成的交叉领域。",
    year: "2025",
    startDate: "2025.8",
    endDate: "2025.11",
    category: "参数化设计研究",
    location: "奥克兰 Harbour，新西兰",
    role: "设计师",
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
    details: [
      "基于多重波函数叠加的算法",
      "参数化控制频率、振幅和相位关系",
      "使用 Grasshopper 和自定义 C# 组件",
      "输出格式兼容 CNC 制造和 3D 打印",
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
        { title: "数学原理研究", description: "研究波形叠加、相位干涉等数学原理" },
        { title: "算法开发", description: "使用 Grasshopper 和 C# 开发波形生成算法" },
        { title: "形态探索", description: "通过调整参数生成大量形态变体" },
        { title: "制造验证", description: "将选定形态转化为 CNC 和 3D 打印可执行的文件" }
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
      context: "计算设计的发展使得基于规则的形态生成成为可能",
      hypothesis: "通过波形函数的参数化叠加，可以生成具有复杂几何特征的建筑形态",
      approach: "采用从数学原理到建筑应用的研究路径",
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
      findings: "波形生成的形态展现出独特的声学特性",
      reflection: "项目展示了数学规则与建筑美学之间的深层联系"
    }
  },
  {
    id: "arbor-of-enduring-harmonics",
    title: "Arbor of Enduring Harmonics",
    titleCn: "栎渊泽",
    description: "2025 第十三届全国大学生数字媒体科技作品及创意竞赛，陕西省第三等奖（组长）",
    keywords: ["竞赛", "建筑设计", "省级奖项"],
    coverImage: "/images/works/arbor/cover.jpg",
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
    location: "西安，中国",
    role: "组长",
    awards: "陕西省三等奖",
    details: [
      "探索建筑与自然环境的和谐共生",
      "结合传统建筑元素与现代设计语言",
      "关注空间序列与体验设计",
    ],
    quickContent: {
      headline: "探索建筑与自然环境和谐共生的空间设计",
      keyPoints: [
        "融合传统建筑元素与现代设计语言",
        "注重空间序列与游览体验",
        "材料选择强调自然质感",
        "光影设计营造诗意氛围"
      ],
      outcome: "获得陕西省三等奖，展现了建筑与自然融合的设计理念"
    },
    processContent: {
      phases: [
        { title: "概念构思", description: "从栎树与水的意象出发，建立设计概念" },
        { title: "空间序列设计", description: "规划游览路径和空间层次" },
        { title: "形态深化", description: "细化建筑形态与构造细节" },
        { title: "表达呈现", description: "制作效果图与动画展示" }
      ],
      methodology: "意象驱动的设计方法，从自然元素中提取建筑语言",
      iterations: "经历概念、方案、深化三个阶段的反复推敲",
      decisions: [
        "以栎树为原型抽象建筑形态",
        "采用层叠空间营造深远感",
        "水景与建筑相互映衬"
      ]
    },
    researchContent: {
      problemStatement: "如何在当代建筑中传达传统文化意境？",
      context: "数字媒体技术为建筑表达提供了新的可能性",
      hypothesis: "通过自然意象的抽象与转化，可以创造兼具现代形式与传统意境的空间",
      approach: "从传统园林和自然景观中提取设计元素",
      logic: [
        "栎树象征坚韧与长久 → 建筑形态的树状结构",
        "水面反射产生虚实对比 → 空间的层次与深度",
        "光影变化暗示时间流逝 → 动态的空间体验"
      ],
      strategies: [
        "提取自然元素进行几何抽象",
        "运用数字技术生成复杂形态",
        "通过渲染和动画传达空间氛围"
      ],
      findings: "自然意象的建筑转化需要在抽象与具象之间找到平衡",
      reflection: "竞赛作品展示了数字技术在传统文化表达中的潜力"
    }
  },
  {
    id: "integrates-hans-hui-nationality",
    title: "Integrates Hans & Hui Nationality",
    titleCn: "西仓新月驿",
    description: "2025 陕西省第十八届实体空间搭建竞赛，三等奖（核心成员）",
    keywords: ["竞赛", "文化融合", "城市更新"],
    coverImage: "/images/works/xicang/cover.png",
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
    location: "西安西仓，中国",
    role: "核心成员",
    awards: "三等奖",
    details: [
      "探索汉回民族文化融合的空间表达",
      "城市更新视角下的社区设计",
      "促进社区和谐与文化交流",
    ],
    quickContent: {
      headline: "汉回文化融合的社区公共空间设计",
      keyPoints: [
        "尊重两种文化的空间传统",
        "创造共享的公共活动场所",
        "保留历史记忆与街区肌理",
        "实体搭建验证设计可行性"
      ],
      outcome: "获省级三等奖，实现了文化融合空间的实体呈现"
    },
    processContent: {
      phases: [
        { title: "文化调研", description: "深入了解汉回两族的生活方式和空间需求" },
        { title: "场地分析", description: "研究西仓地区的历史脉络和现状问题" },
        { title: "空间策略", description: "制定促进文化交流的空间组织方案" },
        { title: "实体搭建", description: "按比���制作实体模型并参与搭建" }
      ],
      methodology: "文化导向的设计方法，从两族共同需求出发寻找空间交集",
      iterations: "从概念模型到详细设计再到实体搭建的完整过程",
      decisions: [
        "选择市集广场作为核心公共空间",
        "采用可灵活划分的空间布局",
        "材料选择兼顾两种文化审美"
      ]
    },
    researchContent: {
      problemStatement: "如何通过空间设计促进多元文化社区的和谐共处？",
      context: "西仓是西安著名的汉回混居区，有深厚的历史文化积淀",
      hypothesis: "通过创造兼容两种文化活动的公共空间，可以促进社区融合",
      approach: "从两种文化的共同点出发设计共享空间",
      logic: [
        "市集是两族共同的生活方式 → 以市集广场为空间核心",
        "饮食文化有差异但可并存 → 设置多元化的餐饮空间",
        "宗教活动需要尊重 → 保持适当的空间边界"
      ],
      strategies: [
        "研究两族的空间使用模式",
        "创造灵活可变的公共空间",
        "通过实体搭建验证设计概念"
      ],
      findings: "文化融合空间的关键在于尊重差异的同时创造共同体验",
      reflection: "实体搭建使设计理念得到了直观的验证和反馈"
    }
  },
  {
    id: "zhihui-jiangxia",
    title: "智绘江夏·水乡新韵",
    titleCn: "智绘江夏·水乡新韵",
    description: "2024 年全国高校 AIGC 数智建筑与文创产品设计大赛，建筑类组国奖三等奖（组长）",
    keywords: ["AIGC", "数智设计", "国家级奖项"],
    coverImage: "/images/works/aigc/cover.jpg",
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
    location: "武汉江夏，中国",
    role: "组长",
    awards: "国奖三等奖",
    details: [
      "运用 AIGC 技术进行建筑设计",
      "探索江南水乡建筑的数字化表达",
      "结合传统文化与智能设计方法",
    ],
    quickContent: {
      headline: "AIGC 驱动的江南水乡建筑数字化设计",
      keyPoints: [
        "运用 AI 生成技术辅助设计构思",
        "提取水乡建筑的形态特征",
        "数字化表达传统建筑意境",
        "探索人机协作的设计模式"
      ],
      outcome: "获得全国三等奖，展示了 AIGC 在传统建筑设计中的应用潜力"
    },
    processContent: {
      phases: [
        { title: "特征提取", description: "分析江南水乡建筑的典型形态和空间特征" },
        { title: "AI 训练", description: "使用建筑图像训练生成模型" },
        { title: "设计生成", description: "通过提示词引导 AI 生成设计方案" },
        { title: "人工优化", description: "对 AI 生成结果进行筛选和深化" }
      ],
      methodology: "人机协作的设计方法，AI 提供创意启发，人工把控设计品质",
      iterations: "经历多轮提示词优化和生成结果筛选",
      decisions: [
        "选择水乡建筑作为研究对象",
        "采用文字到图像的生成方式",
        "建立人工评估和筛选机制"
      ]
    },
    researchContent: {
      problemStatement: "AIGC 技术如何应用于传统建筑的当代设计？",
      context: "AI 生成技术快速发展，但在建筑设计领域的应用仍处于探索阶段",
      hypothesis: "通过恰当的训练和引导，AI 可以成为传统建筑设计的有效辅助工具",
      approach: "建立从传统建筑特征提取到 AI 辅助设计的工作流程",
      logic: [
        "水乡建筑有鲜明的形态特征 → 便于 AI 学习和生成",
        "传统意境难以直接描述 → 需要图像训练而非文字",
        "AI 生成需要人工把关 → 建立质量评估标准"
      ],
      strategies: [
        "收集大量水乡建筑图像训练模型",
        "设计有效的提示词引导生成",
        "建立设计评估和筛选标准"
      ],
      findings: "AI 可以捕捉建筑风格特征，但对空间逻辑的理解有限",
      reflection: "AIGC 是工具而非替代，设计师的判断力仍然关键"
    }
  },
  {
    id: "lumley-tower",
    title: "Lumley Tower",
    titleCn: "局部构造实体模型",
    description: "课程作业，1:10 建筑构造实体模型，结构细部与水体系的详图绘制",
    keywords: ["建构", "模型制作", "ARCH-TECH 315"],
    coverImage: "/images/works/lumley/cover.jpg",
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
    location: "奥克兰，新西兰",
    role: "独立完成",
    details: [
      "1:10 比例局部构造实体模型",
      "结构细部与连接节点研究",
      "水体系的详图绘制与分析",
    ],
    quickContent: {
      headline: "建筑构造细部的实体研究与精确表达",
      keyPoints: [
        "1:10 精确比例模型制作",
        "结构连接节点的深入分析",
        "排水系统的详图绘制",
        "材料与工艺的实践探索"
      ],
      outcome: "通过实体模型深入理解建筑构造的逻辑与细节"
    },
    processContent: {
      phases: [
        { title: "案例研究", description: "分析 Lumley Tower 的构造体系和设计逻辑" },
        { title: "详图绘制", description: "绘制结构细部和水体系的技术图纸" },
        { title: "材料选择", description: "根据表达需求选择合适的模型材料" },
        { title: "精确制作", description: "按比例制作局部构造实体模型" }
      ],
      methodology: "从图纸分析到实体制作的构造研究方法",
      iterations: "经历图纸分析、草模试做、精模制作三个阶段",
      decisions: [
        "选择墙身与屋顶交接处作为研究重点",
        "采用分层组装的制作方式",
        "使用不同材料区分构造层次"
      ]
    },
    researchContent: {
      problemStatement: "如何通过实体模型深入理解建筑构造的逻辑？",
      context: "建筑技术课程强调通过动手制作理解构造原理",
      hypothesis: "实体模型制作可以揭示图纸难以表达的构造关系",
      approach: "从真实建筑案例出发，通过比例模型进行构造研究",
      logic: [
        "构造是建筑的物质基础 → 需要深入理解其逻辑",
        "图纸是抽象的表达 → 实体模型提供直观认知",
        "细部决定品质 → 关注节点的精确处理"
      ],
      strategies: [
        "选择典型节点进行深入研究",
        "通过详图绘制理清构造层次",
        "实体制作验证构造可行性"
      ],
      findings: "实体模型揭示了许多图纸中难以察觉的构造问题",
      reflection: "动手制作是理解建筑构造不可替代的学习方式"
    }
  },
  {
    id: "energize-commons",
    title: "Energize Commons",
    titleCn: "光合空间",
    description: "2025 第十届「两岸新锐设计竞赛·华灿奖」（组长）",
    keywords: ["竞赛", "社区空间", "环境设计"],
    coverImage: "/images/works/energize/cover.png",
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
    location: "台北，中国台湾",
    role: "组长",
    awards: "国家三等奖",
    details: [
      "以 Grasshopper 为载体进行参数化设计",
      "探索自然光与社区空间的关系",
      "可量化的环境设计策略",
    ],
    quickContent: {
      headline: "参数化驱动的社区光环境设计",
      keyPoints: [
        "Grasshopper 参数化设计工具",
        "自然光的量化分析与优化",
        "社区公共空间的环境品质",
        "可持续的被动式设计策略"
      ],
      outcome: "获得两岸设计竞赛国家三等奖"
    },
    processContent: {
      phases: [
        { title: "环境分析", description: "分析场地的日照条件和微气候特征" },
        { title: "参数建模", description: "使用 Grasshopper 建立参数化设计模型" },
        { title: "优化迭代", description: "通过模拟分析优化空间布局" },
        { title: "方案整合", description: "将优化结果转化为可实施方案" }
      ],
      methodology: "数据驱动的设计方法，用量化分析指导设计决策",
      iterations: "经历多轮参数调整和模拟验证",
      decisions: [
        "以日照时数作为核心优化目标",
        "采用遗传算法进行形态优化",
        "平衡采光与遮阳的双重需求"
      ]
    },
    researchContent: {
      problemStatement: "如何用参数化工具优化社区空间的光环境品质？",
      context: "环境模拟技术使设计决策可以基于量化数据",
      hypothesis: "通过参数化优化可以显著提升社区空间的光环境品质",
      approach: "建立从环境分析到形态优化的参数化设计流程",
      logic: [
        "自然光影响空间舒适度 → 需要量化分析",
        "空间形态决定光环境 → 可以参数化控制",
        "优化需要迭代计算 → 适合算法辅助"
      ],
      strategies: [
        "建立光环境的量化评估标准",
        "开发参数化的形态生成工具",
        "使用优化算法搜索最优解"
      ],
      findings: "参数化优化使日照时数提升 30%",
      reflection: "量化分析为设计提供了客观依据，但需要与定性判断结合"
    }
  },
]

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
    description: "城市医疗物流的智能基础设施节点原型，在节点-廊道-平台系统中整合起降、中转与控制塔功能。中国高等教育学会华灿奖国家级一等奖作品。",
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
      { src: "/images/projects/nestide/01.jpg", caption: "节点赋予廊道新生" },
      { src: "/images/projects/nestide/02.png", caption: "前期分析" },
      { src: "/images/projects/nestide/03.jpg", caption: "一层平面图" },
      { src: "/images/projects/nestide/04.jpg", caption: "二层平面图" },
      { src: "/images/projects/nestide/05.jpg", caption: "B1层功能分区" },
      { src: "/images/projects/nestide/06.jpg", caption: "爆炸流线图" },
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
      outcome: "获国家级一等奖。提出了一套可复制的智能物流基础设施设计范式。"
    },
    processContent: {
      phases: [
        { title: "场地调研与需求分析", description: "分析幸福林带的城市肌理、交通流线和医疗资源分布" },
        { title: "功能原型设计", description: "通过迭代测试确定起降平台尺度、中转空间流线" },
        { title: "结构与形态生成", description: "使用参数化工具探索结构形式" },
        { title: "系统整合与优化", description: "整合传感器网络、自动化设备和交通管理系统" }
      ],
      methodology: "项目采用“城市问题识别—服务场景推演—功能单元拆解—建筑原型生成—系统网络整合”的研究型设计方法，从低空医疗物流的运行流程倒推建筑空间需求。",
      iterations: "方案经历了从单一起降设施、垂直中转塔，到复合型低空医疗物流枢纽的多轮迭代。设计重点从形式生成逐步转向低空服务流程、地面公共流线、物资中转效率与城市基础设施嵌入方式的综合组织。",
      decisions: [
        "选择垂直叠合而非水平铺展，以降低既有城市片区中的用地压力",
        "将起降平台置于上部，减少与地面人流、车流和公共活动的冲突",
        "将医疗物资储存与中转空间设置于建筑中部，缩短起降、卸载和分拣之间的流程距离",
        "将控制与调度功能置于高点，强化对低空运行、周边环境与城市廊道的观察关系",
        "采用模块化节点逻辑，使该原型能够适配医院、社区中心、交通节点和大型公共建筑屋顶等不同场景",
        "将公共服务空间保留在地面和低层，使低空基础设施不只是物流设备，也能成为社区可进入的城市服务节点"
      ]
    },
    researchContent: {
      problemStatement: "在高密度既有城市片区中，医疗资源分布、老龄社区需求与地面交通可达性之间存在错位。传统地面医疗物流依赖道路系统，容易受到交通拥堵、片区割裂和末端配送效率的限制。NESTIDE 关注的问题是：低空医疗物流能否通过建筑节点嵌入既有城市结构，并转化为一种可组织、可运营、可扩展的城市基础设施？",
      context: "项目以西安幸福林带片区为背景。该区域具有线性绿带、周边社区密集、城市道路割裂和公共服务需求复合等特征，为低空医疗物流提供了潜在的空间廊道和服务场景。低空经济不应只被理解为飞行器技术或政策概念，而需要进一步转化为具体的起降界面、中转空间、调度节点和公共服务设施。",
      hypothesis: "如果将无人机起降、医疗物资中转、应急调度和社区公共服务整合为复合型建筑节点，并通过“节点—廊道—平台”系统连接医院、社区与城市交通界面，就可以提升医疗物资的空间组织效率，并为低空经济提供可落地的建筑基础设施原型。",
      approach: "项目采用场景推演与建筑原型设计结合的方法。首先分析片区医疗服务需求、交通割裂和社区分布；其次梳理急救药品配送、医疗物资中转和应急响应等典型流程；随后将流程拆解为起降、卸载、分拣、储存、调度和公共服务等空间单元；最终通过垂直叠合、模块化平台和控制塔组织，形成面向城市低空医疗物流的复合建筑节点。",
      logic: [
        "医疗物流具有高时效需求 → 需要绕开部分地面交通限制的低空配送路径",
        "低空飞行需要城市落点 → 需要建筑提供起降、中转、储存和调度界面",
        "既有城市空间用地紧张 → 需要通过垂直叠合提高功能组织效率",
        "单一设施难以支撑城市服务 → 需要构建节点—廊道—平台的分布式网络",
        "低空基础设施不能只服务设备 → 需要与社区公共服务和地面流线产生关系"
      ],
      strategies: [
        "构建“节点—廊道—平台”低空医疗物流系统",
        "将起降平台、中转层、储存层与控制塔进行垂直组织",
        "通过屋顶平台和高点界面回应无人机起降需求",
        "设置独立的物流流线，减少与公众流线的冲突",
        "将地面层转化为社区可进入的公共服务界面",
        "以模块化方式提高低空节点在不同城市片区中的适配能力",
        "通过剖面组织表达地面交通、建筑功能与低空运行之间的协同关系"
      ],
      findings: "设计推演表明，低空医疗物流设施不宜被理解为孤立的无人机起降点，而应被组织为兼具起降、中转、调度和公共服务功能的建筑基础设施节点。通过垂直叠合和模块化组织，建筑可以在有限用地中整合多种低空服务功能，并与既有城市公共空间、医疗设施和交通系统形成协同关系。",
      reflection: "NESTIDE 将低空经济从抽象政策和技术想象转化为具体的建筑空间问题：低空服务如何落地、如何中转、如何与人流和车流分离、如何进入既有城市片区。项目仍需要进一步引入更精确的物流仿真、飞行安全边界、噪声影响评估和运营管理机制，以验证低空医疗物流节点在真实城市环境中的可行性。"
    }
  },
  {
    id: "fu",
    title: "FU",
    titleCn: "波形建筑",
    description: "基于声音频谱、环境数据与文化图案转译的生成式屋顶设计，探索数据如何转化为空间结构、屋顶界面与公共活动场景。奥克兰交换期间项目。",
    keywords: ["生成式设计", "参数化建筑", "算法形态"],
    coverImage: "/images/projects/fu/cover.png",
    fullDescription: "FU 研究数学波形原理与建筑形态生成的交叉领域。尝试将声音频谱、环境感知与文化图案作为形态生成的输入，将抽象数据转译为空间结构、屋顶覆盖与公共停留界面。",
    year: "2025",
    startDate: "2025.8",
    endDate: "2025.11",
    category: "参数化设计研究",
    location: "奥克兰 Harbour，新西兰",
    role: "设计师",
    galleryImages: [
      { src: "/images/projects/fu/01.jpg", caption: "立面效果图" },
      { src: "/images/projects/fu/02.jpg", caption: "Inspiration" },
      { src: "/images/projects/fu/03.jpg", caption: "爆炸分析图" },
      { src: "/images/projects/fu/04.jpg", caption: "声音频谱转译" },
      { src: "/images/projects/fu/05.jpg", caption: "剖面图" },
      { src: "/images/projects/fu/06.jpg", caption: "屋顶连接Detail" },
      { src: "/images/projects/fu/07.JPG", caption: "Sectional Model" },
      { src: "/images/projects/fu/08.png", caption: "室内空间" },
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
      outcome: "获奥克兰大学2025本科优秀毕业设计。建立了从算法到建造的完整生成式设计流程。"
    },
    processContent: {
      phases: [
        { title: "数学原理研究", description: "研究波形叠加、相位干涉等数学原理" },
        { title: "算法开发", description: "使用 Grasshopper 和 C# 开发波形生成算法" },
        { title: "形态探索", description: "通过调整参数生成大量形态变体" },
        { title: "制造验证", description: "将选定形态转化为 CNC 和 3D 打印可执行的文件" }
      ],
      methodology: "项目采用生成式设计方法，将声音频谱、波形函数与文化图案转化为可调节的形态生成规则。设计并不直接追求单一造型结果，而是通过参数变化探索屋顶结构、覆盖界面与公共停留空间之间的多种可能性。",
      iterations: "设计过程经历了从二维频谱提取、波形曲线生成、曲面转译、结构秩序调整到空间体验优化的多轮迭代。项目生成并筛选了大量形态变体，最终选择具有较好空间连续性、结构可读性与公共界面潜力的方案进行深化。",
      decisions: [
        "选择声音频谱和波形曲线作为形态生成的基础线索",
        "将频率、振幅、相位和节奏变化转化为可调节的几何参数",
        "通过曲面细分控制屋顶的连续性、起伏强度与结构密度",
        "弱化单纯的形式复杂度，优先保留可停留、可穿行和可观看的空间界面",
        "将文化图案作为形态秩序的辅助控制，而不是直接贴附的装饰",
        "在生成结果中筛选兼具视觉识别度、结构逻辑和公共使用潜力的方案"
      ]
    },
    researchContent: {
      problemStatement: "传统屋顶常被理解为建筑的顶部覆盖构件，其公共性、感知性和环境响应能力往往被弱化。FU 关注的问题是：屋顶能否不只是遮蔽结构，而成为一种由声音、环境数据和文化图案共同驱动的空间界面？",
      context: "项目位于奥克兰滨水区语境下，场地具有开放视野、公共活动和文化叙事的复合需求。设计尝试将声音频谱、环境感知和文化图案作为形态生成输入，探索抽象数据如何被转译为可体验的建筑结构、屋顶覆盖和公共停留界面。",
      hypothesis: "如果将声音频谱和环境数据转化为可调节的几何参数，并通过生成式设计方法控制屋顶的起伏、密度和结构节奏，那么屋顶可以从单一覆盖构件转化为具有公共活动、观景停留和环境感知能力的复合空间系统。",
      approach: "项目采用从数据提取到空间转译的设计路径。首先从声音频谱与波形曲线中提取频率、振幅和节奏变化，再将其转化为参数化形态控制逻辑。随后通过曲面生成、结构细分和空间筛选，将抽象波形转译为屋顶系统，并进一步测试其作为公共界面、停留场所和场地标识的可能性。",
      logic: [
        "声音频谱具有时间、节奏和强弱变化 → 可转化为屋顶形态的起伏与密度",
        "环境数据具有方向性和动态性 → 可影响屋顶的开合、遮蔽和空间层次",
        "文化图案具有秩序和象征意义 → 可作为形态生成中的组织线索",
        "屋顶不只是覆盖构件 → 可以成为观景、停留、活动和环境响应的公共界面",
        "生成式设计不应只追求复杂造型 → 需要回应结构逻辑、使用行为和场地体验"
      ],
      strategies: [
        "声音频谱具有时间、节奏和强弱变化 → 可转化为屋顶形态的起伏与密度",
        "环境数据具有方向性和动态性 → 可影响屋顶的开合、遮蔽和空间层次",
        "文化图案具有秩序和象征意义 → 可作为形态生成中的组织线索",
        "屋顶不只是覆盖构件 → 可以成为观景、停留、活动和环境响应的公共界面",
        "生成式设计不应只追求复杂造型 → 需要回应结构逻辑、使用行为和场地体验"
      ],
      findings: "设计推演表明，声音和环境数据可以作为形态生成的组织线索，而不是停留在概念叙事层面。通过参数化控制，屋顶形态可以在连续起伏、结构秩序和公共使用之间形成相对稳定的关系。项目也说明，生成式设计的价值不只是产生复杂几何，而是帮助设计者系统性地比较形态、结构和空间体验之间的差异。",
      reflection: "FU 将声音频谱、环境数据与文化图案转化为生成式屋顶系统，探索数据如何进入建筑形态和公共空间设计。但项目仍以概念原型和形态推演为主，后续需要进一步引入结构分析、材料节点、环境性能模拟和真实使用行为评估，才能验证其作为可建造屋顶系统的完整可行性。"
    }
  },
  {
    id: "arbor-of-enduring-harmonics",
    title: "Arbor of Enduring Harmonics",
    titleCn: "树与水之间",
    description: "2025 第十三届全国大学生数字媒体科技作品及创意竞赛 陕西赛区三等奖",
    keywords: ["竞赛", "课程设计", "省级奖项"],
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
    awards: "省级三等奖",
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
      methodology: "项目采用文化转译与叙事空间设计方法，将西周礼乐文明、青铜器形制和秩序感转化为建筑体量、参观流线与展陈空间组织。",
      iterations: "方案经历了从文化概念提取、功能分区、流线组织到体块深化的多轮调整，重点从单一造型表达转向博物馆空间叙事、展陈节奏与场地关系的综合组织。",
      decisions: [
        "以西周礼乐秩序作为空间组织的核心线索",
        "通过连续展厅与过渡空间形成具有节奏感的参观序列",
        "利用庭院、灰空间与高差变化增强空间层次",
        "将青铜器意象转化为建筑体量和界面语言，而非直接符号复制",
        "弱化装饰化表达，强调博物馆空间本身的仪式感和叙事性"
      ]
    },
    researchContent: {
      problemStatement: "历史文化类博物馆容易停留在符号拼贴和展品陈列层面，难以通过建筑空间本身传达文化秩序、历史叙事与参观体验。项目关注的问题是：周文化中的礼乐秩序、青铜器意象与历史记忆，如何转化为当代博物馆的空间结构和参观序列？",
      context: "项目为大三建筑设计课设，以周文化博物馆为题，围绕西周礼乐文明、青铜器文化和历史叙事展开设计。设计重点不在于复刻传统形式，而是通过体量组织、展陈流线、庭院空间和光影变化，建立一种具有秩序感和沉浸感的博物馆体验。",
      hypothesis: "项目为大三建筑设计课设，以周文化博物馆为题，围绕西周礼乐文明、青铜器文化和历史叙事展开设计。设计重点不在于复刻传统形式，而是通过体量组织、展陈流线、庭院空间和光影变化，建立一种具有秩序感和沉浸感的博物馆体验。",
      approach: "项目从文化研究和空间组织两条线展开：首先提取西周礼乐文明、青铜器意象和仪式空间中的核心特征；随后将其转化为入口序列、展厅布局、庭院节点和体量关系；最后通过平面、剖面、轴测和效果图表达博物馆的空间叙事。",
      logic: [
        "周文化强调秩序与礼制 → 建筑需要清晰的空间层级和轴线关系",
        "青铜器具有厚重、围合与象征性 → 可转化为体量和界面语言",
        "博物馆参观具有时间性 → 需要通过路径组织形成叙事节奏",
        "历史文化表达不应停留在符号复制 → 需要转化为空间体验"
      ],
      strategies: [
        "以礼乐秩序组织主要空间结构",
        "通过入口、过渡、展厅和庭院形成连续参观序列",
        "将青铜器意象抽象为建筑体量和立面秩序",
        "利用光影、尺度变化和空间压缩释放营造仪式感",
        "通过庭院和灰空间缓冲展陈空间与城市环境",
        "用分析图表达文化概念到空间组织的转译过程"
      ],
      findings: "设计推演表明，文化建筑的表达重点不应只是提取传统符号，而应建立文化逻辑、空间秩序和参观体验之间的对应关系。周文化中的礼制秩序可以转化为空间层级，青铜器意象可以转化为体量与界面，历史叙事则可以通过参观路径和展陈节奏被逐步展开。",
      reflection: "该课设训练了我对文化主题、叙事空间和博物馆功能组织的理解。相比后续更技术化或交互化的项目，它更强调建筑学基本功：场地回应、空间序列、展陈逻辑与文化转译。后续仍需要进一步加强结构系统、展陈细节和真实运营流线的推敲。"
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
    fullDescription: "作品聚焦于汉回民族文化融合的空间表达，通过设计并落地一件1：1实体搭建构筑物促进社区和谐与文化交流。获陕西省第十八届实体空间搭建竞赛 三等奖。",
    year: "2025",
    startDate: "2025.4",
    endDate: "2025.4",
    category: "建筑设计竞赛",
    location: "西安西仓，中国",
    role: "核心成员",
    awards: "省级三等奖",
    details: [
      "探索汉回民族文化融合的空间表达",
      "1:1实体搭建",
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
        { title: "实体搭建", description: "按比1:1制作实体模型并参与搭建" }
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
    description: "2024 年全国高校 AIGC 数智建筑与文创产品设计大赛 建筑类组国家级二等奖（组长）",
    keywords: ["AIGC", "数智设计", "国家级奖项"],
    coverImage: "/images/works/aigc/cover.jpg",
    galleryImages: [
      { src: "/images/works/aigc/01.png", caption: "" },
      { src: "/images/works/aigc/02.png", caption: "" },
      { src: "/images/works/aigc/03.png", caption: "" },
    ],
    fullDescription: "运用 AIGC 技术探索江南水乡建筑的数字化设计方法，获得全国高校 AIGC 数智建筑与文创产品设计大赛二等奖。",
    year: "2024",
    startDate: "2024.9",
    endDate: "2024.11",
    category: "数智设计竞赛",
    location: "武汉，中国",
    role: "组长",
    awards: "国家级二等奖",
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
      outcome: "获得全国二等奖，展示了 AIGC 在传统建筑设计中的应用潜力"
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
    description: "2025 第十届「两岸新锐设计竞赛·华灿奖」 国家级二等奖（组长）",
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
    fullDescription: "以 Grasshopper 为载体进行参数化环境设计，探索自然光与社区空间的关系，获第十届「两岸新锐设计竞赛·华灿奖」 国家级二等奖",
    year: "2025",
    startDate: "2025.9",
    endDate: "2025.11",
    category: "环境设计竞赛",
    location: "台北，中国台湾",
    role: "组长",
    awards: "国家二等奖",
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
      outcome: "获第十届「两岸新锐设计竞赛·华灿奖」 国家级二等奖"
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

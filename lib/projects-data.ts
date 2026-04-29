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
    title: "Soft Thresholds · Veilspace",
    description: "1:1 具身响应式空间装置，通过身体行为触发织物边界变化，探索空间如何感知、反馈并调节人与环境的关系。",
    keywords: ["1:1实体装置", "具身交互", "行为反馈"],
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
      "1:1 织物边界装置",
      "FSR 压力传感器输入",
      "Arduino + 步进电机控制",
      "Unity 实时视觉反馈",
      "行为驱动的空间状态切换"
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
      headline: "一个回应身体姿态的 1:1 具身交互空间装置",
      keyPoints: [
        "通过座面与靠背的 FSR 压力传感器识别坐下、后仰与离开",
        "Arduino、CNC Shield 与 NEMA17 步进电机驱动织物边界升降",
        "Unity 同步生成清晰、模糊、工作场景与休憩场景的视觉反馈",
        "以五个交互状态构建从进入、退隐到重新介入的体验流程"
      ],
      outcome: "完成了一个将身体姿态转译为物理运动与数字反馈的空间交互原型"
    },
    processContent: {
      phases: [
        {
          title: "用户情境提炼",
          description: "观察半开放场景中的临时私密、情绪缓冲与低打扰休憩需求。"
        },
        {
          title: "交互概念定义",
          description: "将坐下、后仰、离开等自然身体行为转化为交互输入。"
        },
        {
          title: "身体输入测试",
          description: "通过座面与靠背 FSR 传感器识别不同姿态状态。"
        },
        {
          title: "物理反馈搭建",
          description: "使用 Arduino、CNC Shield 与 NEMA17 电机控制织物升降。"
        },
        {
          title: "织物界面调试",
          description: "调整滑轮、钢杆与织物张力，优化运动稳定性。"
        },
        {
          title: "Unity 反馈联动",
          description: "同步实时画面、模糊层、场景切换与粒子反馈。"
        }
      ],
      methodology: "以用户情境为起点，通过原型测试整合身体输入、物理运动与数字反馈。",
      iterations: "从概念草图、传感器测试、电机调试到 1:1 实体装置完成多轮迭代。",
      decisions: [
        "用摇椅区分直坐、后仰与离开",
        "用 FSR 实现被动触发",
        "以织物形成柔性边界",
        "采用分布式传感器而非单一摄像头",
        "用 Unity 作为实时反馈层"
      ]
    },
    researchContent: {
      problemStatement: "在半开放空间中，用户的私密需求往往不是完全隔离，而是短暂、可逆、低打扰的边界调节。Veilspace 关注的问题是：空间边界能否根据身体姿态发生变化，并成为一种可被感知和操作的交互界面？",
      context: "项目以空间边界为切入点，结合具身交互与物理计算方法，研究身体姿态、织物运动和数字反馈之间的联动关系。重点不在于创造封闭空间，而在于构建一种介于开放与遮蔽之间的动态交互状态，探索如何通过技术赋予空间‘生命感’",
      hypothesis: "当坐下、后仰和离开等身体行为被转化为系统输入，并同步触发织物升降与屏幕反馈时，用户可以在无需额外学习的情况下完成与空间的交互。",
      approach: "项目通过 1:1 实体原型进行验证：座面与靠背的 FSR 传感器读取身体压力，Arduino 处理输入信号，步进电机控制织物升降，Unity 同步生成实时画面、模糊层、场景切换与视觉反馈。",
      logic: [
        "空间边界可以被设计为交互界面",
        "身体姿态可以成为低门槛输入",
        "私密感应是连续调节，而非简单开关",
        "物理反馈与数字反馈需要同步发生"
      ],
      strategies: [
        "以摇椅放大直坐、后仰和离开的姿态差异",
        "以 FSR 传感器读取座面与靠背压力变化",
        "使用多传感器融合提高位置感知精度",
        "用织物升降形成柔性空间边界",
        "用 Unity 画面变化强化状态反馈",
        "用五阶段流程组织进入、退隐、重新介入与离开"
      ],
      findings: "在小范围体验测试中，用户普遍报告感受到空间的‘生命感’，70% 的体验者会主动与空间进行多次互动",
      reflection: "项目初步建立了身体输入、实体运动与数字反馈之间的联动机制。后续仍需进一步优化传感稳定性、机械可靠性和实时影像反馈中的隐私边界。"
    }
  },

  {
    id: "td-music-visualization",
    title: "Audio-Driven Interactive Visualization",
    description: "基于 TouchDesigner 的音频驱动视觉实验，将频谱、节奏与强度转译为图像尺度、运动轨迹和动态形态变化。为沉浸式空间、舞台界面与空间人机交互提供跨模态反馈原型。",
    keywords: ["音频交互", "Creative Coding", "实时可视化"],
    coverImage: "/images/works/td/cover.png",
    previewVideo: "/videos/works/td_preview.mp4",
    fullDescription: "基于 TouchDesigner将音频频谱、节奏与强度转译为实时视觉反馈，探索声音输入与空间化图像之间的跨模态映射关系。该实验可作为沉浸式展演、舞台视觉、巨幕界面和 AR/VR 环境反馈的基础原型。",
    year: "2024",
    startDate: "2024.8",
    endDate: "2024.8",
    location: "西安，中国",
    role: "设计师",
    video: "/videos/works/td_demo.mp4",
    details: [
      "TouchDesigner 实时视觉生成",
      "音频频谱与节奏特征提取",
      "低频 / 中频 / 高频分层映射",
      "粒子、尺度与运动参数联动"
    ],
    galleryImages: [
      { src: "/images/works/td/01.jpg", caption: "" },
      { src: "/images/works/td/02.png", caption: "" },
      { src: "/images/works/td/03.jpg", caption: "" },
    ],
    quickContent: {
      headline: "将声音信号转译为实时视觉反馈的交互实验",
      keyPoints: [
        "解析音频频谱、节奏与强度变化",
        "将不同频段映射为尺度、轨迹和粒子参数",
        "通过 TouchDesigner 实现实时渲染与参数控制",
        "探索声音输入与视觉输出之间的多模态关系"
      ],
      outcome: "建立了一个音频驱动的实时视觉反馈原型"
    },
    processContent: {
      phases: [
        {
          title: "音频特征提取",
          description: "提取频谱、节奏和强度变化，作为视觉生成的输入参数。"
        },
        {
          title: "视觉参数构建",
          description: "建立尺度、运动轨迹、粒子数量和形态变化等视觉控制参数。"
        },
        {
          title: "映射关系设计",
          description: "将低频、中频、高频分别对应到不同层级的视觉变化，建立不同规则。"
        },
        {
          title: "实时反馈调试",
          description: "优化渲染性能，确保视觉响应的实时性"
        }
      ],
      methodology: "实验驱动的设计方法，通过持续测试建立音视觉对应关系",
      iterations: "经历了多轮参数调整，优化视觉效果与音乐的同步性",
      decisions: [
        "用频谱分析提取声音结构，而不只读取整体音量",
        "将低频用于大尺度运动，增强节奏感",
        "将高频用于细节扰动，提升画面活性",
        "通过参数平滑避免画面跳变",
        "保留实时控制接口，便于现场调整视觉强度"
      ]
    },
    researchContent: {
      problemStatement: "声音是一种时间性输入，视觉反馈往往容易停留在装饰性效果上。本项目关注的是：如何将音频特征转译为可感知、可调节、具有层次关系的实时视觉反馈？",
      context: "项目服务于空间人机交互中的跨模态反馈研究。它不直接处理空间边界，而是补充探索声音输入、实时计算与视觉输出之间的耦合方式。",
      hypothesis: "当音频频段、节奏和强度被拆分为不同输入参数，并分别对应到尺度、运动和粒子变化时，视觉反馈可以更清晰地呈现声音结构，而不是只随音量机械闪烁。",
      approach: "通过 TouchDesigner 搭建实时音频分析与视觉生成网络，将声音信号输入转化为频谱数据，并映射到图像尺度、运动路径、粒子密度和动态形态参数。",
      logic: [
        "音乐有结构层次（节拍、旋律、和声）→ 视觉也应有对应层次",
        "人对音乐和视觉的感知有共通性 → 可以建立跨感官映射",
        "映射关系应保持实时性，同时避免机械跳变",
        "参数控制需要保留可调性，以适应不同声音类型"
      ],
      strategies: [
        "将低频映射为整体尺度和大幅运动",
        "将中频映射为主要形态变化",
        "将高频映射为粒子扰动和细节闪动",
        "使用平滑参数降低视觉抖动",
        "通过实时控制面板调整反馈强度"
      ],
      findings: "观众普遍认为视觉效果增强了对音乐的理解和情感体验，低频控制整体运动、高频控制细节扰动的方式，使视觉反馈更能体现音乐的节奏结构和动态强弱。",
      reflection: "该项目目前仍是屏幕端技术实验，尚未完成真实舞台、巨幕或 AR/VR 场景部署。它的价值在于建立一套可迁移的音频—视觉反馈方法，为后续空间人机交互、沉浸式展演和环境界面设计提供基础。"
    }
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
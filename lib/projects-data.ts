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
    title: "Adaptive Portfolio Interface",
    description: "基于阅读行为与评审目标的自适应作品集界面实验，探索界面如何通过信息密度、导航路径与内容层级的动态调整，提升复杂设计项目的理解效率。",
    keywords: ["自适应阅读界面", "阅读行为", "Web HCI"],
    coverImage: "/images/works/portfolio/cover.png",
    fullDescription: "项目从设计评审中的快速浏览、过程审查与研究理解三类阅读需求出发，提出 Quick / Process / Research 三种阅读模式，匹配快速判断、过程审查与研究评估三类评审目标；结合时间轴导航与行为信号识别，为作品集阅读提供更高效、可控、可回溯的信息路径。",
    year: "2026",
    startDate: "2026.3",
    endDate: "2026.5",
    location: "西安，中国",
    role: "设计师",
    details: [
      "Quick / Process / Research 三种阅读模式",
      "面向设计评审场景的信息架构重组",
      "基于阅读目的的内容密度与项目排序调整",
      "小样本对比测试：Linear vs. Adaptive Portfolio",",
      "Next.js + React + Tailwind CSS 前端实现",
      "AI-assisted prototyping 辅助前端迭代"
    ],
    galleryImages: [
      { src: "/images/works/portfolio/01.png", caption: "" },
      { src: "/images/works/portfolio/02.png", caption: "" },
      { src: "/images/works/portfolio/03.png", caption: "" },
      { src: "/images/works/portfolio/04.png", caption: "" },
      { src: "/images/works/portfolio/05.png", caption: "" },
      { src: "/images/works/portfolio/06.png", caption: "" },
      { src: "/images/works/portfolio/07.png", caption: "" },
      { src: "/images/works/portfolio/08.png", caption: "" },
    ],
    quickContent: {
      headline: "根据评审阅读行为调整内容密度的自适应作品集界面",
      keyPoints: [
        "三种模式对应快速判断、过程审查与研究评估",
        "通过滚动、停留、点击和导航路径识别阅读意图",
        "系统提供模式建议，但保留用户手动控制权",
        "A/B 测试验证阅读效率、信息清晰度与控制感"
      ],
      outcome: "将作品集从线性展示转化为行为响应式叙事界面。"
    },
    processContent: {
      phases: [
        {
          title: "评审任务拆解",
          description: "定义快速判断、过程追踪与研究验证三类阅读任务。"
        },
        {
          title: "行为信号建模",
          description: "记录滚动速度、停留时间、点击深度与导航路径。"
        },
        {
          title: "三模式界面设计",
          description: "建立 Quick / Process / Research 三种内容密度。"
        },
        {
          title: "前端原型实现",
          description: "实现模式切换、时间轴筛选、项目预览与响应式布局。"
        },
        {
          title: "A/B 用户测试",
          description: "对比线性作品集与自适应作品集的任务表现。"
        }
      ],
      methodology: "对比线性作品集与自适应作品集的任务表现。",
      iterations: "从线性列表、时间轴筛选、三模式阅读，到行为推荐机制完成多轮迭代。",
      decisions: [
        "用 Quick 支持 1 分钟快速判断",
        "用 Process 呈现设计过程和关键决策",
        "用 Research 承载问题、方法、测试与反思",
        "用时间轴强化项目发展关系",
        "采用建议机制，而非强制自动切换",
        "AI 辅助组件实现，但交互逻辑和测试指标由设计者定义"
      ]
    },
    researchContent: {
      problemStatement: "评审阅读作品集时，会在快速扫读、过程审查和研究评估之间切换。传统线性作品集把所有内容放在同一叙事层级中，导致快速阅读负担重，深入阅读路径不清。",
      context: "项目将作品集视为面向评审任务的信息界面，研究阅读行为、内容密度、叙事层级与用户控制权之间的关系。",
      hypothesis: "如果系统能根据阅读行为推荐合适的内容层级，并保留用户主动切换权，就能降低信息搜索成本，提高理解效率。",
      approach: "基于 Next.js 与 React 构建原型，设置 Quick / Process / Research 三种模式，并记录滚动速度、停留时间、点击深度与导航路径。通过 6 名参与者的 A/B 测试，对比线性与自适应版本。",
      logic: [
        "不同用户有不同的阅读深度需求 → 需要多种阅读模式",
        "用户行为反映其意图 → 可以通过行为数据推断偏好",
        "自适应系统应建议，而不是替用户决定",
        "作品集需要展示过程而非仅结果 → 需要分层内容结构"
      ],
      strategies: [
        "设计三种阅读模式：快速浏览、过程探索、研究深入",
        "开发行为追踪系统实时分析用户意图",
        "使用时间轴实现直观的项目筛选",
        "用长按预览减少跳转成本",
        "保留手动切换和忽略选项"
      ],
      findings: "A/B 测试显示，自适应版本降低了信息查找时间：理解项目核心内容由 10.9 秒降至 5.20 秒，找到设计过程由 4.1 秒降至 1.13 秒，找到研究逻辑由 6.3 秒降至 1.42 秒。信息清晰度由 3/5 提升至 4.5/5，用户控制感由 2/5 提升至 4/5",
      reflection: "项目证明，自适应界面的价值不是替用户阅读，而是帮助用户更快进入合适的信息层级。后续需扩大样本，并继续处理行为追踪、隐私保护与用户控制权的边界。"
    }
  },

  {
    id: "veilspace",
    title: "Soft Thresholds · Veilspace",
    description: "1:1 具身响应式空间装置，通过身体行为触发织物边界变化，探索空间如何感知、反馈并调节人与环境的关系。中国高等教育学会华灿奖国家级二等奖作品。",
    keywords: ["1:1响应式空间原型", "具身交互", "行为反馈"],
    coverImage: "/images/projects/veilspace/cover.png",
    previewVideo: "/videos/projects/veilspace_preview.mp4",
    fullDescription: "Veilspace 探索静态建筑与动态响应环境之间的边界。项目获中国高等教育学会华灿奖国家级二等奖。",
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
      { src: "/images/projects/veilspace/03.png", caption: "" },
      { src: "/images/projects/veilspace/04.png", caption: "" },
      { src: "/images/projects/veilspace/05.jpg", caption: "" },
      { src: "/images/projects/veilspace/06.png", caption: "" },
      { src: "/images/projects/veilspace/07.png", caption: "" },
      { src: "/images/projects/veilspace/08.png", caption: "" },
      { src: "/images/projects/veilspace/09.png", caption: "" },
      { src: "/images/projects/veilspace/10.jpg", caption: "" },
      { src: "/images/projects/veilspace/11.png", caption: "" },
      { src: "/images/projects/veilspace/12.png", caption: "" },
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
    keywords: ["实时数据反馈", "Creative Coding", "实时可视化"],
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
      { src: "/images/works/td/01.png", caption: "" },
      { src: "/images/works/td/02.png", caption: "" },
      { src: "/images/works/td/03.png", caption: "" },
      { src: "/images/works/td/04.png", caption: "" },
      { src: "/images/works/td/05.png", caption: "" },
      { src: "/images/works/td/06.png", caption: "" },
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
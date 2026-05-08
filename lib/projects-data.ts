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
      "小样本对比测试：Linear vs. Adaptive Portfolio",
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
        "Quick / Process / Research 三种模式对应快速判断、过程审查与研究评估",
        "通过滚动速度、停留时间、点击深度与导航路径判断阅读倾向",
        "系统提供阅读模式建议，同时保留用户的手动切换与忽略权",
        "通过小样本 A/B 测试验证信息查找效率、清晰度与用户控制感"
      ],
      outcome: "将作品集从线性展示转化为可根据阅读目标调整信息层级的自适应界面。"
    },
    processContent: {
      phases: [
        {
          title: "评审任务拆解",
          description: "定义快速判断、过程追踪与研究验证三类阅读任务。"
        },
        {
          title: "阅读行为识别",
          description: "记录滚动速度、停留时间、点击深度与导航路径，推断用户当前的阅读倾向。"
        },
        {
          title: "三模式界面设计",
          description: "建立 Quick / Process / Research 三种内容密度与叙事层级。"
        },
        {
          title: "前端原型实现",
          description: "基于 Next.js 与 React 实现模式切换、时间轴筛选、项目预览与响应式布局。"
        },
        {
          title: "小样本 A/B 测试",
          description: "对比线性作品集与自适应作品集在任务完成效率、信息清晰度和控制感上的差异。"
        }
      ],
      methodology: "以设计评审场景为研究对象，通过任务拆解、行为记录、界面原型和小样本对比测试，验证自适应作品集界面的可行性。",
      iterations: "项目经历了从线性列表、时间轴筛选、三模式阅读，到行为提示机制的多轮迭代。",
      decisions: [
        "用 Quick 支持 1 分钟快速判断",
        "用 Process 呈现设计过程和关键决策",
        "用 Research 承载问题、方法、测试与反思",
        "用时间轴强化项目发展关系",
        "采用建议机制，而非强制自动切换",
        "AI 辅助前端组件实现，但交互逻辑、阅读任务与测试指标由设计者定义"
      ]
    },
    researchContent: {
      problemStatement: "评审阅读作品集时，会在快速扫读、过程审查和研究评估之间切换。传统线性作品集把所有内容放在同一叙事层级中，导致快速阅读负担重，快速判断成本高，深入阅读路径不清。",
      context: "项目将作品集视为一种面向评审任务的信息界面，而不是静态展示页面。研究重点放在阅读行为、内容密度、叙事层级与用户控制权之间的关系。",
      hypothesis: "如果界面能够根据用户阅读行为提示合适的内容层级，并允许用户保留主动切换权，就可以降低信息搜索成本，提高作品理解效率。",
      approach: "项目基于 Next.js 与 React 构建交互原型，设置 Quick / Process / Research 三种阅读模式，并记录滚动速度、停留时间、点击深度与导航路径。随后通过 6 名参与者的小样本 A/B 测试，对比线性作品集与自适应作品集在典型阅读任务中的表现。",
      logic: [
        "不同用户有不同的阅读深度需求 → 界面需要提供多种信息层级",
        "用户行为：滚动、停留和点击行为 → 可以通过行为数据推断偏好",
        "自适应系统应建议，而不是替用户决定",
        "作品集需要展示过程而非仅结果 → 需要分层内容结构，呈现过程、方法和研究逻辑"
      ],
      strategies: [
        "设计 Quick / Process / Research 三种阅读模式",
        "通过滚动、停留、点击和导航路径判断阅读倾向",
        "使用时间轴组织项目发展关系",
        "通过项目预览降低跳转成本",
        "保留手动切换、忽略建议和自主浏览路径"
      ],
      findings: "小样本 A/B 测试显示，自适应版本在典型信息查找任务中表现更高效：理解项目核心内容的时间由 10.9 秒降至 5.20 秒，找到设计过程由 4.1 秒降至 1.13 秒，找到研究逻辑由 6.3 秒降至 1.42 秒。信息清晰度由 3/5 提升至 4.5/5，用户控制感由 2/5 提升至 4/5。由于样本量较小，结果主要用于验证设计方向，而非作为统计显著性结论。",
      reflection: "项目说明，自适应界面的价值并不是替用户阅读，而是帮助用户更快进入合适的信息层级。后续需要扩大测试样本，并进一步处理行为记录、隐私边界、模式误判与用户控制权之间的关系。"
    }
  },

  {
    id: "veilspace",
    title: "Soft Thresholds · Veilspace",
    description: "1:1 具身响应式空间装置，通过身体行为触发织物边界变化，探索空间如何感知、反馈并调节人与环境的关系。中国高等教育学会华灿奖国家级二等奖作品。",
    keywords: ["1:1响应式空间原型", "具身交互", "行为反馈"],
    coverImage: "/images/projects/veilspace/cover.png",
    previewVideo: "/videos/projects/veilspace_preview.mp4",
    fullDescription: "Soft Thresholds · VeilSpace 是一个 1:1 具身响应式空间原型。项目以人的身体行为作为空间输入，通过 FSR 压力传感器识别坐下、倚靠、停留与离开等状态，并由 Arduino 与步进电机控制柔性织物边界的下降、收拢与展开，同时联动 Unity 实时视觉反馈。项目关注的不是装置运动本身，而是空间如何根据人的停留状态、心理距离与私密需求产生连续响应，从而将建筑边界转化为一种可感知、可反馈、可调节的交互界面。项目获中国高等教育学会华灿奖国家级二等奖。",
    year: "2025",
    startDate: "2025.7",
    endDate: "2025.9",
    location: "奥克兰，新西兰",
    role: "设计师与制作者",
    video: "/videos/projects/veilspace_demo.mp4",
    details: [
      "中国高等教育学会华灿奖国家级二等奖",
      "1:1 柔性织物边界装置",
      "FSR 压力传感器识别身体行为",
      "Arduino + 步进电机控制系统",
      "Unity 实时视觉反馈",
      "开放—半围合—私密的空间状态变化"
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
      headline: "一个将身体姿态转译为空间边界变化的 1:1 具身交互装置",
      keyPoints: [
        "通过座面与靠背的 FSR 压力传感器识别坐下、后仰与离开",
        "Arduino、CNC Shield 与 NEMA17 步进电机驱动织物边界升降",
        "Unity 同步生成清晰、模糊、工作场景与休憩场景的视觉反馈",
        "以五个交互状态构建从进入、退隐到重新介入的体验流程"
      ],
      outcome: "完成了一个将身体姿态转化为物理边界运动与数字视觉反馈的具身交互原型。"
    },
    processContent: {
      phases: [
        {
          title: "用户情境提炼",
          description: "观察半开放场景中的临时私密、情绪缓冲与低打扰休憩需求。"
        },
        {
          title: "交互概念定义",
          description: "将坐下、后仰、离开等自然身体行为转化为无需学习的交互输入。"
        },
        {
          title: "身体输入测试",
          description: "通过座面与靠背 FSR 传感器识别不同姿态状态。"
        },
        {
          title: "物理反馈搭建",
          description: "使用 Arduino、CNC Shield 与 NEMA17 电机控制织物边界升降。"
        },
        {
          title: "织物界面调试",
          description: "调整滑轮、钢杆、织物张力与运动路径，优化边界变化的稳定性。"
        },
        {
          title: "数字反馈联动",
          description: "通过 Unity 同步实时画面、模糊层、场景切换与粒子反馈。"
        }
      ],
      methodology: "以半开放空间中的私密调节需求为起点，通过 1:1 原型测试整合身体输入、物理运动与数字反馈。",
      iterations: "项目经历了概念草图、FSR 传感器测试、电机控制调试、织物边界实验与完整 1:1 原型搭建等多轮迭代。",
      decisions: [
        "用摇椅放大直坐、后仰与离开的身体状态差异",
        "用 FSR 压力传感器实现被动触发，降低交互学习成本",
        "以织物形成柔性、可逆、非封闭的空间边界",
        "采用座面与靠背的多点传感，而非摄像头识别",
        "用 Unity 作为数字反馈层，强化用户对空间状态变化的感知"
      ]
    },
    researchContent: {
      problemStatement: "在半开放空间中，用户的私密需求往往不是完全隔离，而是短暂、可逆、低打扰的边界调节。Veilspace 关注的问题是：空间边界能否根据身体姿态发生变化，并成为一种可被感知和操作的交互界面？",
      context: "项目以空间边界为切入点，结合具身交互与物理计算方法，研究身体姿态、织物运动和数字反馈之间的联动关系。重点不在于创造封闭空间，而是构建一种介于开放与遮蔽之间的动态边界状态，探索空间如何通过身体输入形成可感知的响应。",
      hypothesis: "如果坐下、后仰和离开等自然身体行为能够被转化为系统输入，并同步触发织物边界变化与视觉反馈，用户就可以在无需额外学习的情况下理解并使用这一空间交互系统。",
      approach: "项目通过 1:1 实体原型进行验证：座面与靠背的 FSR 压力传感器读取身体压力变化，Arduino 处理输入信号，步进电机控制织物边界升降，Unity 同步生成实时画面、模糊层、场景切换与视觉反馈。",
      logic: [
        "空间边界可以被设计为一种交互界面",
        "身体姿态可以成为低门槛、非显性的输入方式",
        "私密性不是简单开关，而是可连续调节的空间状态",
        "物理反馈与数字反馈需要同步发生，才能形成明确的交互感知"
      ],
      strategies: [
        "以摇椅放大直坐、后仰和离开的姿态差异",
        "以座面与靠背 FSR 读取身体压力变化",
        "用织物升降形成柔性、可逆的空间边界",
        "用 Unity 画面变化强化空间状态反馈",
        "用五阶段流程组织进入、退隐、重新介入与离开的体验",
        "避免使用摄像头识别，降低隐私压力与交互侵入感"
      ],
      findings: "在小范围体验反馈中，70% 体验者能够理解身体姿态与织物变化之间的对应关系，并主动进行多次尝试。部分体验者将装置描述为具有“回应感”和“生命感”的空间界面。由于样本量有限，该结果主要用于验证交互方向，而非统计性结论。",
      reflection: "项目初步建立了身体输入、实体运动与数字反馈之间的联动机制。后续仍需进一步优化传感稳定性、机械可靠性、织物运动精度，以及实时视觉反馈中的隐私边界。"
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
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
  comingSoon?: boolean  // 标记为进行中/即将上线的占位作品
  title: string
  titleEn?: string
  titleHk?: string
  description: string
  descriptionEn?: string
  descriptionHk?: string
  keywords: string[]
  keywordsEn?: string[]
  keywordsHk?: string[]
  coverImage?: string
  coverImageEn?: string  // English version cover image
  previewVideo?: string
  fullDescription: string
  fullDescriptionEn?: string
  fullDescriptionHk?: string
  year: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2025.6"
  endDate: string    // 如 "2025.8"
  location: string
  locationEn?: string
  locationHk?: string
  role: string
  roleEn?: string
  roleHk?: string
  details: string[]
  detailsEn?: string[]
  detailsHk?: string[]
  video?: string
  galleryImages?: GalleryImage[]
  galleryImagesEn?: GalleryImage[]  // English version gallery images
  galleryImagesHk?: GalleryImage[]  // Traditional Chinese version
  // 三种阅读模式的内容
  quickContent?: QuickContent
  quickContentEn?: QuickContent
  quickContentHk?: QuickContent
  processContent?: ProcessContent
  processContentEn?: ProcessContent
  processContentHk?: ProcessContent
  researchContent?: ResearchContent
  researchContentEn?: ResearchContent
  researchContentHk?: ResearchContent
}

export const projects: Project[] = [
  {
    id: "airsite",
    comingSoon: true,
    title: "Airsite",
    titleEn: "Airsite",
    titleHk: "Airsite",
    description: "面向城市设计的人机协同决策支持系统，将多源数据、规则约束与 AI Agent 推理相结合。",
    descriptionEn: "A human–AI collaborative decision-support system for urban design, integrating multi-source data, rule-based constraints, and AI-agent reasoning.",
    descriptionHk: "面向城市設計的人機協同決策支援系統，將多源數據、規則約束與 AI Agent 推理相結合。",
    keywords: ["AI Agent", "决策支持", "城市数据"],
    keywordsEn: ["AI Agent", "Decision Support", "Urban Data"],
    keywordsHk: ["AI Agent", "決策支援", "城市數據"],
    coverImage: "/images/works/airsite/cover.png",
    fullDescription: "城市设计涉及大量异构数据、相互冲突的规范约束与难以显式表达的专家判断，其决策过程通常缺乏结构化与可复现性。Airsite 旨在构建一套面向城市设计的人机协同决策支持系统，将多源数据、规则约束与 AI Agent 的推理能力相耦合，实现约束求解、方案生成与后果推演，同时将最终决策权保留于设计者。研究遵循三阶段推进路径：其一，通过文献综述厘清城市设计决策的方法论框架与现有 AI Agent 的能力边界；其二，选取真实城市设计问题作为验证场景，检验方法在实际规范与数据约束下的有效性；其三，将验证后的工作流程封装为可复用的 AI Agent。项目目前处于进行阶段。",
    fullDescriptionEn: "Urban design involves large volumes of heterogeneous data, conflicting regulatory constraints, and expert judgment that is difficult to make explicit, resulting in decision processes that are typically unstructured and non-reproducible. Airsite aims to develop a human–AI collaborative decision-support system for urban design that couples multi-source data and rule-based constraints with the reasoning capacity of AI agents, enabling constraint solving, option generation, and consequence simulation while reserving final decision authority for the designer. The research follows a three-stage trajectory: first, a literature review to delineate the methodological framework of urban-design decision-making and the capability boundaries of existing AI agents; second, validation against a real urban-design problem to test the method's effectiveness under actual regulatory and data constraints; and third, encapsulation of the validated workflow into a reusable AI agent. The project is currently in progress.",
    fullDescriptionHk: "城市設計涉及大量異構數據、相互衝突的規範約束與難以顯式表達的專家判斷，其決策過程通常缺乏結構化與可複現性。Airsite 旨在構建一套面向城市設計的人機協同決策支援系統，將多源數據、規則約束與 AI Agent 的推理能力相耦合，實現約束求解、方案生成與後果推演，同時將最終決策權保留於設計者。研究遵循三階段推進路徑：其一，通過文獻綜述釐清城市設計決策的方法論框架與現有 AI Agent 的能力邊界；其二，選取真實城市設計問題作為驗證場景，檢驗方法在實際規範與數據約束下的有效性；其三，將驗證後的工作流程封裝為可複用的 AI Agent。項目目前處於進行階段。",
    year: "2026",
    startDate: "2026.1",
    endDate: "2026.6",
    location: "西安，中国",
    locationEn: "Xi'an, China",
    locationHk: "西安，中國",
    role: "设计师 / 研究者",
    roleEn: "Designer / Researcher",
    roleHk: "設計師 / 研究者",
    details: [],
    detailsEn: [],
    detailsHk: [],
    quickContent: {
      headline: "面向城市设计的人机协同决策支持系统，整合多源数据、规则约束与 AI Agent 推理（进行中）。",
      keyPoints: [
        "通过文献综述厘清城市设计决策的方法论框架与现有 AI Agent 的能力边界",
        "选取真实城市设计问题作为验证场景，评估方法在实际约束下的有效性",
        "将验证后的工作流程封装为可复用的 AI Agent，而非一次性演示原型",
        "AI 负责数据处理与后果推演，最终决策权保留于设计者",
      ],
      outcome: "将城市设计中分散的数据、规则约束与专家判断，整合为结构化、可交互且可复用的决策流程。",
    },
    quickContentEn: {
      headline: "A human–AI collaborative decision-support system for urban design, integrating multi-source data, rule-based constraints, and AI-agent reasoning (in progress).",
      keyPoints: [
        "Delineate the methodological framework of urban-design decision-making and the capability boundaries of existing AI agents through a literature review",
        "Select a real urban-design problem as a validation scenario to assess the method's effectiveness under actual constraints",
        "Encapsulate the validated workflow into a reusable AI agent rather than a one-off demonstration prototype",
        "The AI handles data processing and consequence simulation; final decision authority remains with the designer",
      ],
      outcome: "Consolidating the fragmented data, regulatory constraints, and expert judgment of urban design into a structured, interactive, and reusable decision process.",
    },
    quickContentHk: {
      headline: "面向城市設計的人機協同決策支援系統，整合多源數據、規則約束與 AI Agent 推理（進行中）。",
      keyPoints: [
        "通過文獻綜述釐清城市設計決策的方法論框架與現有 AI Agent 的能力邊界",
        "選取真實城市設計問題作為驗證場景，評估方法在實際約束下的有效性",
        "將驗證後的工作流程封裝為可複用的 AI Agent，而非一次性演示原型",
        "AI 負責數據處理與後果推演，最終決策權保留於設計者",
      ],
      outcome: "將城市設計中分散的數據、規則約束與專家判斷，整合為結構化、可交互且可複用的決策流程。",
    },
    processContent: {
      phases: [
        {
          title: "论文方法研究",
          description: "通过系统性文献综述，梳理城市设计与决策过程的方法论框架、约束条件与评价标准，并界定现有 AI Agent 在该领域的能力边界与适用性。此阶段为后续研究奠定理论基础。",
        },
        {
          title: "城市设计验证",
          description: "选取具有代表性的真实城市设计问题作为验证场景，将前一阶段构建的方法应用于实际情境，检验其在真实规范与数据约束下的有效性与可行性。",
        },
        {
          title: "开发可复用 AI Agent",
          description: "将经过验证的工作流程抽象并封装为可复用的 AI Agent，使其能够迁移至新的应用场景，避免针对每一问题重复构建。",
        },
      ],
      methodology: "研究遵循'方法建构—实证验证—工具封装'的递进路径：由文献方法研究到真实问题验证，再到可复用 Agent 的开发，各阶段依次衔接、层层支撑。",
      iterations: "方法框架将依据验证结果持续迭代——真实问题中暴露的局限将反向修正前期的方法论假设。",
      decisions: [
        "将文献方法研究置于开发之前，以避免过早进入实现阶段导致的方向偏离",
        "坚持以真实城市设计问题进行验证，而非依赖理想化数据的自证",
        "以可复用 Agent 为目标，而非仅能单次演示的原型",
        "始终将最终决策权保留于设计者，AI 仅承担辅助角色",
      ],
    },
    processContentEn: {
      phases: [
        {
          title: "Literature & Method Research",
          description: "Through a systematic literature review, map the methodological framework, constraints, and evaluation criteria of urban-design decision-making, and delineate the capability boundaries and applicability of existing AI agents in this domain. This stage establishes the theoretical foundation for subsequent work.",
        },
        {
          title: "Urban Design Validation",
          description: "Select a representative real urban-design problem as a validation scenario and apply the method constructed in the prior stage to the actual context, testing its effectiveness and feasibility under real regulatory and data constraints.",
        },
        {
          title: "Building a Reusable AI Agent",
          description: "Abstract and encapsulate the validated workflow into a reusable AI agent that can transfer to new application scenarios, avoiding the need to rebuild for each individual problem.",
        },
      ],
      methodology: "The research follows a progressive 'method construction — empirical validation — tool encapsulation' path: from literature-based method research to real-problem validation to the development of a reusable agent, with each stage building sequentially upon the last.",
      iterations: "The method framework will be iterated continuously according to validation results—limitations exposed in real problems feed back to revise the earlier methodological assumptions.",
      decisions: [
        "Position literature and method research before development, to avoid directional drift caused by entering implementation prematurely",
        "Insist on validation with a real urban-design problem rather than self-confirmation via idealized data",
        "Target a reusable agent rather than a prototype capable only of a single demonstration",
        "Reserve final decision authority for the designer throughout; the AI serves only in a supporting role",
      ],
    },
    processContentHk: {
      phases: [
        {
          title: "論文方法研究",
          description: "通過系統性文獻綜述，梳理城市設計與決策過程的方法論框架、約束條件與評價標準，並界定現有 AI Agent 在該領域的能力邊界與適用性。此階段為後續研究奠定理論基礎。",
        },
        {
          title: "城市設計驗證",
          description: "選取具有代表性的真實城市設計問題作為驗證場景，將前一階段構建的方法應用於實際情境，檢驗其在真實規範與數據約束下的有效性與可行性。",
        },
        {
          title: "開發可複用 AI Agent",
          description: "將經過驗證的工作流程抽象並封裝為可複用的 AI Agent，使其能夠遷移至新的應用場景，避免針對每一問題重複構建。",
        },
      ],
      methodology: "研究遵循'方法建構—實證驗證—工具封裝'的遞進路徑：由文獻方法研究到真實問題驗證，再到可複用 Agent 的開發，各階段依次銜接、層層支撐。",
      iterations: "方法框架將依據驗證結果持續迭代——真實問題中暴露的局限將反向修正前期的方法論假設。",
      decisions: [
        "將文獻方法研究置於開發之前，以避免過早進入實現階段導致的方向偏離",
        "堅持以真實城市設計問題進行驗證，而非依賴理想化數據的自證",
        "以可複用 Agent 為目標，而非僅能單次演示的原型",
        "始終將最終決策權保留於設計者，AI 僅承擔輔助角色",
      ],
    },
    researchContent: {
      problemStatement: "城市设计需同时处理大量异构数据、相互冲突的规范约束与高度依赖经验的专家判断。其决策过程往往隐性存在于设计者的经验之中，难以显式表达、结构化与复现；当问题复杂度上升时，人工权衡的完整性与一致性亦难以保障。",
      context: "本研究将城市设计视为一个'约束条件下的决策过程'，而非静态的图纸产出。核心问题在于：多源数据、规则约束、方案推演与人的判断，能否通过一个 AI Agent 予以系统性整合与协调。",
      hypothesis: "若先系统性地研究城市设计决策的方法论，继而以真实问题加以验证，最终将其封装为可复用的 AI Agent，则该系统有望切实降低设计者的认知负荷，而非成为又一缺乏实用价值的工具。",
      approach: "研究依循三阶段路径：论文方法研究（界定城市决策与 AI Agent 的方法论边界）→ 城市设计验证（以真实问题检验方法有效性）→ 开发可复用 AI Agent（将工作流程封装为工具）。各阶段的产出将反向修正上一阶段的假设。",
      logic: [
        "城市决策复杂且依赖经验 → 须先使方法论显式化，方可交由机器执行",
        "理想化数据缺乏说服力 → 必须以真实城市设计问题进行验证",
        "单次演示原型价值有限 → 应构建可反复调用的 Agent",
        "AI 具备计算能力但不应承担责任 → 决策权须始终保留于设计者",
      ],
      strategies: [
        "先行开展文献与方法研究，再进入系统开发",
        "锁定一个真实城市设计问题作为验证场景",
        "将多源数据、规则约束与方案推演接入 Agent 的推理流程",
        "设计人机协同的交互机制，确保设计者可随时介入与否决",
        "将验证后的工作流程模块化，以支持向新场景的迁移",
      ],
      findings: "项目处于进行阶段，尚无最终结论。现阶段工作集中于方法论研究与验证场景的构建。",
      reflection: "本项目的核心挑战在于克制过早进入实现的倾向——厘清方法论较之急于产出结果更为关键。同时须始终审慎地认识到：无论 AI Agent 的能力如何提升，城市尺度的价值取舍最终仍应由人来承担。",
    },
    researchContentEn: {
      problemStatement: "Urban design must simultaneously handle large volumes of heterogeneous data, conflicting regulatory constraints, and highly experience-dependent expert judgment. Its decision process often resides tacitly within the designer's expertise, resisting explicit articulation, structuring, and reproduction; as problem complexity increases, the completeness and consistency of manual trade-offs become difficult to guarantee.",
      context: "This research treats urban design as a 'decision process under constraints' rather than a static plan-production task. The central question is whether multi-source data, rule-based constraints, option simulation, and human judgment can be systematically integrated and coordinated through an AI agent.",
      hypothesis: "If the methodology of urban-design decision-making is first studied systematically, subsequently validated on a real problem, and finally encapsulated into a reusable AI agent, the system stands to substantively reduce the designer's cognitive load rather than becoming yet another tool lacking practical value.",
      approach: "The research follows a three-stage path: literature & method research (delineating the methodological boundaries of urban decision-making and AI agents) → urban design validation (testing the method's effectiveness on a real problem) → building a reusable AI agent (encapsulating the workflow into a tool). The output of each stage feeds back to revise the assumptions of the preceding one.",
      logic: [
        "Urban decisions are complex and experience-dependent → the methodology must be made explicit before it can be delegated to a machine",
        "Idealized data lacks persuasiveness → validation must use a real urban-design problem",
        "A single-demonstration prototype has limited value → a repeatedly invokable agent should be constructed",
        "AI possesses computational capacity but should not bear accountability → decision authority must remain with the designer",
      ],
      strategies: [
        "Conduct literature and method research prior to system development",
        "Lock in one real urban-design problem as the validation scenario",
        "Integrate multi-source data, rule constraints, and option simulation into the agent's reasoning process",
        "Design a human–AI collaboration mechanism ensuring the designer can intervene and override at any point",
        "Modularize the validated workflow to support transfer to new scenarios",
      ],
      findings: "The project is in progress and has yielded no final conclusions. Current work concentrates on methodological research and construction of the validation scenario.",
      reflection: "The central challenge of this project lies in resisting the tendency to enter implementation prematurely—clarifying the methodology matters more than rushing toward output. It also demands a sustained, critical awareness that, however the capabilities of the AI agent advance, value trade-offs at the urban scale should ultimately remain a human responsibility.",
    },
    researchContentHk: {
      problemStatement: "城市設計需同時處理大量異構數據、相互衝突的規範約束與高度依賴經驗的專家判斷。其決策過程往往隱性存在於設計者的經驗之中，難以顯式表達、結構化與複現；當問題複雜度上升時，人工權衡的完整性與一致性亦難以保障。",
      context: "本研究將城市設計視為一個'約束條件下的決策過程'，而非靜態的圖紙產出。核心問題在於：多源數據、規則約束、方案推演與人的判斷，能否通過一個 AI Agent 予以系統性整合與協調。",
      hypothesis: "若先系統性地研究城市設計決策的方法論，繼而以真實問題加以驗證，最終將其封裝為可複用的 AI Agent，則該系統有望切實降低設計者的認知負荷，而非成為又一缺乏實用價值的工具。",
      approach: "研究依循三階段路徑：論文方法研究（界定城市決策與 AI Agent 的方法論邊界）→ 城市設計驗證（以真實問題檢驗方法有效性）→ 開發可複用 AI Agent（將工作流程封裝為工具）。各階段的產出將反向修正上一階段的假設。",
      logic: [
        "城市決策複雜且依賴經驗 → 須先使方法論顯式化，方可交由機器執行",
        "理想化數據缺乏說服力 → 必須以真實城市設計問題進行驗證",
        "單次演示原型價值有限 → 應構建可反覆調用的 Agent",
        "AI 具備計算能力但不應承擔責任 → 決策權須始終保留於設計者",
      ],
      strategies: [
        "先行開展文獻與方法研究，再進入系統開發",
        "鎖定一個真實城市設計問題作為驗證場景",
        "將多源數據、規則約束與方案推演接入 Agent 的推理流程",
        "設計人機協同的交互機制，確保設計者可隨時介入與否決",
        "將驗證後的工作流程模組化，以支持向新場景的遷移",
      ],
      findings: "項目處於進行階段，尚無最終結論。現階段工作集中於方法論研究與驗證場景的構建。",
      reflection: "本項目的核心挑戰在於克制過早進入實現的傾向——釐清方法論較之急於產出結果更為關鍵。同時須始終審慎地認識到：無論 AI Agent 的能力如何提升，城市尺度的價值取捨最終仍應由人來承擔。",
    },
  },
  {
    id: "portfolio-website",
    title: "Adaptive Portfolio Interface",
    titleEn: "Adaptive Portfolio Interface",
    titleHk: "自適應作品集介面",
    description: "基于阅读行为感知的自适应界面实验，探索信息密度动态调整如何降低认知负荷，提升复杂信息的理解效率与用户控制感。",
    descriptionEn: "An adaptive interface experiment based on reading behavior perception, exploring how dynamic information density adjustment can reduce cognitive load and improve understanding efficiency.",
    descriptionHk: "基於閱讀行為感知的自適應介面實驗，探索資訊密度動態調整如何降低認知負荷，提升複雜資訊的理解效率與用戶控制感。",
    keywords: ["自适应界面", "认知负荷", "行为感知"],
    keywordsEn: ["Adaptive Interface", "Cognitive Load", "Behavior Sensing"],
    keywordsHk: ["自適應介面", "認知負荷", "行為感知"],
    coverImage: "/images/works/portfolio/cover.png",
    coverImageEn: "/images/works/portfolio/cover_en.png",
    fullDescription: "项目从设计评审中的快速浏览、过程审查与研究理解三类阅读需求出发，提出 Quick / Process / Research 三种阅读模式。通过滚动速度、停留时间与点击深度等行为信号识别用户阅读状态，动态调整信息密度与内容层级，降低认知负荷，提升用户在复杂信息环境中的控制感与理解效率。",
    fullDescriptionEn: "Starting from three reading needs in design reviews—quick browsing, process review, and research understanding—the project proposes Quick / Process / Research modes. By recognizing user reading states through scroll speed, dwell time, and click depth, it dynamically adjusts information density and content hierarchy to reduce cognitive load.",
    fullDescriptionHk: "項目從設計評審中的快速瀏覽、過程審查與研究理解三類閱讀需求出發，提出 Quick / Process / Research 三種閱讀模式。通過滾動速度、停留時間與點擊深度等行為信號識別用戶閱讀狀態，動態調整資訊密度與內容層級，降低認知負荷，提升用戶在複雜資訊環境中的控制感與理解效率。",
    year: "2026",
    startDate: "2026.3",
    endDate: "2026.5",
    location: "西安，中国",
    locationEn: "Xi'an, China",
    locationHk: "西安，中國",
    role: "设计师",
    roleEn: "Designer",
    roleHk: "設計師",
    details: [
      "Quick / Process / Research 三种阅读模式",
      "基于行为信号的阅读状态感知",
      "信息密度与内容层级动态调整",
      "降低认知负荷的自适应策略",
      "Next.js + React + Tailwind CSS 前端实现",
      "AI-assisted prototyping 辅助前端迭代"
    ],
    detailsEn: [
      "Quick / Process / Research reading modes",
      "Reading state perception based on behavioral signals",
      "Dynamic adjustment of information density and content hierarchy",
      "Adaptive strategies for reducing cognitive load",
      "Next.js + React + Tailwind CSS frontend implementation",
      "AI-assisted prototyping for frontend iteration"
    ],
    detailsHk: [
      "Quick / Process / Research 三���閱讀模式",
      "基於行為信號的閱讀狀態感知",
      "資訊密度與內容層級動態調整",
      "降低認知負荷的自適應策略",
      "Next.js + React + Tailwind CSS 前端實現",
      "AI-assisted prototyping 輔助前端迭代"
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
    galleryImagesEn: [
      { src: "/images/works/portfolio/01_en.png", caption: "" },
      { src: "/images/works/portfolio/02_en.png", caption: "" },
      { src: "/images/works/portfolio/03_en.png", caption: "" },
      { src: "/images/works/portfolio/04_en.png", caption: "" },
      { src: "/images/works/portfolio/05_en.png", caption: "" },
      { src: "/images/works/portfolio/06_en.png", caption: "" },
      { src: "/images/works/portfolio/07_en.png", caption: "" },
      { src: "/images/works/portfolio/08_en.png", caption: "" },
    ],
    quickContent: {
      headline: "根据评审阅读行为调整内容密度的自适应作品集界面",
      keyPoints: [
        "Quick / Process / Research 三种模式对应快速判断、过程审查与研究评估",
        "通过滚动速度、停留时间、点击深度与导航路径判断阅读倾向",
        "系统提供阅读模式建议，同时保留用户的手动��换与忽略权",
        "通过小样本 A/B 测试验证信息查找效率、清晰度与用户控制感"
      ],
      outcome: "将作品集从线性展示转化为可根据阅读目标调整信息层级的自适应界面。"
    },
    quickContentEn: {
      headline: "An adaptive portfolio interface that adjusts content density based on reviewer reading behavior",
      keyPoints: [
        "Quick / Process / Research modes correspond to quick judgment, process review, and research evaluation",
        "Determine reading preferences through scroll speed, dwell time, click depth, and navigation paths",
        "System provides reading mode suggestions while preserving user's manual switching and ignore rights",
        "Validated through small-sample A/B testing for information retrieval efficiency, clarity, and user control"
      ],
      outcome: "Transformed portfolio from linear display to adaptive interface that adjusts information hierarchy based on reading goals."
    },
    quickContentHk: {
      headline: "根據評審閱讀行為調整內容密度的自適應作品集介面",
      keyPoints: [
        "Quick / Process / Research 三種模式對應快速判斷、過程審查與研究評估",
        "通過滾動速度、停留時間、點擊深度與導航路徑判斷閱讀傾向",
        "系統提供閱讀模式建議，同時保留用戶的手動切換與忽略權",
        "通過小樣本 A/B 測試驗證資訊查找效率、清晰度與用戶控制感"
      ],
      outcome: "將作品集從線性展示轉化為可根據閱讀目標調整資訊層級的自適應介面。"
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
    processContentEn: {
      phases: [
        {
          title: "Review Task Decomposition",
          description: "Define three reading tasks: quick judgment, process tracking, and research validation."
        },
        {
          title: "Reading Behavior Recognition",
          description: "Record scroll speed, dwell time, click depth, and navigation paths to infer user's current reading preference."
        },
        {
          title: "Three-Mode Interface Design",
          description: "Establish Quick / Process / Research content density and narrative levels."
        },
        {
          title: "Frontend Prototype Implementation",
          description: "Implement mode switching, timeline filtering, project preview, and responsive layout based on Next.js and React."
        },
        {
          title: "Small-Sample A/B Testing",
          description: "Compare linear portfolio and adaptive portfolio on task completion efficiency, information clarity, and sense of control."
        }
      ],
      methodology: "Using design review scenarios as research subjects, validate adaptive portfolio interface feasibility through task decomposition, behavior recording, interface prototyping, and small-sample comparative testing.",
      iterations: "Project went through multiple iterations from linear list, timeline filtering, three-mode reading, to behavior suggestion mechanism.",
      decisions: [
        "Use Quick to support 1-minute quick judgment",
        "Use Process to present design process and key decisions",
        "Use Research to carry problems, methods, tests, and reflections",
        "Use timeline to strengthen project development relationships",
        "Adopt suggestion mechanism rather than forced automatic switching",
        "AI assists frontend component implementation, but interaction logic, reading tasks, and test metrics are defined by designer"
      ]
    },
    processContentHk: {
      phases: [
        {
          title: "評審任務拆解",
          description: "定義快速判斷、過程追蹤與研究驗證三類閱讀任務。"
        },
        {
          title: "閱讀行為識別",
          description: "記錄滾動速度、停留時間、點擊深度與導航路徑，推斷用戶當前的閱讀傾向。"
        },
        {
          title: "三模式介面設計",
          description: "建立 Quick / Process / Research 三種內容密度與敘事層級。"
        },
        {
          title: "前端原型實現",
          description: "基於 Next.js 與 React 實現模式切換、��間軸篩選、項目預覽與響應式佈局。"
        },
        {
          title: "小樣本 A/B 測試",
          description: "對比線性作品集與自適應作品集在任務完成效率、資訊清晰度和控制感上的差異。"
        }
      ],
      methodology: "以設計評審場景為研究對象，通過任務拆解、行為記錄、介面原型和小樣本對比測試，驗證自適應作品集介面的可行性。",
      iterations: "項目經歷了從線性列表、時間軸篩選、三模式閱讀，到行為提示機制的多輪迭代。",
      decisions: [
        "用 Quick 支持 1 分鐘快速判斷",
        "用 Process 呈現設計過程和關鍵決策",
        "用 Research 承載問題、方法、測試與反思",
        "用時間軸強化項目發展關係",
        "採用建議機制，而非強制自動切換",
        "AI 輔助前端組件實現，但交互邏輯、閱讀任務與測試指標由設計者定義"
      ]
    },
    researchContent: {
      problemStatement: "评审阅读作品集时，会在快速扫读、过程审查和研究评估之间切换。传统线性作品集把所有内容放在同一叙事层级中，导致快速阅读负担重，快速判断成本高，深入阅读路径不清。",
      context: "项目将作品集视为一种面向评审任务的信息界面，而不是��态展示页面。研究重点放在阅读行为、内容密度、叙事层级与用户控制权之间的关系。",
      hypothesis: "如果界面能够根据用户阅读行为提示合适的内容层级，并允许用户保留主动切换权，就可以降低信息搜索成本，提高作品理解效率。",
      approach: "项目基于 Next.js 与 React 构建交互原型，设置 Quick / Process / Research 三种阅读模式，并记录滚动速度、停留时间、点击深度与导航路径。随后通过 6 名参与者的小样本 A/B 测试，对比线性作品集与自适应作品集在典型阅读任务中的表现。",
      logic: [
        "不同用户有不���的阅读深度需求 → 界面需要提供多种信息层级",
        "用户行为：滚动、停留和点击行为 → 可以通过行为数据推断偏好",
        "自适应系统应建议，而不是替用���决定",
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
    },
    researchContentEn: {
      problemStatement: "When reviewing portfolios, reviewers switch between quick scanning, process review, and research evaluation. Traditional linear portfolios place all content at the same narrative level, leading to heavy quick reading burden, high quick judgment cost, and unclear deep reading paths.",
      context: "The project views the portfolio as an information interface for review tasks, not a static display page. Research focuses on the relationship between reading behavior, content density, narrative hierarchy, and user control.",
      hypothesis: "If the interface can suggest appropriate content levels based on user reading behavior while allowing users to retain active switching rights, it can reduce information search costs and improve project understanding efficiency.",
      approach: "The project built an interactive prototype based on Next.js and React, set up Quick / Process / Research three reading modes, and recorded scroll speed, dwell time, click depth, and navigation paths. Then through small-sample A/B testing with 6 participants, compared linear portfolio and adaptive portfolio performance in typical reading tasks.",
      logic: [
        "Different users have different reading depth needs → Interface needs to provide multiple information levels",
        "User behavior: scrolling, staying, and clicking → Preferences can be inferred through behavioral data",
        "Adaptive systems should suggest, not decide for users",
        "Portfolio needs to show process, not just results → Needs layered content structure to present process, methods, and research logic"
      ],
      strategies: [
        "Design Quick / Process / Research three reading modes",
        "Judge reading preferences through scrolling, staying, clicking, and navigation paths",
        "Use timeline to organize project development relationships",
        "Reduce navigation cost through project preview",
        "Preserve manual switching, ignoring suggestions, and autonomous browsing paths"
      ],
      findings: "Small-sample A/B testing showed adaptive version performed more efficiently in typical information retrieval tasks: time to understand project core content dropped from 10.9s to 5.20s, finding design process from 4.1s to 1.13s, finding research logic from 6.3s to 1.42s. Information clarity improved from 3/5 to 4.5/5, user control sense from 2/5 to 4/5. Due to small sample size, results are mainly for validating design direction, not statistical significance conclusions.",
      reflection: "The project shows that the value of adaptive interfaces is not to read for users, but to help users enter appropriate information levels faster. Future work needs to expand test samples and further address relationships between behavior recording, privacy boundaries, mode misjudgment, and user control."
    },
    researchContentHk: {
      problemStatement: "評審閱讀作品集時，會在快速掃讀、過程審查和研究評估之間切換。傳統線性作品集把所有內容放在同一敘事層級中，導致快速閱讀負擔重，快速判斷成本高，深入閱讀路徑不清。",
      context: "項目將作品集視為一種面向評審任務的資訊介面，而不是靜態展示頁面。研究重點放在閱讀行為、內容密度、敘事層級與用戶控制權之間的關係。",
      hypothesis: "如果介面能夠根據用戶閱讀行為提示合適的內容層級，並允許用戶保留主動切換權，就可以降低資訊搜索成本，提高作品理解效率。",
      approach: "項目基於 Next.js 與 React 構建交互原型，設置 Quick / Process / Research 三種閱讀模式，並記錄滾動速度、停留時間、點擊深度與導航路徑。隨後通過 6 名參與者的小樣本 A/B 測試，對比線性作品集與自適應作品集在典型閱讀任務中的表現。",
      logic: [
        "不同用戶有不同的閱讀深度需求 → 介面需要提供多種資訊層級",
        "用戶行為：滾動、停留和點擊行為 → 可以通過行為數據推斷偏好",
        "自適應系統應建議，而不是替用戶決定",
        "作品集需要展示過程而非僅結果 → 需要分層內容結構，呈現過程、方法和研究邏輯"
      ],
      strategies: [
        "設計 Quick / Process / Research 三種閱讀模式",
        "通過滾動、停留、點擊和導航路徑判斷閱讀傾向",
        "使用時間軸組織項目發展關係",
        "通過項目預覽降低跳轉成本",
        "保留手動切換、忽略建議和自主瀏覽路徑"
      ],
      findings: "小樣本 A/B 測試顯示，自適應版本在典型資訊查找任務中表現更高��：理解項目核心內容的時間由 10.9 秒降至 5.20 秒，找到設計過程由 4.1 秒降至 1.13 秒，找到研究邏輯由 6.3 秒降至 1.42 秒。資訊清晰度由 3/5 提升至 4.5/5，用戶控制感由 2/5 提升至 4/5。由於樣本量較小，結果主要用於驗證設計方向，而非作為統計顯著性結論。",
      reflection: "項目說明，自適應介面的價值並不是替用戶閱讀，而是幫助用戶更快進入合適的資訊層級。後續需要擴大測試樣本，並進一步處理行為記錄、隱私邊界、模式誤判與用戶控制權之間的關係。"
    }
  },

  {
    id: "veilspace",
    title: "Soft Thresholds · Veilspace",
    titleEn: "Soft Thresholds · Veilspace",
    titleHk: "柔性邊界 · VeilSpace",
    description: "1:1 具身响应式空间装置，通过身体行为触发织物边界变化，为用户提供可调节的私密状态与情绪缓冲空间，探索响应式环境如何促进心理健康与福祉。",
    descriptionEn: "A 1:1 embodied responsive spatial installation that triggers fabric boundary changes through body behavior, providing adjustable privacy states and emotional buffer spaces, exploring how responsive environments promote mental health and wellbeing.",
    descriptionHk: "1:1 具身響應式空間裝置，通過身體行為觸發織物邊界變化，為用��提供可調節的私密狀態與情緒緩衝空間，探索響應式環境如何促進心理健康與福祉。",
    keywords: ["响应式空间", "具身感知", "健康福祉"],
    keywordsEn: ["Responsive Space", "Embodied Sensing", "Health & Wellbeing"],
    keywordsHk: ["響應式空間", "具身感知", "健康福祉"],
    coverImage: "/images/projects/veilspace/cover.png",
    coverImageEn: "/images/projects/veilspace/cover_en.png",
    previewVideo: "/videos/projects/veilspace_preview.mp4",
    fullDescription: "Soft Thresholds · VeilSpace 是一个 1:1 具身响应式空间原型，关注空间如何通过感知人的身体状态，提供私密调节与���绪缓冲。项目以人的身体行为作为空间输入，通过 FSR 压力传感器识别坐下、倚靠、停留与离开等状态，由 Arduino 与步进电机控制柔性织物边界的下降、收拢与展开。项目探索的核心问题是：响应式空间边界能否通过具身感知与环境反馈，为使用者创造更具疗愈性的空间体验，从而促进心理健康与福祉。",
    fullDescriptionEn: "Soft Thresholds · VeilSpace is a 1:1 embodied responsive spatial prototype that focuses on how space can provide privacy adjustment and emotional buffering by sensing human body states. Using FSR pressure sensors to recognize sitting, leaning, staying, and leaving states, Arduino and stepper motors control the descent, gathering, and expansion of flexible fabric boundaries. The core question is: can responsive spatial boundaries create more healing spatial experiences through embodied sensing and environmental feedback, thereby promoting mental health and wellbeing.",
    fullDescriptionHk: "Soft Thresholds · VeilSpace 是一個 1:1 具身響應式空間原型，關注空間如何通過感知人的身體狀態，提供私密調節與情緒緩衝。項目以人的身體行為作為空間輸入，通過 FSR 壓力傳感器識別坐下、倚靠、停留與離開等狀態，由 Arduino 與步進電機控制柔性織物邊界的下降、收攏與展開。項目探索的核心問題是：響應式空間邊界能否通過具身感知與環境反饋，為使用者創造更具療癒性的空間體驗，從而促進心理健康與福祉。",
    year: "2025",
    startDate: "2025.7",
    endDate: "2025.9",
    location: "奥克兰，新西兰",
    locationEn: "Auckland, New Zealand",
    locationHk: "奧克蘭，紐西蘭",
    role: "设计师与制作者",
    roleEn: "Designer & Maker",
    roleHk: "設計師與製作者",
    video: "/videos/projects/veilspace_demo.mp4",
    details: [
      "中国高等教育学会华灿奖国家级二等奖",
      "1:1 柔性织物边界装置",
      "FSR 压力传感器感知身体状态",
      "Arduino + 步进电机响应系统",
      "可调节的私密状态与情绪缓冲",
      "探索空间对健康福祉的促进作用"
    ],
    detailsEn: [
      "National Second Prize, Huacan Award, China Association of Higher Education",
      "1:1 flexible fabric boundary installation",
      "FSR pressure sensors for body state sensing",
      "Arduino + stepper motor response system",
      "Adjustable privacy states and emotional buffering",
      "Exploring spatial promotion of health and wellbeing"
    ],
    detailsHk: [
      "中國高等教育學會華燦獎國家級二等獎",
      "1:1 柔性織物邊界裝置",
      "FSR 壓力傳感器感知身體狀態",
      "Arduino + 步進電機響應系統",
      "可調節的私密狀態與情緒緩衝",
      "探索空間對健康福祉的促��作用"
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
    quickContentEn: {
      headline: "A 1:1 embodied interactive installation that translates body posture into spatial boundary changes",
      keyPoints: [
        "Recognize sitting, reclining, and leaving through FSR pressure sensors on seat and backrest",
        "Arduino, CNC Shield, and NEMA17 stepper motors drive fabric boundary movement",
        "Unity synchronously generates visual feedback for clear, blurred, work, and rest scenes",
        "Build experience flow from entering, retreating to re-engaging through five interaction states"
      ],
      outcome: "Completed an embodied interactive prototype that transforms body posture into physical boundary movement and digital visual feedback."
    },
    quickContentHk: {
      headline: "一個將身體姿態轉譯為空間邊界變化的 1:1 具身交互裝置",
      keyPoints: [
        "通過座面與靠背的 FSR 壓力傳感器識別坐下、後仰與離開",
        "Arduino、CNC Shield 與 NEMA17 步進電機驅動織物邊界升降",
        "Unity 同步生成清晰、模糊、工作場景與休憩場景的視覺反饋",
        "以五個交互狀態構建從進入、退隱到重新介入的體驗流程"
      ],
      outcome: "���成了一個將身體姿態轉化為物理邊界運動與數字視覺反饋的具身交互原型。"
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
      iterations: "项目经历了概念草图、FSR 传感��测试、电机控制调试、织物边界实验与完整 1:1 原型搭建等多轮迭代。",
      decisions: [
        "用摇椅放大直坐、后仰与离开的身体状态差异",
        "用 FSR 压力传感器实现被动触发，降低交互学习成本",
        "以织物形成柔性、可逆、非封闭的空间边界",
        "采用座面与靠背的多点传感，而非摄像头识别",
        "用 Unity 作为数字反馈层，强化用户对空间状态变化的感知"
      ]
    },
    processContentEn: {
      phases: [
        {
          title: "User Context Extraction",
          description: "Observe needs for temporary privacy, emotional buffering, and low-disturbance rest in semi-open spaces."
        },
        {
          title: "Interaction Concept Definition",
          description: "Transform natural body behaviors like sitting, reclining, and leaving into interaction inputs requiring no learning."
        },
        {
          title: "Body Input Testing",
          description: "Identify different posture states through seat and backrest FSR sensors."
        },
        {
          title: "Physical Feedback Construction",
          description: "Use Arduino, CNC Shield, and NEMA17 motors to control fabric boundary movement."
        },
        {
          title: "Fabric Interface Debugging",
          description: "Adjust pulleys, steel rods, fabric tension, and motion paths to optimize boundary change stability."
        },
        {
          title: "Digital Feedback Linkage",
          description: "Synchronize real-time visuals, blur layers, scene switching, and particle feedback through Unity."
        }
      ],
      methodology: "Starting from privacy adjustment needs in semi-open spaces, integrate body input, physical movement, and digital feedback through 1:1 prototype testing.",
      iterations: "Project went through multiple iterations including concept sketches, FSR sensor testing, motor control debugging, fabric boundary experiments, and complete 1:1 prototype construction.",
      decisions: [
        "Use rocking chair to amplify body state differences between upright sitting, reclining, and leaving",
        "Use FSR pressure sensors for passive triggering to reduce interaction learning cost",
        "Form flexible, reversible, non-enclosed spatial boundaries with fabric",
        "Adopt multi-point sensing on seat and backrest rather than camera recognition",
        "Use Unity as digital feedback layer to enhance user perception of spatial state changes"
      ]
    },
    processContentHk: {
      phases: [
        {
          title: "用戶情境提煉",
          description: "觀察半開放場景中的臨時私密、情緒緩衝與低打擾休憩需求。"
        },
        {
          title: "交互概念定義",
          description: "將坐下、後仰、離開等自然身體行為轉化為無需學習的交互輸入。"
        },
        {
          title: "身體輸入測試",
          description: "通過座面與靠背 FSR 傳感器識別不同姿態狀態。"
        },
        {
          title: "物理反饋搭建",
          description: "使用 Arduino、CNC Shield 與 NEMA17 電機��制織物邊界升降。"
        },
        {
          title: "織物介面調試",
          description: "調整滑輪、鋼桿、織物張力與運動路徑，優化邊界變化的穩定性。"
        },
        {
          title: "數字反饋聯動",
          description: "通過 Unity 同步即時畫面、模糊層、場景切換與粒子反饋。"
        }
      ],
      methodology: "以半開放空間中的私密調節需求為起點，通過 1:1 原型測試整合身體輸入、物理運動與數字反饋。",
      iterations: "項目經歷了概念草圖、FSR 傳感器測試、電機控制調試、織物邊界實驗與完整 1:1 原型搭建等多輪迭代。",
      decisions: [
        "用搖椅放大直坐、後仰與離開的身體狀態差異",
        "用 FSR 壓力傳感器實現被動觸發，降低交互學習成本",
        "以織物形成柔性、可逆、非封閉的空間邊界",
        "採用座面與靠背的多點傳感，而非攝像頭識別",
        "用 Unity 作為數字反饋層，強化用戶對空間狀態變化的感知"
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
      findings: "在小范围体验反馈中，70% 体验者能够理解身体姿态与织物变化之间的对应关系，并主动进行多次尝试。部分体验者将装置描述为具有「回应感」和「生命感」的空间界面。由于样本量有限，该结果主要用于验证交互方向，而非统计性结论。",
      reflection: "项目初步建立了身体输入、实体运动与数字反馈之间的联动机制。后续仍需进一步优化传感稳定性、机械可靠性、织物运动精度，以及实时视觉反馈中的隐私边界。"
    },
    researchContentEn: {
      problemStatement: "In semi-open spaces, users' privacy needs are often not complete isolation, but temporary, reversible, low-disturbance boundary adjustment. Veilspace asks: can spatial boundaries change according to body posture and become an interactive interface that can be perceived and operated?",
      context: "The project uses spatial boundaries as entry point, combining embodied interaction and physical computing methods to study the linkage between body posture, fabric movement, and digital feedback. The focus is not on creating enclosed spaces, but constructing dynamic boundary states between openness and concealment, exploring how space forms perceivable responses through body input.",
      hypothesis: "If natural body behaviors like sitting, reclining, and leaving can be transformed into system inputs and synchronously trigger fabric boundary changes and visual feedback, users can understand and use this spatial interaction system without additional learning.",
      approach: "The project validates through 1:1 physical prototype: FSR pressure sensors on seat and backrest read body pressure changes, Arduino processes input signals, stepper motors control fabric boundary movement, Unity synchronously generates real-time visuals, blur layers, scene switching, and visual feedback.",
      logic: [
        "Spatial boundaries can be designed as interactive interfaces",
        "Body posture can be low-threshold, non-explicit input method",
        "Privacy is not simple on/off, but continuously adjustable spatial state",
        "Physical and digital feedback need to occur synchronously to form clear interaction perception"
      ],
      strategies: [
        "Use rocking chair to amplify posture differences between upright sitting, reclining, and leaving",
        "Read body pressure changes through seat and backrest FSR sensors",
        "Form flexible, reversible spatial boundaries with fabric movement",
        "Enhance spatial state feedback with Unity visual changes",
        "Organize experience of entering, retreating, re-engaging, and leaving through five-stage flow",
        "Avoid camera recognition to reduce privacy pressure and interaction intrusiveness"
      ],
      findings: "In small-scale experience feedback, 70% of participants could understand the correspondence between body posture and fabric changes, and actively made multiple attempts. Some participants described the installation as a spatial interface with 'responsiveness' and 'sense of life'. Due to limited sample size, results are mainly for validating interaction direction rather than statistical conclusions.",
      reflection: "The project preliminarily established linkage mechanism between body input, physical movement, and digital feedback. Future work still needs to optimize sensing stability, mechanical reliability, fabric motion precision, and privacy boundaries in real-time visual feedback."
    },
    researchContentHk: {
      problemStatement: "在半開放空間中，用戶的私密需求往往不是完全隔離，而是短暫、可逆、低打擾的邊界調節。Veilspace 關注的問題是：空間邊界能否根據身體姿態發生變化，並成為一種可被感知和操作的交互介面？",
      context: "項目以空間邊界為切入點，結合具身交互與物理計算方法，研究身體姿態、織物運動和數字反饋之間的聯動關係。重點不在於創造封閉空間，而是構建一種介於開放與遮蔽之間的動態邊界狀態，探索空間如何通過身體輸入形成可感知的響應。",
      hypothesis: "如果坐下、後仰和離開等自然身體行為能夠被轉化為系統輸入，並同步觸發織物邊界變化與視覺反饋，用戶就可以在無需額外學習的情況下理解並使用這一空間交互系統。",
      approach: "項目通過 1:1 實體原型進行驗證：座面與靠背的 FSR 壓力傳感器讀取身體壓力變化，Arduino 處理輸入信號，步進電機控制織物邊界升降，Unity 同步生成即時畫面、模糊層、場景切換與視覺反饋。",
      logic: [
        "空間邊界可以被設計為一種交互介面",
        "身體姿態可以成為低門檻、非顯性的輸入方式",
        "私密性不是簡單開關，而是可連續調節的空間狀態",
        "物理反饋與數字反饋需要同步發生，才能形成明確的交互感知"
      ],
      strategies: [
        "以搖椅放大直坐、後仰和離開的姿態差異",
        "以座面與靠背 FSR 讀取身體壓力變化",
        "用織物升降形成柔性、可逆的空間邊界",
        "用 Unity 畫面變化強化空間狀態反饋",
        "用五階段流程組織進入、退隱、重新介入與離開的體驗",
        "避免使用攝像頭識別，降低隱私壓力與交互侵入感"
      ],
      findings: "在小範圍體驗反饋中，70% 體驗者能��理解身體姿態與織物變化之間的對應關係，並主動進行多次嘗試。部分體驗者將裝置描述為具有「回應感」和「生命感」的空間介面。由於樣本量有限，該結果主���用於驗證交互方向，而非統計性結論。",
      reflection: "項目初步建立了身體輸入、實體運動與數字反饋之間的聯動機制。後續仍需進一步優化傳感穩定性、機械可靠性、織物運動精度，以及即時視覺反饋中的隱私邊界。"
    }
  },

  {
    id: "td-music-visualization",
    title: "Audio-Driven Interactive Visualization",
    titleEn: "Audio-Driven Interactive Visualization",
    titleHk: "音頻驅動互動視覺化",
    description: "基于 TouchDesigner 的音频驱动视觉实验，将频谱、节奏与强度转译为图像尺度、运动轨迹和动态形态变化。为沉浸式空间、舞台界面与空间人机交互提供跨模态反馈原型。",
    descriptionEn: "Audio-driven visual experiment based on TouchDesigner, translating spectrum, rhythm, and intensity into image scale, motion trajectory, and dynamic morphology changes. Providing cross-modal feedback prototypes for immersive spaces, stage interfaces, and spatial HCI.",
    descriptionHk: "基於 TouchDesigner 的音頻驅動視覺實驗，將頻譜、節奏與強度轉譯為圖像尺度、運動軌跡和動態形態變化。為沉浸式空間、舞台介面與空間人機交互提供跨模態反饋原型。",
    keywords: ["实时数据反馈", "Creative Coding", "实时可视化"],
    keywordsEn: ["Real-time Data Feedback", "Creative Coding", "Real-time Visualization"],
    keywordsHk: ["即時數據反饋", "Creative Coding", "即時視覺化"],
    coverImage: "/images/works/td/cover.png",
    previewVideo: "/videos/works/td_preview.mp4",
    fullDescription: "基于 TouchDesigner将音频频谱、节奏与强度转译为实时视觉反馈，探索声音输入与空间化图像之间的跨模态映射关系。该实验可作为沉浸式展演、舞台视觉、巨幕界面和 AR/VR 环境反馈的基础原型。",
    fullDescriptionEn: "Translating audio spectrum, rhythm, and intensity into real-time visual feedback based on TouchDesigner, exploring cross-modal mapping between sound input and spatialized imagery. This experiment serves as a foundational prototype for immersive performances, stage visuals, large screen interfaces, and AR/VR environmental feedback.",
    fullDescriptionHk: "基於 TouchDesigner 將音頻頻譜、節奏與強度轉譯為即時視覺反饋，探索聲音輸入與空間化圖像之間的跨模態映射關係。該實驗可作為沉浸式展演、舞台視覺、巨幕介面和 AR/VR 環境反饋的基礎原型。",
    year: "2024",
    startDate: "2024.8",
    endDate: "2024.8",
    location: "西安，中国",
    locationEn: "Xi'an, China",
    locationHk: "西安，中國",
    role: "设计师",
    roleEn: "Designer",
    roleHk: "設計師",
    video: "/videos/works/td_demo.mp4",
    details: [
      "TouchDesigner 实时视觉生成",
      "音频频谱与节奏特征提取",
      "低频 / 中频 / 高频分层映射",
      "粒子、尺度与运动参数联动"
    ],
    detailsEn: [
      "TouchDesigner real-time visual generation",
      "Audio spectrum and rhythm feature extraction",
      "Low/mid/high frequency layered mapping",
      "Particle, scale, and motion parameter linkage"
    ],
    detailsHk: [
      "TouchDesigner 即時視覺生成",
      "音頻頻譜與節奏特徵提取",
      "低頻 / 中頻 / 高頻分層映射",
      "粒子、尺度與運動參數聯動"
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
      headline: "将声音信号转译为���时视觉反馈的交互实验",
      keyPoints: [
        "解析音频频谱、节奏与强度变化",
        "将不同频段映射为尺度、轨迹和粒子参数",
        "通过 TouchDesigner 实现实时渲染与参数控制",
        "探索声音输入与视觉输出之间的多模态关系"
      ],
      outcome: "建立了一个音频驱动的实时视觉反馈原型"
    },
    quickContentEn: {
      headline: "Interactive experiment translating sound signals into real-time visual feedback",
      keyPoints: [
        "Analyze audio spectrum, rhythm, and intensity changes",
        "Map different frequency bands to scale, trajectory, and particle parameters",
        "Achieve real-time rendering and parameter control through TouchDesigner",
        "Explore multi-modal relationships between sound input and visual output"
      ],
      outcome: "Established an audio-driven real-time visual feedback prototype"
    },
    quickContentHk: {
      headline: "將聲音信號轉譯為即時視覺反饋的交互實驗",
      keyPoints: [
        "解析音頻頻譜、節奏與強度變化",
        "將不同頻段映射為尺度、軌跡和粒子參數",
        "通過 TouchDesigner 實現即時渲染與參數控制",
        "探索聲音輸入與視覺輸出之間的多模態關係"
      ],
      outcome: "建立了一個音頻驅動的即時視覺反饋原型"
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
        "用频谱分析提取声音结构",
        "将低频用于大尺度运动，增强节奏感",
        "将高频用于细节扰动，提升画面活性",
        "通过参数平滑避免画面跳变",
        "保留实时控制接口，便于现场调整视觉强度"
      ]
    },
    processContentEn: {
      phases: [
        {
          title: "Audio Feature Extraction",
          description: "Extract spectrum, rhythm, and intensity changes as input parameters for visual generation."
        },
        {
          title: "Visual Parameter Construction",
          description: "Establish visual control parameters such as scale, motion trajectory, particle count, and morphology changes."
        },
        {
          title: "Mapping Relationship Design",
          description: "Map low, mid, and high frequencies to different levels of visual changes with distinct rules."
        },
        {
          title: "Real-time Feedback Debugging",
          description: "Optimize rendering performance to ensure real-time visual response."
        }
      ],
      methodology: "Experiment-driven design method, establishing audio-visual correspondence through continuous testing.",
      iterations: "Went through multiple rounds of parameter adjustment to optimize synchronization between visual effects and music.",
      decisions: [
        "Use spectrum analysis to extract sound structure",
        "Use low frequency for large-scale motion to enhance rhythm",
        "Use high frequency for detail disturbance to increase visual activity",
        "Use parameter smoothing to avoid visual jumps",
        "Retain real-time control interface for on-site visual intensity adjustment"
      ]
    },
    processContentHk: {
      phases: [
        {
          title: "音頻特徵提取",
          description: "提取頻譜、節奏和強度變化，作為視覺生成的輸入參數。"
        },
        {
          title: "視覺參數構建",
          description: "建立尺度、運動軌跡、粒子數量和形態變化等視覺控制參數。"
        },
        {
          title: "映射關係設計",
          description: "將低頻、中頻、高頻分別對應到不同層級的視覺變化，建立不同規則。"
        },
        {
          title: "即時反饋調試",
          description: "優化渲染性能，確保視覺響應的即時性"
        }
      ],
      methodology: "實驗驅動的設計方法，通過持續測試建立音視覺對應關係",
      iterations: "經歷了多輪參數調整，優化視覺效果與音樂的同步性",
      decisions: [
        "用頻譜分析提取聲音結構",
        "將低頻用於大尺度運動，增強節奏感",
        "將高頻用於細節擾動，提升畫面活性",
        "通過參數平滑避免畫面跳變",
        "保留即時控制介面，便於現場調整視覺強度"
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
        "将中频映射为主要形态变��",
        "将高频映射为粒子扰动和细节闪动",
        "使用平滑参数降低视觉抖动",
        "通��实时控制面板调整反馈强度"
      ],
      findings: "观众普遍认为视觉效果增强了对音乐的理解和情感体验，低频控制整体运动、高频控制细节扰动的方式，使视觉反馈更能体现音乐的节奏结构和动态强弱。",
      reflection: "该项目目前仍是屏幕端技术实验，尚未完成真实舞台、巨幕或 AR/VR 场景部署。它的价值在于建立一套可迁移的音频—视觉反馈方法，为后续空间人机交互、沉浸式展演和环境界面设计提供基础。"
    },
    researchContentEn: {
      problemStatement: "Sound is a time-based input, and visual feedback often tends to remain at a decorative level. This project focuses on: how to translate audio features into perceivable, adjustable, and hierarchically structured real-time visual feedback?",
      context: "The project serves cross-modal feedback research in spatial HCI. It does not directly address spatial boundaries, but explores the coupling between sound input, real-time computation, and visual output.",
      hypothesis: "When audio frequency bands, rhythm, and intensity are split into different input parameters and mapped to scale, motion, and particle changes respectively, visual feedback can more clearly present sound structure rather than just mechanically flickering with volume.",
      approach: "Build a real-time audio analysis and visual generation network through TouchDesigner, converting sound signal input into spectrum data and mapping it to image scale, motion paths, particle density, and dynamic morphology parameters.",
      logic: [
        "Music has structural hierarchy (beat, melody, harmony) → Visual should have corresponding hierarchy",
        "Human perception of music and vision share commonalities → Cross-sensory mapping can be established",
        "Mapping should maintain real-time responsiveness while avoiding mechanical jumps",
        "Parameter control needs to retain adjustability to adapt to different sound types"
      ],
      strategies: [
        "Map low frequency to overall scale and large-scale motion",
        "Map mid frequency to main morphology changes",
        "Map high frequency to particle disturbance and detail flickering",
        "Use smoothing parameters to reduce visual jitter",
        "Adjust feedback intensity through real-time control panel"
      ],
      findings: "Audiences generally felt that visual effects enhanced their understanding and emotional experience of music. The approach of using low frequency to control overall motion and high frequency for detail disturbance made visual feedback better reflect the rhythmic structure and dynamic intensity of music.",
      reflection: "This project is still a screen-based technical experiment and has not been deployed in real stage, large screen, or AR/VR scenarios. Its value lies in establishing a transferable audio-visual feedback method, providing a foundation for subsequent spatial HCI, immersive performances, and environmental interface design."
    },
    researchContentHk: {
      problemStatement: "聲音是一種時間性輸入，視覺反饋往往容易停留在裝飾性效果上。本項目關注的是：如何將音頻特徵轉譯為可感知、可調節、具有層次關係的即時視覺反饋？",
      context: "項目服務於空間人機交互中的跨模態反饋研究。它不直接處理空間邊界，而是補充探索聲音輸入、即時計算與視覺輸出之間的耦合方式。",
      hypothesis: "當音頻頻段、節奏和強度被拆分為不同輸入參數，並分別對應到尺度、運動和粒子變化時，視覺反饋可以更清晰地呈現聲音結構，而不是只隨音量機械閃爍。",
      approach: "通過 TouchDesigner 搭建即時音頻分析與視覺生成網絡，將聲音信號輸入轉化為頻譜數據，並映射到圖像尺度、運動路徑���粒子密度���動態形態參數。",
      logic: [
        "音樂有結構層次（節拍、旋律、和聲）→ 視覺也應有對應層次",
        "人對音樂和視覺的感知有共通性 → 可以建立跨感官映射",
        "映射關係應保持即時性，同時避免機械跳變",
        "參數控制需要保留可調性，以適應不同聲音類型"
      ],
      strategies: [
        "將低頻映射為整體尺度和大幅運動",
        "將中頻映���為主要形態變化",
        "將高頻映射為粒子擾動和細節閃動",
        "使用平滑參數降低視覺抖動",
        "通過即時控制面板調整反饋強度"
      ],
      findings: "觀眾普遍認為視覺效果增強了對音樂的理解和情感體驗，低頻控制整體運動、高頻控制細節擾動的方式，使視覺反饋更能體現音樂的節奏結構和動態強弱。",
      reflection: "該項目目前仍是螢幕端技術實驗，尚未完成真實舞台、巨幕或 AR/VR 場景部署。它的���值在於建立一套可遷移的音頻—視覺反饋方法，為後續空間人機交互、沉浸式展演和環境介面設計提供基礎。"
    }
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

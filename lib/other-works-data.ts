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
  titleEn?: string
  titleHk?: string
  titleCn: string
  titleCnHk?: string
  description: string
  descriptionEn?: string
  descriptionHk?: string
  keywords: string[]
  keywordsEn?: string[]
  keywordsHk?: string[]
  fullDescription: string
  fullDescriptionEn?: string
  fullDescriptionHk?: string
  year: string
  // 新增：精确到月份的时间范围，格式 "YYYY.M"
  startDate: string  // 如 "2024.9"
  endDate: string    // 如 "2024.11"
  category: string
  categoryEn?: string
  categoryHk?: string
  location?: string
  locationEn?: string
  locationHk?: string
  role?: string
  roleEn?: string
  roleHk?: string
  awards?: string
  awardsEn?: string
  awardsHk?: string
  details: string[]
  detailsEn?: string[]
  detailsHk?: string[]
  // 封面图片路径（放入 public 文件夹，例如 "/images/works/arbor-cover.jpg"）
  coverImage?: string
  coverImageEn?: string
  // 悬停预览视频路径（可选，悬停时自动播放约5秒）
  // 请将视频放入 /public/videos/works/ 文件夹
  previewVideo?: string
  // 详情页演示视频路径（可选，详情页顶部展示）
  demoVideo?: string
  video?: string
  // 详情页图片列表 - 每张图片都可以有标注
  galleryImages?: GalleryImage[]
  galleryImagesEn?: GalleryImage[]
  galleryImagesHk?: GalleryImage[]
  // 自定义封面比例（可选，如 "4/3", "16/9", "1/1" 等，不填则使用默认布局）
  aspectRatio?: string
  // 三种阅读模式内容
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

export const otherWorks: OtherWork[] = [
  {
    id: "nestide",
    title: "Nestide/巢流",
    titleEn: "Nestide",
    titleHk: "Nestide/巢流",
    titleCn: "巢流",
    titleCnHk: "巢流",
    description: "城市医疗物流的智能基础设施节点原型，探索低空医疗配送如何缩短急救响应时间，提升城市健康服务的可达性与公平性。",
    descriptionEn: "A smart infrastructure node prototype for urban medical logistics, exploring how low-altitude medical delivery can shorten emergency response time and improve accessibility and equity of urban health services.",
    descriptionHk: "城市醫療物流的智能基礎設施節點原型，探索低空醫療配送如何縮短急救響應時間，提升城市健康服務的可達性與公平性。",
    keywords: ["健康基础设施", "医疗可达性", "城市福祉"],
    keywordsEn: ["Health Infrastructure", "Medical Accessibility", "Urban Wellbeing"],
    keywordsHk: ["健康基礎設施", "醫療可達性", "城市福祉"],
    coverImage: "/images/projects/nestide/cover.jpg",
    coverImageEn: "/images/projects/nestide/cover_en.jpg",
    fullDescription: "Nestide 是一个面向城市健康服务的智能基础设施原型，关注低空医疗物流如何通过缩短急救响应时间，提升老龄社区和高密度片区的医疗可达性，从而促进城市整体的健康福祉。",
    fullDescriptionEn: "Nestide is a smart infrastructure prototype for urban health services, focusing on how low-altitude medical logistics can improve medical accessibility in aging communities and high-density areas by shortening emergency response time, thereby promoting overall urban health and wellbeing.",
    fullDescriptionHk: "Nestide 是一個面向城市健康服務的智能基礎設施原型，關注低空醫療物流如何通過縮短急救響應時間，提升老齡社區和高密度片區的醫療可達性，從而促進城市整體的健康福祉。",
    year: "2025",
    startDate: "2025.6",
    endDate: "2025.8",
    category: "健康基础设施设计",
    categoryEn: "Health Infrastructure Design",
    categoryHk: "健康基礎設施設計",
    location: "幸福林带，西安，中国",
    locationEn: "Xingfu Forest Belt, Xi'an, China",
    locationHk: "幸福林帶，西安，中國",
    role: "主设计师",
    roleEn: "Lead Designer",
    roleHk: "主設計師",
    galleryImages: [
      { src: "/images/projects/nestide/01.jpg", caption: "节点赋予廊道新生" },
      { src: "/images/projects/nestide/02.png", caption: "前期分析" },
      { src: "/images/projects/nestide/03.jpg", caption: "一层平面图" },
      { src: "/images/projects/nestide/04.jpg", caption: "二层平面图" },
      { src: "/images/projects/nestide/05.jpg", caption: "B1层功能分区" },
      { src: "/images/projects/nestide/06.jpg", caption: "爆炸流线图" },
    ],
    galleryImagesEn: [
      { src: "/images/projects/nestide/01_en.jpg", caption: "Node revitalizes corridor" },
      { src: "/images/projects/nestide/02_en.png", caption: "Preliminary analysis" },
      { src: "/images/projects/nestide/03_en.jpg", caption: "Ground floor plan" },
      { src: "/images/projects/nestide/04_en.jpg", caption: "Second floor plan" },
      { src: "/images/projects/nestide/05_en.jpg", caption: "B1 floor functional zoning" },
      { src: "/images/projects/nestide/06_en.jpg", caption: "Exploded circulation diagram" },
    ],
    galleryImagesHk: [
      { src: "/images/projects/nestide/01.jpg", caption: "節點賦予廊道新生" },
      { src: "/images/projects/nestide/02.png", caption: "前期分析" },
      { src: "/images/projects/nestide/03.jpg", caption: "一層平面圖" },
      { src: "/images/projects/nestide/04.jpg", caption: "二層平面圖" },
      { src: "/images/projects/nestide/05.jpg", caption: "B1層功能分區" },
      { src: "/images/projects/nestide/06.jpg", caption: "爆炸流線圖" },
    ],
    details: [
      "集成垂直起降平台",
      "自动化中转系统",
      "实时空中交通控制塔",
      "模块化设计",
    ],
    detailsEn: [
      "Integrated VTOL platform",
      "Automated transit system",
      "Real-time air traffic control tower",
      "Modular design",
    ],
    detailsHk: [
      "集成垂直起降平台",
      "自動化中轉系統",
      "即時空中交通控制塔",
      "模組化設計",
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
    quickContentHk: {
      headline: "為城市智能醫療物流設計的模組化基礎設施節點",
      keyPoints: [
        "整合起降、中轉、控制塔三大功能",
        "模組化設計適應不同城市環境",
        "即時交通管理與監控系統",
        "環境感知與自動化物流處理"
      ],
      outcome: "獲國家級一等獎。提出了一套可複製的智能物流基礎設施設計範式。"
    },
    processContent: {
      phases: [
        { title: "场地调研与需求分析", description: "分析幸福林带的城市肌理、交通流线和医疗资源分布" },
        { title: "功能原型设计", description: "通过迭代测试确定起降平台尺度、中转空间流线" },
        { title: "结构与形态生成", description: "使用参数化工具探索结构形式" },
        { title: "系统整合与优化", description: "整合传感器网络、自动化设备和交通管理系统" }
      ],
      methodology: "项目采用「城市问题识别—服务场景推演—功能单元拆解—建筑原型生成—系统网络整合」的研究型设计方法，从低空医疗物流的运行流程倒推建筑空间需求。",
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
    processContentHk: {
      phases: [
        { title: "場地調研與需求分析", description: "分析幸福林帶的城市肌理、交通流線和醫療資源分佈" },
        { title: "功能原型設計", description: "通過迭代測試確定起降平台尺度、中轉空間流線" },
        { title: "結構與形態生成", description: "使用參數化工具探索結構形式" },
        { title: "系統整合與優化", description: "整合傳感器網絡、自動化設��和交通管理系統" }
      ],
      methodology: "項目採用「城市問題識別—服務場景推演—功能單元拆解—建築原型生成—系統網絡整合」的研究型設計方法，從低空醫療物流的運行流程倒推建築空間需求。",
      iterations: "方案經歷了從單一起降設施、垂直中轉塔，到複合型低空醫療物流樞紐的多輪迭代。設計重點從形式生成逐步轉向低空服務流程、地面公共流線、物資中轉效率與城市基礎設施嵌入方式的綜合組織。",
      decisions: [
        "選擇垂直疊合而非水平鋪展，以降低既有城市片區中的用地壓力",
        "將起降平台置於上部，減少與地面人流、車流和公共活動的衝突",
        "將醫療物資儲存與中轉空間設置於建築中部，縮短起降、卸載和分揀之間的流程距離",
        "將控制與調度功能置於高點，強化對低空運行、周邊環境與城市廊道的觀察關係",
        "採用模組化節點邏輯，使該原型能夠適配醫院、社區中心、交通節點和大型公共建築屋頂等不同場景",
        "將公共服務空間保留在地面和低層，使低空基礎設施不只是物流設備，也能成為社區可進入的城市服務節點"
      ]
    },
    researchContent: {
      problemStatement: "在高密度既有城市片区中，医疗资源分布、老龄社区需求与地面交通可达性之间存在错位。传统地面医疗物流依赖道路系统，容易受到交通拥堵、片区割裂和末端配送效率的限制。NESTIDE 关注的问题是：低空医疗物流能否通过建筑节点嵌入既有城市结构，并转化为一种可组织、可运营、可扩展的城市基础设施？",
      context: "项目以西安幸福林带片区为背景。该区域具有线性绿带、周边社区密集、城市道路割裂和公共服务需求复合等特征，为低空医疗物流提供了潜在的空间廊道和服务场景。低空经济不应只被理解为飞行器技术或政策概念，而需要进一步转化为具体的起降界面、中转空间、调度节点和公共服务设施。",
      hypothesis: "如果将无人机起降、医疗物资中转、应急调度和社区公共服务整合为复合型建筑节点，并通过「节点—廊道—平台」系统连接医院、社区与城市交通界面，就可以提升医疗物资的空间组织效率，并为低空经济提供可落地的建筑基础设施原型。",
      approach: "项目采用场景推演与建筑原型设计结合的方法。首先分析片区医疗服务需求、交通割裂和社区分布；其次梳理急救药品配送、医疗物资中转和应急响应等典型流程；随后将流程拆解为起降、卸载、分拣、储存、调度和公共服务等空间单元；最终通过垂直叠合、模块化平台和控制塔组织，形成面向城市低空医疗物流的复合建筑节点。",
      logic: [
        "医疗物流具有高时效需求 → 需要绕开部分地面交通限制的低空配送路径",
        "低空飞行需要城市落点 → 需要建筑提供起降、中转、储存和调度界面",
        "既有城市空间用地紧张 → 需要通过垂直叠合提高功能组织效率",
        "单一设施难以支撑城市服务 → 需要构建节点—廊道—平台的分布式网络",
        "低空基础设施不能只服务设备 → 需要与社区公共服务和地面流线产生关系"
      ],
      strategies: [
        "构建「节点—廊道—平台」低空医疗物流系统",
        "将起降平台、中转层、储存层与控制塔进行垂直组织",
        "通过屋顶平台和高点界面回应无人机起降需求",
        "设置独立的物流流线，减少与公众流线的冲突",
        "将地面层转化为社区可进入的公共服务界面",
        "以模块化方式提高低空节点在不同城市片区中的适配能力",
        "通过剖面组织表达地面交通、建筑功能与低空运行之间的协同关系"
      ],
      findings: "设计推演表明，低空医疗物流设施不宜被理解为孤立的无人机起降点，而应被组织为兼具起降、中转、调度和公共服务功能的建筑基础设施节点。通过垂直叠合和模块化组织，建筑可以在有限用地中整合多种低空服务功能，并与既有城市公共空间、医疗设施和交通系统形成协同关系。",
      reflection: "NESTIDE 将低空经济从抽象政策和技术想象转化为具体的建筑空间问题：低空服务如何落地、如何中转、如何与人流和车流分离、如何进入既有城市片区。项目仍需要进一步引入更精确的物流仿真、飞行安全边界、噪声影响评估和运营管理机制，以验证低空医疗物流节点在真实城市环境中的可行性。"
    },
    researchContentHk: {
      problemStatement: "在高密度既有城市片區中，醫療資源分佈、老齡社區需求與地面交通可達性之間存在錯位。傳統地面醫療物流依賴道路系統，容易受到交通擁堵、片區割裂和末端配送效率的限制。NESTIDE 關注的問題是：低空醫療物流能否通過建築節點嵌入既有城市結構，並轉化為一種���組��、可運營、可擴展的城市基礎設施？",
      context: "項目以西安幸福林帶片區為背景。該區域具有線性綠帶、周邊社區密集、城市道路割裂和公共服務需求複合等特徵，為低空醫療物流提供了潛在的空間廊道和服務場景。低空經濟不應只被理解為飛行器技術或政策概念，而需要進一步轉化為具體的起降介面、中轉空間、調度節點和公共服務設施。",
      hypothesis: "如果將無人機起降、醫療物資中轉、應急調度和社區公共服務整合為複合型建築節點，並通過「節點—廊道—平台」系統連接醫院、社區與城市交通介面，就可以提升醫療物資的空間組織效率，並為低空經濟提供可落地的建築基礎設施原型。",
      approach: "項目採用場景推演與建築原型設計結合的方法。首先分析片區醫療服務需求、交通割裂和社區分佈；其次梳理急救藥品配送、醫療物資中轉和應急響應等典型流程；隨後將流程拆解為起降、卸載、分揀、儲存、調度和公共服務等空間單元；最終通過垂直疊合、模組化平台和控制塔組織，形成面向城市低空醫療物流的複合建築節點。",
      logic: [
        "醫療物流具有高時效需求 → 需要繞開部分地面交通限制的低空配送路徑",
        "低空飛行需要城市落點 → 需要建築提供起降、中轉、儲存和調度介面",
        "既有城市空間用地緊張 → 需要通過垂直疊合提高功能組織效率",
        "單一設施難以支撐城市服務 → 需要構建節點—廊道—平台的分佈式網絡",
        "低空基礎設施不能只服務設備 → 需要與社區公共服務和地面流線產生關係"
      ],
      strategies: [
        "構建「節點—廊道—平台」低空醫療物流系統",
        "將起降平台、中轉層、儲存層與控制塔進行垂直組織",
        "通過屋頂平台和高點介面回應無人機起降需求",
        "設置獨立的物流流線，減少與公眾流線的衝突",
        "將地面層轉化為社區可進入的公共服務介面",
        "以模組化方式提高低空節點在不同城市片區中的適配能力",
        "通過剖面組織表達地面交通、建築功能與低空運行之間的協同關係"
      ],
      findings: "設計推演表明，低空醫療物流設施不宜被理解為孤立的無人機起降點，而應被組織為兼具起降、中轉、調度和公共服務功能的建築基礎設施節點。通過垂直疊合和模組化組織，建築可以在有限用地中整合多種低空服務功能，並與既有城市公共空間、醫療設施和交通系統形成協同關係。",
      reflection: "NESTIDE 將低空經濟從抽象政策和技術想象轉化為具體的建築空間問題：低空服務如何落地、如何中轉、如何與人流和車流分離、如何進入既有城市片區。項目仍需要進一步引入更精確的物流仿真、飛行安全邊界、噪聲影響評估和運營管理機制，以驗證低空醫療物流節點在真實城市環境中的可行性。"
    }
  },
  {
    id: "fu",
    title: "FU",
    titleEn: "FU",
    titleHk: "FU",
    titleCn: "波形建筑",
    titleCnHk: "波形建築",
    description: "基于声音频谱与环境数据的生成式屋顶设计，探索数据驱动的空间形态如何创造更具感知性与疗愈性的公共环境体验。",
    descriptionEn: "A generative roof design based on sound spectrum and environmental data, exploring how data-driven spatial forms create more perceptive and healing public environment experiences.",
    descriptionHk: "基於聲音頻譜與環境數據的生成式屋頂設計，探索數據驅動的空間形態如何創造更具感知性與療癒性的公共環境體驗。",
    keywords: ["环境感知", "生成式设计", "疗愈空间"],
    keywordsEn: ["Environmental Sensing", "Generative Design", "Healing Space"],
    keywordsHk: ["環境感知", "生成式設計", "療癒空間"],
    coverImage: "/images/projects/fu/cover.png",
    fullDescription: "FU 探索声音频谱、环境数据与空间形态之间的转译关系，研究数据驱动的屋顶系统如何通过起伏、节奏与遮蔽变化，创造更具感知性与疗愈性的公共空间体验，促进使用者的身心福祉。",
    fullDescriptionEn: "FU explores the translation relationship between sound spectrum, environmental data, and spatial form, studying how data-driven roof systems create more perceptive and healing public space experiences through undulation, rhythm, and shading variations, promoting users' physical and mental wellbeing.",
    fullDescriptionHk: "FU 探索聲音頻譜、環境數據與空間形態之間的轉譯關係，研究數據驅動的屋頂系統如何通過起伏、節奏與遮蔽變化，創造更具感知性與療癒性的公共空間體驗，促進使用者的身心福祉。",
    year: "2025",
    startDate: "2025.8",
    endDate: "2025.11",
    category: "环境感知设计",
    categoryEn: "Environmental Sensing Design",
    categoryHk: "環境感知設計",
    location: "奥克兰 Harbour，新西兰",
    locationEn: "Auckland Harbour, New Zealand",
    locationHk: "奧克蘭 Harbour，紐西蘭",
    role: "设计师",
    roleEn: "Designer",
    roleHk: "設計師",
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
    galleryImagesEn: [
      { src: "/images/projects/fu/01.jpg", caption: "Facade Rendering" },
      { src: "/images/projects/fu/02.jpg", caption: "Inspiration" },
      { src: "/images/projects/fu/03.jpg", caption: "Exploded Diagram" },
      { src: "/images/projects/fu/04.jpg", caption: "Sound Spectrum Translation" },
      { src: "/images/projects/fu/05.jpg", caption: "Section" },
      { src: "/images/projects/fu/06.jpg", caption: "Roof Connection Detail" },
      { src: "/images/projects/fu/07.JPG", caption: "Sectional Model" },
      { src: "/images/projects/fu/08.png", caption: "Interior Space" },
    ],
    galleryImagesHk: [
      { src: "/images/projects/fu/01.jpg", caption: "立面效果圖" },
      { src: "/images/projects/fu/02.jpg", caption: "Inspiration" },
      { src: "/images/projects/fu/03.jpg", caption: "爆炸分析圖" },
      { src: "/images/projects/fu/04.jpg", caption: "聲音頻譜轉譯" },
      { src: "/images/projects/fu/05.jpg", caption: "剖面圖" },
      { src: "/images/projects/fu/06.jpg", caption: "屋頂連接Detail" },
      { src: "/images/projects/fu/07.JPG", caption: "Sectional Model" },
      { src: "/images/projects/fu/08.png", caption: "室內空間" },
    ],
    details: [
      "基于多重波函数叠加的算法",
      "参数化控制频率、振幅和相位关系",
      "使用 Grasshopper 和自定义 C# 组件",
      "输出格式兼容 CNC 制造和 3D 打印",
    ],
    detailsEn: [
      "Algorithm based on multiple wave function superposition",
      "Parametric control of frequency, amplitude, and phase relationships",
      "Using Grasshopper and custom C# components",
      "Output compatible with CNC manufacturing and 3D printing",
    ],
    detailsHk: [
      "基於多重波函數疊加的算法",
      "參數化控制頻率、振幅和相位關係",
      "使用 Grasshopper 和自定義 C# 組件",
      "輸出格式兼容 CNC 製造和 3D 列印",
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
    quickContentHk: {
      headline: "基於波形數學的生成式建築形態系統",
      keyPoints: [
        "多重波函數疊加生成複雜幾何",
        "參數化控制實現無限形態變化",
        "輸出兼容數字製造工藝",
        "探索形態與聲學的內在關聯"
      ],
      outcome: "獲奧克蘭大學2025本科優秀畢業設計。建立了從算法到建造的完整生成式設計流程。"
    },
    processContent: {
      phases: [
        { title: "数学原理研究", description: "研究波叠加、相位干涉等数学原理" },
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
    processContentHk: {
      phases: [
        { title: "數學原理研究", description: "研究波疊加、相位干涉等數學原理" },
        { title: "算法開發", description: "使用 Grasshopper 和 C# 開發波形生成算法" },
        { title: "形態探索", description: "通過調整參數生成大量形態變體" },
        { title: "製造驗證", description: "將選定形態轉化為 CNC 和 3D 列印可執行的文件" }
      ],
      methodology: "項目採用生成式設計方法，將聲音頻譜、波形函數與文化圖案轉化為可調節的形態生成規則。設計並不直接追求單一造型結果，而是通過參數變化探索屋頂結構、覆蓋介面與公共停留空間之間的多種可能性。",
      iterations: "設計過程經歷了從二維頻譜提取、波形曲線生成、曲面轉譯、結構秩序調整到空間體驗優化的多輪迭代。項目生成並篩選了大量形態變體，最終選擇具有較好空間連續性、結構可讀性與公共介面潛力的方案進行深化。",
      decisions: [
        "選擇聲音頻譜和波形曲線作為形態生成的基礎線索",
        "將頻率、振幅、相位和節奏變化轉化為可調節的幾何參數",
        "通過曲面細分控制屋頂的連續性、起伏強度與結構密度",
        "弱化單純的形式複雜度，優先保留可停留、可穿行和可觀看的空間介面",
        "將文化圖案作為形態秩序的輔助控制，而不是直接貼附的裝飾",
        "在生成結果中篩選兼具視覺識別度、結構邏輯和公共使用潛力的方案"
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
        "将声音频谱转化为屋顶形态的起伏与密度",
        "将环境数据用于控制屋顶的开合与遮蔽",
        "将文化图案作为形态生成中的组织线索",
        "通过参数化控制实现形态、结构和空间的协调",
        "生成式设计回应结构逻辑和使用体验"
      ],
      findings: "设计推演表明，声音和环境数据可以作为形态生成的组织线索，而不是停留在概念叙事层面。通过参数化控制，屋顶形态可以在连续起伏、结构秩序和公共使用之间形成相对稳定的关系。项目也说明，生成式设计的价值不只是产生复杂几何，而是帮助设计者系统性地比较形态、结构和空间体验之间的差异。",
      reflection: "FU 将声音频谱、环境数据与文化图案转化为生成式屋顶系统，探索数据如何进入建筑形态和公共空间设计。但项目仍以概念原型和形态推演为主，后续需要进一步引入结构分析、材料节点、环境性能模拟和真实使用行为评估，才能验证其作为可建造屋顶系统的完整可行性。"
    },
    researchContentHk: {
      problemStatement: "傳統屋頂常被理解為建築的頂部覆蓋構件，其公共性、感知性和環境響���能力往往被弱化。FU 關注的問題是：屋頂能否不只是遮蔽結構，而成為一種由聲音、環境數據和文化圖案共同驅動的空間介面？",
      context: "項目位於奧克蘭濱水區語境下，場地具有開放視野、公共活動和文化敘事的複合需求。設計嘗試將聲音頻譜、環境感知和文化圖案作為形態生成輸入，探索抽象數據如何被轉譯為可體驗的建築結構、屋頂覆蓋和公共停留介面。",
      hypothesis: "如果將聲音頻譜和環境數據轉化為可調節的幾何參數，並通過生成式設計方法控制屋頂的起伏、密度和結構節奏，那麼屋頂可以從單一覆蓋構件轉化為具有公共活動、觀景停留和環境感知能力的複合空間系統。",
      approach: "項目採用從數據提取到空間轉譯的設計路徑。首先從聲音頻譜與波形曲線中提取頻率、振幅和節奏變化，再將其轉化為參數化形態控制邏輯。隨後通過曲面生成、結構細分和空間篩選，將抽象波形轉譯為屋頂系統，並進一步測試其作為公共介面、停留場所和場地標識的可能性。",
      logic: [
        "聲音頻譜具有時間、節奏和強弱變化 → 可轉化為屋頂形態的起伏與密度",
        "環境數據具有方向性和動態性 → 可影響屋頂的開合、遮蔽和空間層次",
        "文化圖案具有秩序和象徵意義 → 可作為形態生成中的組織線索",
        "屋頂不只是覆蓋構件 → 可以成為觀景、停留、活動和環境響應的公共介面",
        "生成式設計不應只追求複雜造型 → 需要回應結構邏輯、使用行為和場地體驗"
      ],
      strategies: [
        "將聲音頻譜轉化為屋頂形態的起伏與密度",
        "將環境數據用於控制屋頂的開合與遮蔽",
        "將文化圖案作為形態生成中的組織線索",
        "通過參數化控制實現形態、結構和空間的協調",
        "生成式設計回應結構邏輯和使用體驗"
      ],
      findings: "設計推演表明，聲音和環境數據可以作為形態生成的組織線索，而不是停留在概念敘事層面。通過參數化控制，屋頂形態可以在連續起伏、結構秩序和公共使用之間形成相對穩定的關係。項目也說明，生成式設計的價值不只是產生複雜幾何，而是幫助設計者系統性地比較形態、結構和空間體驗之間的差異。",
      reflection: "FU 將聲音頻譜、環境數據與文化圖案轉化為生成式屋頂系統，探索數據如何進入建築形態和公共空間設計。但項目仍以概念原型和形態推演為主，後續需要進一步引入結構分析、材料節點、環境性能模擬和真實使用行為評估，才能驗證其作為可建造屋頂系統的完整可行性。"
    }
  },
  {
    id: "arbor-of-enduring-harmonics",
    title: "Arbor of Enduring Harmonics",
    titleEn: "Arbor of Enduring Harmonics",
    titleCn: "树与水之间",
    description: "2025 第十三届全国大学生数字媒体科技作品及创意竞赛 陕西赛区三等奖",
    descriptionEn: "2025 13th National College Students Digital Media Technology Works and Creative Competition - Shaanxi Third Prize",
    keywords: ["竞赛", "课程设计", "省级奖项"],
    keywordsEn: ["Competition", "Course Design", "Provincial Award"],
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
    fullDescriptionEn: "Participated in the 13th National College Students Digital Media Technology Works and Creative Competition, exploring the harmonious coexistence between architecture and natural environment, won Shaanxi Provincial Third Prize.",
    year: "2024",
    startDate: "2024.9",
    endDate: "2024.11",
    category: "建筑设计竞赛",
    categoryEn: "Architectural Design Competition",
    location: "西安，中国",
    locationEn: "Xi'an, China",
    role: "组长",
    roleEn: "Team Leader",
    awards: "省级三等奖",
    awardsEn: "Provincial Third Prize",
    details: [
      "探索建筑与自然环境的和谐共生",
      "结合传统建筑元素与现代设计语言",
      "关注空间序列与体验设计",
    ],
    detailsEn: [
      "Exploring harmonious coexistence between architecture and nature",
      "Combining traditional architectural elements with modern design language",
      "Focusing on spatial sequence and experiential design",
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
      hypothesis: "如果将周文化中的礼制秩序、青铜器形制和历史叙事转化为空间层级、参观路径与展陈节奏，博物馆就可以不只是容纳展品的建筑，而成为一种引导观众理解文化结构的空间媒介。",
      approach: "项目从文化研究和空间组织两条线展开：首先提取西周礼乐文明、青铜器意象和仪式空间中的核心特征；随后将其转化为入口序列、展厅布局、庭院节点和体量关系；最后通过平面、剖面、轴测和效果图表达博物馆的空间叙事。",
      logic: [
        "周文化强调秩序与礼制 → 建筑需要清晰的空间层级和轴线关系",
        "青铜器具有厚重、围合与象征性 → 可转化为体量和界面语言",
        "博物馆参观具有时间性 → 需要通过路径组织形成叙事节奏",
        "历史文化表达不应停留在符号复制 → 需��转化为空间体验"
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
    titleEn: "Integrates Hans & Hui Nationality",
    titleCn: "西仓新月驿",
    description: "2025 陕西省第十八届实体空间搭建竞赛，三等奖（核心成员）",
    descriptionEn: "2025 Shaanxi Province 18th Physical Space Construction Competition - Third Prize (Core Member)",
    keywords: ["竞赛", "文化融合", "城市更新"],
    keywordsEn: ["Competition", "Cultural Integration", "Urban Renewal"],
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
      methodology: "文化导向的设计方法，从两族共同需求出发寻找空间交集。从西仓汉回共生的日常生活场景出发，提取市集、停留、交流与边界过渡等空间需求，并将其转化为可被真实搭建和体验的公共空间原型。",
      iterations: "设计经历了从文化调研、概念模型、结构推敲、材料选择到 1:1 实体搭建的完整过程。相比单纯图纸表达，项��更关注空间尺度、材料连接、身体体验和现场建造中的实际反馈。",
      decisions: [
        "以市集和日常停留作为公共空间原型的核心场景",
        "通过半开放构筑形成可进入、可停留、可交流的空间界面",
        "保留适度边界感，避免将不同文化活动简单混合",
        "采用轻量化材料与可装配构造，便于现场搭建与调整",
        "通过 1:1 实体尺度验证空间比例、材料触感与使用体验",
        "将文化符号转化为空间构造与界面语言，而非直接装饰拼贴"
      ]
    },
    researchContent: {
      problemStatement: "如多元文化社区中的公共空间不应只追求形式上的融合，也需要回应不同生活习惯、停留方式和边界感需求。项目关注的问题是：在汉回共生的街区语境中，如何通过一个可被真实搭建和使用的空���原型，创���既尊重差异又允许日常交汇的公共界面？",
      context: "项目以西安西仓片区的汉回混居语境为背景，关注市集、街巷、饮食、交往和临时停留等日常生活场景。设计并不试图用单一符号概括两种文化，而是从共同使用的公共空间入手，探索文化差异、日常行为与空间边界之间的关系。",
      hypothesis: "如果将周文化中的礼制秩序、青铜器形制和历史叙事转化为空间层级、参观路径与展陈节奏，博物馆就可以不只是容纳展品的建筑，而成为一种引导观众理解文化结构的空间媒介。",
      approach: "项目从汉回社区的日常公共活动出发，提取市集广场、临时停留、街巷交流和边界过渡等空间要素；随后通过概念模型和构造推敲形成空间原型，并进一步完成 1:1 实体搭建。设计过程重点验证空间比例、材料连接、身体尺度和现场使用感，而不是停留在概念表达层面。",
      logic: [
        "市集是高频公共生活场景 → 可作为不同人群交汇的空间核心",
        "文化差异需要被尊重 → 空间应保留适度边界和可选择的停留方式",
        "共享空间不等于完全开放 → 半开放界面更适合形成低压力交流",
        "文化表达不应依赖符号拼贴 → 应转化为构造、尺度和空间体验",
        "1:1 搭建可以检验图纸无法准确判断的身体尺度和材料感知"
      ],
      strategies: [
        "以市集广场和街巷停留为主要使用场景",
        "设置半开放空间界面，形成可进入但不压迫的公共节点",
        "通过可装配构造提高搭建效率和现场调整能力",
        "用材料、开合关系和尺度变化表达文化边界感",
        "通过实体搭建验证空间比例、构造稳定性和使用体验",
        "将项目成果从图纸表达推进到真实尺度的空间原型"
      ],
      findings: "项目表明，多元文化语境下的公共空间设计不应简单追求符号化融合，而应关注日常行为、空间边界和身体尺度之间的关系。1:1 实体搭建使设计从概念叙事进入真实体验层面，也暴露了材料连接、构造稳定性和现场调整中的具体问题。项目获陕西省三等奖。",
      reflection: "该项目强化了我从文��语境、空间概念到实体建造的完整执行能力。相比纯概念设计，1:1 搭建更直接地检验了尺度、材料、结构和使用体验。后续如果继续深化，需要增加更系统的使用者观察、现场反馈记录和构造节点优化。"
    }
  },
  {
    id: "zhihui-jiangxia",
    title: "智绘江夏·水乡新韵",
    titleEn: "AI-Painted Jiangxia: New Rhythm of Water Town",
    titleCn: "智绘江夏·水乡新韵",
    description: "2024 年全国高校 AIGC 数智建筑与文创产品设计大赛 建筑类组国家级二等奖（组长）",
    descriptionEn: "2024 National College AIGC Digital Architecture and Cultural Product Design Competition - National Second Prize in Architecture Category (Team Leader)",
    keywords: ["AIGC", "数智设计", "国家级奖项"],
    keywordsEn: ["AIGC", "Digital Design", "National Award"],
    coverImage: "/images/works/aigc/cover.jpg",
    galleryImages: [
      { src: "/images/works/aigc/01.png", caption: "" },
      { src: "/images/works/aigc/02.png", caption: "" },
      { src: "/images/works/aigc/03.png", caption: "" },
    ],
    fullDescription: "运用 AIGC 技术探索江南水乡建筑的数字化设计方法，获得全国��校 AIGC 数智建筑与文创产品设计大赛二等奖。",
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
      methodology: "项目采用人机协作的设计方法，将 AIGC 作为城市更新场景推演、空间意向生成与视觉表达的辅助工具。AI 负责快速生成多种空间氛围与风���可能性，设计者负责筛选、判断、修正和整合，使生成结果服务于具体的��市空间问题。",
      iterations: "设计过程经历了从场地关键词提取、提示词构建、图像生成、结果筛选到方案表达整合的多轮迭代。项目重点不在于单张图像生成，而在于建立一套从地域风貌理解到空间场景表达的 AIGC 辅助设计流程。",
      decisions: [
        "以江夏城市更新和地域公共空间作为设���对象",
        "使用 AIGC 快速生成多种空间氛围、街区界面与公共场景意向",
        "通过人工筛选控制图像结果的空间逻辑、尺度关系与风貌一致性",
        "将 AI 生成图像作为概念推演工具，而不是直接替代建筑设计决策",
        "保留设计者对场地问题、功能组织和最终表达品质的判断权",
        "将生成结果进一步转化为竞赛图面、场景表达和城市更新叙事"
      ]
    },
    researchContent: {
      problemStatement: "AIGC 技术能够快速生成大量空间图像，但在建筑与城市设计中，图像生成并不等于空间设计。项目关注的问题是：AIGC 如何从单纯的视觉生成工具，转化为辅助城市更新场景推演、风貌控制和方案表达的设计方法？",
      context: "项目以江夏城市更新为背景，面对传统街区风貌延续、公共空间重塑和视觉表达效率等问题。AIGC 的优势在于快速生成多种空间意向，但其局限也很明显：它容易产生风格化图像，却难以自动理解真实场地、功能流线、尺度关系和空间逻辑。因此，项目将 AIGC 放在人机协作流程中，而不是将其视为独立完成设计的工具。",
      hypothesis: "如果将地域风貌、公共空间需求和设计目标转化为清晰的提示词与图像约束，并通过人工筛选和二次修正，AIGC 可以有效支持城市更新中的空间意向推演、场景比较和视觉表达。",
      approach: "项目建立了从场地特征提取到 AI 辅助表达的工作流程：首先梳理江夏城市更新中的空间问题与风貌关键词；随后构建不同主题的提示词，生成街区界面、公共活动、空间氛围和更新场景图像；再通过人工评估筛选具有空间逻辑和表达价值的结果；最终将 AI 图像转化为竞赛图面中的概念表达、场景渲染和设计叙事。在图像生成阶段，项目尝试通过自定义 LoRA 或风格参考图控制地域建筑风貌，使生成结果更接近目标街区的空间气质。",
      logic: [
        "城市更新需要同时处理风貌、功能和公共体验 → AIGC 可用于快速生成多种场景意向",
        "AI 擅长图像风格和氛围生成 → 适合作为概念推演和视觉表达工具",
        "AI 对真实空间逻辑理解有限 → 需要设计者进行筛选、修正和整合",
        "提示词质量直接影响生成方向 → 需要将场地特征和设计目标转化为清晰约束",
        "AIGC 的价值不在于替代设计师 → 而在于提高方案探索和表达迭代效率"
      ],
      strategies: [
        "提取江夏城市更新中的地域风貌、街区肌理和公共空间关键词",
        "建立不同场景主题的提示词组合",
        "通过多轮生成比较不同空间氛围和街区界面可能性",
        "人工筛选符合尺度、功能和风貌逻辑的图像结果",
        "将 AI 生成图像与设计图纸、分析图和竞赛叙事结合",
        "避免直接复制生成结果，而是将其作为方案推演和表达素材"
      ],
      findings: "项目表明，AIGC 可以提高城市更新方案早期的场景探索效率，帮助设计者快速比较不同空间氛围、风貌表达和公共活动想象。但 AI 对建筑尺度、结构逻辑、真实功能组织和场地限制的理解仍然有限，因此必须由设计者进行判断和修正。",
      reflection: "该项目强化了我对 AI 辅助设计边界的理解：AIGC 适合用于概念启发、场景推演和视觉表达，但不能替代设计师对空间逻辑、场地问题和使用行为的判断。后续如果继续深化，需要进一步结合真实场地数据、功能分析和更严格的图像评估标准，使 AI 生成从视觉辅助走向更可靠的设计决策支持。"
    }
  },
  {
    id: "lumley-tower",
    title: "Lumley Tower",
    titleEn: "Lumley Tower",
    titleCn: "局部构造实体模型",
    description: "课程作业，1:10 建筑构造实体模型，结构细部与水体系的详图绘制",
    descriptionEn: "Course assignment, 1:10 architectural construction model, detailed drawings of structural details and water systems",
    keywords: ["建构", "模型制作", "ARCH-TECH 315"],
    keywordsEn: ["Tectonics", "Model Making", "ARCH-TECH 315"],
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
      context: "项目来源于建筑技术课程训练，重点在于通过真实建筑案例的节点分析和比例模型制作，理解建筑围护系统、结构构件与细部连接之间的关系。相比概念设计，该项目更强调建筑从图纸走向建造时所涉及的材料、尺度、节点和装配逻辑。",
      hypothesis: "实体模型制作可以揭示图纸难以表达的构造关系",
      approach: "项目首先对建筑案例的平面、剖面和节点详图进行分析，提取墙身与屋顶交接处的关键构造层次；随后将结构层、防水层、保温层、饰面层和连接构件进行分解；最后通过草模测试和精模制作，将构造逻辑转化为可视化、可组装的实体模型。",
      logic: [
        "构造是建筑的物质基础 → 需要深入理解其逻辑",
        "图纸是抽象的表达 → 实体模型提供直观认知",
        "细部决定品质 → 关注节点���精确处理"
      ],
      strategies: [
        "选择典型节点进行深入研究",
        "通过详图绘制理清构造层次",
        "实体制作验证构造可行性"
      ],
      findings: "项目首先对建筑案例的平面、剖面和节点详图进行分析，提取墙身与屋顶交接处的关键构造层次；随后将结构层、防水层、保温层、饰面层和连接构件进行分解；最后通过草模测试和精模制作，将构造逻辑转化为可视化、可组装的实体模型。",
      reflection: "该项目强化了我对建筑技术和构造细节的理解。相比单纯绘制图纸，实体模型制作迫使设计者面对材料厚度、构件连接、制作误差和施工顺序等具体问题。它也提醒我，建筑设计不能只停留在形式和空间层面，最终仍需要通过清晰的构造逻辑被建造出来。"
    }
  },
  {
    id: "energize-commons",
    title: "Energize Commons",
    titleEn: "Energize Commons",
    titleCn: "光合空间",
    description: "2025 第十届「两岸新锐设计竞赛·华灿奖」 国家级二等奖（组长）",
    descriptionEn: "2025 10th Cross-Strait Emerging Design Competition 'Huacan Award' - National Second Prize (Team Leader)",
    keywords: ["竞赛", "社区空间", "环境设计"],
    keywordsEn: ["Competition", "Community Space", "Environmental Design"],
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
      methodology: "项目采用数据驱动的环境设计方法，将日照、遮阳、空间舒适度与公共活动需求转化为可被分析和比较的设计参数。通过环境模拟与参数化形态调整，探索社区公共空间如何在自然采光、遮阳保护和活动适应性之间取得平衡。",
      iterations: "设计过程经历了场地光环境分析、关键参数提取、遮阳构件与空间形态调整、模拟反��和方案优化等多轮迭代。每一轮调整都围绕日照时长、阴影分布、公共空间可用性和视觉通透性进行比较，而不是仅凭形式直觉进行判断。",
      decisions: [
        "以日照时长、遮阳范围和公共空间舒适度作为主要评价指标",
        "通过参数化方法控制屋顶、遮阳构件和开放空间的形态变化",
        "在采光需求与遮阳需求之间建立平衡，而不是单纯追求最大日照",
        "将不同时间段的光影变化作为空间活动安排的依据",
        "优先优化居民停留、交流和活动区域的��境品质",
        "将模拟结果作为设计决策参考，同时保留对空间体验和公共性的定性判断"
      ]
    },
    researchContent: {
      problemStatement: "社区公共空间的环境品质往往受到建筑遮挡、日照不足、过度暴晒和活动空间分布不均的影响。传统设计过程中，光环境判断容易停留在经验层面，难以准确比较不同形态方案对日照、遮阳和使用舒适度的影响。项目关注的问题是：如何通��参数化工具和环境模拟，将光环境分析转化为可指导空间形态和公共活动组织的设计依据？",
      context: "项目以社区公共空间为研究对象，关注自然光、遮阳、开放空间与日常活动之间的关系。环境模拟技术使设计不再只依赖主观判断，而可以通过日照时长、阴影范围和空间可达性等指标对方案进行比较。项目尝试将量化分析引入早期设计过程，使形态调整、遮阳策略和公共空间布局能够形成更清晰的反馈关系。",
      hypothesis: "如果将日照时长、遮阳范围和公共活动需求转化为可调节参数，并通过多轮环境模拟对方案进行比较，就可以更有效地优化社区空间的光环境品质，同时提高公共空间的使用舒适度和活动适应性。",
      approach: "项目建立了从环境分析到形态优化的参数化设计流程。首先分析场地的日照条件、阴影分布和主要活动区域；随后提取影响光环境的关键形态参数，如建筑高度、遮阳构件角度、屋顶开口、公共空间尺度和界面朝向；再通过参数化模型进行多轮方案生成与模拟比较；最终根据采光、遮阳和空间使用需求筛选并深化设计方案。",
      logic: [
        "自然光影响空间舒适度 → 需要量化分析",
        "空间形态决定光环境 → 可以参数化控制",
        "优化需要迭代计算 → 适合算法辅助"
      ],
      strategies: [
        "建立日照时长、阴影范围和公共活动适应性的评价指标",
        "使用参数化模型控制形态、高度、开口和遮阳构件变化",
        "通过多轮模拟比较不同方案的光环境表现",
        "在主要停留区域强化适度采光与遮阳保护",
        "根据不同时段的光影变化组织活动空间",
        "将量化模拟结果与空间体验、公共性和场地氛围进行综合判断"
      ],
      findings: "模拟结果显示，经过多轮参数化调整后，主要公共活动区域的有效日照表现较初始方案有所提升，其中关键区域的日照时长提升约 30%。这一结果说明，参数化环境分析能够有效辅助方案筛选，但仍需结合热舒适、遮阳需求和实际使用行为进行���合判断。",
      reflection: "项目说明，量化分析可以为设计决策提供更客观的参考，但它不能替代空间体验和使用行为判断。光环境优化不应只追求单一指标最大化，而需要综合考虑采光、遮阳、活动需求、视觉开放性和社区公共性。后续如果继续深化，需要进一步引入更完整的气候数据、热舒适分析、使用者行为观察和长期环境表现评估。"
    }
  },
]

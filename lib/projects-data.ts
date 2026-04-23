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
    // 图片自动保持原始长宽比，按顺序排列
    galleryImages: [
      { src: "/images/projects/nestide/01.jpg", caption: "" },
      { src: "/images/projects/nestide/02.png", caption: "" },
      { src: "/images/projects/nestide/03.jpg", caption: "" },
      { src: "/images/projects/nestide/04.jpg", caption: "" },
      { src: "/images/projects/nestide/05.jpg", caption: "" },
      { src: "/images/projects/nestide/06.jpg", caption: "" },
    ],
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
    // 图片自动保持原始长宽比，按顺序排列
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
    // 图片自动保持原始长宽比，按顺序排列
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
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

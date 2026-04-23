// ============================================
// DATA SECTION - 在此处修改您的教育经历
// ============================================

const educationData = [
  {
    // 学校英文名
    school: "Chang'an University",
    // 学校中文名
    schoolCn: "长安大学",
    // 学院/系
    department: "建筑学院",
    // 学位/项目
    degree: "建筑学",
    // 时间段
    period: "2022.9 - 至今",
    // 学校 logo 图片路径（放入 public 文件夹，例如 "/images/edu/changan-logo.png"）
    logo: "/images/chu.jpg",
  },
  {
    school: "University of Auckland",
    schoolCn: "奥克兰大学",
    department: "建筑与规划学院",
    degree: "交换生",
    period: "2025.7 - 2025.12",
    logo: "/images/uoa.png",
  },
]

// ============================================
// COMPONENT SECTION - 以下为结构代码
// 修改排版时只改此部分，不要覆盖上方数据
// ============================================

export function Education() {
  return (
    <section className="py-12 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-0">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-6 border-b border-slate-200 last:border-b-0"
            >
              {/* Logo */}
              <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {edu.logo ? (
                  <img
                    src={edu.logo}
                    alt={edu.school}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium">LOGO</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900">
                  {edu.school}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {edu.department} · {edu.degree}
                </p>
              </div>

              {/* Date */}
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-slate-400">
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const researchInterests = [
  "低空城市基础设施",
  "数字孪生系统",
  "建筑生成式设计",
  "空间环境中的人机交互",
]

export function About() {
  return (
    <section id="about" className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Photo */}
          <div className="lg:col-span-1 flex items-start justify-center lg:justify-start">
            <div className="aspect-[3/4] bg-slate-100 w-24 md:w-28 overflow-hidden">
              {/* 照片占位框 - 将图片放入 /public/images/portrait.jpg */}
              <img
                src="/images/me.png"
                alt="周亦楠"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About & Research */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
                About
              </h2>

              <p className="text-sm text-slate-900 leading-relaxed">
                FOSA 是一名建筑学学生，探索空间设计、城市基础设施与数字技术的交叉领域。通过设计实验与装置作品，研究建筑如何回应新兴的技术与社会条件。
              </p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
                Research Interests
              </h2>

              <ul className="space-y-2">
                {researchInterests.map((interest, index) => (
                  <li
                    key={index}
                    className="text-xs text-slate-700 pl-3 border-l border-slate-200"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

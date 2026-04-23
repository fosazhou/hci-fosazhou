const skills = [
  "Rhino / Grasshopper",
  "SketchUp",
  "AutoCAD",
  "Adobe Suite",
  "D5 Render",
  "Stable Diffusion / ComfyUI",
  "TouchDesigner",
  "Unity",
  "Arduino",
]

export function Skills() {
  return (
    <section className="py-16 px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-8">
          Skills & Tools
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="text-xs text-slate-700 py-2"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

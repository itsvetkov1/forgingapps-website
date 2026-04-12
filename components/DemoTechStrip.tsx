interface DemoTechStripProps {
  theme?: 'dark' | 'light'
}

const TECH_STACK = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']

export default function DemoTechStrip({ theme = 'dark' }: DemoTechStripProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={`rounded-2xl border px-5 py-4 ${
        isDark
          ? 'border-forge-ember/20 bg-forge-dark/60 text-gray-400'
          : 'border-gray-200 bg-gray-50 text-gray-500'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-xs uppercase tracking-[0.22em] ${isDark ? 'text-forge-gold/70' : 'text-gray-400'}`}>
          Built with
        </p>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                isDark
                  ? 'border-forge-ember/20 bg-black/10 text-gray-300'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

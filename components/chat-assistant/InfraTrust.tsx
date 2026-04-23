'use client'

interface InfraTrustProps {
  copy: {
    title: string
    body: string
    bullets: string[]
  }
}

export default function InfraTrust({ copy }: InfraTrustProps) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-white">{copy.title}</h2>
      <p className="mt-4 text-base leading-relaxed text-gray-300">{copy.body}</p>

      <ul className="mt-6 space-y-3">
        {copy.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
            <span className="mt-0.5 text-forge-gold shrink-0">—</span>
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  )
}

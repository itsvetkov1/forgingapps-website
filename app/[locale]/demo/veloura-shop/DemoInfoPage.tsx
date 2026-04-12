interface DemoInfoPageProps {
  eyebrow: string
  title: string
  intro: string
  paragraphs: string[]
}

export default function DemoInfoPage({ eyebrow, title, intro, paragraphs }: DemoInfoPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        <span className="font-semibold">This is a demo.</span> The content below is illustrative placeholder copy for the Veloura storefront experience.
      </div>

      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{eyebrow}</p>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-gray-600">{intro}</p>
      </div>

      <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-gray-600">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

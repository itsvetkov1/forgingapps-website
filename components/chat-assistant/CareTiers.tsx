'use client'

interface CareTier {
  name: string
  price: string
  tagline: string
  includes: string[]
}

interface CareTiersProps {
  copy: {
    title: string
    subtitle: string
    essential: CareTier
    plus: CareTier
    pro: CareTier
    annualNote: string
  }
}

export default function CareTiers({ copy }: CareTiersProps) {
  const tiers = [
    { key: 'essential', ...copy.essential },
    { key: 'plus', ...copy.plus },
    { key: 'pro', ...copy.pro },
  ] as const

  return (
    <section className="mt-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">{copy.title}</h2>
        <p className="mt-2 text-sm text-gray-400">{copy.subtitle}</p>
      </div>

      <div className="grid gap-6 min-[840px]:grid-cols-3">
        {tiers.map(({ key, ...tier }) => {
          const isPlus = key === 'plus'
          return (
            <article
              key={key}
              className={`relative flex flex-col rounded-xl p-6 ${
                isPlus
                  ? 'border-2 border-forge-ember bg-forge-ember/10'
                  : 'border border-forge-stone/40 bg-forge-dark'
              }`}
            >
              {isPlus && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forge-ember px-3 py-1 text-xs font-semibold text-white">
                  Recommended
                </span>
              )}

              <header className="mb-4">
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <p className="mt-1 text-2xl font-bold text-forge-gold">{tier.price}</p>
                <p className="mt-1 text-sm font-medium text-gray-400">{tier.tagline}</p>
              </header>

              <ul className="flex-1 space-y-2 text-sm text-gray-300">
                {tier.includes.map((item, i) => {
                  const isPlusItem = item.startsWith('Everything in')
                  return (
                    <li key={i} className={isPlusItem ? 'font-semibold text-white' : ''}>
                      {isPlusItem ? (
                        <span className="text-forge-ember">{item}</span>
                      ) : (
                        <>
                          <span className="mr-2 text-forge-gold">—</span>
                          {item}
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">{copy.annualNote}</p>
    </section>
  )
}

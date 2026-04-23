'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface ChatFAQProps {
  copy: {
    title: string
    items: FAQItem[]
  }
}

export default function ChatFAQ({ copy }: ChatFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-white">{copy.title}</h2>

      <div className="mt-6 space-y-2">
        {copy.items.map((item, i) => (
          <div key={i} className="rounded-xl border border-forge-stone/40 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white transition hover:text-forge-gold"
              aria-expanded={openIndex === i}
            >
              {item.q}
              <span className={`ml-4 text-forge-gold transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {openIndex === i && (
              <div className="border-t border-forge-stone/40 px-5 py-4 text-sm leading-relaxed text-gray-300">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

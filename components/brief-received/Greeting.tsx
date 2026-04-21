interface GreetingProps {
  firstName?: string
  label: string
  locale: 'en' | 'bg'
  phase: 'idle' | 'loading' | 'ready' | 'missing' | 'error'
}

export default function Greeting({ firstName, label, locale, phase }: GreetingProps) {
  const resolvedName = firstName?.trim() || (locale === 'bg' ? 'там' : 'there')
  const title = label.replace('{firstName}', resolvedName)

  return (
    <div className="mb-8">
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#c4a062]/80">
        {phase === 'ready' ? (locale === 'bg' ? 'Брифът е получен' : 'Brief received') : 'ForgingApps'}
      </p>
      <h1 className="max-w-[12ch] font-cinzel text-4xl uppercase leading-[1.05] text-[#f3ede3] min-[840px]:text-[3.35rem]">
        {title}
      </h1>
    </div>
  )
}

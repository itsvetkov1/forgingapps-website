'use client'

interface MultiSelectProps {
  options: string[]
  value: string[]
  onChange: (selected: string[]) => void
  label?: string
}

export default function MultiSelect({ options, value, onChange, label }: MultiSelectProps) {
  const toggleOption = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option])
  }

  return (
    <div>
      {label ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-forge-gold/70">{label}</p> : null}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = value.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleOption(option)}
              className={[
                'rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-forge-gold/50',
                selected
                  ? 'border-forge-gold bg-forge-ember/20 text-forge-gold'
                  : 'border-forge-stone bg-forge-dark text-gray-400 hover:border-forge-ember/50 hover:text-gray-200',
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

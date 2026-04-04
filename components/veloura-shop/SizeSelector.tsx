'use client'

interface SizeOption {
  label: string
  available: boolean
}

interface SizeSelectorProps {
  sizes: SizeOption[]
  selected: string
  onChange: (size: string) => void
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">
        Size: <span className="font-medium text-gray-900">{selected}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map(s => (
          <button
            key={s.label}
            onClick={() => s.available && onChange(s.label)}
            disabled={!s.available}
            className={`min-w-[3rem] px-3 py-2 text-sm font-medium border rounded transition-all ${
              selected === s.label
                ? 'bg-gray-900 text-white border-gray-900'
                : s.available
                ? 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
                : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

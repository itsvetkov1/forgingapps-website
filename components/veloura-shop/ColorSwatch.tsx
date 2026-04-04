'use client'

interface ColorSwatchProps {
  colors: { name: string; hex: string }[]
  selected: { name: string; hex: string }
  onChange: (color: { name: string; hex: string }) => void
}

export default function ColorSwatch({ colors, selected, onChange }: ColorSwatchProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">
        Color: <span className="font-medium text-gray-900">{selected.name}</span>
      </p>
      <div className="flex gap-2">
        {colors.map(c => (
          <button
            key={c.name}
            title={c.name}
            onClick={() => onChange(c)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selected.name === c.name
                ? 'border-gray-900 scale-110'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  )
}

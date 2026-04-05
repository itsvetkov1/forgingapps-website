import { EMBER_STARTER_PROMPTS } from '@/lib/ember-config'

interface EmberStarterPromptsProps {
  disabled?: boolean
  onSelect: (prompt: string) => void
}

export default function EmberStarterPrompts({ disabled, onSelect }: EmberStarterPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EMBER_STARTER_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}

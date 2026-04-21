interface StarterPromptsProps {
  onSelect: (prompt: string) => void | Promise<void>
  prompts: string[]
}

export default function StarterPrompts({ onSelect, prompts }: StarterPromptsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => void onSelect(prompt)}
          className="rounded-full border border-[#d7cdb8] bg-white px-4 py-2 text-sm text-[#3a3f45] transition hover:border-[#d8660b]/50 hover:text-[#b04f00]"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}

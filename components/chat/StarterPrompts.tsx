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
          className="rounded-full border border-[#e8d7ba]/18 bg-[#1a232d] px-4 py-2 text-sm text-[#f3ede3] transition hover:border-[#d8660b]/50 hover:bg-[#221911] hover:text-[#ffd8bc]"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}

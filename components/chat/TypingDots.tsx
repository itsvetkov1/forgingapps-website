interface TypingDotsProps {
  label: string
}

export default function TypingDots({ label }: TypingDotsProps) {
  return (
    <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#eadfca] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(15,20,25,0.06)]">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-2.5 w-2.5 animate-[briefTyping_1.2s_ease-in-out_infinite] rounded-full bg-[#d8660b]"
          style={{ animationDelay: `${dot * 0.16}s` }}
        />
      ))}
      <style jsx global>{`
        @keyframes briefTyping {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

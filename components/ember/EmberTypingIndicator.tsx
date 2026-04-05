export default function EmberTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400 ember-dot ember-dot-1" />
            <span className="h-2 w-2 rounded-full bg-amber-400 ember-dot ember-dot-2" />
            <span className="h-2 w-2 rounded-full bg-amber-400 ember-dot ember-dot-3" />
          </div>
          <span className="text-xs text-zinc-500">Ember is thinking...</span>
        </div>
      </div>
      <style jsx global>{`
        @keyframes ember-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40% { transform: translateY(-4px); opacity: 1; }
        }

        .ember-dot {
          animation: ember-dot-bounce 1.2s infinite ease-in-out;
        }

        .ember-dot-2 { animation-delay: 0.15s; }
        .ember-dot-3 { animation-delay: 0.3s; }
      `}</style>
    </div>
  )
}

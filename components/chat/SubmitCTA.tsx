interface SubmitCTAProps {
  copy: {
    label: string
    loading: string
  }
  disabled?: boolean
  loading?: boolean
  onSubmit: () => void | Promise<void>
}

export default function SubmitCTA({ copy, disabled, loading, onSubmit }: SubmitCTAProps) {
  return (
    <div className="mt-4 rounded-[24px] border border-[#f1d7bc] bg-[#fff4e8] p-3 shadow-[0_16px_42px_rgba(216,102,11,0.08)]">
      <button
        type="button"
        onClick={() => void onSubmit()}
        disabled={disabled}
        className="w-full rounded-xl bg-[#d8660b] px-4 py-3 text-sm font-medium text-white shadow-[0_16px_38px_rgba(216,102,11,0.28)] transition hover:bg-[#e8852f] disabled:cursor-not-allowed disabled:bg-[#d7cdb8] disabled:text-[#6b6963]"
      >
        {loading ? copy.loading : copy.label}
      </button>
    </div>
  )
}

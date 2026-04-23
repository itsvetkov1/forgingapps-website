'use client'

interface ModuleItem {
  name: string
  price: string
  description: string
}

interface ModulesTableProps {
  copy: {
    title: string
    subtitle: string
    items: ModuleItem[]
  }
}

export default function ModulesTable({ copy }: ModulesTableProps) {
  return (
    <section className="mt-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{copy.title}</h2>
        <p className="mt-2 text-sm text-gray-400">{copy.subtitle}</p>
      </div>

      {/* Desktop table */}
      <div className="hidden min-[640px]:block overflow-hidden rounded-xl border border-forge-stone/40">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forge-stone/40 bg-forge-stone/20">
              <th className="px-5 py-3 text-left font-semibold text-forge-gold">Module</th>
              <th className="px-5 py-3 text-left font-semibold text-forge-gold">Price</th>
              <th className="px-5 py-3 text-left font-semibold text-forge-gold">Description</th>
            </tr>
          </thead>
          <tbody>
            {copy.items.map((item, i) => (
              <tr key={i} className="border-b border-forge-stone/20 last:border-0 even:bg-forge-stone/5">
                <td className="px-5 py-4 font-medium text-white">{item.name}</td>
                <td className="px-5 py-4 text-forge-gold font-semibold">{item.price}</td>
                <td className="px-5 py-4 text-gray-300">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex min-[640px]:hidden flex-col gap-4">
        {copy.items.map((item, i) => (
          <div key={i} className="rounded-xl border border-forge-stone/40 bg-forge-dark p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <span className="text-forge-gold font-semibold shrink-0">{item.price}</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

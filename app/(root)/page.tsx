export default function RootRedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <main className="min-h-screen flex items-center justify-center bg-forge-dark text-white px-6 text-center">
        <div>
          <p className="mb-4">Redirecting to the English site…</p>
          <a href="/en" className="text-forge-gold hover:text-forge-ember transition">Continue to /en</a>
        </div>
      </main>
    </>
  )
}

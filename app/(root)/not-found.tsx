import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-forge-dark text-white px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6 text-gray-300">Page not found.</p>
        <Link href="/en" className="text-blue-600 hover:underline">
          Go back home
        </Link>
      </div>
    </main>
  )
}
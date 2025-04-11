import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-amber-700">404</h1>
        <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          We're sorry, but the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-amber-700 px-6 py-3 text-white transition-colors hover:bg-amber-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

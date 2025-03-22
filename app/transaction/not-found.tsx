import Link from 'next/link'

export default function TransactionNotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-foreground text-6xl font-bold">404</h1>
        <h2 className="text-foreground/80 text-3xl font-semibold">
          Transaction Not Found
        </h2>
        <p className="text-muted-foreground">
          The transaction signature you are looking for does not exist or is
          invalid.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-6 py-3 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

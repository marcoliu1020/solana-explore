'use client' // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html className="dark">
      <body className="bg-background">
        <div className="bg-background flex min-h-screen items-center justify-center">
          <div className="space-y-6 text-center">
            <h1 className="text-foreground text-6xl font-bold">Error</h1>
            <h2 className="text-foreground/80 text-3xl font-semibold">
              Something went wrong!
            </h2>
            <p className="text-muted-foreground">{error.message}</p>
            <button
              onClick={() => reset()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-6 py-3 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

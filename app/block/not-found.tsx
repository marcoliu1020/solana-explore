import Link from "next/link"

export default function BlockNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-3xl font-semibold text-foreground/80">Block Not Found</h2>
        <p className="text-muted-foreground">The block number you are looking for does not exist or is invalid.</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
} 
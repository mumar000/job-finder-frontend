export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Job Finder
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          AI-powered job matching platform for freelancers. Find high-quality Upwork jobs that match your skills and preferences.
        </p>
        <div className="flex gap-4 items-center">
          <a
            href="/login"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/register"
            className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  )
}

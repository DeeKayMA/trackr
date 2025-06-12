import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect logged-in users to /dashboard
  if (user) {
    redirect('/dashboard')
  }

  // Show homepage for guests
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Jobora</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Track your job applications with ease. Log in or sign up to get started.
      </p>
    </main>
  )
}

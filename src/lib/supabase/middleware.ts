import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Case 1: User is logged in but trying to visit a public-only page
  // - Prevent access to login, auth, and landing pages when already authenticated
  if (
    user &&
    // These are public-only routes (should NOT be accessible to logged-in users)
    ['/login', '/check-email', '/auth', '/', '/forgot-password', '/reset-password'].some((path) =>
      request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
    )) {
      // Redirect authenticated user to their dashboard
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }


  // Case 2: User is not logged in but trying to access a protected page
  // - Only allow unauthenticated users on public pages like login or home
  if (
    !user &&
    // These are safe for unauthenticated users
    !['/login', '/check-email', '/auth', '/' , '/dashboard', '/forgot-password' , '/reset-password' ].some((path) =>
      request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  )) {
    // Redirect guest to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
import { NextResponse } from 'next/server'

const JWT_COOKIE_NAME = process.env.NEXT_PUBLIC_JWT_COOKIE_NAME || 'job_finder_token'

// Protected routes that require authentication
const protectedRoutes = ['/dashboard']

// Auth routes that should redirect if already authenticated
const authRoutes = ['/login', '/register']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(JWT_COOKIE_NAME)
  const isAuthenticated = !!token

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Check if current path is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

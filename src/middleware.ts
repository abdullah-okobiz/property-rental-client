import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'


const protectedRoutes: Record<string, string[]> = {
  host: ['/host-dashboard','/create-listing' ],
 
}

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('refreshtoken')?.value
  const { pathname } = request.nextUrl

  if (!accessToken) {
    for (const routes of Object.values(protectedRoutes)) {
      if (routes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    return NextResponse.next()
  }

  let decoded: any
  try {
    decoded = jwtDecode(accessToken)
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const userRole = decoded?.role

  // Role-based protection
  for (const [role, routes] of Object.entries(protectedRoutes)) {
    if (routes.some(route => pathname.startsWith(route))) {
      if (userRole !== role) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // Optional: redirect from home if already authenticated
  if (pathname === '/' && userRole === 'host') {
    return NextResponse.redirect(new URL('/host-dashboard', request.url))
  }

  return NextResponse.next()
}

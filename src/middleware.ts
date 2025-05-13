import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('refreshtoken')?.value
  const { pathname } = request.nextUrl


  if (pathname.startsWith('/host-dashboard')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      const decoded: any = jwtDecode(accessToken)
      if (decoded.role !== 'host') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  
  if (pathname === '/' && accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken)
      if (decoded.role === 'host') {
        return NextResponse.redirect(new URL('/host-dashboard', request.url))
      }
    } catch {
      // do nothing; allow to access /
    }
  }

  return NextResponse.next()
}

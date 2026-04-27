import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/', '/login', '/signup', '/api/notify', '/intake', '/verify-email', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie) {
    try {
      const parsed = await decrypt(sessionCookie);
      if (parsed.role === 'patient') {
        if (pathname === '/login' || pathname === '/signup' || pathname === '/portal-select' || pathname === '/') {
          return NextResponse.redirect(new URL('/patient/dashboard', request.url));
        }
      }
      if (parsed.role === 'doctor') {
        if (pathname === '/doctor/login' || pathname === '/portal-select' || pathname === '/') {
          return NextResponse.redirect(new URL('/doctor/dashboard', request.url));
        }
      }
    } catch (error) {
      if (!isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

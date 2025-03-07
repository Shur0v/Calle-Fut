import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/admin-login');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // If trying to access auth page while already logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access dashboard without being logged in
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-login']
}; 
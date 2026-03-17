import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const { pathname } = request.nextUrl;

  if (isMobile && pathname === '/') {
    return NextResponse.redirect(new URL('/m', request.url));
  }

  if (!isMobile && pathname === '/m') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/m'],
};

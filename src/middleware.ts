import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const membersOnlyRoutes = ['/mypage', '/tarotReading'];
const guestsOnlyRoutes = ['/login'];

export const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  if (!accessToken && membersOnlyRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && guestsOnlyRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [...membersOnlyRoutes, ...guestsOnlyRoutes],
};

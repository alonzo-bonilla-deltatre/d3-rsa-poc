import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Preview handler: URL contains `?token=`
  if (request.nextUrl.searchParams.has('token')) {
    const token = request.nextUrl.searchParams.get('token');
    const pathName = request.nextUrl.pathname;
    const redirectUrl = `/preview/${token}/${pathName}`.replace('//', '/').concat(`${request.nextUrl.search}`);

    return NextResponse.rewrite(new URL(redirectUrl, request.url));
  }
  if (request.nextUrl.searchParams.has('q')) {
    const pathName = request.nextUrl.pathname;
    const redirectUrl = `/search/${pathName}`.replace('//', '/').concat(`${request.nextUrl.search}`);
    return NextResponse.rewrite(new URL(redirectUrl, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

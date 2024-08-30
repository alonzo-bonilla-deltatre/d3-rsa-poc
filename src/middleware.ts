import { NextResponse, NextRequest } from 'next/server';

/**
 * Middleware for handling URL rewrites based on query parameters.
 *
 * This middleware function takes a Next.js request object and checks for the presence of certain query parameters.
 * If the 'token' query parameter is present, it rewrites the URL to include the token in the path.
 * If the 'q' query parameter is present, it rewrites the URL to include the query in the path.
 * If the 'appview' or 'appView' query parameter is present and set to 'true', it rewrites the URL to include 'appView' in the path.
 * If none of these conditions are met, it allows the request to proceed without modification.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @returns {NextResponse} A Next.js response object with a rewritten URL, or a response object that allows the request to proceed without modification.
 */
export function middleware(request: NextRequest): NextResponse {
  // Preview handler: URL contains `?token=`
  if (request.nextUrl.searchParams.has('token')) {
    const token = request.nextUrl.searchParams.get('token');
    const pathName = request.nextUrl.pathname;
    const redirectUrl = `/preview/${token}/${pathName}`.replace('//', '/').concat(`${request.nextUrl.search}`);

    return NextResponse.rewrite(new URL(redirectUrl, request.url));
  }
  if (request.nextUrl.searchParams.has('q')) {
    const q = request.nextUrl.searchParams.get('q');
    if (q) {
      const pathName = request.nextUrl.pathname;
      const redirectUrl = `/search/${q}/${pathName}`.replace('//', '/').concat(`${request.nextUrl.search}`);
      return NextResponse.rewrite(new URL(redirectUrl, request.url));
    }
  }
  if (request.nextUrl.searchParams.has('appview') || request.nextUrl.searchParams.has('appView')) {
    const appView = request.nextUrl.searchParams.get('appview') ?? request.nextUrl.searchParams.get('appView');
    if (appView?.toLowerCase() === 'true') {
      const pathName = request.nextUrl.pathname;
      const redirectUrl = `/appView/${appView}/${pathName}`.replace('//', '/').concat(`${request.nextUrl.search}`);
      return NextResponse.rewrite(new URL(redirectUrl, request.url));
    }
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

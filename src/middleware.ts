import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Preview handler: URL contains `?token=`
  if (request.nextUrl.searchParams.has('token')) {
    const token = request.nextUrl.searchParams.get('token');
    const pathName = request.nextUrl.pathname;
    const redirectUrl = `/preview/${token}/${pathName}`.replace('//', '/');

    return NextResponse.rewrite(new URL(redirectUrl, request.url));
  }
  return NextResponse.next();
}

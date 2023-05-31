/**
 * @jest-environment node
 */

import { middleware } from './middleware';
import { NextRequest, NextResponse } from 'next/server';

describe('middleware', () => {
  const redirectSpy = jest.spyOn(NextResponse, 'rewrite');

  afterEach(() => {
    redirectSpy.mockReset();
  });

  it('should not redirect to the preview if the token query param is not set', async () => {
    // ARRANGE
    const req = new NextRequest(new Request('http://localhost:3000/test/react-poc/'), {});

    // ACT
    await middleware(req);

    // ASSERT
    expect(redirectSpy).not.toHaveBeenCalled();
  });

  it('should redirect to the preview if the token query param is set', async () => {
    // ARRANGE
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMWJkNDE3MS05OWM1LTQxMjMtOTQ3';
    const req = new NextRequest(new Request('http://localhost:3000/test/react-poc/'), {});
    req.nextUrl.searchParams.set('token', token);

    // ACT
    await middleware(req);

    // ASSERT
    expect(redirectSpy).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledWith(new URL(`/preview/${token}/test/react-poc/`, req.url));
  });
});

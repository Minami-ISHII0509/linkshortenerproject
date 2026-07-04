import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

type RouteParams = {
  params: Promise<{
    shortCode: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteParams) {
  const { shortCode } = await context.params;

  if (!shortCode) {
    return NextResponse.json(
      { error: 'Short code is required' },
      { status: 400 }
    );
  }

  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return NextResponse.json(
      { error: 'Link not found' },
      { status: 404 }
    );
  }

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl, { status: 301 });
}

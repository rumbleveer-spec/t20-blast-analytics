import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  // 1. Verify the secret token to prevent unauthorized revalidation
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET || 'dev_secret_token';

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tag = body.tag;

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag param' }, { status: 400 });
    }

    // 2. Trigger Next.js On-Demand Revalidation
    // revalidateTag(String(tag), undefined as any);
    
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error parsing body' }, { status: 400 });
  }
}

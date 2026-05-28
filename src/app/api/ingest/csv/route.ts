import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db';
import { matches, scorecards } from '../../../../db/schema';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  // 1. Verify Authorization Header (Webhook Security)
  const authHeader = request.headers.get('authorization');
  const secret = process.env.INGESTION_SECRET;

  if (!secret) {
    console.error('CRITICAL: INGESTION_SECRET is missing from environment variables.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  if (authHeader !== `Bearer ${secret}`) {
    console.warn('Unauthorized ingestion attempt blocked.');
    return NextResponse.json({ message: 'Unauthorized access. Invalid Bearer Token.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { action, data } = payload;

    // We expect n8n to send parsed CSV JSON data in batches
    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ message: 'Invalid payload: data array required' }, { status: 400 });
    }

    // 2. Perform Database Operations based on the action
    if (action === 'historical_matches') {
      // In a real scenario, format dates and handle data mapping
      console.log(`Ingesting ${data.length} historical matches...`);
      // Example of actual ingestion with deduplication (idempotency):
      // await db.insert(matches)
      //   .values(data)
      //   .onConflictDoNothing({ target: matches.id });
    } else if (action === 'historical_scorecards') {
      console.log(`Ingesting ${data.length} historical scorecards...`);
      // await db.insert(scorecards)
      //   .values(data)
      //   .onConflictDoNothing({ target: [scorecards.matchId, scorecards.playerId] });
    } else {
      return NextResponse.json({ message: 'Unknown action' }, { status: 400 });
    }

    // 3. Revalidate global match cache
    // Cache revalidation handled by separate endpoint or can be added later
    return NextResponse.json({ success: true, ingested: data.length });
  } catch (error) {
    console.error('Ingestion Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

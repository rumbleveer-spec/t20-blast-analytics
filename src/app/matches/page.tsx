import { db } from '../../db';
import { matches } from '../../db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';

export const revalidate = 60; // Cache revalidates every 60 seconds natively

export default async function MatchesPage() {
  // Safe fetch using Drizzle from PostgreSQL
  let recentMatches: (typeof matches.$inferSelect)[] = [];
  try {
    recentMatches = await db
      .select()
      .from(matches)
      .where(eq(matches.status, 'completed'))
      .orderBy(desc(matches.startTime))
      .limit(10);
  } catch (error) {
    console.error('Database connection failed - Make sure PostgreSQL is running:', error);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-400">Match Center</h1>
          <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-neutral-800 rounded-xl border border-neutral-700/50 shadow-2xl overflow-hidden">
          {recentMatches.length === 0 ? (
            <div className="p-12 text-center text-neutral-400">
              <p className="text-lg">No matches found or Database disconnected.</p>
              <p className="text-sm mt-2">Waiting for n8n ingestion engine to push data...</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-700/50">
              {recentMatches.map((match) => (
                <div key={match.id} className="p-6 hover:bg-neutral-700/20 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {match.status.toUpperCase()}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold">{match.venue || 'Unknown Venue'}</h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {match.startTime ? new Date(match.startTime).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <Link 
                      href={`/matches/${match.id}`}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold rounded-lg shadow-lg transition-all"
                    >
                      View Deep Analytics
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

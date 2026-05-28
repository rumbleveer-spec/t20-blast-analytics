import { mockPlayers } from '../../data/players';
import { ShieldAlert, TrendingUp, Target, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PlayerContextSection } from './PlayerContextSection';

export default function PlayerProfile({ params }: { params: { id: string } }) {
  const player = mockPlayers.find(p => p.id === params.id);
  
  if (!player) {
    notFound();
  }

  // Generate realistic mock logs based on the player's recent form array
  const mockLogs = player.form.recentScores.map((score, idx) => {
    const runs = score === 'DNB' ? 0 : parseInt(score.toString(), 10) || 0;
    const balls = score === 'DNB' ? 0 : Math.max(1, runs * 0.75); // rough estimate
    return {
      matchId: `m-${idx}`,
      opponent: 'Opponent X',
      venueId: 'v-1',
      runs,
      balls,
      strikeRate: runs > 0 ? (runs / balls) * 100 : 0,
      phaseImpact: 1.2,
      pressureRating: 50 + idx * 5,
      date: '2026-05-28'
    };
  }).reverse();

  return (
    <div className="space-y-6">
      <Link href="/players" className="text-primary hover:underline flex items-center gap-2 mb-6 w-fit">
        <ArrowLeft size={16} /> Back to Players
      </Link>

      <div className="bg-surface border border-surface-hover rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="bg-background rounded-full p-8 border border-surface-hover shrink-0">
            <User size={64} className="text-foreground/20" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold">{player.name}</h1>
            <p className="text-foreground/70 text-lg mt-2">{player.role} &bull; {player.battingHand} Hand</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {player.strengths.map((str, i) => (
                <span key={i} className="bg-positive/10 text-positive px-3 py-1 rounded-full text-sm font-bold">{str}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PlayerContextSection logs={mockLogs} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-surface border border-surface-hover rounded-xl p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-foreground/70"><TrendingUp className="text-primary"/> Recent Form</h3>
            <div className="text-4xl font-mono font-bold tracking-widest text-primary">{player.form.recentScores.join('-')}</div>
            <div className="text-sm text-foreground/50 mt-2">Last 5 innings runs</div>
         </div>
         <div className="bg-surface border border-surface-hover rounded-xl p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-foreground/70"><Target className="text-warning"/> Core Metrics</h3>
            <div className="text-4xl font-bold mb-1">{player.form.strikeRate || (player.form.economy + ' Econ')}</div>
            <div className="text-sm text-foreground/50">{player.form.strikeRate ? 'Strike Rate' : 'Economy Rate'}</div>
            {player.form.wickets && <div className="text-sm font-bold text-positive mt-2">{player.form.wickets} Wickets recently</div>}
         </div>
         <div className="bg-surface border border-surface-hover rounded-xl p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-foreground/70"><ShieldAlert className="text-risk"/> Risk Flags</h3>
            {player.riskFlags.length > 0 ? (
              <ul className="space-y-3">
                {player.riskFlags.map((risk, i) => (
                  <li key={i} className="text-risk flex gap-2 items-start text-sm bg-risk/10 p-2 rounded">
                    <span className="opacity-50 shrink-0">&bull;</span> {risk}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-foreground/50">No significant risk flags detected for this player.</div>
            )}
         </div>
      </div>
    </div>
  );
}

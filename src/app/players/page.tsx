import { mockPlayers } from '../data/players';
import { ShieldAlert, TrendingUp, Zap, Target, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PlayersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Player Analytics</h1>
        <p className="text-foreground/70 mt-2">Form trends, venue preferences, and risk flags for domestic talent.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPlayers.map(player => (
          <div key={player.id} className="bg-surface border border-surface-hover rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link href={`/players/${player.id}`} className="text-xl font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                  {player.name}
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="text-sm text-foreground/50">{player.role} &bull; {player.battingHand} Hand</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-foreground/50">Recent Form</div>
                <div className="font-mono text-sm tracking-widest text-primary">{player.form.recentScores.join('-')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-background p-3 rounded-lg border border-surface-hover">
                <div className="text-xs text-foreground/50 mb-1 flex items-center gap-1"><TrendingUp size={12}/> Strike Rate</div>
                <div className="font-bold">{player.form.strikeRate || '-'}</div>
              </div>
              <div className="bg-background p-3 rounded-lg border border-surface-hover">
                <div className="text-xs text-foreground/50 mb-1 flex items-center gap-1"><Target size={12}/> Econ/Wickets</div>
                <div className="font-bold">{player.form.economy ? `${player.form.economy} / ${player.form.wickets}W` : '-'}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-foreground/50 mb-1 flex items-center gap-1"><Zap size={12} className="text-positive"/> Key Strengths</div>
                <div className="flex flex-wrap gap-2">
                  {player.strengths.map((str, i) => (
                    <span key={i} className="bg-positive/10 text-positive text-xs px-2 py-1 rounded">{str}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-foreground/50 mb-1 flex items-center gap-1"><ShieldAlert size={12} className="text-risk"/> Risk Flags</div>
                <div className="flex flex-wrap gap-2">
                  {player.riskFlags.map((risk, i) => (
                    <span key={i} className="bg-risk/10 text-risk text-xs px-2 py-1 rounded">{risk}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Activity, Map, Users, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import { mockSchedule } from './data/schedule';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">T20 Blast 2026 Dashboard</h1>
        <p className="text-foreground/70 mt-2">Executive summary, tournament anomalies, and live schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Venues', value: '18', icon: Map, color: 'text-primary' },
          { label: 'Active Players', value: '450+', icon: Users, color: 'text-positive' },
          { label: 'Top Venue (Run Rate)', value: 'Headingley', sub: '9.4 rpo', icon: TrendingUp, color: 'text-warning' },
          { label: 'Anomaly Alert', value: 'Edgbaston', sub: 'Spin dominance +15%', icon: Activity, color: 'text-risk' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-surface-hover p-6 rounded-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/70">{stat.label}</span>
              <stat.icon className={stat.color} size={20} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.sub && <div className="text-xs text-foreground/50">{stat.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface border border-surface-hover rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="text-primary"/> Upcoming Matches</h2>
          <div className="space-y-3">
            {mockSchedule.map((match) => (
              <div key={match.id} className="p-4 border border-surface-hover rounded-lg hover:bg-surface-hover/50 transition-colors flex justify-between items-center">
                <div>
                  <div className="font-bold">{match.teamA} <span className="text-foreground/50 text-sm">vs</span> {match.teamB}</div>
                  <div className="text-sm text-foreground/70 flex gap-2 items-center">
                    <span>{new Date(match.date).toLocaleDateString()}</span> &bull; <span>{match.venue}</span>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {match.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-surface-hover rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link href="/venues" className="block p-4 border border-surface-hover rounded-lg hover:bg-surface-hover transition-colors">
              <div className="font-bold text-primary">Venue Intelligence &rarr;</div>
              <div className="text-sm text-foreground/70 mt-1">Analyze pitch and ground dynamics</div>
            </Link>
            <Link href="/players" className="block p-4 border border-surface-hover rounded-lg hover:bg-surface-hover transition-colors">
              <div className="font-bold text-primary">Player Analytics &rarr;</div>
              <div className="text-sm text-foreground/70 mt-1">View player profiles, form, and stats</div>
            </Link>
            <Link href="/predictions" className="block p-4 border border-surface-hover rounded-lg hover:bg-surface-hover transition-colors">
              <div className="font-bold text-primary">Prediction Engine &rarr;</div>
              <div className="text-sm text-foreground/70 mt-1">Weighted signals and model inputs</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Target, ArrowRight } from 'lucide-react';

export default function MatchupsPage() {
  const matchups = [
    { bat: "Will Smeed", bowl: "Scott Currie", runs: 42, balls: 24, outs: 1, edge: "Batsman (+18%)" },
    { bat: "James Vince", bowl: "Jake Ball", runs: 68, balls: 45, outs: 3, edge: "Bowler (+12%)" },
    { bat: "Tom Kohler-Cadmore", bowl: "Chris Wood", runs: 55, balls: 30, outs: 0, edge: "Batsman (+35%)" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Matchups Explorer</h1>
        <p className="text-foreground/70 mt-2">Identify edges in head-to-head scenarios and bowling-type vulnerabilities.</p>
      </div>

      <div className="bg-surface border border-surface-hover rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-surface-hover text-foreground/70 font-mono">
            <tr>
              <th className="px-6 py-4">Matchup</th>
              <th className="px-6 py-4">Runs</th>
              <th className="px-6 py-4">Balls</th>
              <th className="px-6 py-4">Dismissals</th>
              <th className="px-6 py-4">Strike Rate</th>
              <th className="px-6 py-4">Calculated Edge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-hover">
            {matchups.map((m, i) => (
              <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-6 py-4 font-bold flex items-center gap-2">
                  {m.bat} <ArrowRight size={14} className="text-foreground/30"/> {m.bowl}
                </td>
                <td className="px-6 py-4">{m.runs}</td>
                <td className="px-6 py-4">{m.balls}</td>
                <td className="px-6 py-4 font-bold text-risk">{m.outs}</td>
                <td className="px-6 py-4 font-mono">{(m.runs / m.balls * 100).toFixed(1)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${m.edge.includes('Batsman') ? 'bg-primary/10 text-primary' : 'bg-risk/10 text-risk'}`}>
                    <Target size={12} className="inline mr-1" /> {m.edge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

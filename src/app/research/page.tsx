import { BookOpen, Pin } from 'lucide-react';

export default function ResearchPage() {
  const notes = [
    { title: "Trent Bridge Anomalies", date: "May 28, 2026", tags: ["Pitch Data", "High Scoring"], content: "Historically, chasing at Trent Bridge is heavily favored due to short square boundaries. However, in 2025, spinners defending targets >175 had a 65% win rate. Need to adjust the model to weight second-innings spin efficiency higher here.", pinned: true },
    { title: "Left-Arm Pace vs Right-Hand Openers", date: "May 25, 2026", tags: ["Matchup Strategy"], content: "Across the last 3 seasons of the Blast, right-handed openers strike at just 112 against left-arm pace in the first 3 overs. This is a critical edge indicator for predictive models.", pinned: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Research Notebook</h1>
          <p className="text-foreground/70 mt-2">Structured qualitative insights and model adjustment notes.</p>
        </div>
        <button className="bg-primary text-background px-4 py-2 font-bold rounded hover:bg-primary-focus transition-colors">
          + New Note
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notes.map((note, i) => (
          <div key={i} className="bg-surface border border-surface-hover rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {note.pinned && <Pin size={16} className="text-warning fill-warning/20" />}
                {note.title}
              </h2>
              <div className="text-xs text-foreground/50 font-mono">{note.date}</div>
            </div>
            
            <p className="text-foreground/80 mb-4 leading-relaxed">
              {note.content}
            </p>

            <div className="flex gap-2">
              {note.tags.map((tag, j) => (
                <span key={j} className="text-xs bg-surface-hover px-2 py-1 rounded text-foreground/70">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

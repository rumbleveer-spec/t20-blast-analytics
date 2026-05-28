import { mockVenues } from '../data/venues';
import { MapPin, TrendingUp, Cloud, Crosshair } from 'lucide-react';

export default function VenuesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Venue Intelligence</h1>
        <p className="text-foreground/70 mt-2">Analyze pitch dynamics and historical scoring patterns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockVenues.map(venue => (
          <div key={venue.id} className="bg-surface border border-surface-hover rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{venue.name}</h2>
                <div className="text-sm text-foreground/50 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {venue.city}
                </div>
              </div>
              <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                Avg 1st: {venue.avgFirstInnings}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <div className="bg-background p-3 rounded-lg border border-surface-hover">
                <div className="text-foreground/50 mb-1">Chase Win %</div>
                <div className="text-lg font-bold text-positive">{venue.chaseWinPercentage}%</div>
              </div>
              <div className="bg-background p-3 rounded-lg border border-surface-hover">
                <div className="text-foreground/50 mb-1">Death RR</div>
                <div className="text-lg font-bold text-warning">{venue.deathOversRunRate}</div>
              </div>
            </div>

            <div className="space-y-2 text-sm mt-2 border-t border-surface-hover pt-4">
              <div className="flex items-start gap-2">
                <Cloud size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80">{venue.weatherNotes}</span>
              </div>
              <div className="flex items-start gap-2">
                <Crosshair size={16} className="text-risk mt-0.5 shrink-0" />
                <span className="text-foreground/80">{venue.boundaryNotes}</span>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex gap-2">
              {venue.conditionProfile.paceFriendly && <span className="bg-surface-hover text-xs px-2 py-1 rounded-full">Pace Friendly</span>}
              {venue.conditionProfile.spinFriendly && <span className="bg-surface-hover text-xs px-2 py-1 rounded-full">Spin Friendly</span>}
              {venue.conditionProfile.shortBoundaries && <span className="bg-surface-hover text-xs px-2 py-1 rounded-full text-warning">Short Boundaries</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from 'react';
import { Activity, Settings2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function PredictionEngine() {
  const [weights, setWeights] = useState({
    powerplay: 35,
    death: 25,
    middle: 20,
    venue: 10,
    form: 10
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Prediction Engine</h1>
        <p className="text-foreground/70 mt-2">Explainable model workspace for match projections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 bg-surface border border-surface-hover rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-2 font-bold text-lg border-b border-surface-hover pb-2">
            <Settings2 size={20} className="text-primary"/> Model Weights
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Powerplay Perf.</span>
                <span className="text-primary">{weights.powerplay}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.powerplay} 
                onChange={e => setWeights({...weights, powerplay: Number(e.target.value)})}
                className="w-full accent-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Death Bowling</span>
                <span className="text-primary">{weights.death}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.death} 
                onChange={e => setWeights({...weights, death: Number(e.target.value)})}
                className="w-full accent-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Middle Overs</span>
                <span className="text-primary">{weights.middle}%</span>
              </div>
              <input type="range" min="0" max="100" value={weights.middle} 
                onChange={e => setWeights({...weights, middle: Number(e.target.value)})}
                className="w-full accent-primary" />
            </div>
          </div>
          
          <button className="w-full py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary-focus transition-colors">
            Run Projection
          </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-surface-hover rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="text-positive"/> Projected Outcome
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background p-4 rounded-lg border border-surface-hover text-center">
                <div className="text-sm text-foreground/50 mb-1">1st Innings Range</div>
                <div className="text-3xl font-bold text-primary">168 - 182</div>
              </div>
              <div className="bg-background p-4 rounded-lg border border-surface-hover text-center">
                <div className="text-sm text-foreground/50 mb-1">Chase Viability</div>
                <div className="text-3xl font-bold text-positive">High (62%)</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm text-foreground/70 border-b border-surface-hover pb-1">Top Drivers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start"><TrendingUp size={16} className="text-positive shrink-0 mt-0.5"/> Venue historically favors chasing under lights (dew factor).</li>
                <li className="flex gap-2 items-start"><TrendingUp size={16} className="text-positive shrink-0 mt-0.5"/> Team A powerplay explosiveness heavily outweighs Team B new-ball attack.</li>
              </ul>

              <h3 className="font-bold text-sm text-foreground/70 border-b border-surface-hover pb-1 mt-4">Red Flags / Upset Triggers</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start"><AlertTriangle size={16} className="text-warning shrink-0 mt-0.5"/> If Team B introduces spin in powerplay, Team A top order historically struggles.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

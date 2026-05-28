"use client";
import { Upload, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Data Management</h1>
        <p className="text-foreground/70 mt-2">Upload JSON/CSV datasets and switch between live and mock data sources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-hover rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Database className="text-primary"/> Data Sources
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 border border-primary/30 bg-primary/5 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-bold text-primary">Mock Data Mode</div>
                <div className="text-sm text-foreground/70">Using local /data JSON files</div>
              </div>
              <CheckCircle2 className="text-primary" />
            </div>
            <div className="p-4 border border-surface-hover rounded-lg flex justify-between items-center opacity-50 cursor-not-allowed">
              <div>
                <div className="font-bold">Live API Mode</div>
                <div className="text-sm text-foreground/70">Requires database connection</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-surface-hover rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Upload className="text-primary"/> Upload Dataset
          </h2>
          
          <div className="border-2 border-dashed border-surface-hover hover:border-primary/50 transition-colors rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 cursor-pointer">
            <Upload size={32} className="text-foreground/50"/>
            <div className="font-bold">Drop JSON or CSV files here</div>
            <div className="text-sm text-foreground/50">Venues, Players, or Matchups data</div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-foreground/70">
            <RefreshCw size={14}/> Last updated: Today, 10:45 AM
          </div>
        </div>
      </div>
    </div>
  );
}

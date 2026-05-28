"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Users, Target, Activity, BookOpen, Database } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/venues', label: 'Venue Intel', icon: Map },
    { href: '/players', label: 'Player Analytics', icon: Users },
    { href: '/matchups', label: 'Matchups', icon: Target },
    { href: '/predictions', label: 'Prediction Engine', icon: Activity },
    { href: '/research', label: 'Research Notebook', icon: BookOpen },
    { href: '/admin', label: 'Data Management', icon: Database },
  ];

  return (
    <div className="w-64 h-screen bg-surface border-r border-surface-hover flex flex-col fixed left-0 top-0 pt-16">
      <nav className="flex-1 py-6 px-3 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function Header() {
  return (
    <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-surface-hover fixed top-0 w-full z-10 flex items-center px-6">
      <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
        <Activity size={24} />
        T20 Blast 2026 Lab
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-xs text-foreground/50 font-mono">Commander Antigravity</div>
      </div>
    </header>
  );
}

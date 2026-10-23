import React from 'react';

export type AdSlotType = 'header' | 'content' | 'inline' | 'sidebar' | 'footer';

interface AdSlotProps {
  type: AdSlotType;
  showDemoContent?: boolean;
}

export function AdSlot({ type, showDemoContent = true }: AdSlotProps) {
  // Top Banner Ad Slot: 728x90 desktop / 320x50 mobile (IAB Leaderboard)
  if (type === 'header') {
    return (
      <div
        id="ad-slot-header"
        aria-label="Advertisement"
        className="w-full max-w-5xl mx-auto my-4 flex items-center justify-center select-none"
      >
        <div className="w-full max-w-[728px] h-[50px] sm:h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative transition-all">
          <span className="absolute top-1 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
            Advertisement
          </span>
          {showDemoContent ? (
            <div className="flex items-center justify-between w-full px-4 sm:px-6 py-2 text-xs gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[9px] sm:text-[10px] tracking-wide uppercase shrink-0">
                  Global Edge Cloud
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px] sm:text-xs truncate">
                  Deploy high-traffic Next.js & static web applications with 0ms cold starts.
                </p>
              </div>
              <a
                href="https://vercel.com?ref=omnitoolkit"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-3 py-1.5 min-h-[32px] sm:min-h-[36px] rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity shrink-0 flex items-center text-xs"
              >
                Start Free ➔
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-[11px]">
              <span>&lt;!-- IAB Header Leaderboard (728x90 / 320x50) --&gt;</span>
              <span className="text-[9px] opacity-70">Reserved Ad Space • Zero Cumulative Layout Shift</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // In-Tool / Below Action Slot: id="ad-slot-content" (300x250 or fluid responsive rectangle)
  if (type === 'content' || type === 'inline') {
    return (
      <div
        id="ad-slot-content"
        aria-label="Advertisement"
        className="w-full max-w-5xl mx-auto my-6 flex items-center justify-center select-none"
      >
        <div className="w-full min-h-[110px] sm:min-h-[120px] max-w-4xl border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative p-4 transition-all">
          <span className="absolute top-1.5 right-3 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
            Advertisement
          </span>
          {showDemoContent ? (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full px-2 sm:px-4 py-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block">
                  Developer Ecosystem Recommendation
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                  Supercharge your development workflow with AI autocomplete and deep codebase reasoning.
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Built on client-side privacy paradigms • Zero cloud file scanning
                </p>
              </div>
              <a
                href="https://cursor.com?ref=omnitoolkit"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shrink-0 shadow-sm flex items-center text-xs"
              >
                Try Free Editor ➔
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-[11px] py-4">
              <span>&lt;!-- In-Tool Responsive Content Slot (300x250 / Fluid) --&gt;</span>
              <span className="text-[9px] opacity-70">Pre-allocated Container • Zero Layout Jumps</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sidebar Slot: 300x250 IAB Medium Rectangle
  if (type === 'sidebar') {
    return (
      <div
        id="ad-slot-sidebar"
        aria-label="Advertisement"
        className="w-full max-w-[300px] min-h-[250px] mx-auto border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative p-4 my-4 select-none"
      >
        <span className="absolute top-1.5 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
          AdSense 300x250
        </span>
        {showDemoContent ? (
          <div className="text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
              ⚡
            </div>
            <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
              Zero-Log Privacy VPN
            </h5>
            <p className="text-[11px] text-slate-500 max-w-[200px] mx-auto">
              Encrypt your browsing & protect client data on public networks.
            </p>
            <a
              href="https://nordvpn.com?ref=omnitoolkit"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block px-4 py-2 min-h-[40px] rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500"
            >
              Get 70% Off
            </a>
          </div>
        ) : (
          <div className="text-center text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            <span>&lt;!-- Medium Rectangle (300x250) --&gt;</span>
          </div>
        )}
      </div>
    );
  }

  // Bottom Footer Slot: id="ad-slot-footer"
  return (
    <div
      id="ad-slot-footer"
      aria-label="Advertisement"
      className="w-full max-w-5xl mx-auto my-6 flex items-center justify-center select-none"
    >
      <div className="w-full max-w-[728px] h-[60px] sm:h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative transition-all">
        <span className="absolute top-1 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
          Advertisement
        </span>
        {showDemoContent ? (
          <div className="flex items-center justify-between w-full px-4 sm:px-6 py-2 text-xs gap-3">
            <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px] sm:text-xs truncate">
              Need scalable PostgreSQL with real-time replication and auth built-in?
            </p>
            <a
              href="https://supabase.com?ref=omnitoolkit"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-3 py-1.5 min-h-[32px] sm:min-h-[36px] rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shrink-0 flex items-center text-xs"
            >
              Explore Supabase ➔
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            <span>&lt;!-- Footer Banner Slot (728x90 / Fluid) --&gt;</span>
            <span className="text-[9px] opacity-70">CLS Protected • Auto-Fill Compatible</span>
          </div>
        )}
      </div>
    </div>
  );
}

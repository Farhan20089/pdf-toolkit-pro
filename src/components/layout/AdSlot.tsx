import React from 'react';

export type AdSlotType = 'header' | 'inline' | 'content' | 'sidebar' | 'footer';

interface AdSlotProps {
  type: AdSlotType;
  showDemoContent?: boolean;
}

export function AdSlot({ type, showDemoContent = true }: AdSlotProps) {
  // Top Banner Ad Slot: Below Header (id="ad-slot-header", min-height 90px)
  if (type === 'header') {
    return (
      <div
        id="ad-slot-header"
        aria-label="Advertisement"
        className="w-full max-w-5xl mx-auto my-4 flex items-center justify-center select-none"
      >
        <div className="w-full max-w-[728px] min-h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative transition-all">
          <span className="absolute top-1.5 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
            Sponsored / Advertisement
          </span>
          {showDemoContent ? (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full px-5 py-3 text-xs gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] tracking-wide uppercase shrink-0">
                  Global Edge CDN
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-xs truncate">
                  Deploy ultra-fast client-side utilities and web apps with zero cold starts.
                </p>
              </div>
              <a
                href="https://vercel.com?ref=omnitoolkit"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-3.5 py-1.5 min-h-[36px] rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity shrink-0 flex items-center text-xs"
              >
                Start Free ➔
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-[11px] py-4">
              <span>&lt;!-- IAB Header Leaderboard (728x90) --&gt;</span>
              <span className="text-[9px] opacity-70">Zero Cumulative Layout Shift (CLS = 0)</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // In-Content / Below Action Slot (id="ad-slot-inline", min-height 250px)
  if (type === 'inline' || type === 'content') {
    return (
      <div
        id="ad-slot-inline"
        aria-label="Advertisement"
        className="w-full max-w-5xl mx-auto my-6 flex items-center justify-center select-none"
      >
        <div className="w-full max-w-3xl min-h-[250px] border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative p-6 transition-all">
          <span className="absolute top-2 right-3 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
            Sponsored / Advertisement
          </span>
          {showDemoContent ? (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl gap-6 text-center sm:text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 inline-block px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                  Recommended Developer Tool
                </span>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Accelerate Software Engineering with Modern AI
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Deep codebase indexing, intelligent multi-file refactoring, and instant browser testing. Built on zero-log privacy architecture.
                </p>
              </div>
              <a
                href="https://cursor.com?ref=omnitoolkit"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="px-5 py-3 min-h-[48px] rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shrink-0 shadow-md shadow-indigo-600/25 flex items-center justify-center text-xs whitespace-nowrap"
              >
                Try Free Editor ➔
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-xs space-y-1">
              <span>&lt;!-- In-Content Responsive Rectangle (300x250 / 728x250) --&gt;</span>
              <span className="text-[10px] opacity-70">Pre-allocated 250px Reserved Height • CLS Protected</span>
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
          Sponsored / Advertisement
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

  // Bottom Footer Slot: Above Footer (id="ad-slot-footer", min-height 90px)
  return (
    <div
      id="ad-slot-footer"
      aria-label="Advertisement"
      className="w-full max-w-5xl mx-auto my-6 flex items-center justify-center select-none"
    >
      <div className="w-full max-w-[728px] min-h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 relative transition-all">
        <span className="absolute top-1.5 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 select-none">
          Sponsored / Advertisement
        </span>
        {showDemoContent ? (
          <div className="flex flex-col sm:flex-row items-center justify-between w-full px-5 py-3 text-xs gap-3">
            <p className="text-slate-600 dark:text-slate-300 font-medium text-xs truncate">
              Need scalable PostgreSQL with real-time replication and auth built-in?
            </p>
            <a
              href="https://supabase.com?ref=omnitoolkit"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-3.5 py-1.5 min-h-[36px] rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shrink-0 flex items-center text-xs"
            >
              Explore Supabase ➔
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 font-mono text-[11px] py-4">
            <span>&lt;!-- Footer Leaderboard (728x90) --&gt;</span>
            <span className="text-[9px] opacity-70">Pre-allocated 90px Slot • Zero Cumulative Layout Shift</span>
          </div>
        )}
      </div>
    </div>
  );
}

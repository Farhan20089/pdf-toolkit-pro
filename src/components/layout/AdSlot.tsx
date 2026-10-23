import React from 'react';

export type AdSlotType = 'header' | 'sidebar' | 'inline' | 'footer';

interface AdSlotProps {
  type: AdSlotType;
  showDemoContent?: boolean;
}

export function AdSlot({ type, showDemoContent = true }: AdSlotProps) {
  // Fixed heights & dimensions prevent Cumulative Layout Shift (CLS < 0.05)
  if (type === 'header') {
    return (
      <div
        id="ad-slot-header"
        aria-label="Advertisement"
        className="w-full max-w-5xl mx-auto min-h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 relative group my-4"
      >
        <span className="absolute top-1 right-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 select-none">
          Advertisement
        </span>
        {showDemoContent ? (
          <div className="flex flex-col sm:flex-row items-center justify-between w-full px-6 py-3 text-xs gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded bg-indigo-600 text-white font-bold text-[10px] tracking-wide uppercase">
                Host High-Traffic Apps
              </span>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Deploy ultra-fast full-stack React & Next.js apps with global edge CDN.
              </p>
            </div>
            <a
              href="https://vercel.com?ref=omnitoolkit"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              Start Free ➔
            </a>
          </div>
        ) : (
          <div className="text-slate-400 font-mono text-xs">
            &lt;!-- Leaderboard Ad Slot (728x90) --&gt;
          </div>
        )}
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div
        id="ad-slot-sidebar"
        aria-label="Advertisement"
        className="w-full min-h-[250px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 relative p-4"
      >
        <span className="absolute top-1.5 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 select-none">
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
              className="inline-block px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500"
            >
              Get 70% Off
            </a>
          </div>
        ) : (
          <span className="text-slate-400 font-mono text-xs">&lt;!-- 300x250 Ad --&gt;</span>
        )}
      </div>
    );
  }

  if (type === 'inline') {
    return (
      <div
        id="ad-slot-inline"
        aria-label="Advertisement"
        className="w-full min-h-[100px] border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 relative my-6"
      >
        <span className="absolute top-1 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 select-none">
          Inline Native Slot
        </span>
        {showDemoContent ? (
          <div className="flex flex-col sm:flex-row items-center justify-between w-full px-6 py-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">
                Developer Recommendation
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Supercharge your IDE with AI autocomplete and deep codebase reasoning.
              </p>
            </div>
            <a
              href="https://cursor.com?ref=omnitoolkit"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shrink-0 shadow-sm"
            >
              Try Free
            </a>
          </div>
        ) : (
          <span className="text-slate-400 font-mono text-xs">&lt;!-- Inline Responsive Ad --&gt;</span>
        )}
      </div>
    );
  }

  // Footer banner
  return (
    <div
      id="ad-slot-footer"
      aria-label="Advertisement"
      className="w-full max-w-5xl mx-auto min-h-[90px] border border-dashed border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 relative my-6"
    >
      <span className="absolute top-1 right-2 text-[9px] uppercase font-mono tracking-wider text-slate-400 select-none">
        Sponsored
      </span>
      {showDemoContent ? (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full px-6 py-3 text-xs gap-3">
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Need scalable PostgreSQL with real-time replication and auth built-in?
          </p>
          <a
            href="https://supabase.com?ref=omnitoolkit"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shrink-0"
          >
            Explore Supabase ➔
          </a>
        </div>
      ) : (
        <span className="text-slate-400 font-mono text-xs">&lt;!-- Footer Leaderboard --&gt;</span>
      )}
    </div>
  );
}

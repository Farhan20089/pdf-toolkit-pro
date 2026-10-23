import React from 'react';
import { Server, Shield, Sparkles, ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  category: string;
  tagline: string;
  cta: string;
  url: string;
  badge: string;
  icon: React.ReactNode;
}

const PARTNERS: Partner[] = [
  {
    name: 'Vercel Edge Platform',
    category: 'Cloud Hosting',
    tagline: 'Zero-config Next.js & React deployment with global edge networks and instant rollbacks.',
    cta: 'Deploy in 30s',
    url: 'https://vercel.com?ref=omnitoolkit_affiliate',
    badge: 'Official Recommendation',
    icon: <Server className="w-5 h-5 text-indigo-500" />
  },
  {
    name: 'NordVPN Security',
    category: 'Privacy & Security',
    tagline: 'Military-grade encryption and threat protection for remote developers and freelancers.',
    cta: 'Claim 72% Off',
    url: 'https://nordvpn.com?ref=omnitoolkit_affiliate',
    badge: 'Top Pick',
    icon: <Shield className="w-5 h-5 text-emerald-500" />
  },
  {
    name: 'Cursor AI Editor',
    category: 'AI Coding Assistant',
    tagline: 'Build software 10x faster with AI-native pair programming and repo-level context.',
    cta: 'Download Free',
    url: 'https://cursor.com?ref=omnitoolkit_affiliate',
    badge: 'Essential',
    icon: <Sparkles className="w-5 h-5 text-amber-500" />
  }
];

export function AffiliateBanner() {
  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Curated Developer & Creator Tools</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Handpicked infrastructure and privacy resources to accelerate your workflow.
          </p>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Affiliate Disclosure</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PARTNERS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all hover:shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {p.icon}
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {p.badge}
                </span>
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                {p.name}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.tagline}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>{p.cta}</span>
              <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

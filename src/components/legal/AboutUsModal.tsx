import React from 'react';
import { Sparkles, ShieldCheck, Zap, Users, Code, Globe2, X } from 'lucide-react';
import { APP_NAME } from '../../utils/config';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-us-title"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col relative text-slate-800 dark:text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 id="about-us-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                About Us
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The Mission Behind {APP_NAME}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close About Us Modal"
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Mission Statement */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-50 via-slate-50 to-indigo-50/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-2.5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Why We Built {APP_NAME}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We built {APP_NAME} to provide fast, free, client-side, zero-server-tracking browser tools for developers, students, and creators worldwide.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Traditional web utilities force users to upload private contracts, personal family photos, or proprietary code to remote cloud servers, incurring hidden subscription costs, sluggish network latency, and privacy risks. We engineered a better way: <strong>100% in-browser computation</strong>.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero-Server Privacy</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every calculation, image resize, and PDF merger is computed locally in device RAM using Web APIs. Your confidential files never touch our servers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Zero-Latency Execution</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Without server uploads or network queue times, conversions process with instantaneous speed directly on your hardware.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                <Users className="w-4 h-4 text-purple-500" />
                <span>For Creators & Students</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Equipping developers, content creators, researchers, and remote professionals with free productivity tools without account walls.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
                <Globe2 className="w-4 h-4 text-sky-500" />
                <span>Sustainable Computing</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                By delegating compute to the client browser, we eliminate costly 24/7 cloud server farms and reduce global data center carbon emissions.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 min-h-[48px] text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center"
          >
            Close About Us
          </button>
        </div>
      </div>
    </div>
  );
}

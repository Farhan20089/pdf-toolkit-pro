import React from 'react';
import { ShieldCheck, Heart, Github, Terminal, Zap } from 'lucide-react';
import { ToolId } from '../../types';

interface FooterProps {
  onSelectTool: (id: ToolId) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export function Footer({ onSelectTool, onOpenLegal }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                OmniTool<span className="text-indigo-600 dark:text-indigo-400">.engine</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Autonomous, zero-backend-cost client-side utility suite. Built with HTML5 Canvas, Web Workers, and Web Crypto APIs.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Zero-Server Privacy</span>
            </div>
          </div>

          {/* Col 2: High-Traffic Tools */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Popular Utilities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Smart Image to WebP Compressor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('pdf-converter')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Smart Image to PDF & Merger
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('qr-generator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Smart QR Code Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('markdown-editor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Markdown to HTML & PDF Editor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('social-meta-tags')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Viral Social & Video Tag Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('developer-tools')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  JSON Validator & Formatter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('freelance-calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Freelance Net Profit & Tax Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & Security */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Engineering Specs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>React 18 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Tailwind CSS Modern Typography</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>100/100 Lighthouse Performance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Zero Cumulative Layout Shift (CLS)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Monetization */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Privacy & Legal
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              OmniTool does not store, transmit, or analyze any uploaded files. All calculations occur strictly in browser RAM.
            </p>
            <div className="pt-2 text-xs space-y-1.5">
              <div>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Privacy Policy & Cookies
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} OmniTool Engine. Released under MIT License.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-current" /> for high-traffic organic search
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

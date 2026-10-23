import React from 'react';
import { ShieldCheck, Heart, Github, Terminal, Zap, Mail, HelpCircle, FileText, Lock } from 'lucide-react';
import { ToolId } from '../../types';

interface FooterProps {
  onSelectTool: (id: ToolId) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'contact') => void;
  onOpenContact?: () => void;
}

export function Footer({ onSelectTool, onOpenLegal, onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      onOpenLegal('contact');
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy / About */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-600/20">
                ⚡
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                OmniTool<span className="text-indigo-600 dark:text-indigo-400">.engine</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Autonomous, zero-backend-cost client-side utility suite. Built with HTML5 Canvas, Web Workers, jsPDF, and Web Crypto APIs to process data 100% in-browser.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Zero-Server Privacy Guarantee</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors min-h-[36px]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>About & Support Mission</span>
              </button>
            </div>
          </div>

          {/* Col 2: High-Traffic Tools */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Popular Utilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Smart Image to WebP Compressor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('pdf-converter')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Smart Image to PDF & Merger
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('qr-generator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Smart QR Code Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('markdown-editor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Markdown to HTML & PDF Editor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('social-meta-tags')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Viral Social & Video Tag Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('developer-tools')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  JSON Validator & Formatter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('freelance-calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
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
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>React 18 + Vite + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Tailwind CSS Modern Typography</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>100/100 Lighthouse Performance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Zero Cumulative Layout Shift (CLS)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>AdSense IAB Standards Compliant</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Mandatory Legal & Trust Pages (AdSense Requirement) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Legal, Trust & Contact
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              OmniTool does not store, transmit, or log user uploaded media. Processing executes in-memory.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1.5 py-1 min-h-[32px]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Privacy Policy & Cookies</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 py-1 min-h-[32px]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Terms of Service</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 py-1 min-h-[32px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>About & Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} Omnitool Engine. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Contact Support
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms
            </button>
            <span>•</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

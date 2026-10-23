import React from 'react';
import { ShieldCheck, Heart, Github, Lock, FileText, Sparkles, Mail, Zap, ExternalLink } from 'lucide-react';
import { ToolId } from '../../types';
import { APP_NAME, DONATION_URL } from '../../utils/config';

interface FooterProps {
  onSelectTool: (id: ToolId) => void;
  onOpenModal: (type: 'privacy' | 'terms' | 'about' | 'contact') => void;
  onOpenLegal?: (type: any) => void;
  onOpenContact?: () => void;
}

export function Footer({ onSelectTool, onOpenModal, onOpenLegal, onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleOpen = (type: 'privacy' | 'terms' | 'about' | 'contact') => {
    if (onOpenModal) {
      onOpenModal(type);
    } else if (type === 'contact' && onOpenContact) {
      onOpenContact();
    } else if (onOpenLegal) {
      onOpenLegal(type);
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      {/* Trust Badge Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/70 dark:bg-slate-900/40 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <span>🔒 100% Client-Side Processing • Your Data Never Leaves Your Device</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Modern 3-Column Balanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-600/25">
                ⚡
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                {APP_NAME}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Autonomous client-side utility suite built for developers, students, and creators. We execute file conversions, compression, and document compilation 100% in local device memory.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={() => handleOpen('about')}
                className="px-3 py-1.5 min-h-[36px] rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Learn Why We Built This</span>
              </button>
            </div>
          </div>

          {/* Column 2: Popular Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Popular Utilities
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('image-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Smart Image to WebP Compressor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('pdf-converter')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Smart Image to PDF & Merger
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('qr-generator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Smart QR Code Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('markdown-editor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Markdown to HTML & PDF Editor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('social-meta-tags')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Viral Social & Video Tag Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('developer-tools')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  JSON Validator & Formatter
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTool('freelance-calculator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left py-0.5"
                >
                  Freelance Net Profit & Tax Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust, Legal & Support Modals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Legal, Trust & Compliance
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Fully compliant with Google AdSense quality guidelines, GDPR, and California CCPA privacy standards.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <button
                  type="button"
                  onClick={() => handleOpen('privacy')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-2 py-1 min-h-[36px]"
                >
                  <Lock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Privacy Policy</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleOpen('terms')}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 py-1 min-h-[36px]"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms of Service</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleOpen('about')}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 py-1 min-h-[36px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>About Us</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleOpen('contact')}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 py-1 min-h-[36px]"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} PDF Toolkit Pro. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpen('privacy')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleOpen('terms')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleOpen('about')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About Us
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleOpen('contact')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Contact Support
            </button>
            <span>•</span>
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400"
            >
              <span>Support Creator</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

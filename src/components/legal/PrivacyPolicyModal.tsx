import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, FileText, CheckCircle2, X, ExternalLink, Trash2 } from 'lucide-react';
import { APP_NAME, SUPPORT_EMAIL } from '../../utils/config';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col relative text-slate-800 dark:text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="privacy-policy-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: October 2026 • {APP_NAME}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Explicit Core Privacy Disclosure */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Core Privacy Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-200/95 font-medium leading-relaxed">
              All file conversions, image compressions, and PDF generation happen 100% locally in your browser memory. No uploaded files, documents, or personal images are ever transmitted to or stored on any remote server.
            </p>
          </div>

          {/* Section 1: Browser Execution & In-Memory APIs */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-500" />
              1. In-Browser Local Processing
            </h3>
            <p>
              When you compress images, merge PDFs, create QR codes, format code, or convert Markdown into documents, your computer or mobile device performs every mathematical computation. We utilize native browser APIs including HTML5 Canvas, Web Workers, the FileReader API, and client-side compilation libraries (jsPDF, Marked) so that data remains strictly in your local device RAM.
            </p>
          </section>

          {/* Section 2: Cookies, LocalStorage, Analytics & Google AdSense */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-500" />
              2. Cookies, Local Storage & Google AdSense Ads
            </h3>
            <p>
              To maintain our tools free and fast without user accounts or subscription paywalls, we display advertising provided by third-party advertising partners, including <strong>Google AdSense</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Third-Party Ad Cookies:</strong> Google and its partner advertising networks use cookies to serve ads based on your prior visits to this website or other sites on the Internet.
              </li>
              <li>
                <strong>Personalized Ads Opt-Out:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
                >
                  Google Ads Settings <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                or{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
                >
                  aboutads.info <ExternalLink className="w-3 h-3 inline" />
                </a>.
              </li>
              <li>
                <strong>Local Storage (`localStorage`):</strong> We store minimal functional preferences on your machine: your UI dark/light mode preference and your cookie consent state. We never store personal documents or identifying data in `localStorage`.
              </li>
              <li>
                <strong>Web Analytics:</strong> Non-personally identifiable performance metrics (page load times, Core Web Vitals) may be aggregated to ensure optimal site speed and zero Cumulative Layout Shift (CLS).
              </li>
            </ul>
          </section>

          {/* Section 3: GDPR, CCPA & User Rights to Clear Browser Data */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              3. GDPR, CCPA & User Rights to Clear Browser Data
            </h3>
            <p>
              In accordance with the <strong>General Data Protection Regulation (GDPR)</strong> and the <strong>California Consumer Privacy Act (CCPA)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">EU & UK GDPR Rights</span>
                <p>
                  Because we retain zero personal consumer records on cloud databases, your fundamental rights to erasure, data minimization, and privacy are protected by architectural default.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">CCPA Notice</span>
                <p>
                  <strong>We do not sell or share user data.</strong> No personal information or media files are monetized, profiled, or traded with data brokers.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs flex items-start gap-2.5 mt-2">
              <Trash2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p>
                <strong>Right to Clear Data:</strong> You have the absolute right at any moment to clear your browser cache, cookies, and local storage via your browser settings menu (Ctrl+Shift+Delete / Cmd+Shift+Delete), immediately removing all stored preferences.
              </p>
            </div>
          </section>

          {/* Section 4: Contact Information */}
          <section className="space-y-2 p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Privacy Inquiries</h4>
            <p>
              If you have any questions or data requests regarding this Privacy Policy, please reach out to our privacy maintainers at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                {SUPPORT_EMAIL}
              </a>.
            </p>
          </section>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 min-h-[48px] text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}

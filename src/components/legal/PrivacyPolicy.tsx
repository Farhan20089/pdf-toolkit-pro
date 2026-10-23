import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, FileText, CheckCircle2, X, ExternalLink, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenTerms?: () => void;
  onOpenContact?: () => void;
}

export function PrivacyPolicy({
  isOpen = true,
  onClose,
  onOpenTerms,
  onOpenContact
}: PrivacyPolicyProps) {
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="privacy-policy-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Privacy Policy & Data Security
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: October 2026 • OmniTool Engine (100% Client-Side)
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Privacy Policy"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Legal Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Quick Summary Pill Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Summary: Absolute Zero-Server Privacy Guarantee</span>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-200/90 leading-normal">
              Your files (images, documents, PDFs, markdown, code, calculations) are processed <strong>100% in your device's browser memory</strong>. We operate no file-upload servers, retain zero customer documents, and cannot access your confidential media under any circumstances.
            </p>
          </div>

          {/* Section 1: In-Memory Client-Side Execution */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-500" />
              1. Zero-Server In-Memory Processing Architecture
            </h3>
            <p>
              OmniTool Engine ("we", "our", "us") operates under a privacy-by-design architecture. When you utilize any feature within this toolkit—including but not limited to <strong>Smart Image to WebP Compressor, Image to PDF Merger, Smart QR Code Generator, Markdown to HTML/PDF Editor, Social Meta Tag Generator, Developer JSON Formatter, and Freelance Tax Calculator</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>No Cloud File Transmission:</strong> All source files, photos, texts, and generated documents remain strictly in your device's RAM memory and are never transmitted over the internet to our servers or any cloud storage bucket.
              </li>
              <li>
                <strong>Native Web APIs:</strong> File manipulation, image resizing, and compression are executed via standard browser technologies including the <code>HTMLCanvasElement</code>, Web Workers, the <code>FileReader</code> API, and Web Crypto APIs.
              </li>
              <li>
                <strong>Client-Side PDF Compilation:</strong> Document assembly and PDF exports are handled locally in memory by <code>jsPDF</code> and client-side rendering engines without server-side dependencies.
              </li>
            </ul>
          </section>

          {/* Section 2: Third-Party Advertising & Google AdSense */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-500" />
              2. Google AdSense & Third-Party Advertising Cookies
            </h3>
            <p>
              To keep our tools 100% free for everyone worldwide without requiring paywalls or premium subscriptions, we display advertising provided by third-party vendors, including <strong>Google AdSense</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <p>
                <strong>Google Advertising Disclosures:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Third-party vendors, including Google, use cookies to serve advertisements based on a user's prior visits to this website or other websites on the Internet.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partner networks to serve ads to users based on their visits to our site and/or other sites across the World Wide Web.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
                  >
                    Google Ads Settings <ExternalLink className="w-3 h-3 inline" />
                  </a>{' '}
                  or by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
                  >
                    www.aboutads.info <ExternalLink className="w-3 h-3 inline" />
                  </a>.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Cookies & Local Storage */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-purple-500" />
              3. Cookies and Local Storage Policies
            </h3>
            <p>
              We limit cookie usage strictly to essential functional operations and third-party ad delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Browser <code>localStorage</code>:</strong> We store minimal key-value pairs purely on your device: your UI color preference (Dark or Light mode) and your cookie consent banner choice (<code>omnitool_cookie_consent</code>). No personal identity records, email addresses, or document contents are ever written to <code>localStorage</code>.
              </li>
              <li>
                <strong>Analytics & Telemetry:</strong> Anonymized performance signals (e.g., page load speeds, Core Web Vitals) may be aggregated without IP tracking to optimize tool speed and zero Cumulative Layout Shift (CLS).
              </li>
            </ul>
          </section>

          {/* Section 4: GDPR & CCPA Compliance */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              4. GDPR (European Union / UK) & CCPA/CPRA (California) Rights
            </h3>
            <p>
              Under the <strong>General Data Protection Regulation (GDPR)</strong> and the <strong>California Consumer Privacy Act (CCPA / CPRA)</strong>, individuals possess specific data rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">GDPR Compliance</span>
                <p>
                  Because we do not store, log, or transmit personal consumer data to servers, your right to erasure, data minimization, and restriction of processing is naturally fulfilled by architectural design.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">CCPA / CPRA Compliance</span>
                <p>
                  <strong>Do Not Sell My Info:</strong> We do not sell or share any user personal information or uploaded file data to data brokers or third parties.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Children's Privacy (COPPA) */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5. Children's Online Privacy Protection Act (COPPA)
            </h3>
            <p className="text-xs">
              OmniTool Engine is designed for general audiences and professionals. We do not knowingly collect or solicit personal information from children under the age of 13. All utilities execute locally without identity collection.
            </p>
          </section>

          {/* Section 6: Contact & Inquiries */}
          <section className="space-y-3 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              6. Privacy Officer Contact & Dispute Resolution
            </h3>
            <p className="text-xs">
              If you have any questions, inquiries, or feedback regarding our Privacy Policy or data security practices, please contact our legal team at{' '}
              <a href="mailto:privacy@omnitoolkit.dev" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                privacy@omnitoolkit.dev
              </a>{' '}
              or submit an inquiry via our interactive Contact form.
            </p>
          </section>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70">
          <div className="flex items-center gap-3 text-xs">
            {onOpenTerms && (
              <button
                type="button"
                onClick={onOpenTerms}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium underline transition-colors"
              >
                Terms of Service
              </button>
            )}
            <span className="text-slate-300 dark:text-slate-700">•</span>
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium underline transition-colors"
              >
                Contact Support
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 min-h-[48px] text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { FileText, ShieldAlert, Award, AlertTriangle, Scale, X, CheckCircle } from 'lucide-react';
import { APP_NAME, SUPPORT_EMAIL } from '../../utils/config';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-of-service-title"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col relative text-slate-800 dark:text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 id="terms-of-service-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Terms of Service
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: October 2026 • {APP_NAME}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Terms of Service"
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Terms Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Key Ownership Guarantee */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-xs uppercase tracking-wide">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>User Ownership & Intellectual Property</span>
            </div>
            <p className="text-xs text-indigo-950/80 dark:text-indigo-200/90">
              You retain 100% full ownership, intellectual property rights, and copyright to all images, files, documents, text, code, and graphics you process using {APP_NAME}. We assert zero ownership claims or licensing rights over your user data.
            </p>
          </div>

          {/* Section 1: Agreement to Terms */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-500" />
              1. Agreement to Terms
            </h3>
            <p>
              By accessing or using {APP_NAME}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue your use of our client-side utilities immediately.
            </p>
          </section>

          {/* Section 2: Fair-Use Policy for Client-Side Utility Tools */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              2. Fair-Use Policy for Client-Side Tools
            </h3>
            <p>
              {APP_NAME} provides free, open client-side utility tools intended for standard, ethical web and desktop workflows. Under our Fair-Use Policy, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Use the services in compliance with all relevant local, national, and international laws and regulations.</li>
              <li>Not use the tools to encode, compress, or generate malicious software, computer viruses, Trojan payloads, or illicit hacking material.</li>
              <li>Not attempt to disrupt, exploit, or reverse-engineer client workers or inject automated scripting that degrades user browser performance.</li>
              <li>Not use automated scraping bots or headless runners to circumvent advertisement containers or violate advertiser policy terms.</li>
            </ul>
          </section>

          {/* Section 3: Standard Disclaimer of Warranties ("As-Is") */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              3. Standard Disclaimer of Warranties ("As-Is" & "As-Available")
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <p className="font-semibold text-slate-900 dark:text-white">
                Disclaimer of All Guarantees:
              </p>
              <p>
                All utilities, calculators, and converters provided on {APP_NAME} are provided strictly on an <strong>"AS-IS"</strong> and <strong>"AS-AVAILABLE"</strong> basis without any representation or warranty of any kind, whether express, implied, or statutory, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Client-Side Storage Disclaimer:</strong> Because all processing executes exclusively in your device's browser memory, we do not and cannot maintain server backups. We are not liable for lost, unsaved, or corrupted data resulting from browser crashes, refreshed tabs, or power outages.
                </li>
                <li>
                  <strong>Financial & Calculation Tools:</strong> Freelance net profit and tax calculators provide generalized mathematical approximations. They do not constitute formal certified public accountant (CPA) advice or tax guidance. Users must consult qualified tax professionals for official tax reporting.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              4. Limitation of Liability
            </h3>
            <p className="text-xs">
              To the fullest extent permitted by applicable law, in no event shall {APP_NAME}, its developers, authors, or contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, this application or its tools.
            </p>
          </section>

          {/* Section 5: Third-Party Advertising & Governing Terms */}
          <section className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">Inquiries & Contact</h4>
            <p>
              For legal inquiries regarding these Terms of Service, please contact our administrative team at{' '}
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
            Close Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
}

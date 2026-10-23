import React from 'react';
import { FileText, ShieldAlert, Award, AlertTriangle, Scale, X, ExternalLink, Mail, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export function TermsOfService({
  isOpen = true,
  onClose,
  onOpenPrivacy,
  onOpenContact
}: TermsOfServiceProps) {
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 id="terms-of-service-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Terms of Service
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: October 2026 • OmniTool Engine
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Terms of Service"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Terms Content */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Key Guarantee Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-xs uppercase tracking-wide">
              <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Full Ownership Guarantee</span>
            </div>
            <p className="text-xs text-indigo-950/80 dark:text-indigo-200/90 leading-normal">
              You retain 100% intellectual property and copyright ownership over all photographs, PDF pages, text, code, and financial estimates processed through OmniTool. We claim zero proprietary rights, licensing claims, or data rights over your content.
            </p>
          </div>

          {/* Section 1: Agreement & Scope */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-500" />
              1. Acceptance of Terms & Service Description
            </h3>
            <p>
              By accessing, browsing, or utilizing the OmniTool Engine ("Platform", "Services"), you agree to be legally bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you disagree with any portion of these terms, you are prohibited from using this Platform.
            </p>
            <p>
              OmniTool provides browser-executed media and developer utilities including image compression (WebP/JPEG/PNG), PDF merging and conversion, QR code synthesis, markdown parsing, developer code formatting, and freelance profit modeling.
            </p>
          </section>

          {/* Section 2: Client-Side Processing & Zero Liability */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              2. Client-Side Execution & Zero Liability for User Data
            </h3>
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2 text-xs">
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                Important Disclaimer on Data Storage & Recovery:
              </p>
              <p className="text-amber-950/80 dark:text-amber-200/90">
                Because all processing executes strictly in your local web browser without server storage, <strong>OmniTool cannot store, backup, or recover your files</strong>. If your browser window is closed, refreshed, or crashes before saving, your unexported data is irrecoverable from our systems. OmniTool maintains zero liability for accidental data loss resulting from device malfunction or browser termination.
              </p>
            </div>
          </section>

          {/* Section 3: User Conduct & Fair Use */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              3. User Conduct and Fair Use Guidelines
            </h3>
            <p>
              You agree to use the Platform only for lawful purposes. You shall not:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Process content that violates third-party copyright, intellectual property, or privacy rights.</li>
              <li>Attempt to inject malicious payloads, cross-site scripting (XSS), or automated denial-of-service scripts into client workers.</li>
              <li>Circumvent or manipulate monetization, ad displays, or layout controls in violation of advertiser policies.</li>
              <li>Misrepresent tax, accounting, or legal calculations generated by estimation tools as certified professional audits.</li>
            </ul>
          </section>

          {/* Section 4: Financial & Technical Disclaimer of Warranties */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              4. Disclaimer of Warranties ("AS IS" Basis)
            </h3>
            <p>
              The materials and utilities on OmniTool are provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without warranties of any kind, whether express, statutory, or implied.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Financial Estimates:</strong> Freelance net profit and tax calculators provide generalized mathematical approximations. They do not constitute formal certified public accountant (CPA), legal, or tax advice. Users must consult accredited tax professionals for statutory filings.
              </li>
              <li>
                <strong>Lossless Conversion:</strong> While our algorithms strive for maximum visual fidelity and optimal compression ratios, we do not warrant that all image formats will compress without loss of nuance or metadata.
              </li>
            </ul>
          </section>

          {/* Section 5: Third-Party Advertisements & Links */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5. Third-Party Advertising & External Links
            </h3>
            <p className="text-xs">
              OmniTool contains advertisements served by Google AdSense and promotional links to developer tools or affiliate partners. We do not endorse, guarantee, or assume responsibility for the products, services, or practices of third-party websites linked within or advertised on this Platform.
            </p>
          </section>

          {/* Section 6: Open-Source License & IP */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              6. Open Source Software License
            </h3>
            <p className="text-xs">
              The front-end client source architecture of OmniTool Engine is distributed under the permissive <strong>MIT License</strong>. You are permitted to inspect, fork, or build upon the software provided that original copyright notices and permission notices remain intact.
            </p>
          </section>

          {/* Section 7: Inquiries */}
          <section className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              7. Legal Inquiries & Questions
            </h3>
            <p className="text-xs">
              For any questions regarding these Terms of Service or commercial licensing inquiries, please email{' '}
              <a href="mailto:legal@omnitoolkit.dev" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                legal@omnitoolkit.dev
              </a>.
            </p>
          </section>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70">
          <div className="flex items-center gap-3 text-xs">
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium underline transition-colors"
              >
                Privacy Policy
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
            I Accept the Terms
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  activeDoc: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ activeDoc, onClose }: LegalModalProps) {
  if (!activeDoc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-3xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl flex flex-col relative text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              {activeDoc === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeDoc === 'privacy' ? 'Privacy Policy & Data Security' : 'Terms of Service'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: October 2026 • OmniTool Engine
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-6 pr-2 space-y-6 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {activeDoc === 'privacy' ? (
            <>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  1. Zero Server Processing Architecture
                </h4>
                <p>
                  OmniTool is built with a strict client-side architecture. When you compress images, assemble PDFs, generate QR codes, format JSON, or compute financial formulas, <strong>no document, photograph, text, or file is ever transmitted to or stored on any server</strong>. All operations occur strictly within your device’s browser memory via HTML5 Canvas, Web Workers, and Web Crypto APIs.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Google AdSense & Third-Party Advertising Cookies
                </h4>
                <p>
                  This website displays advertisements delivered by third-party vendors, including Google.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Google and its partners use cookies to serve ads based on a user's prior visits to this website or other websites on the Internet.</li>
                  <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                  <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-indigo-500 underline">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-indigo-500 underline">www.aboutads.info</a>.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Local Storage Usage
                </h4>
                <p>
                  OmniTool utilizes browser `localStorage` solely to remember your UI color theme preferences (Dark or Light mode) and your cookie consent status. We do not store personally identifiable information (PII).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  4. GDPR and CCPA Compliance
                </h4>
                <p>
                  Because we do not collect, process, or sell personal consumer records, your rights under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) are fully respected by design.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  5. Contact Information
                </h4>
                <p>
                  If you have questions regarding this Privacy Policy, you may contact our legal maintainers at <span className="font-mono text-indigo-500">privacy@omnitoolkit.dev</span>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Acceptance of Terms
                </h4>
                <p>
                  By accessing or using OmniTool Engine, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you are prohibited from using the service.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Intellectual Property & License
                </h4>
                <p>
                  The source software of OmniTool is licensed under the permissive MIT License. You retain 100% full ownership, rights, and copyright to all images, documents, and data you process using these utilities.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Disclaimer of Warranties
                </h4>
                <p>
                  All utilities and calculations (including tax estimates and profit figures) are provided on an "as is" and "as available" basis without warranties of any kind. Users are advised to consult a qualified Certified Public Accountant (CPA) for official tax filing obligations.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}

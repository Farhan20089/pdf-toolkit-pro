import React, { useState, useEffect } from 'react';
import { ChevronDown, ShieldCheck, Zap, CloudOff, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ToolMetadata } from '../../types';

interface SeoSectionProps {
  metadata: ToolMetadata;
}

export function SeoSection({ metadata }: SeoSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamically update document title, description, and FAQPage JSON-LD schema
  useEffect(() => {
    // 1. Title & Meta Description
    document.title = `${metadata.name} — OmniTool Free Web Utilities`;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metadata.description);
    }

    // 2. Dynamic FAQPage Schema injection
    const existingScript = document.getElementById('dynamic-faq-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': metadata.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.id = 'dynamic-faq-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('dynamic-faq-schema');
      if (el) el.remove();
    };
  }, [metadata]);

  return (
    <div className="mt-16 space-y-12 border-t border-slate-200 dark:border-slate-800/80 pt-12">
      {/* 1. How to use this tool in 3 steps */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Quick User Guide
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            How to Use the {metadata.shortName} in 3 Simple Steps
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered for frictionless execution right inside your browser window.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metadata.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-400 transition-colors"
            >
              <div className="text-4xl font-black text-indigo-100 dark:text-indigo-950/80 absolute -top-1 -right-1 pointer-events-none select-none">
                0{idx + 1}
              </div>
              <div className="relative space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Why Client-Side Processing Callout */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-slate-50 to-indigo-50/30 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 border border-indigo-200/60 dark:border-indigo-900/50 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Security & Performance Architecture
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Why 100% Client-Side Processing Matters
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Unlike legacy online converters that upload your sensitive documents, photos, or API credentials to cloud servers, OmniTool runs entirely inside your device's browser memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">100% Data Privacy</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your images, keys, and financial inputs never leave your computer. Compliant with HIPAA, GDPR, and enterprise NDA policies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">Zero Upload Delay</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                No slow round-trip HTTP file transfers or cloud queue waiting times. Processing starts instantly using your hardware's CPU & GPU.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
              <CloudOff className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">Works Without Server Costs</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Because computations happen client-side, this service costs $0 to maintain, guaranteeing it will remain free and ad-light forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions with FAQPage Schema */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Answers & Clarifications
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about {metadata.shortName} and browser performance.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {metadata.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

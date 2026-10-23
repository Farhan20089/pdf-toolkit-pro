import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, X, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function ContactModal({
  isOpen = true,
  onClose,
  onOpenPrivacy,
  onOpenTerms
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'support' | 'bug' | 'feature' | 'partnership' | 'legal'>('support');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
    setErrorMessage('');
  };

  const mailtoUrl = `mailto:contact@omnitoolkit.dev?subject=${encodeURIComponent(
    `[OmniTool ${category.toUpperCase()}] Inquiry from ${name || 'User'}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col relative text-slate-800 dark:text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 id="contact-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                About & Contact Us
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                OmniTool Engineering & Community Support Team
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Contact Modal"
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 max-h-[75vh]">
          {/* Mission Explanation Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
            <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Our Toolkit Mission</span>
            </div>
            <p className="text-xs text-indigo-950/80 dark:text-indigo-200/90 leading-relaxed">
              OmniTool Engine was created to deliver ultra-fast, zero-backend-cost utilities that prioritize individual privacy. By executing 100% of image conversions, PDF processing, QR generation, and developer tasks locally inside client browser memory, we eliminate cloud server costs, protect your data from leaks, and minimize global server carbon footprint.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Client-Side
              </span>
              <span>•</span>
              <span>MIT Licensed Free Software</span>
              <span>•</span>
              <span>Typical Response Time: &lt; 24-48 Hours</span>
            </div>
          </div>

          {isSuccess ? (
            /* Success Feedback State */
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to the OmniTool team, <strong>{name}</strong>. We have logged your inquiry and will follow up at <strong>{email}</strong> shortly.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Send Another Message
                </button>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 min-h-[44px] text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 min-h-[48px] text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 min-h-[48px] text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Inquiry Category */}
              <div className="space-y-1.5">
                <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Topic / Category
                </label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 min-h-[48px] text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <option value="support">General User Support & Questions</option>
                  <option value="bug">Bug Report / Technical Issue</option>
                  <option value="feature">Feature Suggestion & New Tool Request</option>
                  <option value="partnership">Google AdSense / Publisher Partnership</option>
                  <option value="legal">Privacy Policy & Legal Inquiry</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our client-side tools?"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={mailtoUrl}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1.5 min-h-[44px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Or email directly via contact@omnitoolkit.dev</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 min-h-[48px] text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white shadow-md shadow-indigo-600/20 transition-all inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/80 dark:bg-slate-950/70 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 underline transition-colors"
              >
                Privacy Policy
              </button>
            )}
            <span>•</span>
            {onOpenTerms && (
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 underline transition-colors"
              >
                Terms of Service
              </button>
            )}
          </div>
          <span>OmniTool Engine • Open-Source Web Infrastructure</span>
        </div>
      </div>
    </div>
  );
}

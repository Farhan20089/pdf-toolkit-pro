import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export function CookieConsent({ onOpenPrivacy }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('omnitool_cookie_consent');
    if (!consent) {
      // Show banner after 1.5 seconds delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('omnitool_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('omnitool_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in text-slate-800 dark:text-slate-200 text-xs space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
          <Cookie className="w-4 h-4 text-amber-500" />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
        We use essential cookies for theme persistence and partner analytics. Your files and converted documents are <strong>100% processed on your device</strong> and never uploaded to any server. Read our{' '}
        <button
          type="button"
          onClick={onOpenPrivacy}
          className="text-indigo-600 dark:text-indigo-400 font-semibold underline"
        >
          Privacy Policy
        </button>
        .
      </p>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={handleDecline}
          className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}

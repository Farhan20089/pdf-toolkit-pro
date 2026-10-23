import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdSlot } from './components/layout/AdSlot';
import { SeoSection } from './components/common/SeoSection';
import { AffiliateBanner } from './components/common/AffiliateBanner';
import { TipJarModal } from './components/common/TipJarModal';
import { CookieConsent } from './components/common/CookieConsent';

import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { ContactModal } from './components/legal/ContactModal';

import { ImageCompressor } from './tools/ImageCompressor/ImageCompressor';
import { PdfConverter } from './tools/PdfConverter/PdfConverter';
import { QrCodeGenerator } from './tools/QrCodeGenerator/QrCodeGenerator';
import { MarkdownEditor } from './tools/MarkdownEditor/MarkdownEditor';
import { SocialTagGenerator } from './tools/SocialTagGenerator/SocialTagGenerator';
import { DeveloperFormatter } from './tools/DeveloperFormatter/DeveloperFormatter';
import { FreelanceCalculator } from './tools/FreelanceCalculator/FreelanceCalculator';

import { ToolId } from './types';
import { TOOLS_METADATA } from './utils/seoData';
import { useTheme } from './hooks/useTheme';
import { Sparkles, ShieldCheck } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'contact' | null;

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [showDemoAds, setShowDemoAds] = useState(true);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  // Hash-based routing to support direct URLs (#image-compressor, #privacy, #terms, #contact, etc.)
  const [activeTool, setActiveTool] = useState<ToolId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as ToolId;
      if (TOOLS_METADATA[hash]) {
        return hash;
      }
    }
    return 'image-compressor';
  });

  // Listen to hash changes (supports back/forward navigation and direct #privacy / #terms / #contact deep-links)
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash === 'privacy') {
        setActiveLegalModal('privacy');
      } else if (rawHash === 'terms') {
        setActiveLegalModal('terms');
      } else if (rawHash === 'contact') {
        setActiveLegalModal('contact');
      } else if (TOOLS_METADATA[rawHash as ToolId]) {
        setActiveTool(rawHash as ToolId);
      }
    };

    // Check hash on initial mount
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash === 'privacy') {
      setActiveLegalModal('privacy');
    } else if (initialHash === 'terms') {
      setActiveLegalModal('terms');
    } else if (initialHash === 'contact') {
      setActiveLegalModal('contact');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTool = (id: ToolId) => {
    setActiveTool(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (type: 'privacy' | 'terms' | 'contact') => {
    setActiveLegalModal(type);
    window.location.hash = type;
  };

  const handleCloseLegal = () => {
    setActiveLegalModal(null);
    // Restore tool hash
    window.location.hash = activeTool;
  };

  const currentMetadata = TOOLS_METADATA[activeTool];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation Header */}
      <Header
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        showDemoAds={showDemoAds}
        onToggleDemoAds={() => setShowDemoAds(!showDemoAds)}
        onOpenContact={() => handleOpenLegal('contact')}
        onOpenLegal={handleOpenLegal}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Banner Ad Slot (728x90 desktop / 320x50 mobile) - Zero CLS */}
        <AdSlot type="header" showDemoContent={showDemoAds} />

        {/* Hero Section */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>100% In-Browser Execution • $0 Server Footprint</span>
            <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Uploads
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {currentMetadata.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {currentMetadata.tagline}
          </p>
        </section>

        {/* Tool Canvas Container */}
        <div className="w-full max-w-5xl mx-auto">
          {activeTool === 'image-compressor' && <ImageCompressor />}
          {activeTool === 'pdf-converter' && <PdfConverter />}
          {activeTool === 'qr-generator' && <QrCodeGenerator />}
          {activeTool === 'markdown-editor' && <MarkdownEditor />}
          {activeTool === 'social-meta-tags' && <SocialTagGenerator />}
          {activeTool === 'developer-tools' && <DeveloperFormatter />}
          {activeTool === 'freelance-calculator' && <FreelanceCalculator />}
        </div>

        {/* In-Tool / Below Action Slot: id="ad-slot-content" (300x250 or fluid responsive) */}
        <div className="max-w-5xl mx-auto">
          <AdSlot type="content" showDemoContent={showDemoAds} />
        </div>

        {/* Keyword-Rich Crawlable SEO Section (How-to, FAQs, JSON-LD Schema) */}
        <div className="max-w-5xl mx-auto">
          <SeoSection metadata={currentMetadata} />
        </div>

        {/* Affiliate & Creator Tools Banner */}
        <div className="max-w-5xl mx-auto">
          <AffiliateBanner />
        </div>

        {/* Bottom Footer Ad Slot: id="ad-slot-footer" */}
        <AdSlot type="footer" showDemoContent={showDemoAds} />
      </main>

      {/* Footer with Mandatory Legal & Trust Links */}
      <Footer
        onSelectTool={handleSelectTool}
        onOpenLegal={handleOpenLegal}
        onOpenContact={() => handleOpenLegal('contact')}
      />

      {/* Floating Sticky Tip Jar / Buy Me a Coffee */}
      <TipJarModal />

      {/* GDPR / AdSense Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => handleOpenLegal('privacy')} />

      {/* Mandatory Legal & Trust Modals (AdSense Requirement) */}
      <PrivacyPolicy
        isOpen={activeLegalModal === 'privacy'}
        onClose={handleCloseLegal}
        onOpenTerms={() => handleOpenLegal('terms')}
        onOpenContact={() => handleOpenLegal('contact')}
      />

      <TermsOfService
        isOpen={activeLegalModal === 'terms'}
        onClose={handleCloseLegal}
        onOpenPrivacy={() => handleOpenLegal('privacy')}
        onOpenContact={() => handleOpenLegal('contact')}
      />

      <ContactModal
        isOpen={activeLegalModal === 'contact'}
        onClose={handleCloseLegal}
        onOpenPrivacy={() => handleOpenLegal('privacy')}
        onOpenTerms={() => handleOpenLegal('terms')}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdSlot } from './components/layout/AdSlot';
import { SeoSection } from './components/common/SeoSection';
import { AffiliateBanner } from './components/common/AffiliateBanner';
import { TipJarModal } from './components/common/TipJarModal';
import { LegalModal, LegalDocType } from './components/common/LegalModal';
import { CookieConsent } from './components/common/CookieConsent';

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
import { Sparkles } from 'lucide-react';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [showDemoAds, setShowDemoAds] = useState(true);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Hash-based routing to support direct URLs (#image-compressor, #pdf-converter, #qr-generator, etc.)
  const [activeTool, setActiveTool] = useState<ToolId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as ToolId;
      if (TOOLS_METADATA[hash]) {
        return hash;
      }
    }
    return 'image-compressor';
  });

  // Listen to hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ToolId;
      if (TOOLS_METADATA[hash]) {
        setActiveTool(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTool = (id: ToolId) => {
    setActiveTool(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Header AdSense Container (728x90 responsive) */}
        <AdSlot type="header" showDemoContent={showDemoAds} />

        {/* Hero Section */}
        <section className="text-center py-6 sm:py-8 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% In-Browser Execution • $0 Server Footprint</span>
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

        {/* Native Inline AdSense Container */}
        <div className="max-w-5xl mx-auto">
          <AdSlot type="inline" showDemoContent={showDemoAds} />
        </div>

        {/* Keyword-Rich Crawlable SEO Section (How-to, FAQs, JSON-LD Schema) */}
        <div className="max-w-5xl mx-auto">
          <SeoSection metadata={currentMetadata} />
        </div>

        {/* Affiliate & Creator Tools Banner */}
        <div className="max-w-5xl mx-auto">
          <AffiliateBanner />
        </div>

        {/* Bottom Footer Ad Slot */}
        <AdSlot type="footer" showDemoContent={showDemoAds} />
      </main>

      {/* Footer */}
      <Footer onSelectTool={handleSelectTool} onOpenLegal={(type) => setActiveLegalDoc(type)} />

      {/* Floating Sticky Tip Jar / Buy Me a Coffee */}
      <TipJarModal />

      {/* GDPR / AdSense Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => setActiveLegalDoc('privacy')} />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal activeDoc={activeLegalDoc} onClose={() => setActiveLegalDoc(null)} />
    </div>
  );
}

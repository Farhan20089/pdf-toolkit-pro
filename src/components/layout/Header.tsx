import React from 'react';
import { 
  Sun, 
  Moon, 
  Image as ImageIcon, 
  FileText,
  QrCode,
  FileEdit,
  Share2, 
  Code2, 
  Calculator, 
  Zap, 
  Layout,
  HelpCircle
} from 'lucide-react';
import { ToolId } from '../../types';

interface HeaderProps {
  activeTool: ToolId;
  onSelectTool: (id: ToolId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  showDemoAds: boolean;
  onToggleDemoAds: () => void;
  onOpenContact?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'contact') => void;
}

export function Header({
  activeTool,
  onSelectTool,
  isDark,
  onToggleTheme,
  showDemoAds,
  onToggleDemoAds,
  onOpenContact,
  onOpenLegal
}: HeaderProps) {
  const tools = [
    { id: 'image-compressor' as ToolId, label: 'Image to WebP', icon: ImageIcon },
    { id: 'pdf-converter' as ToolId, label: 'Image to PDF', icon: FileText },
    { id: 'qr-generator' as ToolId, label: 'QR Generator', icon: QrCode },
    { id: 'markdown-editor' as ToolId, label: 'Markdown Editor', icon: FileEdit },
    { id: 'social-meta-tags' as ToolId, label: 'Social & Viral Tags', icon: Share2 },
    { id: 'developer-tools' as ToolId, label: 'JSON & Dev Tools', icon: Code2 },
    { id: 'freelance-calculator' as ToolId, label: 'Profit Calculator', icon: Calculator },
  ];

  const handleContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else if (onOpenLegal) {
      onOpenLegal('contact');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectTool('image-compressor');
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
                  OmniTool<span className="text-indigo-600 dark:text-indigo-400">.engine</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  High-Traffic Client-Side Toolkit
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {tools.map((t) => {
              const Icon = t.icon;
              const isActive = activeTool === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectTool(t.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1.5 min-h-[36px] ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Contact, Demo Ads Toggle, Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Contact & Support Link */}
            {(onOpenContact || onOpenLegal) && (
              <button
                type="button"
                onClick={handleContact}
                title="About toolkit mission & Contact Support"
                className="px-2.5 py-1.5 text-[11px] font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1 min-h-[36px]"
              >
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span className="hidden md:inline">Contact Us</span>
              </button>
            )}

            {/* Demo Ads Simulator Toggle */}
            <button
              type="button"
              onClick={onToggleDemoAds}
              title={showDemoAds ? 'Switch to raw AdSense slot frames' : 'Preview simulated ad units'}
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400 transition-colors hidden sm:inline-flex items-center gap-1 min-h-[36px]"
            >
              <Layout className="w-3 h-3 text-indigo-500" />
              <span>{showDemoAds ? 'Ads: Demo' : 'Ads: Wireframe'}</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Color Theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-200 dark:border-slate-800">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTool(t.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all inline-flex items-center gap-1.5 min-h-[40px] ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

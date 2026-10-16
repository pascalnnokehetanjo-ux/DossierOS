import React from 'react';
import { Language, Theme } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Globe, Moon, Sun, FileText, CheckCircle2, Sliders, MessageSquare, Download, Calculator, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  theme,
  toggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[language];

  const navItems = [
    { id: 'overview', label: t.navHome, icon: ShieldCheck },
    { id: 'onboard', label: t.navOnboard, icon: FileText },
    { id: 'compliance', label: t.navCompliance, icon: CheckCircle2 },
    { id: 'notifications', label: t.navNotifications, icon: MessageSquare },
    { id: 'export', label: t.navExport, icon: Download },
    { id: 'pricing', label: t.navPricing, icon: Calculator },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
      theme === 'dark' 
        ? 'bg-neutral-900/90 border-neutral-800 text-white' 
        : 'bg-white/90 border-neutral-200 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('overview')}>
            <div className="w-10 h-10 rounded-xl accent-bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight flex items-center space-x-2">
                <span>{t.appName}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  CEMAC v2.4
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Bank & MFI Onboarding OS
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'accent-bg-primary text-white shadow-md'
                      : theme === 'dark'
                      ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language & Theme & Mobile Menu */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 border border-neutral-200 dark:border-neutral-700">
              <Globe className="w-3.5 h-3.5 ml-1.5 text-neutral-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1 py-1"
                aria-label={t.languageLabel}
              >
                <option value="en" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">EN (English)</option>
                <option value="fr" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">FR (Français)</option>
                <option value="ha" className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">HA (Hausa)</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700"
              aria-label={t.themeLabel}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'accent-bg-primary text-white'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

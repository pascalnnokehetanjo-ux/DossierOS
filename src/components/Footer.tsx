import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-12 text-neutral-600 dark:text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg accent-bg-primary text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-neutral-900 dark:text-white">{t.appName}</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
              {t.tagline} Built specifically for African banks, microfinance institutions, and mobile-money agents complying with COBAC and BEAC regulations.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Cameroon & Regional Hubs</div>
            <p>Yaoundé • Douala • Maroua • Bafoussam • Garoua</p>
            <p className="text-neutral-500">support@dossieros.africa</p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Security & Compliance</div>
            <p className="flex items-center space-x-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /><span>COBAC & CEMAC Compliant Workflow</span></p>
            <p className="flex items-center space-x-1.5"><Globe className="w-3.5 h-3.5 text-emerald-600" /><span>Multilingual (EN, FR, HA)</span></p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} DossierOS Africa Inc. All rights reserved.</p>
          <p className="text-[11px] text-neutral-500 max-w-xl text-center sm:text-right">
            {t.disclaimer}
          </p>
        </div>

      </div>
    </footer>
  );
};

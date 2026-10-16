import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, ArrowRight, Zap, CheckCircle, FileCheck, Smartphone, Users, Building } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  setCurrentTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, setCurrentTab }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 py-8">
      
      {/* 2-Column Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading, Paragraph, CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>CEMAC & WAEMU Compliant Onboarding OS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white">
            Open, verify, and manage customer files in <span className="accent-text-primary underline decoration-emerald-500/30">minutes—not days.</span>
          </h1>

          <p className="text-lg text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-2xl font-medium">
            {t.heroProblem}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button
              onClick={() => setCurrentTab('onboard')}
              className="px-8 py-4 rounded-xl accent-bg-primary text-white font-bold text-base shadow-xl shadow-emerald-600/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>{t.startOnboarding}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentTab('compliance')}
              className="px-8 py-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 font-bold text-base text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>{t.complianceQueue}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold accent-text-primary">99.4%</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold">{t.statsReduction}</div>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">12m</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold">{t.statsTimeSaved}</div>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md">
              <div className="text-2xl sm:text-3xl font-extrabold accent-text-secondary">100%</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold">{t.statsPaperless}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Demo Preview Card (Foreground card) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl bg-white dark:bg-neutral-900 p-6 text-neutral-900 dark:text-white shadow-2xl border-2 border-neutral-200 dark:border-neutral-700 overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">DossierOS AI Engine v2.4</span>
            </div>

            <div className="py-5 space-y-4">
              <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Cameroon CNI Scan</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">ID #118294821 • Validated</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                  99.2% OCR
                </span>
              </div>

              <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs font-mono shadow-sm">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Full Name:</span>
                  <span className="text-neutral-900 dark:text-white font-sans font-bold">Jean-Pierre Mballa</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>NIU Taxpayer ID:</span>
                  <span className="text-neutral-900 dark:text-white font-sans font-bold">M198829481200X</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Risk Score:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans font-extrabold">LOW RISK (0 Flags)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentTab('compliance')}
                  className="w-full py-3.5 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Review Compliance Case File</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Target Audiences & Use Cases */}
      <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Built for Every Financial Institution in Central & West Africa</h2>
          <p className="text-neutral-700 dark:text-neutral-300 font-medium">
            From traditional commercial banks to microfinance institutions, cooperatives, and mobile-money agent networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Commercial Banks & MFIs</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              Replace multi-day paper branch queues with rapid digital onboarding. Automatically extract CNI, NIU, and utility bills while meeting COBAC compliance standards.
            </p>
            <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400 font-semibold">
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /><span>Core banking integration (API / XML)</span></li>
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /><span>PEP & Sanctions automated screening</span></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Mobile Money Agents</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              Empower agents to capture customer files via smartphone camera with real-time blur and glare detection before submission.
            </p>
            <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400 font-semibold">
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /><span>Instant WhatsApp / SMS activation alerts</span></li>
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /><span>Agent float & KYC compliance sync</span></li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Business Banking & KYB</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
              Verify corporate entities with RCCM trade register extraction, company statutes analysis, and beneficial ownership mapping.
            </p>
            <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400 font-semibold">
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /><span>Director & UBO contradiction detection</span></li>
              <li className="flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /><span>Audit-ready compliance export</span></li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

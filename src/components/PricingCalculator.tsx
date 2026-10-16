import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Calculator, CheckCircle2, Zap, ShieldCheck, Building } from 'lucide-react';

interface PricingCalculatorProps {
  language: Language;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ language }) => {
  const t = translations[language];

  const [monthlyFiles, setMonthlyFiles] = useState(1500);
  const [branchCount, setBranchCount] = useState(5);

  // Calculation in FCFA
  const dossierFee = monthlyFiles * 750; // 750 FCFA per file
  const branchFee = branchCount * 200000; // 200,000 FCFA per branch
  const totalMonthlyFCFA = dossierFee + branchFee;
  const manualLaborSavedFCFA = monthlyFiles * 3500; // 3,500 FCFA saved in staff hours per file

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparent ROI & Pricing Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Predictable Value for African Financial Institutions</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Pay for completed, verified dossiers. Eliminate manual paper storage costs and cut onboarding time from days to minutes.
        </p>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-xl font-bold">Interactive Cost & Savings Calculator</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Monthly Onboarded Customer Files:</span>
                <span className="accent-text-primary font-bold">{monthlyFiles.toLocaleString()} files</span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={monthlyFiles}
                onChange={(e) => setMonthlyFiles(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>Active Branch / MFI Locations:</span>
                <span className="accent-text-secondary font-bold">{branchCount} branches</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={branchCount}
                onChange={(e) => setBranchCount(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2 text-neutral-600 dark:text-neutral-300">
            <div className="flex justify-between">
              <span>Branch Starter Subscription:</span>
              <span className="font-bold">{branchFee.toLocaleString()} FCFA / mo</span>
            </div>
            <div className="flex justify-between">
              <span>Per-Dossier Verification (750 FCFA):</span>
              <span className="font-bold">{dossierFee.toLocaleString()} FCFA / mo</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="text-xs font-mono uppercase text-neutral-400">Monthly Investment vs Savings</div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-neutral-400">Total DossierOS Investment:</div>
              <div className="text-3xl font-extrabold accent-text-primary">{totalMonthlyFCFA.toLocaleString()} FCFA <span className="text-xs font-normal text-neutral-300">/ month</span></div>
            </div>

            <div className="pt-3 border-t border-neutral-700">
              <div className="text-xs text-neutral-400">Estimated Staff & Paper Savings:</div>
              <div className="text-3xl font-extrabold text-emerald-400">{manualLaborSavedFCFA.toLocaleString()} FCFA <span className="text-xs font-normal text-neutral-300">/ month</span></div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert('Thank you! Our enterprise sales team in Yaoundé & Douala will contact your institution within 24 hours.')}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-colors cursor-pointer"
            >
              Request Institutional Pilot
            </button>
          </div>
        </div>

      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300">
              Branch Starter
            </div>
            <div>
              <div className="text-3xl font-extrabold">150k - 300k <span className="text-xs font-normal text-neutral-500">FCFA / mo</span></div>
              <p className="text-xs text-neutral-500 pt-1">Ideal for microfinance institutions and single-branch banks.</p>
            </div>
            <ul className="text-xs space-y-3 text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Up to 1,000 dossiers / month</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>AI CNI & NIU OCR Extraction</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>WhatsApp & SMS Status Alerts</span></li>
            </ul>
          </div>
          <button
            onClick={() => alert('Branch Starter plan selected.')}
            className="w-full py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          >
            Select Starter
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-900/20 to-neutral-900 border-2 border-emerald-600 space-y-6 shadow-xl flex flex-col justify-between relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full accent-bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <div className="space-y-4 pt-2">
            <div className="inline-flex px-3 py-1 rounded-full accent-bg-primary/20 text-xs font-bold uppercase text-emerald-400">
              Commercial Bank
            </div>
            <div>
              <div className="text-3xl font-extrabold">750 <span className="text-xs font-normal text-neutral-400">FCFA / dossier</span></div>
              <p className="text-xs text-neutral-400 pt-1">Plus 300,000 FCFA monthly platform license per branch.</p>
            </div>
            <ul className="text-xs space-y-3 text-neutral-300">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Unlimited branches & agents</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Full KYB & Business RCCM extraction</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Core banking ISO 20022 integration</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Dedicated compliance officer desk</span></li>
            </ul>
          </div>
          <button
            onClick={() => alert('Commercial Bank plan selected.')}
            className="w-full py-3 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            Deploy Commercial Plan
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold uppercase text-neutral-600 dark:text-neutral-300">
              Enterprise Group
            </div>
            <div>
              <div className="text-3xl font-extrabold">Custom</div>
              <p className="text-xs text-neutral-500 pt-1">For multinational banking groups operating across CEMAC and WAEMU.</p>
            </div>
            <ul className="text-xs space-y-3 text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Custom on-premise or cloud VPC</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>SLA 99.99% uptime guarantee</span></li>
              <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span>Custom regulator audit reporting</span></li>
            </ul>
          </div>
          <button
            onClick={() => alert('Enterprise contact request sent.')}
            className="w-full py-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          >
            Contact Enterprise Sales
          </button>
        </div>

      </div>

    </div>
  );
};

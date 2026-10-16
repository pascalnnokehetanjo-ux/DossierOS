import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Sparkles, ArrowRight, CheckCircle2, FileText, ShieldCheck, MessageSquare, Download, Play, Compass } from 'lucide-react';

interface GuidedTourWizardProps {
  language: Language;
  setCurrentTab: (tab: string) => void;
}

export const GuidedTourWizard: React.FC<GuidedTourWizardProps> = ({ language, setCurrentTab }) => {
  const t = translations[language];
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: '1. Onboard & Capture',
      desc: 'Choose account type (Individual, KYB, Loan, Agent) and photograph CNI / NIU via camera or file uploader.',
      tab: 'onboard',
      icon: FileText
    },
    {
      step: 2,
      title: '2. AI OCR & Completeness',
      desc: 'DossierOS instantly extracts name, ID number, and NIU while checking for contradictions or missing pages.',
      tab: 'onboard',
      icon: Sparkles
    },
    {
      step: 3,
      title: '3. Compliance & Risk Desk',
      desc: 'Review risk scoring (Low/Med/High), PEP/Sanctions checks, and sign off the dossier with one click.',
      tab: 'compliance',
      icon: ShieldCheck
    },
    {
      step: 4,
      title: '4. WhatsApp & SMS Alerts',
      desc: 'Notify customers instantly of missing docs or account approval without branch return trips.',
      tab: 'notifications',
      icon: MessageSquare
    },
    {
      step: 5,
      title: '5. Core Banking Export',
      desc: 'Push approved customer data via ISO 20022 XML or API payload to Temenos, Flexcube, or core systems.',
      tab: 'export',
      icon: Download
    }
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl accent-bg-primary flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Live End-to-End Workflow Guide</h2>
            <p className="text-xs text-neutral-400">Follow the 5-stage African banking onboarding pipeline live.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setActiveStep(s.step);
                setCurrentTab(s.tab);
              }}
              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'accent-bg-primary text-white shadow-lg scale-110'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.step;
          return (
            <div
              key={s.step}
              onClick={() => {
                setActiveStep(s.step);
                setCurrentTab(s.tab);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                isActive
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                  : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'accent-bg-primary text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Step 0{s.step}</span>
                </div>
                <h4 className="font-bold text-sm">{s.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">{s.desc}</p>
              </div>

              <div className="pt-2 flex items-center space-x-1 text-xs font-semibold accent-text-primary">
                <span>Launch Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

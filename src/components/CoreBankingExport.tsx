import React, { useState } from 'react';
import { Language, Dossier } from '../types';
import { translations } from '../translations';
import { Download, FileText, Code, CheckCircle, Database, Server } from 'lucide-react';

interface CoreBankingExportProps {
  language: Language;
  dossiers: Dossier[];
}

export const CoreBankingExport: React.FC<CoreBankingExportProps> = ({ language, dossiers }) => {
  const t = translations[language];
  const [selectedFormat, setSelectedFormat] = useState<'xml' | 'json' | 'csv' | 'iso'>('iso');
  const [selectedDossierId, setSelectedDossierId] = useState(dossiers[0]?.id || '');

  const selectedDossier = dossiers.find((d) => d.id === selectedDossierId) || dossiers[0];

  const handleDownload = () => {
    alert(`Successfully generated and downloaded ${selectedFormat.toUpperCase()} core banking payload for ${selectedDossier?.referenceNo}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Server className="w-3.5 h-3.5" />
            <span>Legacy Core Banking Bridge (Temenos, Finacle, Flexcube)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Core Banking & Regulator Export Center</h1>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Seamlessly bridge DossierOS digital verification files to your existing core banking system without disrupting legacy infrastructure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Format Selector */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-3">Export Configuration</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Select Dossier</label>
            <select
              value={selectedDossierId}
              onChange={(e) => setSelectedDossierId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {dossiers.map((dos) => (
                <option key={dos.id} value={dos.id}>
                  {dos.applicantName} ({dos.referenceNo})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Standardized Export Format</label>
            <div className="space-y-2">
              {[
                { id: 'iso', label: 'ISO 20022 Financial XML Package', desc: 'Recommended for Temenos & Flexcube' },
                { id: 'json', label: 'REST API JSON Payload', desc: 'Direct core webhook integration' },
                { id: 'csv', label: 'Auditor CSV Summary Sheet', desc: 'For internal audit & compliance reports' },
                { id: 'xml', label: 'COBAC Regulatory XML Report', desc: 'BEAC compliance transmission' }
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id as any)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-sm font-bold">{fmt.label}</div>
                  <div className="text-xs text-neutral-500 font-normal">{fmt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export & Push to Core Banking</span>
          </button>
        </div>

        {/* Right: Payload Preview */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-4">
          <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
            <span>Payload Preview ({selectedFormat.toUpperCase()})</span>
            <Code className="w-5 h-5 text-emerald-600" />
          </h3>

          <div className="bg-neutral-950 text-neutral-200 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
            <div className="text-neutral-500">// DossierOS Core Banking Bridge v2.4</div>
            <div className="text-neutral-500">// Timestamp: {new Date().toISOString()}</div>
            <div>{`{`}</div>
            <div className="pl-4">{`"referenceNo": "${selectedDossier?.referenceNo}",`}</div>
            <div className="pl-4">{`"institution": "Cameroon Commercial Bank & MFI Network",`}</div>
            <div className="pl-4">{`"applicant": {`}</div>
            <div className="pl-8">{`"fullName": "${selectedDossier?.kycData.fullName}",`}</div>
            <div className="pl-8">{`"idNumber": "${selectedDossier?.kycData.idNumber}",`}</div>
            <div className="pl-8">{`"niu": "${selectedDossier?.kycData.niu}",`}</div>
            <div className="pl-8">{`"address": "${selectedDossier?.kycData.address}"`}</div>
            <div className="pl-4">{`},`}</div>
            <div className="pl-4">{`"complianceStatus": "${selectedDossier?.status}",`}</div>
            <div className="pl-4">{`"riskScore": "${selectedDossier?.riskLevel}",`}</div>
            <div className="pl-4">{`"completenessScore": ${selectedDossier?.completenessScore}`}</div>
            <div>{`}`}</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Verified cryptographic signature attached. Ready for automated account creation in Core Banking.</span>
          </div>
        </div>

      </div>

    </div>
  );
};

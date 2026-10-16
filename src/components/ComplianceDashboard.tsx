import React, { useState } from 'react';
import { Language, Dossier, DossierStatus } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Search, Filter, CheckCircle2, AlertTriangle, XCircle, Clock, FileText, ChevronRight, User, Building, ExternalLink } from 'lucide-react';

interface ComplianceDashboardProps {
  language: Language;
  dossiers: Dossier[];
  onUpdateStatus: (dossierId: string, newStatus: DossierStatus, reason: string) => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({
  language,
  dossiers,
  onUpdateStatus
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDossierId, setSelectedDossierId] = useState<string>(dossiers[0]?.id || '');
  const [actionReason, setActionReason] = useState('');

  const selectedDossier = dossiers.find((d) => d.id === selectedDossierId) || dossiers[0];

  const filteredDossiers = dossiers.filter((d) => {
    const matchesSearch = 
      d.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.kycData.niu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.kycData.idNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && d.accountType === filterType;
  });

  const handleAction = (status: DossierStatus) => {
    if (!selectedDossier) return;
    const reason = actionReason || (status === 'approved' ? 'Passed all COBAC KYC checks' : status === 'missing_info' ? 'Additional document required' : 'Risk threshold exceeded');
    onUpdateStatus(selectedDossier.id, status, reason);
    setActionReason('');
    alert(`Dossier ${selectedDossier.referenceNo} status updated to: ${status.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COBAC / BEAC Compliant Risk & Audit Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Compliance Review Queue</h1>
          <p className="text-sm text-neutral-400">
            Inspect AI-extracted data, verify CNI/NIU documents, check PEP & sanctions matches, and sign off dossiers.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-neutral-800 px-4 py-3 rounded-xl border border-neutral-700">
          <div className="text-right">
            <div className="text-xs text-neutral-400">Pending Review</div>
            <div className="text-xl font-bold text-amber-400">
              {dossiers.filter(d => d.status === 'pending_review' || d.status === 'missing_info').length} Files
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'individual', label: t.filterIndividual },
            { id: 'business', label: t.filterBusiness },
            { id: 'loan', label: t.filterLoan },
            { id: 'agent', label: t.filterAgent },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'accent-bg-primary text-white shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Queue List + Detailed Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Queue List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredDossiers.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500">No dossiers match your search criteria.</p>
            </div>
          ) : (
            filteredDossiers.map((dos) => {
              const isSelected = dos.id === selectedDossier?.id;
              return (
                <div
                  key={dos.id}
                  onClick={() => setSelectedDossierId(dos.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-md'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{dos.referenceNo}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      dos.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                      dos.status === 'missing_info' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                      dos.status === 'rejected' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                      'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    }`}>
                      {dos.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white">{dos.applicantName}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{dos.branch} • {dos.submissionDate}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        dos.riskLevel === 'low' ? 'bg-emerald-500' : dos.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className="capitalize font-medium">{dos.riskLevel} Risk</span>
                    </div>
                    <span className="font-bold text-neutral-700 dark:text-neutral-300">{dos.completenessScore}% Complete</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed Dossier Inspector */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
          {selectedDossier ? (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
                <div>
                  <div className="text-xs font-mono accent-text-primary font-bold">{selectedDossier.referenceNo}</div>
                  <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{selectedDossier.applicantName}</h2>
                  <p className="text-xs text-neutral-500">{selectedDossier.branch}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    selectedDossier.riskLevel === 'low' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                    selectedDossier.riskLevel === 'medium' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                    'bg-red-500/10 text-red-600 border border-red-500/20'
                  }`}>
                    {selectedDossier.riskLevel.toUpperCase()} RISK SCORE
                  </span>
                </div>
              </div>

              {/* Risk Reasons & Completeness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Risk Reasons & Sanctions</div>
                  <ul className="text-xs space-y-1 text-neutral-700 dark:text-neutral-300">
                    {selectedDossier.riskReasons.map((reason, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">KYC Completeness</div>
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>File Score</span>
                    <span className="accent-text-primary">{selectedDossier.completenessScore}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                    <div className="accent-bg-primary h-full rounded-full" style={{ width: `${selectedDossier.completenessScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Extracted KYC Data Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">AI-Extracted Data & Verification</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-neutral-50 dark:bg-neutral-800/30 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs">
                  <div>
                    <div className="text-neutral-500">Full Name</div>
                    <div className="font-semibold text-neutral-900 dark:text-white">{selectedDossier.kycData.fullName}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">DOB</div>
                    <div className="font-semibold text-neutral-900 dark:text-white">{selectedDossier.kycData.dob}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">CNI ID Number</div>
                    <div className="font-semibold font-mono text-neutral-900 dark:text-white">{selectedDossier.kycData.idNumber}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">NIU Taxpayer ID</div>
                    <div className="font-semibold font-mono text-neutral-900 dark:text-white">{selectedDossier.kycData.niu}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Expiry Date</div>
                    <div className="font-semibold text-neutral-900 dark:text-white">{selectedDossier.kycData.expiryDate}</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Monthly Volume</div>
                    <div className="font-semibold accent-text-primary">{selectedDossier.kycData.monthlyVolume}</div>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Verified Documents</h3>
                <div className="space-y-2">
                  {selectedDossier.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-semibold text-neutral-900 dark:text-white">{doc.name}</div>
                          {doc.issues && <div className="text-red-500">{doc.issues[0]}</div>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-neutral-500">OCR: {doc.ocrConfidence}%</span>
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                          doc.status === 'verified' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {doc.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Reason Input */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Compliance Officer Notes / Reason Code</label>
                  <input
                    type="text"
                    placeholder="e.g. Verified against MINFI database and biometric register."
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAction('approved')}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.approveFile}</span>
                  </button>
                  <button
                    onClick={() => handleAction('missing_info')}
                    className="py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t.requestDocs}</span>
                  </button>
                  <button
                    onClick={() => handleAction('rejected')}
                    className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t.rejectFile}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-neutral-500">Select a dossier from the queue to inspect details.</div>
          )}
        </div>

      </div>

    </div>
  );
};

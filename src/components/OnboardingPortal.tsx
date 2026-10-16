import React, { useState, useRef } from 'react';
import { Language, AccountType, Dossier, DocumentItem } from '../types';
import { translations } from '../translations';
import { FileUp, CheckCircle, Sparkles, User, Building2, CreditCard, Smartphone, Send, Camera, Upload, Trash2, ShieldCheck, X } from 'lucide-react';

interface OnboardingPortalProps {
  language: Language;
  onAddDossier: (dossier: Dossier) => void;
}

export const OnboardingPortal: React.FC<OnboardingPortalProps> = ({ language, onAddDossier }) => {
  const t = translations[language];

  const [accountType, setAccountType] = useState<AccountType>('individual');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [niu, setNiu] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Yaoundé Central Branch #04');
  const [monthlyVolume, setMonthlyVolume] = useState('500,000 FCFA');

  // Interactive Uploaded Documents State
  const [uploadedDocs, setUploadedDocs] = useState<{ id: string; name: string; type: string; size: string; ocrConfidence: number; previewUrl?: string }[]>([
    { id: '1', name: 'CNI_Front_Mballa.jpg', type: 'CNI National ID', size: '1.4 MB', ocrConfidence: 99.2 },
    { id: '2', name: 'NIU_Tax_Certificate.pdf', type: 'NIU Card', size: '850 KB', ocrConfidence: 98.5 }
  ]);

  // Camera Modal State
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [cameraCapturing, setCameraCapturing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('CNI National ID (Front)');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState<string | null>(null);

  // Handle file browse upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc = {
        id: `${Date.now()}`,
        name: file.name,
        type: selectedDocType,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        ocrConfidence: Number((95 + Math.random() * 4.8).toFixed(1))
      };
      setUploadedDocs([...uploadedDocs, newDoc]);
    }
  };

  // Handle simulated camera snapshot
  const handleSnapPhoto = () => {
    setCameraCapturing(true);
    setTimeout(() => {
      const snappedDoc = {
        id: `${Date.now()}`,
        name: `Camera_Scan_${Math.floor(100 + Math.random() * 900)}.jpg`,
        type: selectedDocType,
        size: '2.1 MB',
        ocrConfidence: Number((97 + Math.random() * 2.9).toFixed(1))
      };
      setUploadedDocs([...uploadedDocs, snappedDoc]);
      setCameraCapturing(false);
      setCameraModalOpen(false);
    }, 1200);
  };

  const removeDoc = (id: string) => {
    setUploadedDocs(uploadedDocs.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !idNumber || !niu) {
      alert('Please fill in required fields (Full Name, ID Number, NIU)');
      return;
    }

    const refNo = `CAM-${accountType.toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const docs: DocumentItem[] = uploadedDocs.map((d, index) => ({
      id: `doc-${index}-${Date.now()}`,
      type: d.type.toLowerCase().includes('cni') ? 'cni' : d.type.toLowerCase().includes('niu') ? 'niu' : 'address_proof',
      name: d.name,
      status: 'verified',
      ocrConfidence: d.ocrConfidence,
      extractedData: { fullName, idNumber, niu }
    }));

    const newDossier: Dossier = {
      id: `dos-${Date.now()}`,
      referenceNo: refNo,
      applicantName: fullName,
      accountType,
      submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      branch,
      status: 'pending_review',
      riskLevel: 'low',
      riskReasons: ['Verified via DossierOS Camera & File Uploader', 'Clean AI OCR extraction'],
      completenessScore: 100,
      kycData: {
        fullName,
        dob: dob || '1990-01-01',
        idNumber,
        niu,
        address: address || 'Yaoundé, Cameroon',
        expiryDate: '2031-12-31',
        gender: 'Not Specified',
        sourceOfFunds: 'Business & Employment',
        monthlyVolume
      },
      documents: docs,
      auditTrail: [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          action: 'Dossier Submitted via Camera/Uploader',
          actor: 'Web Portal & Agent Camera',
          details: `Created new ${accountType} dossier with reference ${refNo}`
        }
      ],
      whatsappLog: [
        {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          message: `Hello ${fullName}, your Dossier (${refNo}) has been received and is under AI compliance review.`,
          status: 'read'
        }
      ]
    };

    onAddDossier(newDossier);
    setSubmittedSuccess(refNo);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Camera & Document Uploader Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Customer Onboarding Portal</h1>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Photograph documents directly with your camera or upload PDFs/images. DossierOS automatically extracts CNI, NIU, and runs completeness checks.
          </p>
        </div>
      </div>

      {submittedSuccess ? (
        <div className="bg-white dark:bg-neutral-900 border-2 border-emerald-500/30 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Dossier Successfully Submitted!</h2>
          <p className="text-neutral-700 dark:text-neutral-300 max-w-md mx-auto font-medium">
            Reference Number: <strong className="font-mono accent-text-primary">{submittedSuccess}</strong>. The compliance officer review queue has been updated instantly.
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <button
              onClick={() => setSubmittedSuccess(null)}
              className="px-6 py-3 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              Submit Another File
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Account Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-neutral-900 dark:text-white">Select Account / Dossier Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { type: 'individual', label: 'Individual', icon: User },
                { type: 'business', label: 'Business KYB', icon: Building2 },
                { type: 'loan', label: 'Loan File', icon: CreditCard },
                { type: 'agent', label: 'Agent Node', icon: Smartphone },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = accountType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setAccountType(item.type as AccountType)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-md'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applicant Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-2 text-neutral-900 dark:text-white">Applicant Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Eto'o Fils"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">National ID / CNI Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 119823411"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">NIU (Taxpayer Number) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M199283741009K"
                  value={niu}
                  onChange={(e) => setNiu(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Residential Address / Quarter</label>
                <input
                  type="text"
                  placeholder="e.g. Akwa Nord, Douala"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Assigned Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer"
                >
                  <option value="Yaoundé Central Branch #04">Yaoundé Central Branch #04</option>
                  <option value="Douala Port Business Center">Douala Port Business Center</option>
                  <option value="Bafoussam Commercial Hub">Bafoussam Commercial Hub</option>
                  <option value="Maroua Regional MFI Branch">Maroua Regional MFI Branch</option>
                  <option value="Garoua North Agency">Garoua North Agency</option>
                </select>
              </div>
            </div>
          </div>

          {/* Camera & File Uploader Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Camera & Document Uploader</h3>
              <span className="text-xs font-semibold accent-text-primary">{uploadedDocs.length} Documents Attached</span>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />

            {/* Action Buttons: Camera Snap & File Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCameraModalOpen(true)}
                className="p-5 rounded-2xl border-2 border-dashed border-emerald-500/50 hover:border-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full accent-bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-neutral-900 dark:text-white">Snap Photo with Camera</div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center">Use device camera to photograph CNI card or NIU</p>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-5 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-neutral-900 dark:text-white">Upload File (PDF / Image)</div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center">Browse local storage or drag documents here</p>
              </button>
            </div>

            {/* Attached Documents List */}
            {uploadedDocs.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Attached & OCR-Verified Files</div>
                <div className="space-y-2">
                  {uploadedDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
                          PDF
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-white">{doc.name}</div>
                          <div className="text-neutral-500">{doc.type} • {doc.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                          OCR: {doc.ocrConfidence}%
                        </span>
                        <button
                          type="button"
                          onClick={() => removeDoc(doc.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          aria-label="Remove document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl accent-bg-primary text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Submit Dossier for Compliance Review</span>
            </button>
          </div>

        </form>
      )}

      {/* Simulated Live Camera Modal */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-neutral-700 text-neutral-900 dark:text-white relative">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg">Live Camera Document Scanner</h3>
              </div>
              <button
                onClick={() => setCameraModalOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                aria-label="Close camera modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Select Document Type to Capture</label>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm font-semibold cursor-pointer"
                >
                  <option value="CNI National ID (Front)">CNI National ID (Front)</option>
                  <option value="CNI National ID (Back)">CNI National ID (Back)</option>
                  <option value="NIU Taxpayer Certificate">NIU Taxpayer Certificate</option>
                  <option value="ENEO Utility Bill (Address Proof)">ENEO Utility Bill (Address Proof)</option>
                  <option value="RCCM Business Registration">RCCM Business Registration</option>
                </select>
              </div>

              {/* Viewfinder simulation */}
              <div className="relative rounded-xl bg-neutral-950 h-64 flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/60 overflow-hidden shadow-inner">
                {cameraCapturing ? (
                  <div className="text-center space-y-3">
                    <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm font-bold text-emerald-400">AI OCR Analyzing & Capturing...</p>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-4 border border-emerald-500/30 rounded-lg pointer-events-none flex items-center justify-center">
                      <div className="text-center space-y-1 opacity-60">
                        <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
                        <span className="text-xs font-mono text-emerald-400">Align document inside frame</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 text-xs font-mono text-neutral-400 bg-neutral-900/80 px-3 py-1 rounded-full">
                      Auto-detecting blur & glare
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCameraModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={cameraCapturing}
                onClick={handleSnapPhoto}
                className="px-6 py-2.5 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Snap & Extract OCR</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

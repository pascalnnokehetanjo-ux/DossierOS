import React, { useState } from 'react';
import { Language, Dossier } from '../types';
import { translations } from '../translations';
import { MessageSquare, Send, CheckCircle2, Phone, Smartphone, Clock } from 'lucide-react';

interface NotificationsCenterProps {
  language: Language;
  dossiers: Dossier[];
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ language, dossiers }) => {
  const t = translations[language];

  const [selectedDossierId, setSelectedDossierId] = useState(dossiers[0]?.id || '');
  const [customMessage, setCustomMessage] = useState(
    'Hello, your Dossier has been approved. Please visit the branch to complete biometric verification.'
  );
  const [sentLogs, setSentLogs] = useState<{ id: string; name: string; message: string; time: string }[]>([
    { id: '1', name: 'Jean-Pierre Mballa', message: 'Hello Jean-Pierre, your Dossier (CAM-IND-2026-9812) has been received and is undergoing automated compliance review.', time: '10:15 AM' },
    { id: '2', name: 'Ibrahim Sani', message: 'M. Ibrahim Sani, votre dossier de crédit a été approuvé. Veuillez passer à l’agence.', time: '09:30 AM' }
  ]);

  const selectedDossier = dossiers.find((d) => d.id === selectedDossierId) || dossiers[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDossier) return;

    const newLog = {
      id: `${Date.now()}`,
      name: selectedDossier.applicantName,
      message: customMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSentLogs([newLog, ...sentLogs]);
    alert(`WhatsApp / SMS successfully dispatched to ${selectedDossier.applicantName}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Automated Customer Retention & Engagement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">WhatsApp & SMS Status Alerts</h1>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Eliminate branch return trips. Send automated notifications regarding missing documents, approval status, and biometric verification requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Dispatch Form */}
        <form onSubmit={handleSend} className="lg:col-span-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-3">Dispatch Notification</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Select Customer Dossier</label>
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
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Quick Templates</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Your file is missing proof of address.',
                'Your CNI ID appears expired. Please update.',
                'Your account file has been approved!',
                'Visit Branch to complete biometric verification.'
              ].map((template, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomMessage(template)}
                  className="text-left p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Message Body</label>
            <textarea
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl accent-bg-primary text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send WhatsApp / SMS Notice</span>
          </button>
        </form>

        {/* Right: Notification History Log */}
        <div className="lg:col-span-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold border-b border-neutral-200 dark:border-neutral-800 pb-3 flex items-center justify-between">
            <span>Dispatched Message Logs</span>
            <Smartphone className="w-5 h-5 text-emerald-600" />
          </h3>

          <div className="space-y-3">
            {sentLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="accent-text-primary">{log.name}</span>
                  <span className="text-neutral-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{log.time}</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{log.message}</p>
                <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Delivered via WhatsApp API</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

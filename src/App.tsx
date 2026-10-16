import React, { useState, useEffect } from 'react';
import { Language, Theme, Dossier, DossierStatus } from './types';
import { initialDossiers } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OnboardingPortal } from './components/OnboardingPortal';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { NotificationsCenter } from './components/NotificationsCenter';
import { CoreBankingExport } from './components/CoreBankingExport';
import { PricingCalculator } from './components/PricingCalculator';
import { GuidedTourWizard } from './components/GuidedTourWizard';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [dossiers, setDossiers] = useState<Dossier[]>(initialDossiers);

  // Toggle theme and update document root class
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAddDossier = (newDossier: Dossier) => {
    setDossiers([newDossier, ...dossiers]);
  };

  const handleUpdateStatus = (dossierId: string, newStatus: DossierStatus, reason: string) => {
    setDossiers(dossiers.map((dos) => {
      if (dos.id === dossierId) {
        return {
          ...dos,
          status: newStatus,
          auditTrail: [
            ...dos.auditTrail,
            {
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              action: `Status Updated to ${newStatus.toUpperCase()}`,
              actor: 'Compliance Officer (Desk #04)',
              details: reason
            }
          ]
        };
      }
      return dos;
    }));
  };

  return (
    <div className={`min-h-screen transition-colors ${
      theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'
    }`}>
      
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">
        {currentTab === 'overview' && (
          <>
            <GuidedTourWizard language={language} setCurrentTab={setCurrentTab} />
            <HeroSection language={language} setCurrentTab={setCurrentTab} />
          </>
        )}
        {currentTab === 'onboard' && (
          <OnboardingPortal language={language} onAddDossier={handleAddDossier} />
        )}
        {currentTab === 'compliance' && (
          <ComplianceDashboard language={language} dossiers={dossiers} onUpdateStatus={handleUpdateStatus} />
        )}
        {currentTab === 'notifications' && (
          <NotificationsCenter language={language} dossiers={dossiers} />
        )}
        {currentTab === 'export' && (
          <CoreBankingExport language={language} dossiers={dossiers} />
        )}
        {currentTab === 'pricing' && (
          <PricingCalculator language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} />

    </div>
  );
}

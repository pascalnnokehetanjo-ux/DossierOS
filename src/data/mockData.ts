import { Dossier } from '../types';

export const initialDossiers: Dossier[] = [
  {
    id: 'dos-001',
    referenceNo: 'CAM-IND-2026-9812',
    applicantName: 'Jean-Pierre Mballa',
    accountType: 'individual',
    submissionDate: '2026-10-16 09:42',
    branch: 'Yaoundé Central Branch #04',
    status: 'pending_review',
    riskLevel: 'low',
    riskReasons: ['Valid CNI biometric scan', 'Clean sanction and PEP screen', 'Matched residential address in Bonamoussadi'],
    completenessScore: 100,
    kycData: {
      fullName: 'Jean-Pierre Mballa',
      dob: '1988-04-12',
      idNumber: '118294821',
      niu: 'M198829481200X',
      address: 'Avenue Kennedy, Quartier Bastos, Yaoundé',
      expiryDate: '2031-06-15',
      gender: 'Male',
      sourceOfFunds: 'Salary - Civil Servant (MINFI)',
      monthlyVolume: '450,000 FCFA'
    },
    documents: [
      {
        id: 'doc-101',
        type: 'cni',
        name: 'National Identity Card (CNI)',
        status: 'verified',
        ocrConfidence: 99.2,
        extractedData: { fullName: 'Jean-Pierre Mballa', idNumber: '118294821', expiryDate: '2031-06-15' }
      },
      {
        id: 'doc-102',
        type: 'niu',
        name: 'NIU Taxpayer Certificate',
        status: 'verified',
        ocrConfidence: 98.5,
        extractedData: { niu: 'M198829481200X' }
      },
      {
        id: 'doc-103',
        type: 'address_proof',
        name: 'ENEO Electricity Bill (Proof of Address)',
        status: 'verified',
        ocrConfidence: 96.8,
        extractedData: { address: 'Avenue Kennedy, Quartier Bastos, Yaoundé' }
      },
      {
        id: 'doc-104',
        type: 'payslip',
        name: 'Recent Payslip (MINFI)',
        status: 'verified',
        ocrConfidence: 97.9,
        extractedData: { sourceOfFunds: 'Salary' }
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-16 09:42', action: 'Dossier Created', actor: 'Client Portal (Web)', details: 'Uploaded 4 required identity documents.' },
      { timestamp: '2026-10-16 09:43', action: 'AI OCR Extraction', actor: 'DossierOS AI Engine', details: 'Extracted CNI, NIU, and utility bill. 0 contradictions found.' }
    ],
    whatsappLog: [
      { timestamp: '2026-10-16 09:43', message: 'Hello Jean-Pierre, your Dossier (CAM-IND-2026-9812) has been received and is undergoing automated compliance review.', status: 'read' }
    ]
  },
  {
    id: 'dos-002',
    referenceNo: 'CAM-BUS-2026-4402',
    applicantName: 'SARL Kribi Logistics & Port Services',
    accountType: 'business',
    submissionDate: '2026-10-16 08:15',
    branch: 'Douala Port Business Center',
    status: 'missing_info',
    riskLevel: 'medium',
    riskReasons: ['Beneficial owner UBO document pending', 'Cross-border import activities declared'],
    completenessScore: 75,
    kycData: {
      fullName: 'Marie-Claire Ngono (Managing Director)',
      dob: '1979-11-20',
      idNumber: '109283742',
      niu: 'M097928374112Y',
      address: 'Boulevard de la Liberté, Akwa, Douala',
      expiryDate: '2029-01-10',
      gender: 'Female',
      businessName: 'SARL Kribi Logistics & Port Services',
      rccmNumber: 'RC/DLA/2021/B/1429',
      directors: ['Marie-Claire Ngono', 'Hans Dieter Weber'],
      beneficialOwners: ['Marie-Claire Ngono (70%)'],
      sourceOfFunds: 'Maritime Logistics & Freight Forwarding',
      monthlyVolume: '15,000,000 FCFA'
    },
    documents: [
      {
        id: 'doc-201',
        type: 'rccm',
        name: 'RCCM Business Registration (Trade Register)',
        status: 'verified',
        ocrConfidence: 98.9,
        extractedData: { businessName: 'SARL Kribi Logistics', rccmNumber: 'RC/DLA/2021/B/1429' }
      },
      {
        id: 'doc-202',
        type: 'statutes',
        name: 'Company Statutes & Bylaws',
        status: 'verified',
        ocrConfidence: 95.1,
        extractedData: { directors: ['Marie-Claire Ngono', 'Hans Dieter Weber'] }
      },
      {
        id: 'doc-203',
        type: 'niu',
        name: 'Company Taxpayer NIU Card',
        status: 'verified',
        ocrConfidence: 99.0,
        extractedData: { niu: 'M097928374112Y' }
      },
      {
        id: 'doc-204',
        type: 'cni',
        name: 'Director CNI (Marie-Claire Ngono)',
        status: 'flagged',
        ocrConfidence: 88.4,
        extractedData: { fullName: 'Marie-Claire Ngona' },
        issues: ['Minor spelling variance detected between CNI ("Ngona") and RCCM statutes ("Ngono"). Compliance sign-off required.']
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-16 08:15', action: 'KYB Dossier Submitted', actor: 'Agent Portal', details: 'Corporate account file initiated for Douala Branch.' },
      { timestamp: '2026-10-16 08:16', action: 'AI OCR & Contradiction Flag', actor: 'DossierOS AI Engine', details: 'Detected name spelling variance between Director CNI and Company Statutes.' }
    ],
    whatsappLog: [
      { timestamp: '2026-10-16 08:16', message: 'Hello Marie-Claire, your business dossier (CAM-BUS-2026-4402) requires clarification on Director name spelling in CNI vs Statutes.', status: 'delivered' }
    ]
  },
  {
    id: 'dos-003',
    referenceNo: 'CAM-LOAN-2026-1109',
    applicantName: 'Ibrahim Sani',
    accountType: 'loan',
    submissionDate: '2026-10-15 16:30',
    branch: 'Maroua Regional MFI Branch',
    status: 'approved',
    riskLevel: 'low',
    riskReasons: ['Agri-SME cooperative member with 3-year clean repayment history', 'Collateral land title verified'],
    completenessScore: 100,
    kycData: {
      fullName: 'Ibrahim Sani',
      dob: '1992-09-03',
      idNumber: '124958201',
      niu: 'M199249582011Z',
      address: 'Quarter Kakataré, Maroua',
      expiryDate: '2030-11-20',
      gender: 'Male',
      sourceOfFunds: 'Cotton & Onion Agro-Trade',
      monthlyVolume: '1,200,000 FCFA'
    },
    documents: [
      {
        id: 'doc-301',
        type: 'cni',
        name: 'National Identity Card (CNI)',
        status: 'verified',
        ocrConfidence: 99.6,
        extractedData: { fullName: 'Ibrahim Sani', idNumber: '124958201' }
      },
      {
        id: 'doc-302',
        type: 'niu',
        name: 'NIU Taxpayer Card',
        status: 'verified',
        ocrConfidence: 99.1,
        extractedData: { niu: 'M199249582011Z' }
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-15 16:30', action: 'Loan Dossier Created', actor: 'Maroua MFI Agent', details: 'Agri-SME seasonal loan file uploaded.' },
      { timestamp: '2026-10-15 17:00', action: 'Compliance Approved', actor: 'Haman Souleyman (Risk Head)', details: 'Approved loan dossier after credit committee review.' }
    ],
    whatsappLog: [
      { timestamp: '2026-10-15 17:01', message: 'M. Ibrahim Sani, votre dossier de crédit (CAM-LOAN-2026-1109) a été approuvé. Veuillez passer à l’agence de Maroua pour décaisser.', status: 'read' }
    ]
  },
  {
    id: 'dos-004',
    referenceNo: 'CAM-AGT-2026-5521',
    applicantName: 'Express Mobile Pay SARL (Agent Node)',
    accountType: 'agent',
    submissionDate: '2026-10-15 14:10',
    branch: 'Bafoussam Commercial Hub',
    status: 'biometric_pending',
    riskLevel: 'medium',
    riskReasons: ['High cash liquidity float agent', 'Storefront GPS coordinates require physical inspection'],
    completenessScore: 90,
    kycData: {
      fullName: 'Patrice Tientcheu',
      dob: '1984-02-18',
      idNumber: '105829104',
      niu: 'M198458291041W',
      address: 'Carrefour Commercial, Bafoussam',
      expiryDate: '2028-08-14',
      gender: 'Male',
      businessName: 'Express Mobile Pay Kiosk',
      rccmNumber: 'RC/BFM/2023/A/091',
      sourceOfFunds: 'Mobile Money Cash In / Cash Out Agency',
      monthlyVolume: '25,000,000 FCFA'
    },
    documents: [
      {
        id: 'doc-401',
        type: 'cni',
        name: 'Agent CNI',
        status: 'verified',
        ocrConfidence: 98.7,
        extractedData: { fullName: 'Patrice Tientcheu' }
      },
      {
        id: 'doc-402',
        type: 'rccm',
        name: 'Commercial License & Patent',
        status: 'verified',
        ocrConfidence: 97.4,
        extractedData: { rccmNumber: 'RC/BFM/2023/A/091' }
      }
    ],
    auditTrail: [
      { timestamp: '2026-10-15 14:10', action: 'Agent Application Submitted', actor: 'Bafoussam Agent Desk', details: 'Mobile money float agent onboarding started.' }
    ],
    whatsappLog: [
      { timestamp: '2026-10-15 14:12', message: 'Biyan kuɗi da aka gabatar. Visit Bafoussam Hub for biometric fingerprinting & agent terminal handover.', status: 'read' }
    ]
  }
];

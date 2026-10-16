export type Language = 'en' | 'fr' | 'ha';
export type Theme = 'light' | 'dark';

export type AccountType = 'individual' | 'business' | 'loan' | 'agent';

export type RiskLevel = 'low' | 'medium' | 'high';

export type DossierStatus = 'pending_review' | 'missing_info' | 'approved' | 'rejected' | 'biometric_pending';

export interface KYCData {
  fullName: string;
  dob: string;
  idNumber: string;
  niu: string;
  address: string;
  expiryDate: string;
  gender: string;
  businessName?: string;
  rccmNumber?: string;
  directors?: string[];
  beneficialOwners?: string[];
  sourceOfFunds?: string;
  monthlyVolume?: string;
}

export interface DocumentItem {
  id: string;
  type: 'cni' | 'niu' | 'address_proof' | 'payslip' | 'rccm' | 'statutes' | 'photo';
  name: string;
  status: 'verified' | 'flagged' | 'pending';
  ocrConfidence: number;
  extractedData: Partial<KYCData>;
  fileUrl?: string;
  issues?: string[];
}

export interface Dossier {
  id: string;
  referenceNo: string;
  applicantName: string;
  accountType: AccountType;
  submissionDate: string;
  branch: string;
  status: DossierStatus;
  riskLevel: RiskLevel;
  riskReasons: string[];
  completenessScore: number; // 0 to 100
  kycData: KYCData;
  documents: DocumentItem[];
  auditTrail: {
    timestamp: string;
    action: string;
    actor: string;
    details: string;
  }[];
  whatsappLog: {
    timestamp: string;
    message: string;
    status: 'delivered' | 'read' | 'failed';
  }[];
}

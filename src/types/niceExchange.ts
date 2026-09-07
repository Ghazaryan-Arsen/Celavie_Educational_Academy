export interface NiceExchangeFormData {
  firstName: string;
  lastName: string;
  age: string;
  school: string;
  email: string;
  phone: string;
  country: string;
  currentLanguageLevel: string;
  motivationEssay: string;
  parentName: string;
  parentPhone: string;
  acceptedTerms: boolean;
}

export type NiceExchangeApplicationInsert = {
  first_name: string;
  last_name: string;
  age: number;
  school: string;
  email: string;
  phone: string;
  country: string;
  language_level: string;
  motivation_essay: string;
  parent_name: string | null;
  parent_phone: string;
  terms_accepted: boolean;
  status: 'pending';
}

export type NiceExchangeApplicationStatus = 'pending' | 'approved' | 'rejected';

export type NiceExchangeApplicationRow = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  school: string;
  email: string;
  phone: string;
  country: string;
  language_level: string;
  motivation_essay: string;
  parent_name: string | null;
  parent_phone: string;
  status: NiceExchangeApplicationStatus;
  created_at: string;
}

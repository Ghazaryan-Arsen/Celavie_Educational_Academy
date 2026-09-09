import type { NiceExchangeFormData } from './niceExchange';

/**
 * Registration service types for Make.com webhook integration
 */

/**
 * Form data structure for registration submissions
 * Includes fields common to all registration types
 */
export interface RegistrationFormData {
  fullName: string;
  phone: string;
  email: string;
  language?: string;
  level?: string;
  smmProgram?: string; // e.g., "smm-starter", "smm-pro", "smm-expert"
  message?: string; // Optional message or notes
}

/**
 * Data payload for registration submissions
 */
export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  language?: string;
  level?: string;
  smmProgram?: string;
  message?: string;
}

/**
 * Complete payload structure for Make.com webhook
 * Matches target architecture specification
 */
export type NiceRegistrationData = Omit<NiceExchangeFormData, 'age'> & { age: number };

export type RegistrationSubmission =
  | [registrationType: 'smm' | 'language', formData: RegistrationFormData]
  | [registrationType: 'nice', formData: NiceExchangeFormData];

export type RegistrationPayload = {
  registrationId: string;
  submittedAt: string;
} & (
  | { registrationType: 'smm' | 'language'; data: RegistrationData }
  | { registrationType: 'nice'; data: NiceRegistrationData }
);

/**
 * Response structure from Make.com webhook
 * (Can be customized based on actual webhook response)
 */
export interface RegistrationResponse {
  success: boolean;
  message?: string;
  registrationId?: string;
  [key: string]: unknown; // Allow for additional webhook-specific fields
}

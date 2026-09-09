import { parseAge } from './validation';
import type { RegistrationPayload, RegistrationSubmission, RegistrationResponse } from '../types/registration';

/**
 * Generate a unique client-side registration ID using crypto.randomUUID()
 * Fallback to timestamp-based ID if crypto is unavailable
 */
export const generateRegistrationId = (): string => {
  try {
    return crypto.randomUUID();
  } catch {
    // Fallback for environments without crypto support
    return `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

/**
 * Build the registration payload for Make.com webhook
 */
export const buildRegistrationPayload = (
  ...[registrationType, formData]: RegistrationSubmission
): RegistrationPayload => {
  const registrationId = generateRegistrationId();
  const submittedAt = new Date().toISOString();

  if (registrationType === 'nice') {
    const age = parseAge(formData.age);
    if (age === null) throw new Error('Age must be numeric');

    return {
      registrationType,
      registrationId,
      submittedAt,
      data: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age,
        school: formData.school.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        currentLanguageLevel: formData.currentLanguageLevel,
        motivationEssay: formData.motivationEssay.trim(),
        parentName: formData.parentName.trim(),
        parentPhone: formData.parentPhone.trim(),
        acceptedTerms: formData.acceptedTerms,
      },
    };
  }


  return {
    registrationType,
    registrationId,
    submittedAt,
    data: {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      ...(formData.smmProgram && { smmProgram: formData.smmProgram }),
      ...(formData.language && { language: formData.language }),
      ...(formData.level && { level: formData.level }),
      message: formData.message ?? '',
    },
  };
};

/**
 * Submit registration to Make.com webhook
 * 
 * @param payload - Registration payload with form data
 * @param timeoutMs - Request timeout in milliseconds (default: 15000)
 * @returns Response from webhook
 * @throws Error if webhook URL not configured or request fails
 */
export const submitRegistrationToWebhook = async (
  payload: RegistrationPayload,
  timeoutMs: number = 15000
): Promise<RegistrationResponse> => {
  const webhookUrl = import.meta.env.VITE_MAKE_REGISTRATION_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error(
      'Make.com webhook URL is not configured. Please set VITE_MAKE_REGISTRATION_WEBHOOK_URL in your environment variables.'
    );
  }

  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const fetchPromise = fetch(webhookUrl, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const timeoutPromise = new Promise<Response>((_, reject) => {
      timeoutId = setTimeout(
        () => {
          reject(new Error(`Registration submission timed out after ${timeoutMs}ms`));
          controller.abort();
        },
        timeoutMs
      );
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(
        `Webhook request failed with status ${response.status}: ${response.statusText}`
      );
    }

    return { success: true, registrationId: payload.registrationId };
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
};

/**
 * Complete registration submission: build payload and send to webhook
 * 
 * @param registrationType - Type of registration (smm, language, nice)
 * @param formData - Cleaned and validated form data
 * @returns Webhook response
 * @throws Error with user-friendly message on failure
 */
export const submitRegistration = async (
  ...submission: RegistrationSubmission
): Promise<RegistrationResponse> => {
  const payload = buildRegistrationPayload(...submission);
  return submitRegistrationToWebhook(payload);
};

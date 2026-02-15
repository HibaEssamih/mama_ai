/**
 * Phone Number Utilities
 * Centralized phone number handling for WhatsApp integration
 * 
 * DESIGN DECISIONS:
 * - Store in DB: E.164 format WITH + (e.g., +212612345678)
 * - Send to WhatsApp API: E.164 WITHOUT + (e.g., 212612345678)
 * - Display to users: Formatted with spaces (e.g., +212 612 345 678)
 */

/**
 * Normalize phone number to E.164 format with +
 * This is the canonical storage format
 * 
 * @param phone - Raw phone number (may include spaces, dashes, etc.)
 * @param countryCode - Optional country code (e.g., "+212")
 * @returns E.164 formatted phone with + (e.g., "+212612345678")
 * 
 * @example
 * normalizePhone("612345678", "+212") // "+212612345678"
 * normalizePhone("+212 612 345 678") // "+212612345678"
 * normalizePhone("212612345678") // "+212612345678"
 */
export function normalizePhone(phone: string, countryCode?: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, "");
  
  // If country code provided separately, combine them
  if (countryCode) {
    const code = countryCode.replace(/[^\d+]/g, "");
    const number = cleaned.replace(/^\+/, ""); // Remove + from phone if exists
    cleaned = `${code}${number}`;
  }
  
  // Ensure it starts with +
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

/**
 * Format phone number for WhatsApp API (digits only, no +)
 * 
 * @param phone - Phone number in any format
 * @returns Digits-only format (e.g., "212612345678")
 * 
 * @example
 * formatForWhatsApp("+212 612 345 678") // "212612345678"
 */
export function formatForWhatsApp(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Format phone number for display (human-readable)
 * 
 * @param phone - Phone number in E.164 format
 * @returns Formatted display string
 * 
 * @example
 * formatForDisplay("+212612345678") // "+212 612 345 678"
 * formatForDisplay("+254700000001") // "+254 700 000 001"
 */
export function formatForDisplay(phone: string): string {
  const normalized = normalizePhone(phone);
  
  // Morocco (+212): +212 6XX XXX XXX
  if (normalized.startsWith("+212")) {
    const match = normalized.match(/^\+(\d{3})(\d{1})(\d{2})(\d{3})(\d{3})$/);
    if (match) {
      return `+${match[1]} ${match[2]}${match[3]} ${match[4]} ${match[5]}`;
    }
  }
  
  // Kenya (+254): +254 7XX XXX XXX
  if (normalized.startsWith("+254")) {
    const match = normalized.match(/^\+(\d{3})(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
  }
  
  // US (+1): +1 (XXX) XXX-XXXX
  if (normalized.startsWith("+1")) {
    const match = normalized.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  
  // Generic fallback: +XXX XXX XXX XXX
  const digits = normalized.slice(1); // Remove +
  const groups = digits.match(/.{1,3}/g) || [];
  return `+${groups.join(" ")}`;
}

/**
 * Validate E.164 phone number format
 * 
 * @param phone - Phone number to validate
 * @returns true if valid E.164 format
 * 
 * @example
 * isValidPhone("+212612345678") // true
 * isValidPhone("612345678") // false (missing +)
 * isValidPhone("+212 612 345 678") // false (has spaces)
 */
export function isValidE164(phone: string): boolean {
  // E.164: + followed by 1-15 digits
  return /^\+[1-9]\d{1,14}$/.test(phone);
}

/**
 * Validate phone number with relaxed rules (before normalization)
 * 
 * @param phone - Raw phone input
 * @param countryCode - Optional country code
 * @returns true if phone appears valid
 */
export function isValidPhoneInput(phone: string, countryCode?: string): boolean {
  const normalized = normalizePhone(phone, countryCode);
  return isValidE164(normalized);
}

/**
 * Extract country code from E.164 phone number
 * 
 * @param phone - Phone in E.164 format
 * @returns Country code (e.g., "+212") or null
 */
export function extractCountryCode(phone: string): string | null {
  const match = phone.match(/^\+(\d{1,3})/);
  return match ? `+${match[1]}` : null;
}

/**
 * Common country codes for African maternal health markets
 */
export const COUNTRY_CODES = [
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+1", name: "USA/Canada", flag: "🇺🇸" },
] as const;

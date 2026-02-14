/**
 * Common type definitions for the MamaGuard application
 */

export interface Patient {
  id: string;
  name: string;
  age: number;
  gestationalWeek: number;
  phone: string;
  location: string;
  riskLevel: "low" | "medium" | "high";
  lastCheckIn?: Date;
}

export interface VitalSign {
  id: string;
  patientId: string;
  timestamp: Date;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature?: number;
  symptoms?: string[];
}

export interface Alert {
  id: string;
  patientId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar?: string;
}

export interface CTAFormData {
  clinicName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

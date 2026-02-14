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
  riskLevel: "low" | "medium" | "high" | "critical";
  lastCheckIn?: Date;
  avatarUrl?: string;
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

// Dashboard Types
export type PatientRiskLevel = "critical" | "warning" | "stable" | "normal";

export interface DashboardPatient {
  id: string;
  name: string;
  patientId: string;
  gestationalWeek: number;
  avatarUrl: string;
  riskLevel: PatientRiskLevel;
  lastUpdate: string; // e.g., "2m ago"
  alert: {
    type: "High Risk" | "Moderate" | "Monitor";
    category: string; // e.g., "BP Spike", "Movement Anomaly"
    message: string;
  };
  metrics: {
    label: string;
    value: string | number;
    trend: "up" | "down" | "stable";
  }[];
  trendData?: number[]; // For chart
}

export interface DashboardStats {
  critical: number;
  warning: number;
  stable: number;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
}

// Patient Profile Types
export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  riskLevel: "high" | "medium" | "low";
  gestationalWeek: number;
  trimester: number;
  bloodType: string;
  patientId: string;
  nextCheckup: string;
  assignedDoctor: string;
}

export interface VitalSign {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  note?: string;
  progress?: number; // 0-100 for progress bars
}

export interface ClinicalHistoryItem {
  id: string;
  date: string;
  description: string;
}

export interface VoiceMessage {
  id: string;
  timestamp: string;
  transcript: string;
  audioUrl?: string;
  duration: string;
  tags: string[];
  priority: "high" | "medium" | "low";
  highlightedTerms?: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  initials: string;
  phone?: string;
}

export interface RiskTrendData {
  date: string;
  riskScore: number; // 0-100
}

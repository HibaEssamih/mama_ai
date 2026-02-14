import type { PatientManagementCard } from "@/types";

export const mockPatientManagementData: PatientManagementCard[] = [
  {
    id: "1",
    patientId: "MG-891",
    name: "Sarah Jenkins",
    age: 28,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "high-risk",
    gestationalWeek: 34,
    trimester: 3,
    aiAnalysis: "Preeclampsia history detected. BP check overdue by 2 days. Recommend immediate follow-up.",
    assignedCareTeam: [
      { initials: "AS", name: "Dr. A. Smith" },
      { initials: "NJ", name: "Nurse Joy" }
    ],
    progressPercent: 85
  },
  {
    id: "2",
    patientId: "MG-902",
    name: "Maria Rodriguez",
    age: 31,
    initials: "MR",
    avatarColor: "indigo",
    status: "stable",
    gestationalWeek: 12,
    trimester: 1,
    aiAnalysis: "Vitals consistent. Nutrition plan adherence high (95%). Routine check recommended.",
    assignedCareTeam: [
      { initials: "BJ", name: "Dr. B. Johnson" }
    ],
    progressPercent: 30
  },
  {
    id: "3",
    patientId: "MG-774",
    name: "Emily Chen",
    age: 34,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "monitor",
    gestationalWeek: 28,
    trimester: 2,
    aiAnalysis: "Gestational diabetes indicators. Diet adjustment phase. Weekly log required.",
    assignedCareTeam: [
      { initials: "AS", name: "Dr. A. Smith" }
    ],
    progressPercent: 70
  },
  {
    id: "4",
    patientId: "MG-888",
    name: "Lara Peterson",
    age: 24,
    initials: "LP",
    avatarColor: "purple",
    status: "stable",
    gestationalWeek: 8,
    trimester: 1,
    aiAnalysis: "First pregnancy. Low risk factors. Ultrasound scheduled for next week.",
    assignedCareTeam: [
      { initials: "KW", name: "Dr. K. Wilson" }
    ],
    progressPercent: 20
  },
  {
    id: "5",
    patientId: "MG-915",
    name: "Fatima Al-Sayed",
    age: 29,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    status: "due-soon",
    gestationalWeek: 41,
    trimester: "overdue",
    aiAnalysis: "Past due date (41 weeks). Induction planned for Tuesday. Monitor fetal movement.",
    assignedCareTeam: [
      { initials: "BJ", name: "Dr. B. Johnson" }
    ],
    progressPercent: 100
  },
  {
    id: "6",
    patientId: "MG-930",
    name: "Jane Doe",
    age: 30,
    initials: "JD",
    avatarColor: "pink",
    status: "stable",
    gestationalWeek: 16,
    trimester: 2,
    aiAnalysis: "Returning patient. Second child. Standard progression detected.",
    assignedCareTeam: [
      { initials: "KW", name: "Dr. K. Wilson" }
    ],
    progressPercent: 40
  }
];

export const patientManagementStats = {
  complianceRate: 98.4,
  highRiskAlerts: 12,
  checkupsToday: 8,
  totalPatients: 1248
};

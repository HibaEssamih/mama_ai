import type { DashboardPatient } from "@/types";
import PatientCard from "./PatientCard";

interface PatientListProps {
  patients: DashboardPatient[];
  emptyMessage?: string;
}

export default function PatientList({ 
  patients, 
  emptyMessage = "No patients in this category" 
}: PatientListProps) {
  if (patients.length === 0) {
    return (
      <div 
        className="bg-white rounded-lg border border-slate-200 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <span 
          className="material-symbols-outlined text-slate-300 text-5xl mb-3 block"
          aria-hidden="true"
        >
          health_and_safety
        </span>
        <p className="text-slate-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 gap-4"
      role="list"
      aria-label="Patient list"
    >
      {patients.map((patient) => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
        />
      ))}
    </div>
  );
}

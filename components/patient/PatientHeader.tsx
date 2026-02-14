import Image from "next/image";
import type { PatientProfile } from "@/types";

interface PatientHeaderProps {
  patient: PatientProfile;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  const riskColors = {
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-green-50 text-green-700 border-green-200"
  };

  const riskIndicators = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500"
  };

  return (
    <header className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          <div className="relative shrink-0">
            <Image
              src={patient.avatarUrl}
              alt={`Portrait of ${patient.name}`}
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-slate-50 shadow-sm"
            />
            <span 
              className={`absolute bottom-0 right-0 w-5 h-5 ${riskIndicators[patient.riskLevel]} border-2 border-white rounded-full`}
              role="status"
              aria-label={`${patient.riskLevel} risk level`}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {patient.name}
              </h1>
              <span 
                className={`px-2.5 py-0.5 rounded-full ${riskColors[patient.riskLevel]} text-xs font-bold uppercase tracking-wide border`}
                role="status"
              >
                {patient.riskLevel} Risk
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  cake
                </span>
                <span>{patient.age} Years</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  child_care
                </span>
                <span>Week {patient.gestationalWeek} (Trimester {patient.trimester})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  bloodtype
                </span>
                <span>Blood Type: {patient.bloodType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  pin_drop
                </span>
                <span>ID: #{patient.patientId}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs text-slate-400 uppercase font-medium mb-1">
              Next Checkup
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {patient.nextCheckup}
            </p>
          </div>
          <div className="text-right hidden md:block pl-6 border-l border-slate-100">
            <p className="text-xs text-slate-400 uppercase font-medium mb-1">
              Assigned Doctor
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {patient.assignedDoctor}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

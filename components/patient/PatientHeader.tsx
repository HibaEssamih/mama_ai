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
    <header className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-start md:items-center gap-3 sm:gap-5">
          <div className="relative shrink-0">
            <Image
              src={patient.avatarUrl}
              alt={`Portrait of ${patient.name}`}
              width={80}
              height={80}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 sm:border-4 border-slate-50 shadow-sm"
            />
            <span 
              className={`absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 ${riskIndicators[patient.riskLevel]} border-2 border-white rounded-full`}
              role="status"
              aria-label={`${patient.riskLevel} risk level indicator`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                {patient.name}
              </h1>
              <span 
                className={`px-2 sm:px-2.5 py-0.5 rounded-full ${riskColors[patient.riskLevel]} text-[10px] sm:text-xs font-bold uppercase tracking-wide border whitespace-nowrap`}
                role="status"
                aria-label={`Patient risk level: ${patient.riskLevel}`}
              >
                {patient.riskLevel} Risk
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  cake
                </span>
                <span>{patient.age} Years</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  child_care
                </span>
                <span className="whitespace-nowrap">Week {patient.gestationalWeek} (T{patient.trimester})</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  bloodtype
                </span>
                <span className="whitespace-nowrap">Type: {patient.bloodType}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  pin_drop
                </span>
                <span className="whitespace-nowrap">ID: #{patient.patientId}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm w-full md:w-auto">
          <div className="flex-1 md:flex-none md:text-right">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-medium mb-0.5 sm:mb-1">
              Next Checkup
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
              {patient.nextCheckup}
            </p>
          </div>
          <div className="flex-1 md:flex-none md:text-right md:pl-4 lg:pl-6 md:border-l border-slate-100">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-medium mb-0.5 sm:mb-1">
              Assigned Doctor
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
              {patient.assignedDoctor}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

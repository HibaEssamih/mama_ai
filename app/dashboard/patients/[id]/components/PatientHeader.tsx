"use client";

import Image from "next/image";
import Link from "next/link";
import type { Patient } from "@/types";

interface PatientHeaderProps {
  patient: Patient;
  onEditClick: () => void;
  onEmergencyClick: () => void;
  formatDate: (date: string | null) => string;
}

export function PatientHeader({ patient, onEditClick, onEmergencyClick, formatDate }: PatientHeaderProps) {
  const displayName = patient.full_name ?? patient.name ?? "—";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.id)}`;

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Back button + Patient Identity */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/patients"
              className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={avatarUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-white shadow-md"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                    patient.risk_level === "critical" ? "bg-red-500 animate-pulse" :
                    patient.risk_level === "high" ? "bg-orange-500" :
                    patient.risk_level === "medium" ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{displayName}</h1>
                <div className="flex items-center gap-3 text-sm text-slate-600 mt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Week {patient.gestational_week ?? "—"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">water_drop</span>
                    {patient.blood_type ?? "Not set"}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    Due {formatDate(patient.due_date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEditClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Edit Details
            </button>
            {patient.phone_number && (
              <a
                href={`tel:${patient.phone_number}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Patient
              </a>
            )}
            <button
              type="button"
              onClick={onEmergencyClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              Emergency
            </button>
          </div>
        </div>
        
        {/* Risk Alert Banner - Only show for high/critical */}
        {(patient.risk_level === "critical" || patient.risk_level === "high") && (
          <div className={`mb-4 p-3 rounded-lg border-l-4 ${
            patient.risk_level === "critical" 
              ? "bg-red-50 border-red-500" 
              : "bg-orange-50 border-orange-500"
          }`}>
            <div className="flex items-start gap-3">
              <span className={`material-symbols-outlined ${
                patient.risk_level === "critical" ? "text-red-600" : "text-orange-600"
              }`}>
                warning
              </span>
              <div className="flex-1">
                <h3 className={`text-sm font-bold ${
                  patient.risk_level === "critical" ? "text-red-900" : "text-orange-900"
                }`}>
                  {patient.risk_level === "critical" ? "Critical Risk Patient" : "High Risk Patient"}
                </h3>
                <p className={`text-sm mt-0.5 ${
                  patient.risk_level === "critical" ? "text-red-800" : "text-orange-800"
                }`}>
                  {patient.medical_history?.notes || "Requires close monitoring and immediate attention to any concerning symptoms."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import type { Patient } from "@/types";

interface ClinicalSidebarProps {
  patient: Patient;
  onEmergencyClick: () => void;
  formatDate: (date: string | null) => string;
}

export function ClinicalSidebar({ patient, onEmergencyClick, formatDate }: ClinicalSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6 overflow-y-auto">
      {/* Clinical Intelligence Card */}
      <section className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-2xl">psychology</span>
          <h2 className="text-lg font-bold">AI Clinical Summary</h2>
        </div>
        <p className="text-teal-50 leading-relaxed text-sm">
          {patient.medical_history?.clinical_resume?.trim()
            ? patient.medical_history.clinical_resume
            : "AI analysis will appear here as the patient provides health updates through daily check-ins."}
        </p>
        <div className="mt-4 pt-4 border-t border-teal-400/30 flex items-center justify-between">
          <span className="text-xs text-teal-100 uppercase tracking-wider font-medium">Risk Level</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            patient.risk_level === "critical" ? "bg-red-500 text-white" :
            patient.risk_level === "high" ? "bg-orange-500 text-white" :
            patient.risk_level === "medium" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"
          }`}>
            {patient.risk_level || "Low"}
          </span>
        </div>
      </section>

      {/* Clinical Vitals Card */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-600 text-xl">medical_services</span>
            Clinical Information
          </h2>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gestational Week</p>
              <p className="text-2xl font-bold text-slate-900">{patient.gestational_week ?? "—"}</p>
              <p className="text-xs text-slate-500">of 40 weeks</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blood Type</p>
              <p className="text-2xl font-bold text-slate-900">{patient.blood_type ?? "—"}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Due Date</p>
            <p className="text-lg font-semibold text-slate-900">{formatDate(patient.due_date)}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Allergies</p>
            <p className="text-sm text-slate-700">{patient.allergies || "None recorded"}</p>
          </div>
        </div>
      </section>

      {/* Emergency Contact Card */}
      <section className="bg-white rounded-2xl border-2 border-red-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-red-50 border-b border-red-100">
          <h2 className="text-sm font-bold text-red-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-xl">emergency</span>
            Emergency Contact
          </h2>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Name</p>
            <p className="font-semibold text-slate-900">{patient.emergency_contact_name ?? "Not set"}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
            {patient.emergency_contact_phone ? (
              <a
                href={`tel:${patient.emergency_contact_phone.replace(/\D/g, "")}`}
                className="font-semibold text-teal-600 hover:text-teal-700 hover:underline inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                {patient.emergency_contact_phone}
              </a>
            ) : (
              <p className="text-slate-500">Not set</p>
            )}
          </div>
          <button
            type="button"
            onClick={onEmergencyClick}
            className="w-full mt-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">emergency</span>
            Trigger Emergency Alert
          </button>
        </div>
      </section>
    </div>
  );
}

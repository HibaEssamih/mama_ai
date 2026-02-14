"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockPatientManagementData, patientManagementStats } from "@/lib/mockPatientManagement";
import type { PatientManagementCard } from "@/types";

export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePatientClick = (patientId: string) => {
    router.push(`/dashboard/patients/${patientId}`);
  };

  const handleNewPatient = () => {
    alert("New patient registration flow coming soon!");
  };

  const getStatusStyles = (status: PatientManagementCard["status"]) => {
    switch (status) {
      case "high-risk":
        return {
          badge: "bg-red-50 text-red-600 border-red-200",
          card: "border-red-200 hover:border-red-300",
          analysis: "bg-red-50 border-red-100",
          bar: "bg-red-500",
          dot: true
        };
      case "due-soon":
        return {
          badge: "bg-red-50 text-red-600 border-red-200",
          card: "border-red-200 hover:border-red-300",
          analysis: "bg-red-50 border-red-100",
          bar: "bg-gradient-to-r from-teal-500 to-red-500",
          dot: true
        };
      case "monitor":
        return {
          badge: "bg-amber-50 text-amber-600 border-amber-200",
          card: "border-slate-200 hover:border-teal-300",
          analysis: "bg-amber-50 border-amber-100",
          bar: "bg-teal-500",
          dot: false
        };
      case "stable":
        return {
          badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
          card: "border-slate-200 hover:border-teal-300",
          analysis: "bg-slate-50 border-slate-100",
          bar: "bg-teal-400",
          dot: false
        };
    }
  };

  const getStatusLabel = (status: PatientManagementCard["status"]) => {
    switch (status) {
      case "high-risk": return "High Risk";
      case "due-soon": return "Due Soon";
      case "monitor": return "Monitor";
      case "stable": return "Stable";
    }
  };

  const getTrimesterLabel = (trimester: PatientManagementCard["trimester"]) => {
    if (trimester === "overdue") return "Overdue";
    return `${trimester}${trimester === 1 ? "st" : trimester === 2 ? "nd" : "rd"} Trimester`;
  };

  const avatarColors = {
    indigo: "bg-indigo-50 text-indigo-500 border-indigo-100",
    purple: "bg-purple-50 text-purple-500 border-purple-100",
    pink: "bg-pink-50 text-pink-500 border-pink-100",
    blue: "bg-blue-50 text-blue-500 border-blue-100",
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Stats Bar */}
      <div className="bg-white border-b border-slate-200 py-2 px-6 lg:px-10 flex items-center justify-center sm:justify-start gap-6 text-[11px] font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-teal-500" aria-hidden="true">
            check_circle
          </span>
          <span><strong className="text-slate-700">{patientManagementStats.complianceRate}%</strong> Compliance Rate</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-red-500" aria-hidden="true">
            monitor_heart
          </span>
          <span><strong className="text-slate-700">{patientManagementStats.highRiskAlerts}</strong> High Risk Alerts</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-blue-500" aria-hidden="true">
            calendar_today
          </span>
          <span><strong className="text-slate-700">{patientManagementStats.checkupsToday}</strong> Check-ups Today</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-teal-600 font-semibold">System Operational</span>
        </div>
      </div>

      {/* Search Header - Sticky */}
      <div className="sticky top-0 z-40 px-6 lg:px-10 py-6 pointer-events-none">
        <div className="max-w-[1600px] mx-auto pointer-events-auto">
          <div className="glass-panel rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between shadow-sm gap-3">
            <div className="relative flex-1 w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-teal-500 transition-colors text-[20px]" aria-hidden="true">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 bg-white/60 border-0 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/30 focus:bg-white transition-all shadow-inner cursor-text"
                placeholder="Search patients, risk factors, or ask AI..."
                aria-label="Search patients"
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto px-1">
              <button
                onClick={handleNewPatient}
                className="ml-1 inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-md shadow-teal-500/20 text-sm font-medium rounded-xl text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 transition-all transform active:scale-95 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] mr-2" aria-hidden="true">
                  person_add
                </span>
                New Patient
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 -mt-2">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPatientManagementData.map((patient) => {
              const styles = getStatusStyles(patient.status);
              
              return (
                <article
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className={`group relative bg-white rounded-xl p-5 border ${styles.card} shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePatientClick(patient.id);
                    }
                  }}
                  aria-label={`View ${patient.name}'s profile`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${styles.badge}`}>
                        {getStatusLabel(patient.status)}
                      </span>
                      {styles.dot && (
                        <div className="h-2 w-2 rounded-full bg-red-500 pulse-dot"></div>
                      )}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3.5 mb-5 mt-1">
                    {patient.avatarUrl ? (
                      <img
                        src={patient.avatarUrl}
                        alt={`${patient.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border shadow-sm ${
                        avatarColors[patient.avatarColor as keyof typeof avatarColors] || avatarColors.indigo
                      }`}>
                        {patient.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-600 transition-colors">
                        {patient.name}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-400">
                        ID: {patient.patientId} • Age {patient.age}
                      </p>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className={`rounded-lg p-3 mb-5 border ${styles.analysis} relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${patient.status === 'high-risk' || patient.status === 'due-soon' ? 'bg-red-400' : patient.status === 'monitor' ? 'bg-amber-400' : 'bg-slate-300'}`}></div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`material-symbols-outlined text-[16px] ${patient.status === 'high-risk' || patient.status === 'due-soon' ? 'text-red-500' : patient.status === 'monitor' ? 'text-amber-500' : 'text-slate-400'}`} aria-hidden="true">
                        smart_toy
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                        AI Analysis
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-600 font-medium">
                      "{patient.aiAnalysis}"
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5 px-1">
                    <div className="flex justify-between text-[11px] mb-2 font-medium">
                      <span className="text-slate-500">Week {patient.gestationalWeek}</span>
                      <span className={`font-semibold ${patient.trimester === 'overdue' ? 'text-red-600' : 'text-teal-600'}`}>
                        {getTrimesterLabel(patient.trimester)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${styles.bar} rounded-full relative transition-all`}
                        style={{ width: `${patient.progressPercent}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Care Team & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex -space-x-1.5">
                      {patient.assignedCareTeam.map((member, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500"
                          title={member.name}
                        >
                          {member.initials}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-1.5 text-slate-400 hover:text-teal-500 hover:bg-slate-50 rounded transition-colors cursor-pointer"
                        title="Message"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Message ${patient.name}`);
                        }}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px] font-light">
                          chat_bubble
                        </span>
                      </button>
                      {(patient.status === 'high-risk' || patient.status === 'due-soon') && (
                        <button
                          className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded shadow-sm transition-all cursor-pointer"
                          title="Alert"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Alert for ${patient.name}`);
                          }}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            warning
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Add New Patient Card */}
            <button
              onClick={handleNewPatient}
              className="group relative rounded-xl p-5 border-2 border-dashed border-slate-200 hover:border-teal-500/50 hover:bg-slate-50 transition-all duration-300 flex flex-col items-center justify-center min-h-[340px] cursor-pointer"
              type="button"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors mb-4">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="text-base font-semibold text-slate-600 group-hover:text-teal-600 transition-colors">
                Register New Patient
              </span>
              <p className="text-xs text-slate-400 text-center mt-2 max-w-[200px]">
                Begin a new maternal care journey intake flow.
              </p>
            </button>
          </div>

          {/* Pagination */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 pb-6">
            <p className="text-sm text-slate-500 mb-4 sm:mb-0">
              Viewing <span className="font-medium text-slate-900">1-{mockPatientManagementData.length}</span> of <span className="font-medium text-slate-900">{patientManagementStats.totalPatients}</span> patients
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                type="button"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-transparent rounded-lg shadow-sm hover:bg-teal-600 active:bg-teal-700 transition-colors cursor-pointer"
                type="button"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FAB for mobile */}
      <button
        onClick={handleNewPatient}
        className="fixed bottom-8 right-8 lg:hidden w-14 h-14 bg-teal-500 text-white rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        type="button"
        aria-label="Add new patient"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}

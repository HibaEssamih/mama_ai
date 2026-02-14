"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mockPatientManagementData, patientManagementStats } from "@/lib/mockPatientManagement";
import { PatientCardImproved } from "@/components/patient/PatientCardImproved";
import type { PatientManagementCard } from "@/types";

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 12;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const filterPatients = (
  patients: PatientManagementCard[],
  query: string,
  showHighRiskOnly: boolean,
  showOverdueOnly: boolean
): PatientManagementCard[] => {
  return patients.filter((patient) => {
    const matchesSearch =
      !query ||
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(query.toLowerCase()) ||
      patient.aiAnalysis.toLowerCase().includes(query.toLowerCase()) ||
      patient.status.toLowerCase().includes(query.toLowerCase());

    const matchesHighRisk =
      !showHighRiskOnly ||
      patient.status === "high-risk" ||
      patient.status === "due-soon";

    const matchesOverdue = !showOverdueOnly || patient.isOverdue;

    return matchesSearch && matchesHighRisk && matchesOverdue;
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showHighRiskOnly, setShowHighRiskOnly] = useState(false);
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Memoized data
  const filteredPatients = useMemo(
    () =>
      filterPatients(
        mockPatientManagementData,
        searchQuery,
        showHighRiskOnly,
        showOverdueOnly
      ),
    [searchQuery, showHighRiskOnly, showOverdueOnly]
  );

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPatients, currentPage]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  const highRiskCount = mockPatientManagementData.filter(
    (p) => p.status === "high-risk" || p.status === "due-soon"
  ).length;

  const overdueCount = mockPatientManagementData.filter((p) => p.isOverdue).length;

  // Event handlers
  const handlePatientClick = useCallback(
    (patientId: string) => {
      router.push(`/dashboard/patients/${patientId}`);
    },
    [router]
  );

  const handleNewPatient = useCallback(() => {
    alert("New patient registration flow coming soon!");
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const toggleHighRiskFilter = useCallback(() => {
    setShowHighRiskOnly((prev) => !prev);
    setShowOverdueOnly(false);
    setCurrentPage(1);
  }, []);

  const toggleOverdueFilter = useCallback(() => {
    setShowOverdueOnly((prev) => !prev);
    setShowHighRiskOnly(false);
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-teal-400 text-[20px] sm:text-[24px]">
                  group
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-white">
                  {patientManagementStats.totalPatients}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  Total Patients
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/20 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-red-400 text-[20px] sm:text-[24px]">
                  warning
                </span>
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-white">
                  {patientManagementStats.highRiskAlerts}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  High Risk Alerts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-sky-400 text-[20px] sm:text-[24px]">
                  event_available
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-white">
                  {patientManagementStats.checkupsToday}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  Checkups Today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-400 text-[20px] sm:text-[24px]">
                  verified
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-white">
                  {patientManagementStats.complianceRate}%
                </p>
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  Compliance Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters - Sticky */}
      <div className="sticky top-0 z-40 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 pointer-events-none">
        <div className="max-w-[1600px] mx-auto pointer-events-auto space-y-3">
          {/* Glass Search Panel */}
          <div className="glass-panel rounded-2xl p-2 flex flex-col md:flex-row items-center justify-between shadow-sm gap-3">
            <div className="relative flex-1 w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-teal-500 transition-colors text-[20px]" aria-hidden="true">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-12 pr-12 py-3 bg-white/60 border-0 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/30 focus:bg-white transition-all shadow-inner cursor-text"
                placeholder="Search patients, ID, or risk factors..."
                aria-label="Search patients"
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded"
                    type="button"
                    aria-label="Clear search"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 rounded border border-slate-200">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleNewPatient}
                className="flex-1 md:flex-none inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-md shadow-teal-500/20 text-sm font-medium rounded-xl text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] mr-2" aria-hidden="true">person_add</span>
                <span>New Patient</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={toggleHighRiskFilter}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                showHighRiskOnly
                  ? 'bg-red-500 text-white border-red-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600'
              }`}
              type="button"
              aria-pressed={showHighRiskOnly}
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>High Risk</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">{highRiskCount}</span>
            </button>
            
            <button
              onClick={toggleOverdueFilter}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                showOverdueOnly
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-600'
              }`}
              type="button"
              aria-pressed={showOverdueOnly}
            >
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>Overdue</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">{overdueCount}</span>
            </button>

            {(showHighRiskOnly || showOverdueOnly) && (
              <button
                onClick={() => {
                  setShowHighRiskOnly(false);
                  setShowOverdueOnly(false);
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
                <span>Clear filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pb-10">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Search Results Info */}
          {(searchQuery || showHighRiskOnly || showOverdueOnly) && (
            <div className="mb-4 text-sm text-slate-600">
              Found <strong className="text-slate-900">{filteredPatients.length}</strong> patient{filteredPatients.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}

          {/* Empty State */}
          {filteredPatients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No patients found</h3>
              <p className="text-sm text-slate-600 mb-6">
                {searchQuery 
                  ? `No results for "${searchQuery}". Try adjusting your search.`
                  : "No patients match the selected filters."}
              </p>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                type="button"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedPatients.map((patient) => (
                <PatientCardImproved
                  key={patient.id}
                  patient={patient}
                  isExpanded={expandedCard === patient.id}
                  onExpand={() => setExpandedCard(expandedCard === patient.id ? null : patient.id)}
                  onPatientClick={handlePatientClick}
                />
              ))}

              {/* Add New Patient Card - Only on first page without filters */}
              {!searchQuery && !showHighRiskOnly && !showOverdueOnly && currentPage === 1 && (
                <button
                  onClick={handleNewPatient}
                  className="group relative rounded-2xl p-8 border-2 border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px] cursor-pointer"
                  type="button"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-teal-100 group-hover:to-teal-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-all mb-4 shadow-lg">
                    <span className="material-symbols-outlined text-4xl">add</span>
                  </div>
                  <span className="text-lg font-bold text-slate-700 group-hover:text-teal-600 transition-colors mb-2">
                    Register New Patient
                  </span>
                  <p className="text-sm text-slate-500 text-center max-w-[220px]">
                    Start a new maternal care journey with AI-powered monitoring
                  </p>
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredPatients.length > 0 && totalPages > 1 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 pb-6">
              <p className="text-sm text-slate-500 mb-4 sm:mb-0">
                Page <span className="font-medium text-slate-900">{currentPage}</span> of <span className="font-medium text-slate-900">{totalPages}</span>
                {" "}• Viewing <span className="font-medium text-slate-900">{paginatedPatients.length}</span> of <span className="font-medium text-slate-900">{filteredPatients.length}</span>
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  type="button"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-500 border border-transparent rounded-lg shadow-sm hover:bg-teal-600 active:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          )}
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

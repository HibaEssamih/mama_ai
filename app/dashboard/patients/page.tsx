"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  mockPatientManagementData,
  patientManagementStats,
} from "@/lib/mockPatientManagement";
import {
  StatsBar,
  SearchFiltersBar,
  PatientGrid,
  PaginationControls,
  EmptyState,
} from "@/components/patient-management";
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
  showOverdueOnly: boolean,
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

  // State
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
        showOverdueOnly,
      ),
    [searchQuery, showHighRiskOnly, showOverdueOnly],
  );

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPatients, currentPage]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  const highRiskCount = mockPatientManagementData.filter(
    (p) => p.status === "high-risk" || p.status === "due-soon",
  ).length;

  const overdueCount = mockPatientManagementData.filter(
    (p) => p.isOverdue,
  ).length;

  // Event handlers
  const handlePatientClick = useCallback(
    (patientId: string) => {
      router.push(`/dashboard/patients/${patientId}`);
    },
    [router],
  );

  const handleNewPatient = useCallback(() => {
    router.push("/dashboard/patients/new");
  }, [router]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setShowHighRiskOnly(false);
    setShowOverdueOnly(false);
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

  const clearFilters = useCallback(() => {
    setShowHighRiskOnly(false);
    setShowOverdueOnly(false);
    setCurrentPage(1);
  }, []);

  const handleExpandCard = useCallback((id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  }, []);

  const showAddCard =
    !searchQuery && !showHighRiskOnly && !showOverdueOnly && currentPage === 1;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 overflow-hidden">
      {/* Stats Bar */}
      <StatsBar stats={patientManagementStats} />

      {/* Search & Filters */}
      <SearchFiltersBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onClearSearch={clearSearch}
        showHighRiskOnly={showHighRiskOnly}
        showOverdueOnly={showOverdueOnly}
        onToggleHighRisk={toggleHighRiskFilter}
        onToggleOverdue={toggleOverdueFilter}
        onClearFilters={clearFilters}
        onNewPatient={handleNewPatient}
        highRiskCount={highRiskCount}
        overdueCount={overdueCount}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="max-w-400 mx-auto w-full">
          {/* Search Results Info */}
          {(searchQuery || showHighRiskOnly || showOverdueOnly) && (
            <div className="mb-5 px-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-teal-500 text-[18px]">
                  search
                </span>
                <span className="text-sm text-slate-600">
                  Found{" "}
                  <strong className="text-slate-900 font-bold">
                    {filteredPatients.length}
                  </strong>{" "}
                  patient
                  {filteredPatients.length !== 1 ? "s" : ""}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
              </div>
            </div>
          )}

          {/* Patient Grid or Empty State */}
          {filteredPatients.length === 0 ? (
            <EmptyState searchQuery={searchQuery} onClearSearch={clearSearch} />
          ) : (
            <>
              <PatientGrid
                patients={paginatedPatients}
                expandedCard={expandedCard}
                onExpand={handleExpandCard}
                onPatientClick={handlePatientClick}
                onNewPatient={handleNewPatient}
                showAddCard={showAddCard}
              />

              {/* Pagination */}
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredPatients.length}
                currentItemsCount={paginatedPatients.length}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            </>
          )}
        </div>
      </main>

      {/* FAB for mobile */}
      <button
        onClick={handleNewPatient}
        className="fixed bottom-8 right-8 lg:hidden w-16 h-16 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-2xl shadow-2xl shadow-teal-500/40 flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        type="button"
        aria-label="Add new patient"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}

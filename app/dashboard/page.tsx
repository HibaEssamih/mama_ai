"use client";

// ============================================================================
// IMPORTS
// ============================================================================

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader, TriageSection } from "@/components/dashboard";
import { mockCriticalPatients, mockWarningPatients } from "@/lib/mockData";
import type { DashboardPatient } from "@/types";

// ============================================================================
// TYPES
// ============================================================================

type FilterType = "all" | "critical" | "warning";
type SortField = "priority" | "name" | "lastUpdate";
type SortOrder = "asc" | "desc";

interface DashboardState {
  searchQuery: string;
  filterType: FilterType;
  sortField: SortField;
  sortOrder: SortOrder;
  isRefreshing: boolean;
  lastRefreshTime: Date;
  error: string | null;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const exportToCSV = (patients: DashboardPatient[], filename: string) => {
  const headers = ["Name", "Risk Level", "Last Updated"];
  const rows = patients.map((p) => [
    p.name,
    p.riskLevel,
    new Date().toISOString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportToJSON = (patients: DashboardPatient[], filename: string) => {
  const json = JSON.stringify(patients, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const showToast = (
  message: string,
  type: "success" | "error" | "info" = "success",
) => {
  // TODO: Integrate with actual toast library (e.g., sonner, react-hot-toast)
  console.log(`[${type.toUpperCase()}]`, message);
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function DashboardPage() {
  // --------------------------------------------------------------------------
  // HOOKS & STATE
  // --------------------------------------------------------------------------
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<DashboardState>({
    searchQuery: searchParams.get("search") || "",
    filterType: (searchParams.get("filter") as FilterType) || "all",
    sortField: (searchParams.get("sort") as SortField) || "priority",
    sortOrder: (searchParams.get("order") as SortOrder) || "desc",
    isRefreshing: false,
    lastRefreshTime: new Date(),
    error: null,
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // --------------------------------------------------------------------------
  // COMPUTED VALUES
  // --------------------------------------------------------------------------

  const allPatients = useMemo(
    () => [...mockCriticalPatients, ...mockWarningPatients],
    [],
  );

  const filteredPatients = useMemo(() => {
    let patients = allPatients;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      patients = patients.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query),
      );
    }

    // Apply type filter
    if (state.filterType !== "all") {
      patients = patients.filter((p) => p.riskLevel === state.filterType);
    }

    return patients;
  }, [allPatients, state.searchQuery, state.filterType]);

  const criticalPatients = useMemo(
    () => filteredPatients.filter((p) => p.riskLevel === "critical"),
    [filteredPatients],
  );

  const warningPatients = useMemo(
    () => filteredPatients.filter((p) => p.riskLevel === "warning"),
    [filteredPatients],
  );

  // --------------------------------------------------------------------------
  // EVENT HANDLERS
  // --------------------------------------------------------------------------

  const isInputFocused = () => {
    const activeElement = document.activeElement;
    return (
      activeElement?.tagName === "INPUT" ||
      activeElement?.tagName === "TEXTAREA" ||
      activeElement?.hasAttribute("contenteditable")
    );
  };

  const handleFilter = useCallback(() => {
    const filters: FilterType[] = ["all", "critical", "warning"];
    const currentIndex = filters.indexOf(state.filterType);
    const nextFilter = filters[(currentIndex + 1) % filters.length];

    setState((prev) => ({ ...prev, filterType: nextFilter }));
    showToast(
      `Filter: ${nextFilter === "all" ? "All Patients" : nextFilter}`,
      "info",
    );
  }, [state.filterType]);

  const handleRefresh = useCallback(
    async (silent = false) => {
      if (state.isRefreshing) return;

      setState((prev) => ({ ...prev, isRefreshing: true, error: null }));

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        setState((prev) => ({
          ...prev,
          isRefreshing: false,
          lastRefreshTime: new Date(),
        }));

        if (!silent) {
          showToast("Dashboard refreshed successfully", "success");
        }
      } catch {
        setState((prev) => ({
          ...prev,
          isRefreshing: false,
          error: "Failed to refresh data. Please try again.",
        }));
        showToast("Failed to refresh data", "error");
      }
    },
    [state.isRefreshing],
  );

  const handleExport = useCallback(() => {
    const exportPatients =
      filteredPatients.length > 0 ? filteredPatients : allPatients;

    // Show export options
    const format = window.confirm("Export as CSV? (Cancel for JSON)");

    if (format) {
      exportToCSV(exportPatients, "mama-ai-patients");
      showToast(`Exported ${exportPatients.length} patients to CSV`, "success");
    } else {
      exportToJSON(exportPatients, "mama-ai-patients");
      showToast(
        `Exported ${exportPatients.length} patients to JSON`,
        "success",
      );
    }
  }, [filteredPatients, allPatients]);

  const handleCriticalSort = useCallback((sortBy: string) => {
    setState((prev) => ({
      ...prev,
      sortField: sortBy as SortField,
      sortOrder:
        prev.sortField === sortBy && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  }, []);

  const handleWarningSort = useCallback((sortBy: string) => {
    setState((prev) => ({
      ...prev,
      sortField: sortBy as SortField,
      sortOrder:
        prev.sortField === sortBy && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  }, []);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.searchQuery) params.set("search", state.searchQuery);
    if (state.filterType !== "all") params.set("filter", state.filterType);
    if (state.sortField !== "priority") params.set("sort", state.sortField);
    if (state.sortOrder !== "desc") params.set("order", state.sortOrder);

    const newUrl = params.toString() ? `?${params.toString()}` : "/dashboard";
    router.replace(newUrl, { scroll: false });
  }, [
    state.searchQuery,
    state.filterType,
    state.sortField,
    state.sortOrder,
    router,
  ]);

  // Live clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh(true);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K - Command Palette (handled by header)
      // N - New Patient
      if (e.key === "n" || e.key === "N") {
        if (!e.metaKey && !e.ctrlKey && !isInputFocused()) {
          e.preventDefault();
          router.push("/dashboard/patients/new");
        }
      }
      // / - Focus search
      if (e.key === "/") {
        if (!isInputFocused()) {
          e.preventDefault();
          // TODO: Focus search input
          showToast("Search feature - integrate with header", "info");
        }
      }
      // R - Refresh
      if (e.key === "r" || e.key === "R") {
        if (!e.metaKey && !e.ctrlKey && !isInputFocused()) {
          e.preventDefault();
          handleRefresh();
        }
      }
      // E - Export
      if (e.key === "e" || e.key === "E") {
        if (!e.metaKey && !e.ctrlKey && !isInputFocused()) {
          e.preventDefault();
          handleExport();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, handleRefresh, handleExport]);

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const totalPatients = allPatients.length;
  const filteredCount = filteredPatients.length;

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Error Banner */}
      {state.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="material-symbols-outlined text-red-600 text-xl">
            error
          </span>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-red-900">Error</h4>
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
          <button
            onClick={() => setState((prev) => ({ ...prev, error: null }))}
            className="text-red-600 hover:text-red-900 transition-colors"
            aria-label="Dismiss error"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Priority Triage Board"
        description={
          state.searchQuery || state.filterType !== "all"
            ? `Showing ${filteredCount} of ${totalPatients} patients`
            : "Real-time patient monitoring sorted by clinical urgency."
        }
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Triage Board" },
        ]}
        metadata={[
          {
            label: "Total Patients",
            value: state.filterType === "all" ? totalPatients : filteredCount,
            icon: "groups",
          },
          {
            label: "Last Updated",
            value: formattedTime,
            icon: "schedule",
          },
          {
            label: "Auto-refresh",
            value: autoRefresh ? "ON" : "OFF",
            icon: "sync",
          },
        ]}
        actions={[
          {
            label:
              state.filterType === "all"
                ? "All"
                : state.filterType.charAt(0).toUpperCase() +
                  state.filterType.slice(1),
            icon: "filter_list",
            onClick: handleFilter,
            variant: state.filterType !== "all" ? "default" : "outline",
            ariaLabel: "Cycle through patient filters",
          },
          {
            label: "Export",
            icon: "download",
            onClick: handleExport,
            variant: "outline",
            ariaLabel: `Export ${filteredCount} patients`,
          },
          {
            label: autoRefresh ? "Auto" : "Manual",
            icon: autoRefresh ? "sync" : "sync_disabled",
            onClick: () => {
              setAutoRefresh(!autoRefresh);
              showToast(
                `Auto-refresh ${!autoRefresh ? "enabled" : "disabled"}`,
                "info",
              );
            },
            variant: "outline",
            ariaLabel: "Toggle auto-refresh",
          },
          {
            label: "Refresh",
            icon: "refresh",
            onClick: () => handleRefresh(),
            variant: "default",
            loading: state.isRefreshing,
            ariaLabel: "Manually refresh patient data",
          },
        ]}
      />

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-red-600 text-xl">
              error
            </span>
            <h3 className="font-semibold text-sm text-red-900">Critical</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">
            {criticalPatients.length}
          </p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-amber-600 text-xl">
              warning
            </span>
            <h3 className="font-semibold text-sm text-amber-900">Warning</h3>
          </div>
          <p className="text-2xl font-bold text-amber-700">
            {warningPatients.length}
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-slate-600 text-xl">
              search
            </span>
            <h3 className="font-semibold text-sm text-slate-900">Filtered</h3>
          </div>
          <p className="text-2xl font-bold text-slate-700">
            {filteredCount}/{totalPatients}
          </p>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-emerald-600 text-xl">
              update
            </span>
            <h3 className="font-semibold text-sm text-emerald-900">Status</h3>
          </div>
          <p className="text-sm font-semibold text-emerald-700">
            {state.isRefreshing ? "Refreshing..." : "Up to date"}
          </p>
        </div>
      </div>

      {/* Patient Sections */}
      {state.filterType !== "warning" && (
        <TriageSection
          id="critical-section"
          title="Physiological Critical"
          icon="error"
          variant="critical"
          patients={criticalPatients}
          className="mb-8"
          isLoading={state.isRefreshing}
          isCollapsible={true}
          showCount={true}
          onSort={handleCriticalSort}
        />
      )}

      {state.filterType !== "critical" && (
        <TriageSection
          id="warning-section"
          title="Warning Threshold"
          icon="warning"
          variant="warning"
          patients={warningPatients}
          className="mb-8"
          isLoading={state.isRefreshing}
          isCollapsible={true}
          showCount={true}
          onSort={handleWarningSort}
        />
      )}

      {/* Empty State */}
      {filteredPatients.length === 0 && !state.isRefreshing && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-slate-400 text-4xl">
              search_off
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No patients found
          </h3>
          <p className="text-sm text-slate-600 mb-4 max-w-md">
            {state.searchQuery
              ? `No results for "${state.searchQuery}". Try adjusting your search.`
              : "No patients match the current filter."}
          </p>
          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                searchQuery: "",
                filterType: "all",
              }))
            }
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      <div className="mt-8 p-4 bg-linear-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-slate-600">
              keyboard
            </span>
            <span className="font-semibold text-slate-900">
              Keyboard Shortcuts:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm text-xs font-mono font-semibold">
              ⌘K
            </kbd>
            <span>Command Palette</span>
          </div>

          <span className="text-slate-400">•</span>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm text-xs font-mono font-semibold">
              N
            </kbd>
            <span>New Patient</span>
          </div>

          <span className="text-slate-400">•</span>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm text-xs font-mono font-semibold">
              R
            </kbd>
            <span>Refresh</span>
          </div>

          <span className="text-slate-400">•</span>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm text-xs font-mono font-semibold">
              E
            </kbd>
            <span>Export</span>
          </div>

          <span className="text-slate-400">•</span>

          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded shadow-sm text-xs font-mono font-semibold">
              /
            </kbd>
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-slate-900 text-slate-300 rounded-lg text-xs font-mono">
          <div className="font-semibold text-slate-100 mb-2">Debug Info:</div>
          <div>Filter: {state.filterType}</div>
          <div>Search: {state.searchQuery || "(empty)"}</div>
          <div>
            Sort: {state.sortField} {state.sortOrder}
          </div>
          <div>Auto-refresh: {autoRefresh ? "ON" : "OFF"}</div>
          <div>Last refresh: {state.lastRefreshTime.toLocaleTimeString()}</div>
        </div>
      )}
    </div>
  );
}

"use client";

interface SearchFiltersBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  showHighRiskOnly: boolean;
  showOverdueOnly: boolean;
  onToggleHighRisk: () => void;
  onToggleOverdue: () => void;
  onClearFilters: () => void;
  onNewPatient: () => void;
  highRiskCount: number;
  overdueCount: number;
}

export function SearchFiltersBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  showHighRiskOnly,
  showOverdueOnly,
  onToggleHighRisk,
  onToggleOverdue,
  onClearFilters,
  onNewPatient,
  highRiskCount,
  overdueCount,
}: SearchFiltersBarProps) {
  return (
    <div className="sticky top-0 z-40 px-4 sm:px-6 lg:px-10 py-5 sm:py-6 pointer-events-none">
      <div className="max-w-400 mx-auto pointer-events-auto space-y-4">
        {/* Glass Search Panel */}
        <div className="glass-panel rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between shadow-lg gap-3">
          <div className="relative flex-1 w-full group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span
                className="material-symbols-outlined text-slate-400 group-focus-within:text-teal-500 transition-colors text-[22px]"
                aria-hidden="true"
              >
                search
              </span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              className="block w-full pl-14 pr-14 py-3.5 bg-white/70 border-0 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/40 focus:bg-white transition-all shadow-sm cursor-text"
              placeholder="Search patients, ID, or risk factors..."
              aria-label="Search patients"
            />
            <div className="absolute inset-y-0 right-3 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer rounded-lg"
                  type="button"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-bold text-slate-500 bg-slate-100 rounded-md border border-slate-200 shadow-sm">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={onNewPatient}
              className="flex-1 md:flex-none inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-lg shadow-teal-500/30 text-sm font-bold rounded-xl text-white bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-all cursor-pointer"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px] mr-2"
                aria-hidden="true"
              >
                person_add
              </span>
              <span>New Patient</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onToggleHighRisk}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all shadow-sm hover:shadow-md cursor-pointer ${
              showHighRiskOnly
                ? "bg-red-500 text-white border-red-500 shadow-red-500/30 scale-105"
                : "bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
            }`}
            type="button"
            aria-pressed={showHighRiskOnly}
          >
            <span className="material-symbols-outlined text-[18px]">
              warning
            </span>
            <span>High Risk</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                showHighRiskOnly
                  ? "bg-white/30 text-white"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {highRiskCount}
            </span>
          </button>

          <button
            onClick={onToggleOverdue}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all shadow-sm hover:shadow-md cursor-pointer ${
              showOverdueOnly
                ? "bg-amber-500 text-white border-amber-500 shadow-amber-500/30 scale-105"
                : "bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50"
            }`}
            type="button"
            aria-pressed={showOverdueOnly}
          >
            <span className="material-symbols-outlined text-[18px]">
              schedule
            </span>
            <span>Overdue</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                showOverdueOnly
                  ? "bg-white/30 text-white"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {overdueCount}
            </span>
          </button>

          {(showHighRiskOnly || showOverdueOnly) && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

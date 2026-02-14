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
    <div className="sticky top-0 z-40 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 pointer-events-none">
      <div className="max-w-[1600px] mx-auto pointer-events-auto space-y-3">
        {/* Glass Search Panel */}
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
              onChange={onSearchChange}
              className="block w-full pl-12 pr-12 py-3 bg-white/60 border-0 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500/30 focus:bg-white transition-all shadow-inner cursor-text"
              placeholder="Search patients, ID, or risk factors..."
              aria-label="Search patients"
            />
            <div className="absolute inset-y-0 right-2 flex items-center gap-1">
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounded"
                  type="button"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 rounded border border-slate-200">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={onNewPatient}
              className="flex-1 md:flex-none inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-md shadow-teal-500/20 text-sm font-medium rounded-xl text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] mr-2" aria-hidden="true">
                person_add
              </span>
              <span>New Patient</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onToggleHighRisk}
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
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              {highRiskCount}
            </span>
          </button>
          
          <button
            onClick={onToggleOverdue}
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
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              {overdueCount}
            </span>
          </button>

          {(showHighRiskOnly || showOverdueOnly) && (
            <button
              onClick={onClearFilters}
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
  );
}

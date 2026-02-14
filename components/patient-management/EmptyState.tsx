"use client";

interface EmptyStateProps {
  searchQuery?: string;
  onClearSearch: () => void;
}

export function EmptyState({ searchQuery, onClearSearch }: EmptyStateProps) {
  return (
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
        onClick={onClearSearch}
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
        type="button"
      >
        Clear Filters
      </button>
    </div>
  );
}

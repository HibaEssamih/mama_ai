"use client";

import { useState } from "react";
import { PageHeader, TriageSection } from "@/components/dashboard";
import { mockCriticalPatients, mockWarningPatients } from "@/lib/mockData";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFilter = () => {
    console.log("Filter clicked");
    // TODO: Implement filter functionality
    alert("Filter functionality coming soon!");
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Data refreshed");
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Export clicked");
    // TODO: Implement export functionality
    alert("Export functionality coming soon!");
  };

  const handleCriticalSort = (sortBy: string) => {
    console.log("Sorting critical patients by:", sortBy);
    // TODO: Implement actual sorting logic
  };

  const handleWarningSort = (sortBy: string) => {
    console.log("Sorting warning patients by:", sortBy);
    // TODO: Implement actual sorting logic
  };

  const totalPatients =
    mockCriticalPatients.length + mockWarningPatients.length;
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Priority Triage Board"
        description="Real-time patient monitoring sorted by clinical urgency."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Triage Board" },
        ]}
        metadata={[
          { label: "Total Patients", value: totalPatients, icon: "groups" },
          { label: "Last Updated", value: currentTime, icon: "schedule" },
        ]}
        actions={[
          {
            label: "Filter",
            icon: "filter_list",
            onClick: handleFilter,
            variant: "secondary",
            ariaLabel: "Filter patients by criteria",
          },
          {
            label: "Export",
            icon: "download",
            onClick: handleExport,
            variant: "secondary",
            ariaLabel: "Export patient data",
          },
          {
            label: "Refresh",
            icon: "refresh",
            onClick: handleRefresh,
            variant: "primary",
            loading: isRefreshing,
            ariaLabel: "Refresh patient data",
          },
        ]}
      />

      <TriageSection
        id="critical-section"
        title="Physiological Critical"
        icon="error"
        variant="critical"
        patients={mockCriticalPatients}
        className="mb-8"
        isLoading={isRefreshing}
        isCollapsible={true}
        showCount={true}
        onSort={handleCriticalSort}
      />

      <TriageSection
        id="warning-section"
        title="Warning Threshold"
        icon="warning"
        variant="warning"
        patients={mockWarningPatients}
        className="mb-8"
        isLoading={isRefreshing}
        isCollapsible={true}
        showCount={true}
        onSort={handleWarningSort}
      />

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="material-symbols-outlined text-[16px]">
            keyboard
          </span>
          <span className="font-semibold">Keyboard Shortcuts:</span>
          <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">
            ⌘ K
          </kbd>
          <span>Command Palette</span>
          <span className="mx-2">•</span>
          <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">
            N
          </kbd>
          <span>New Patient</span>
          <span className="mx-2">•</span>
          <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono">
            /
          </kbd>
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PageHeader, TriageSection } from "@/components/dashboard";
import { mockCriticalPatients, mockWarningPatients } from "@/lib/mockData";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFilter = () => {
    console.log("Filter clicked");
    // TODO: Implement filter functionality
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Data refreshed");
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Export clicked");
    // TODO: Implement export functionality
  };

  const totalPatients = mockCriticalPatients.length + mockWarningPatients.length;

  return (
    <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
      <PageHeader
        title="Priority Triage Board"
        description="Real-time patient monitoring sorted by clinical urgency."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Triage Board" }
        ]}
        metadata={[
          { label: "Total Patients", value: totalPatients, icon: "groups" },
          { label: "Last Updated", value: "2m ago", icon: "schedule" }
        ]}
        actions={[
          {
            label: "Filter",
            icon: "filter_list",
            onClick: handleFilter,
            variant: "secondary",
            ariaLabel: "Filter patients by criteria"
          },
          {
            label: "Export",
            icon: "download",
            onClick: handleExport,
            variant: "secondary",
            ariaLabel: "Export patient data"
          },
          {
            label: "Refresh",
            icon: "refresh",
            onClick: handleRefresh,
            variant: "primary",
            loading: isRefreshing,
            ariaLabel: "Refresh patient data"
          }
        ]}
      />

      <TriageSection
        id="critical-section"
        title="Physiological Critical"
        icon="error"
        variant="critical"
        patients={mockCriticalPatients}
        className="mb-8"
      />

      <TriageSection
        id="warning-section"
        title="Warning Threshold"
        icon="warning"
        variant="warning"
        patients={mockWarningPatients}
        className="pb-12"
      />
    </div>
  );
}

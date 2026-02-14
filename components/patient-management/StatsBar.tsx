"use client";

import type { PatientManagementStats } from "@/types";

interface StatsBarProps {
  stats: PatientManagementStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Primary Metric - Total Patients */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-700 text-[24px]">
                groups
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-medium tracking-wide">
                Active Patients
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.totalPatients}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-12 w-px bg-slate-200"></div>

          {/* Alert Metrics */}
          <div className="flex items-center gap-6">
            {/* High Risk */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-600 text-[20px]">
                      warning
                    </span>
                  </div>
                  {stats.highRiskAlerts > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {stats.highRiskAlerts}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-medium">High Risk</p>
                <p className="text-lg font-bold text-red-600">{stats.highRiskAlerts}</p>
              </div>
            </div>

            {/* Checkups Today */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">
                  event_note
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-medium">Today</p>
                <p className="text-lg font-bold text-slate-900">{stats.checkupsToday}</p>
              </div>
            </div>

            {/* Compliance */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                  task_alt
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-medium">Compliance</p>
                <p className="text-lg font-bold text-emerald-600">{stats.complianceRate}%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              <span>View All Alerts</span>
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

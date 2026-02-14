"use client";

import type { PatientManagementStats } from "@/types";

interface StatsBarProps {
  stats: PatientManagementStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-linear-to-br from-white to-slate-50/50 border-b border-slate-200 shadow-sm">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-10 py-5">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Primary Metric - Total Patients */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-slate-700 text-[28px]">
                groups
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                Active Patients
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.totalPatients}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-14 w-px bg-linear-to-b from-transparent via-slate-300 to-transparent"></div>

          {/* Alert Metrics */}
          <div className="flex items-center gap-8">
            {/* High Risk */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-red-600 text-[24px]">
                      warning
                    </span>
                  </div>
                  {stats.highRiskAlerts > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-md">
                      {stats.highRiskAlerts}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  High Risk
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.highRiskAlerts}
                </p>
              </div>
            </div>

            {/* Checkups Today */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-blue-600 text-[24px]">
                  event_note
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Today
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.checkupsToday}
                </p>
              </div>
            </div>

            {/* Compliance */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-emerald-600 text-[24px]">
                  task_alt
                </span>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  Compliance
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.complianceRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all shadow-sm hover:shadow"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              <span>Alerts</span>
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl transition-all shadow-md hover:shadow-lg"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

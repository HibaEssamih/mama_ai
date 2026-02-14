import Image from "next/image";
import Link from "next/link";
import type { DashboardPatient } from "@/types";

interface PatientCardProps {
  patient: DashboardPatient;
}

const RISK_COLORS = {
  critical: {
    border: "bg-red-500",
    badge: "bg-red-50 text-red-700 border-red-100",
    indicator: "bg-red-500",
    chart: "#ef4444",
  },
  warning: {
    border: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    indicator: "bg-amber-500",
    chart: "#f59e0b",
  },
  stable: {
    border: "bg-green-500",
    badge: "bg-green-50 text-green-700 border-green-100",
    indicator: "bg-green-500",
    chart: "#10b981",
  },
  normal: {
    border: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    indicator: "bg-blue-500",
    chart: "#3b82f6",
  },
} as const;

export default function PatientCard({ patient }: PatientCardProps) {
  const colors = RISK_COLORS[patient.riskLevel];

  return (
    <article 
      className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex overflow-hidden group"
      aria-label={`Patient ${patient.name}, ${patient.alert.type} priority`}
    >
      {/* Risk Level Indicator */}
      <div 
        className={`w-1.5 ${colors.border} shrink-0`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-4">
        {/* Patient Info */}
        <div className="flex items-start gap-3 w-full md:w-1/4 min-w-[200px]">
          <div className="relative shrink-0">
            <Image
              alt={`${patient.name}'s profile photo`}
              className="w-12 h-12 rounded bg-slate-100 object-cover"
              src={patient.avatarUrl}
              width={48}
              height={48}
            />
            <span 
              className={`absolute -bottom-1 -right-1 w-3 h-3 ${colors.indicator} rounded-full border-2 border-white`}
              role="img"
              aria-label={`${patient.riskLevel} risk level`}
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">
              <Link 
                href={`/dashboard/patients/${patient.id}`}
                className="hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded"
              >
                {patient.name}
              </Link>
            </h3>
            <div className="text-xs text-slate-500 mt-0.5">
              <span className="sr-only">Patient ID:</span>
              ID: {patient.patientId} • {patient.gestationalWeek} Weeks
            </div>
            <time 
              className="text-[10px] font-mono text-slate-400 mt-0.5 block"
              dateTime={patient.lastUpdate}
            >
              Updated: {patient.lastUpdate}
            </time>
          </div>
        </div>

        {/* Alert Details */}
        <div className="flex-1 min-w-[250px] border-l border-slate-100 pl-4 md:border-l-0 md:pl-0 lg:border-l lg:pl-6">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide border ${colors.badge}`}
              role="status"
              aria-label={`Alert type: ${patient.alert.type}`}
            >
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                warning
              </span>
              {patient.alert.type}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {patient.alert.category}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-snug">
            <strong className="font-semibold text-slate-900">AI Insight:</strong> {patient.alert.message}
          </p>
        </div>

        {/* Trend Chart */}
        {patient.trendData && (
          <div className="w-full md:w-48 h-12 relative shrink-0">
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1 uppercase">
              <span>{patient.metrics[0]?.label}</span>
              <span 
                className={`${patient.riskLevel === 'critical' || patient.riskLevel === 'warning' ? 'text-red-600' : 'text-slate-600'} font-bold`}
                aria-label={`Current value: ${patient.metrics[0]?.value}`}
              >
                {patient.metrics[0]?.value}
              </span>
            </div>
            <svg 
              className="w-full h-8 overflow-visible" 
              preserveAspectRatio="none" 
              viewBox="0 0 300 60"
              role="img"
              aria-label={`${patient.metrics[0]?.label} trend chart`}
            >
              <title>{`${patient.metrics[0]?.label} trend over time`}</title>
              <path
                d={`M${patient.trendData.map((y, i) => `${(i / (patient.trendData!.length - 1)) * 300},${y}`).join(' L')}`}
                fill="none"
                stroke={colors.chart}
                strokeLinecap="round"
                strokeWidth="2"
              />
              <circle 
                cx="300" 
                cy={patient.trendData[patient.trendData.length - 1]} 
                fill={colors.chart} 
                r="3"
              />
            </svg>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 justify-end w-full md:w-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0 mt-2 md:mt-0">
          <button 
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-sky-600 hover:border-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
            type="button"
            aria-label={`Call ${patient.name}`}
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              videocam
            </span>
            <span>Call</span>
          </button>
          {patient.riskLevel === "critical" && (
            <button 
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
              aria-label={`Dispatch emergency services for ${patient.name}`}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                emergency
              </span>
              <span>Dispatch</span>
            </button>
          )}
          {patient.riskLevel === "warning" && (
            <button 
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
              type="button"
              aria-label={`Schedule appointment for ${patient.name}`}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                schedule
              </span>
              <span>Schedule</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

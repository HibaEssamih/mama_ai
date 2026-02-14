"use client";

import { useCallback } from "react";
import Image from "next/image";
import type { PatientManagementCard } from "@/types";

// ============================================================================
// CONSTANTS
// ============================================================================

export const STATUS_STYLES = {
  "high-risk": {
    card: "border-l-4 border-l-red-500 border-slate-200",
    badge: "bg-red-500 text-white",
    statusDot: "bg-red-500",
    bar: "bg-red-500",
    chipBg: "bg-red-50 text-red-700 border-red-200",
  },
  "due-soon": {
    card: "border-l-4 border-l-amber-500 border-slate-200",
    badge: "bg-amber-500 text-white",
    statusDot: "bg-amber-500",
    bar: "bg-amber-500",
    chipBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
  monitor: {
    card: "border-l-4 border-l-blue-500 border-slate-200",
    badge: "bg-blue-500 text-white",
    statusDot: "bg-blue-500",
    bar: "bg-blue-500",
    chipBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  stable: {
    card: "border-l-4 border-l-emerald-500 border-slate-200",
    badge: "bg-emerald-500 text-white",
    statusDot: "bg-emerald-500",
    bar: "bg-emerald-500",
    chipBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
} as const;

export const STATUS_LABELS = {
  "high-risk": "High Risk",
  "due-soon": "Due Soon",
  monitor: "Monitoring",
  stable: "Stable",
} as const;

export const AVATAR_COLORS = {
  pink: "bg-pink-100 text-pink-700",
  purple: "bg-purple-100 text-purple-700",
  indigo: "bg-indigo-100 text-indigo-700",
  blue: "bg-blue-100 text-blue-700",
  teal: "bg-teal-100 text-teal-700",
  green: "bg-green-100 text-green-700",
} as const;

export const getTrimesterLabel = (trimester: 1 | 2 | 3 | "overdue"): string => {
  if (trimester === "overdue") return "Overdue";
  return `Trimester ${trimester}`;
};

// ============================================================================
// COMPONENT
// ============================================================================

interface PatientCardImprovedProps {
  patient: PatientManagementCard;
  isExpanded: boolean;
  onExpand: () => void;
  onPatientClick: (id: string) => void;
}

export function PatientCardImproved({
  patient,
  isExpanded,
  onExpand,
  onPatientClick,
}: PatientCardImprovedProps) {
  const styles = STATUS_STYLES[patient.status];

  const handleCardClick = useCallback(() => {
    onPatientClick(patient.id);
  }, [patient.id, onPatientClick]);

  const handleCall = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (patient.phone) {
        window.location.href = `tel:${patient.phone}`;
      }
    },
    [patient.phone],
  );

  const handleExpandClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onExpand();
    },
    [onExpand],
  );

  const isStaleActivity =
    patient.lastActivity &&
    patient.lastActivity.includes("day") &&
    parseInt(patient.lastActivity) >= 2;

  const isUrgent =
    patient.status === "high-risk" || patient.status === "due-soon";

  return (
    <article
      onClick={handleCardClick}
      className={`group relative bg-white rounded-2xl border ${styles.card} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View ${patient.name}'s profile`}
    >
      <div className="p-5">
        {/* Header: Patient Info + Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            {patient.avatarUrl ? (
              <Image
                src={patient.avatarUrl}
                alt={patient.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shadow-sm ${
                  AVATAR_COLORS[
                    patient.avatarColor as keyof typeof AVATAR_COLORS
                  ] || AVATAR_COLORS.indigo
                }`}
              >
                {patient.initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-base leading-tight mb-1 truncate group-hover:text-teal-600 transition-colors">
                {patient.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {patient.patientId} • {patient.age} years
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${styles.badge}`}
          >
            {STATUS_LABELS[patient.status]}
          </span>
        </div>

        {/* Clinical Info Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
          <div className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl px-3 py-2 border border-slate-100">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
              Gestational
            </p>
            <p className="font-bold text-slate-900 text-sm">
              {patient.gestationalWeek} weeks
            </p>
          </div>
          <div className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl px-3 py-2 border border-slate-100">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
              Trimester
            </p>
            <p className="font-bold text-slate-900 text-sm">
              {getTrimesterLabel(patient.trimester)}
            </p>
          </div>
        </div>

        {/* AI Analysis */}
        <div
          className={`rounded-xl px-3 py-2.5 mb-4 border shadow-sm ${styles.chipBg}`}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-white/60 flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                psychology
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {isExpanded ? (
                <p className="text-xs leading-relaxed font-medium">
                  {patient.aiAnalysis}
                </p>
              ) : (
                <p className="text-xs leading-relaxed line-clamp-2 font-medium">
                  {patient.aiKeyPoints?.[0] || patient.aiAnalysis}
                </p>
              )}
              {(patient.aiKeyPoints && patient.aiKeyPoints.length > 1) ||
              patient.aiAnalysis.length > 100 ? (
                <button
                  onClick={handleExpandClick}
                  className="text-[10px] font-bold mt-1.5 hover:underline inline-flex items-center gap-0.5"
                  type="button"
                >
                  <span>{isExpanded ? "Show less" : "Read more"}</span>
                  <span className="material-symbols-outlined text-[12px]">
                    {isExpanded ? "expand_less" : "expand_more"}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[10px] mb-2">
            <span className="font-bold text-slate-600 uppercase tracking-wider">
              Pregnancy Progress
            </span>
            <span className="font-bold text-slate-900 text-xs">
              {patient.progressPercent}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full ${styles.bar} transition-all duration-500 shadow-sm`}
              style={{ width: `${patient.progressPercent}%` }}
              role="progressbar"
              aria-valuenow={patient.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Footer: Last Activity + Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${isStaleActivity ? "bg-red-500 animate-pulse" : "bg-emerald-500"} shadow-sm`}
              ></span>
              <span
                className={`font-medium ${isStaleActivity ? "text-red-600" : "text-slate-600"}`}
              >
                {patient.lastActivity}
              </span>
            </div>
            {patient.nextAppointment && (
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[14px] text-blue-500"
                  aria-hidden="true"
                >
                  event
                </span>
                <span className="font-medium">{patient.nextAppointment}</span>
              </div>
            )}
          </div>

          {patient.phone && isUrgent && (
            <button
              onClick={handleCall}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs font-bold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              type="button"
              aria-label={`Call ${patient.name}`}
            >
              <span className="material-symbols-outlined text-[16px]">
                call
              </span>
              <span>Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Click indicator with glow */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-teal-600 text-[18px]">
            arrow_forward
          </span>
        </div>
      </div>
    </article>
  );
}

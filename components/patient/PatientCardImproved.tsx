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
  onPatientClick 
}: PatientCardImprovedProps) {
  const styles = STATUS_STYLES[patient.status];
  
  const handleCardClick = useCallback(() => {
    onPatientClick(patient.id);
  }, [patient.id, onPatientClick]);

  const handleCall = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (patient.phone) {
      window.location.href = `tel:${patient.phone}`;
    }
  }, [patient.phone]);

  const handleExpandClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand();
  }, [onExpand]);

  const isStaleActivity = patient.lastActivity && patient.lastActivity.includes('day') && 
    parseInt(patient.lastActivity) >= 2;

  const isUrgent = patient.status === 'high-risk' || patient.status === 'due-soon';

  return (
    <article
      onClick={handleCardClick}
      className={`group relative bg-white rounded-lg border ${styles.card} hover:shadow-lg transition-all duration-200 cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View ${patient.name}'s profile`}
    >
      <div className="p-4">
        {/* Header: Patient Info + Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            {patient.avatarUrl ? (
              <Image
                src={patient.avatarUrl}
                alt={patient.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                AVATAR_COLORS[patient.avatarColor as keyof typeof AVATAR_COLORS] || AVATAR_COLORS.indigo
              }`}>
                {patient.initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-0.5 truncate group-hover:text-teal-600 transition-colors">
                {patient.name}
              </h3>
              <p className="text-xs text-slate-500">
                {patient.patientId} • {patient.age}y
              </p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}>
            {STATUS_LABELS[patient.status]}
          </span>
        </div>

        {/* Clinical Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-slate-50 rounded px-2 py-1.5">
            <p className="text-[10px] text-slate-500 uppercase font-medium mb-0.5">Gestational</p>
            <p className="font-semibold text-slate-900">{patient.gestationalWeek} weeks</p>
          </div>
          <div className="bg-slate-50 rounded px-2 py-1.5">
            <p className="text-[10px] text-slate-500 uppercase font-medium mb-0.5">Trimester</p>
            <p className="font-semibold text-slate-900">{getTrimesterLabel(patient.trimester)}</p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className={`rounded-lg px-3 py-2 mb-3 border ${styles.chipBg}`}>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0" aria-hidden="true">
              robot_2
            </span>
            <div className="flex-1 min-w-0">
              {isExpanded ? (
                <p className="text-xs leading-relaxed">
                  {patient.aiAnalysis}
                </p>
              ) : (
                <p className="text-xs leading-relaxed line-clamp-2">
                  {patient.aiKeyPoints?.[0] || patient.aiAnalysis}
                </p>
              )}
              {(patient.aiKeyPoints && patient.aiKeyPoints.length > 1) || patient.aiAnalysis.length > 100 ? (
                <button
                  onClick={handleExpandClick}
                  className="text-[10px] font-medium mt-1 hover:underline"
                  type="button"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="font-medium text-slate-600">Pregnancy Progress</span>
            <span className="font-bold text-slate-900">{patient.progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.bar} transition-all duration-500`}
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
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isStaleActivity ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
              <span className={isStaleActivity ? 'text-red-600 font-medium' : ''}>{patient.lastActivity}</span>
            </div>
            {patient.nextAppointment && (
              <>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">event</span>
                  <span>{patient.nextAppointment}</span>
                </div>
              </>
            )}
          </div>
          
          {patient.phone && isUrgent && (
            <button
              onClick={handleCall}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white rounded-md text-xs font-medium hover:bg-teal-700 transition-colors"
              type="button"
              aria-label={`Call ${patient.name}`}
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Click indicator */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-slate-400 text-[16px]">arrow_forward</span>
      </div>
    </article>
  );
}

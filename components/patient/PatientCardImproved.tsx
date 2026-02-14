"use client";

import { useCallback } from "react";
import Image from "next/image";
import type { PatientManagementCard } from "@/types";

// ============================================================================
// CONSTANTS
// ============================================================================

export const STATUS_STYLES = {
  "high-risk": {
    card: "border-red-200 hover:border-red-300",
    badge: "bg-red-500 text-white",
    bar: "bg-red-500",
    analysis: "bg-red-50 text-red-700",
    dot: true,
  },
  "due-soon": {
    card: "border-amber-200 hover:border-amber-300",
    badge: "bg-amber-500 text-white",
    bar: "bg-amber-500",
    analysis: "bg-amber-50 text-amber-700",
    dot: true,
  },
  monitor: {
    card: "border-slate-200 hover:border-slate-300",
    badge: "bg-slate-100 text-slate-700",
    bar: "bg-teal-500",
    analysis: "bg-slate-50 text-slate-700",
    dot: false,
  },
  stable: {
    card: "border-slate-200 hover:border-slate-300",
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
    analysis: "bg-slate-50 text-slate-700",
    dot: false,
  },
} as const;

export const STATUS_LABELS = {
  "high-risk": "High Risk",
  "due-soon": "Due Soon",
  monitor: "Monitor",
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
  return `T${trimester}`;
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

  return (
    <article
      onClick={handleCardClick}
      className={`group relative bg-white rounded-xl border-2 ${styles.card} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden`}
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
      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${styles.badge}`}>
            {STATUS_LABELS[patient.status]}
          </span>
          {styles.dot && (
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" aria-label="Urgent"></div>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Patient Header */}
        <div className="flex items-center gap-3 mb-4 pr-20">
          {patient.avatarUrl ? (
            <Image
              src={patient.avatarUrl}
              alt={`${patient.name} avatar`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base ${
              AVATAR_COLORS[patient.avatarColor as keyof typeof AVATAR_COLORS] || AVATAR_COLORS.indigo
            }`}>
              {patient.initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-tight mb-0.5 group-hover:text-teal-600 transition-colors truncate">
              {patient.name}
            </h3>
            <p className="text-xs text-slate-500">
              {patient.patientId} • {patient.age}y • Week {patient.gestationalWeek}
            </p>
          </div>
        </div>

        {/* AI Insight Preview */}
        <div className={`rounded-lg p-3 mb-3 ${styles.analysis}`}>
          {isExpanded ? (
            <p className="text-xs leading-relaxed">
              {patient.aiAnalysis}
            </p>
          ) : (
            <p className="text-xs leading-relaxed line-clamp-2">
              {patient.aiKeyPoints?.[0] || patient.aiAnalysis}
            </p>
          )}
          {patient.aiKeyPoints && patient.aiKeyPoints.length > 1 && (
            <button
              onClick={handleExpandClick}
              className="text-[10px] text-teal-600 hover:text-teal-700 font-medium mt-1"
              type="button"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-slate-500 uppercase">
              {getTrimesterLabel(patient.trimester)} Progress
            </span>
            <span className="text-[10px] font-bold text-slate-600">
              {patient.progressPercent}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.bar} rounded-full transition-all duration-500`}
              style={{ width: `${patient.progressPercent}%` }}
              role="progressbar"
              aria-valuenow={patient.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Pregnancy progress: ${patient.progressPercent}%`}
            />
          </div>
        </div>

        {/* Footer: Last Activity + Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[14px] ${isStaleActivity ? 'text-red-500' : 'text-slate-400'}`} aria-hidden="true">
              schedule
            </span>
            <span className={`text-[11px] font-medium ${isStaleActivity ? 'text-red-600' : 'text-slate-600'}`}>
              {patient.lastActivity}
            </span>
          </div>
          
          {patient.phone && (
            <button
              onClick={handleCall}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                styles.dot 
                  ? 'bg-teal-500 text-white hover:bg-teal-600' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              type="button"
              aria-label={`Call ${patient.name}`}
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>Call</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

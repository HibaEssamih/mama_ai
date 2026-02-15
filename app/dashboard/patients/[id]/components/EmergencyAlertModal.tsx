"use client";

import type { Patient } from "@/types";

interface EmergencyAlertModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EmergencyAlertModal({ patient, isOpen, onClose, onConfirm }: EmergencyAlertModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-alert-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 text-2xl">emergency</span>
          </div>
          <h3 id="emergency-alert-title" className="text-lg font-semibold text-slate-900">
            Trigger Emergency Alert?
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          This will immediately notify <strong>{patient.emergency_contact_name ?? "emergency contacts"}</strong> and create an event log. Use this only in genuine emergency situations.
        </p>
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-6">
          <p className="text-xs text-red-800">
            <strong>Emergency Contact:</strong> {patient.emergency_contact_phone ?? "Not set"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
          >
            Confirm Alert
          </button>
        </div>
      </div>
    </div>
  );
}

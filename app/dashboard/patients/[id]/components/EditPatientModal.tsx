"use client";

import type { Patient } from "@/types";

interface EditPatientModalProps {
  patient: Patient;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function EditPatientModal({ patient, isOpen, isSaving, onClose, onSubmit }: EditPatientModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={() => !isSaving && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-patient-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="edit-patient-title" className="text-lg font-semibold text-slate-900 mb-4">
          Edit clinical details
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-gestational_week" className="block text-xs font-medium text-slate-500 mb-1">
              Gestational Week
            </label>
            <input
              id="edit-gestational_week"
              name="gestational_week"
              type="number"
              min={1}
              max={42}
              defaultValue={patient.gestational_week}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="edit-blood_type" className="block text-xs font-medium text-slate-500 mb-1">
              Blood Type
            </label>
            <input
              id="edit-blood_type"
              name="blood_type"
              type="text"
              placeholder="e.g. O+"
              defaultValue={patient.blood_type ?? ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="edit-due_date" className="block text-xs font-medium text-slate-500 mb-1">
              Due Date
            </label>
            <input
              id="edit-due_date"
              name="due_date"
              type="date"
              defaultValue={patient.due_date ? patient.due_date.slice(0, 10) : ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="edit-allergies" className="block text-xs font-medium text-slate-500 mb-1">
              Allergies
            </label>
            <textarea
              id="edit-allergies"
              name="allergies"
              rows={2}
              defaultValue={patient.allergies ?? ""}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => !isSaving && onClose()}
              className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 disabled:opacity-50"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

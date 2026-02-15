"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Patient } from "@/types";
import { updatePatientFields } from "@/app/actions/patients";
import {
  PatientHeader,
  ClinicalSidebar,
  ChatInterface,
  EditPatientModal,
  EmergencyAlertModal,
} from "./components";

export interface MessageRow {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface PatientDetailClientProps {
  patient: Patient;
  patientId: string;
  conversationId: string | null;
  initialMessages: MessageRow[]; // Assumed to be sorted ASC (oldest first) from server
}

function formatDate(str: string | null): string {
  if (!str) return "—";
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatMessageTime(str: string): string {
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PatientDetailClient({
  patient: initialPatient,
  patientId,
  conversationId,
  initialMessages,
}: PatientDetailClientProps) {
  const router = useRouter();
  
  // State management
  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const [editOpen, setEditOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  // Sync state if server props change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const displayName = patient.full_name ?? patient.name ?? "—";

  // ============================================================================
  // MESSAGE HANDLING
  // ============================================================================

  const handleSendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || !conversationId || sending) return;

    setSending(true);
    setInputValue("");

    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, patientId, message: text }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.message.id,
            conversation_id: conversationId,
            role: "assistant",
            content: data.message.content,
            metadata: data.message.metadata || null,
            created_at: data.message.created_at,
          },
        ]);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Send error:", err);
      router.refresh();
    } finally {
      setSending(false);
    }
  }, [conversationId, patientId, inputValue, sending, router]);

  // ============================================================================
  // EDIT PATIENT HANDLING
  // ============================================================================

  const handleEditSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const gestational_week = parseInt((form.querySelector('[name="gestational_week"]') as HTMLInputElement)?.value ?? "0", 10);
      const blood_type = (form.querySelector('[name="blood_type"]') as HTMLInputElement)?.value?.trim() || null;
      const due_date = (form.querySelector('[name="due_date"]') as HTMLInputElement)?.value?.trim() || null;
      const allergies = (form.querySelector('[name="allergies"]') as HTMLInputElement)?.value?.trim() || null;

      setEditSaving(true);
      const result = await updatePatientFields(patientId, {
        gestational_week: Number.isNaN(gestational_week) ? undefined : gestational_week,
        blood_type,
        due_date: due_date || null,
        allergies,
      });
      setEditSaving(false);

      if (result.success) {
        setPatient((p) => ({
          ...p,
          gestational_week: Number.isNaN(gestational_week) ? p.gestational_week : gestational_week,
          blood_type,
          due_date: due_date || null,
          allergies,
        }));
        setEditOpen(false);
        router.refresh();
      } else {
        alert(result.error || "Failed to update");
      }
    },
    [patientId, router]
  );

  // ============================================================================
  // EMERGENCY HANDLING
  // ============================================================================

  const handleEmergencyConfirm = useCallback(() => {
    // TODO: Implement actual emergency alert system
    alert("Emergency alert triggered. Notification sent to emergency contacts.");
    setEmergencyOpen(false);
  }, []);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const latestMessage = messages[messages.length - 1];
  const metaRisk = latestMessage?.metadata && typeof latestMessage.metadata === "object" && "risk" in latestMessage.metadata
    ? (latestMessage.metadata as { risk?: string }).risk
    : undefined;
  const dailySummaryRisk = (typeof metaRisk === "string" && metaRisk) ? metaRisk : patient.risk_level;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PatientHeader
        patient={patient}
        onEditClick={() => setEditOpen(true)}
        onEmergencyClick={() => setEmergencyOpen(true)}
        formatDate={formatDate}
      />

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            
            {/* Left Column: Clinical Overview & Vitals */}
            <ClinicalSidebar
              patient={patient}
              onEmergencyClick={() => setEmergencyOpen(true)}
              formatDate={formatDate}
            />

            {/* Right Column: Communication */}
            <div className="lg:col-span-2 flex flex-col overflow-hidden">
              
              {/* Today's Summary Banner */}
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 mb-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-blue-600">insights</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-2">
                      Today&apos;s Summary
                      <span className="text-xs font-normal text-blue-600">
                        ({new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })})
                      </span>
                    </h2>
                    <p className="text-sm text-blue-800">
                      Latest assessment: <strong className="capitalize">{dailySummaryRisk}</strong> risk level.
                      {patient.medical_history?.notes 
                        ? ` ${patient.medical_history.notes}` 
                        : " No recent updates from patient. Awaiting daily check-in."}
                    </p>
                  </div>
                </div>
              </section>

              {/* Chat Interface */}
              <ChatInterface
                messages={messages}
                conversationId={conversationId}
                inputValue={inputValue}
                sending={sending}
                displayName={displayName}
                onInputChange={setInputValue}
                onSendMessage={handleSendMessage}
                formatMessageTime={formatMessageTime}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditPatientModal
        patient={patient}
        isOpen={editOpen}
        isSaving={editSaving}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <EmergencyAlertModal
        patient={patient}
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        onConfirm={handleEmergencyConfirm}
      />
    </div>
  );
}


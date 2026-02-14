"use client";

import { useRouter } from "next/navigation";
import {
  PatientActionBar,
  PatientHeader,
  VitalsCard,
  ClinicalHistory,
  VoiceTimeline,
  RiskTrendChart,
  EmergencyContactCard,
  AIRecommendation
} from "@/components/patient";
import {
  mockPatientProfile,
  mockVitals,
  mockClinicalHistory,
  mockVoiceMessages,
  mockEmergencyContact,
  mockRiskTrend
} from "@/lib/mockPatientData";

interface PatientProfilePageProps {
  params: {
    id: string;
  };
}

export default function PatientProfilePage({ params }: PatientProfilePageProps) {
  const router = useRouter();
  const patientId = params.id;

  // TODO: Fetch real patient data based on patientId
  // For now, using mock data

  // Action Handlers
  const handleMarkResolved = () => {
    console.log("Marking patient as resolved:", patientId);
    // TODO: Implement mark resolved functionality
    alert("Patient case marked as resolved");
  };

  const handleSchedule = () => {
    router.push(`/dashboard/patients/${patientId}/schedule`);
  };

  const handleEscalate = () => {
    if (confirm(
      `Escalate ${mockPatientProfile.name} to emergency care?\n\nThis will alert the on-call physician immediately.`
    )) {
      console.log("Escalating to emergency:", patientId);
      // TODO: Implement escalation
      alert("Emergency escalation triggered. On-call physician notified.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Action Bar - Fixed at top */}
      <PatientActionBar
        patientName={mockPatientProfile.name}
        patientId={patientId}
        onMarkResolved={handleMarkResolved}
        onSchedule={handleSchedule}
        onEscalate={handleEscalate}
      />

      {/* Main Content - Single scrollable area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Patient Overview */}
          <PatientHeader patient={mockPatientProfile} />

          {/* Three-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 pb-8">
            
            {/* Left Sidebar: Vitals & Clinical History */}
            <aside 
              className="lg:col-span-3 flex flex-col gap-4 sm:gap-6"
              aria-label="Patient vitals and history"
            >
              <VitalsCard vitals={mockVitals} />
              <ClinicalHistory history={mockClinicalHistory} />
            </aside>

            {/* Center: Voice Timeline (Main Feature) */}
            <section 
              className="lg:col-span-6"
              aria-label="Voice symptom timeline"
            >
              <VoiceTimeline
                messages={mockVoiceMessages}
                patientAvatar={mockPatientProfile.avatarUrl}
                patientName={mockPatientProfile.name}
              />
            </section>

            {/* Right Sidebar: Analytics & Contacts */}
            <aside 
              className="lg:col-span-3 flex flex-col gap-4 sm:gap-6"
              aria-label="Patient analytics and contacts"
            >
              <RiskTrendChart data={mockRiskTrend} />
              <EmergencyContactCard contact={mockEmergencyContact} />
              <AIRecommendation 
                recommendation="BP spike correlates with evening updates. Suggest monitoring evening diet and stress levels."
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

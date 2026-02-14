"use client";

import { useRouter } from "next/navigation";
import {
  PatientHeader,
  VitalsCard,
  ClinicalHistory,
  VoiceTimeline,
  RiskTrendChart,
  EmergencyContactCard
} from "@/components/patient";
import {
  mockPatientProfile,
  mockVitals,
  mockClinicalHistory,
  mockVoiceMessages,
  mockEmergencyContact,
  mockRiskTrend
} from "@/lib/mockPatientData";

export default function PatientProfilePage() {
  const router = useRouter();

  const handleMarkResolved = () => {
    console.log("Marking patient as resolved");
    // TODO: Implement mark resolved functionality
  };

  const handleSchedule = () => {
    console.log("Opening schedule modal");
    router.push(`/dashboard/patients/${mockPatientProfile.id}/schedule`);
  };

  const handleEscalate = () => {
    if (confirm(`Escalate ${mockPatientProfile.name} to emergency care? This will alert the on-call physician immediately.`)) {
      console.log("Escalating to emergency");
      // TODO: Implement escalation
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Action Bar Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-600">
              <span className="material-symbols-outlined text-xl">
                health_and_safety
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              MamaGuard 
              <span className="font-normal text-slate-400 text-base ml-2">
                Clinical Portal
              </span>
            </h1>
            <span className="h-6 w-px bg-slate-300 mx-2" aria-hidden="true" />
            
            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center text-sm" aria-label="Breadcrumb">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-slate-500 hover:text-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
              >
                Patients
              </button>
              <span className="material-symbols-outlined text-slate-400 text-base mx-1">
                chevron_right
              </span>
              <span className="text-slate-800 font-medium">
                {mockPatientProfile.name}
              </span>
            </nav>
          </div>
          
          {/* Global Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkResolved}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 bg-transparent hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                check_circle_outline
              </span>
              Mark Resolved
            </button>
            
            <button
              onClick={handleSchedule}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                calendar_today
              </span>
              Schedule
            </button>
            
            <button
              onClick={handleEscalate}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                warning
              </span>
              Escalate
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Header Card */}
        <PatientHeader patient={mockPatientProfile} />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
          {/* Left Column: Vitals & History */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-1 pb-4">
            <VitalsCard vitals={mockVitals} />
            <ClinicalHistory history={mockClinicalHistory} />
          </div>

          {/* Center Column: Voice Timeline */}
          <div className="lg:col-span-6">
            <VoiceTimeline
              messages={mockVoiceMessages}
              patientAvatar={mockPatientProfile.avatarUrl}
              patientName={mockPatientProfile.name}
            />
          </div>

          {/* Right Column: Trends & Contact */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pb-4">
            <RiskTrendChart data={mockRiskTrend} />
            <EmergencyContactCard contact={mockEmergencyContact} />
            
            {/* Recommendation Card */}
            <aside className="bg-blue-50 rounded-xl p-4 border border-blue-100" aria-labelledby="recommendation-heading">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-sky-500 mt-0.5 text-lg" aria-hidden="true">
                  info
                </span>
                <div>
                  <h3 id="recommendation-heading" className="text-xs font-bold text-slate-700 uppercase mb-1">
                    Recommendation
                  </h3>
                  <p className="text-sm text-slate-600 leading-snug">
                    BP spike correlates with evening updates. Suggest monitoring evening diet and stress levels.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

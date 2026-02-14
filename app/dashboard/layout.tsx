import type { Metadata } from "next";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";
import { mockDoctor } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Clinical Dashboard | MamaGuard",
  description: "Real-time patient monitoring and triage system for maternal healthcare professionals",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex overflow-hidden bg-slate-50">
      <DashboardSidebar doctor={mockDoctor} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

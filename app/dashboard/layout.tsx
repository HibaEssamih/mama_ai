import type { Metadata } from "next";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard";
import CommandPalette from "@/components/dashboard/CommandPalette";
import { mockDoctor, mockStats } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Clinical Dashboard | MamaGuard",
  description:
    "Real-time patient monitoring and triage system for maternal healthcare professionals",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <DashboardSidebar doctor={mockDoctor} stats={mockStats} />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader stats={mockStats} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}

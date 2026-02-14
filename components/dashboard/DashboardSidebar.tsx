import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/types";
import DashboardNav from "./DashboardNav";

interface DashboardSidebarProps {
  doctor: Doctor;
}

export default function DashboardSidebar({ doctor }: DashboardSidebarProps) {
  return (
    <aside
      className="w-64 bg-white border-r border-slate-200/80 flex flex-col z-40 shrink-0 h-screen"
      role="complementary"
      aria-label="Dashboard sidebar"
    >
      {/* Logo & name */}
      <div className="h-16 flex items-center px-5 border-b border-slate-100/80">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-[17px] tracking-tight text-slate-800 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-lg px-2 py-1.5"
          aria-label="MamaGuard home"
        >
          <div
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white flex items-center justify-center shadow-sm"
            aria-hidden="true"
          >
            <span className="material-symbols-outlined text-xl">medical_services</span>
          </div>
          <span>MamaGuard</span>
        </Link>
      </div>

      {/* Main nav */}
      <DashboardNav />

      {/* Profile & settings — bottom */}
      <div className="mt-auto p-4 border-t border-slate-100/80 bg-slate-50/30">
        <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-white/80 transition-colors">
          <div className="relative shrink-0">
            <Image
              alt={`${doctor.name}, ${doctor.role}`}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              src={doctor.avatarUrl}
              width={40}
              height={40}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {doctor.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {doctor.role}
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="shrink-0 text-slate-400 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-lg p-2 transition-colors"
            aria-label="Open settings"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Doctor, DashboardStats } from "@/types";
import DashboardNav from "./DashboardNav";

interface DashboardSidebarProps {
  doctor: Doctor;
  stats: DashboardStats;
}

export default function DashboardSidebar({ doctor, stats }: DashboardSidebarProps) {
  return (
    <aside 
      className="w-64 bg-white border-r border-slate-200 flex flex-col z-40 shrink-0 shadow-sm h-screen"
      role="complementary"
      aria-label="Dashboard sidebar"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link 
          href="/" 
          className="flex items-center gap-3 font-bold text-lg tracking-tight text-slate-900 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
          aria-label="MamaGuard home"
        >
          <div className="w-8 h-8 rounded bg-sky-500 text-white flex items-center justify-center" aria-hidden="true">
            <span className="material-symbols-outlined text-xl">medical_services</span>
          </div>
          <span>MamaGuard</span>
        </Link>
      </div>

      {/* Triage Queue Summary */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Triage Queue
          </h3>
          <span 
            className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium"
            role="status"
            aria-label="Status: Live"
          >
            Live
          </span>
        </div>
        <nav className="space-y-1" aria-label="Quick triage filters">
          <Link 
            href="/dashboard?filter=critical"
            className="w-full text-left px-3 py-2 rounded-md bg-red-50 border border-red-100 text-red-700 hover:bg-red-100 transition-colors flex justify-between items-center group focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={`View ${stats.critical} critical patients`}
          >
            <span className="font-medium text-sm">Critical</span>
            <span 
              className="bg-red-200 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full"
              aria-hidden="true"
            >
              {stats.critical}
            </span>
          </Link>
          <Link
            href="/dashboard?filter=warning"
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-slate-600 transition-colors flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label={`View ${stats.warning} warning patients`}
          >
            <span className="font-medium text-sm">Warning</span>
            <span 
              className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full"
              aria-hidden="true"
            >
              {stats.warning}
            </span>
          </Link>
        </nav>
      </div>

      {/* Navigation - Now a Client Component */}
      <DashboardNav />

      {/* Doctor Profile */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <Image
            alt={`${doctor.name}, ${doctor.role}`}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
            src={doctor.avatarUrl}
            width={36}
            height={36}
          />
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
            className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1 transition-colors"
            aria-label="Open settings"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

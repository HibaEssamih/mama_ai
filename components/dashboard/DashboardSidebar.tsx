"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Doctor, DashboardStats } from "@/types";
import DashboardNav from "./DashboardNav";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardSidebarProps {
  doctor: Doctor;
  stats: DashboardStats;
}

export default function DashboardSidebar({
  doctor,
  stats,
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} bg-white border-r border-slate-200 flex flex-col z-40 shrink-0 shadow-sm h-screen transition-all duration-300 ease-in-out`}
      role="complementary"
      aria-label="Dashboard sidebar"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {!isCollapsed && (
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-lg tracking-tight text-slate-900 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
            aria-label="MamaGuard home"
          >
            <div
              className="w-8 h-8 rounded bg-sky-500 text-white flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-xl">
                medical_services
              </span>
            </div>
            <span>MamaGuard</span>
          </Link>
        )}

        {isCollapsed && (
          <Link
            href="/"
            className="flex items-center justify-center w-full font-bold text-lg tracking-tight text-slate-900 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1"
            aria-label="MamaGuard home"
          >
            <div
              className="w-8 h-8 rounded bg-sky-500 text-white flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-xl">
                medical_services
              </span>
            </div>
          </Link>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleCollapsed}
              className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1.5 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isCollapsed ? "menu_open" : "menu"}
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isCollapsed ? "Expand" : "Collapse"} sidebar</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Triage Queue Summary */}
      {!isCollapsed && (
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
      )}

      {/* Collapsed Triage Queue */}
      {isCollapsed && (
        <div className="py-3 flex flex-col items-center gap-2 border-b border-slate-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard?filter=critical"
                className="relative w-10 h-10 rounded-md bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`${stats.critical} critical patients`}
              >
                <span className="material-symbols-outlined text-red-700 text-[20px]">
                  error
                </span>
                {stats.critical > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {stats.critical}
                  </span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{stats.critical} Critical patients</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard?filter=warning"
                className="relative w-10 h-10 rounded-md hover:bg-slate-100 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={`${stats.warning} warning patients`}
              >
                <span className="material-symbols-outlined text-slate-600 text-[20px]">
                  warning
                </span>
                {stats.warning > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-slate-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {stats.warning}
                  </span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{stats.warning} Warning patients</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Navigation - Now a Client Component */}
      <DashboardNav isCollapsed={isCollapsed} />

      {/* Doctor Profile */}
      {!isCollapsed && (
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
              <p className="text-xs text-slate-500 truncate">{doctor.role}</p>
            </div>
            <Link
              href="/dashboard/settings"
              className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1 transition-colors"
              aria-label="Open settings"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                settings
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Collapsed Doctor Profile */}
      {isCollapsed && (
        <div className="p-2 border-t border-slate-200 bg-slate-50/50 flex flex-col items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={`${doctor.name}, ${doctor.role}`}
              >
                <Image
                  alt={`${doctor.name}`}
                  className="w-full h-full object-cover"
                  src={doctor.avatarUrl}
                  width={40}
                  height={40}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="text-xs">
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-slate-400">{doctor.role}</p>
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded p-1 transition-colors"
                aria-label="Open settings"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  settings
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </aside>
  );
}

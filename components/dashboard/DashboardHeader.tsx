"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Plus,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Command,
  RefreshCw,
  Clock,
  ChevronDown,
} from "lucide-react";
import type { DashboardStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface DashboardHeaderProps {
  stats: DashboardStats;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "critical" | "warning";
  read: boolean;
  patientId?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Critical Alert",
    message: "Sarah Williams - BP spike 165/95 mmHg",
    time: "2m ago",
    type: "critical",
    read: false,
    patientId: "p-001",
  },
  {
    id: "2",
    title: "Warning Threshold",
    message: "Maria Garcia - Reduced fetal movement",
    time: "15m ago",
    type: "warning",
    read: false,
    patientId: "p-002",
  },
];

export default function DashboardHeader({ stats }: DashboardHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const clinicalAlerts = MOCK_NOTIFICATIONS;
  const unreadCount = clinicalAlerts.filter((n) => !n.read).length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.patientId) {
      setShowNotifications(false);
      router.push(`/dashboard/patients/${notification.patientId}`);
    }
  };

  const handleQuickSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header
      className="h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200 shrink-0"
      role="banner"
    >
      {/* ========== LEFT: Patient Statistics ========== */}
      <div className="flex items-center gap-6">
        {/* Critical Patients */}
        <button
          onClick={() => router.push("/dashboard?filter=critical")}
          className="flex items-center gap-3 group"
          aria-label={`${stats.critical} critical patients`}
        >
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Critical</div>
            <div className="text-xl font-bold text-slate-900">{stats.critical}</div>
          </div>
        </button>

        <Separator orientation="vertical" className="h-10 bg-slate-200" />

        {/* Warning Patients */}
        <button
          onClick={() => router.push("/dashboard?filter=warning")}
          className="flex items-center gap-3 group"
          aria-label={`${stats.warning} warning patients`}
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
            <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Warning</div>
            <div className="text-xl font-bold text-slate-900">{stats.warning}</div>
          </div>
        </button>

        <Separator orientation="vertical" className="h-10 bg-slate-200" />

        {/* Stable Patients */}
        <button
          onClick={() => router.push("/dashboard?filter=stable")}
          className="hidden lg:flex items-center gap-3 group"
          aria-label={`${stats.stable} stable patients`}
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Stable</div>
            <div className="text-xl font-bold text-slate-900">{stats.stable}</div>
          </div>
        </button>
      </div>

      {/* ========== RIGHT: Actions ========== */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleQuickSearch}
          className="hidden md:flex items-center gap-2 h-9 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
        >
          <Command className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-sm">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 h-5 text-[10px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-600">
            ⌘K
          </kbd>
        </Button>

        {/* Refresh */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-9 w-9 p-0 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
          aria-label="Refresh data"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
        </Button>

        <Separator orientation="vertical" className="h-6 bg-slate-200" />

        {/* Add Patient */}
        <Button asChild size="sm" className="h-9 gap-2">
          <Link href="/dashboard/patients/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Add Patient</span>
          </Link>
        </Button>

        {/* Notifications */}
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative h-9 w-9 p-0 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              aria-label={`${unreadCount} unread notifications`}
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold bg-red-600 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-96 p-0 border-slate-200"
            align="end"
            sideOffset={12}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-slate-900">
                    Clinical Alerts
                  </h3>
                  {unreadCount > 0 && (
                    <Badge className="h-5 px-2 text-[10px] bg-red-600 hover:bg-red-700">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-slate-600 hover:text-slate-900"
                  asChild
                >
                  <Link href="/dashboard/notifications">View All</Link>
                </Button>
              </div>
            </div>

            {/* Alerts List */}
            <ScrollArea className="max-h-96">
              {clinicalAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <CheckCircle2
                      className="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">
                    All Clear
                  </h4>
                  <p className="text-xs text-slate-600">
                    No critical alerts at this time
                  </p>
                </div>
              ) : (
                <div>
                  {clinicalAlerts.map((alert, index) => (
                    <div key={alert.id}>
                      <button
                        onClick={() => handleNotificationClick(alert)}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className="shrink-0 mt-0.5">
                            {alert.type === "critical" ? (
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                <AlertCircle
                                  className="h-4 w-4 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                                <AlertTriangle
                                  className="h-4 w-4 text-amber-600"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <span className="font-semibold text-sm text-slate-900">
                                {alert.title}
                              </span>
                              {!alert.read && (
                                <span
                                  className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5"
                                  aria-label="Unread"
                                />
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              {alert.message}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              <span>{alert.time}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                      {index < clinicalAlerts.length - 1 && (
                        <Separator className="bg-slate-100" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

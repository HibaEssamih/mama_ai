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
  X,
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

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "critical" | "warning";
  read: boolean;
  patientId?: string;
}

interface DashboardHeaderProps {
  stats: DashboardStats;
  notifications?: Notification[];
  onRefresh?: () => Promise<void>;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onDismissNotification?: (notificationId: string) => void;
  onOpenCommandPalette?: () => void;
}

export default function DashboardHeader({ 
  stats,
  notifications = [],
  onRefresh,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissNotification,
  onOpenCommandPalette,
}: DashboardHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const clinicalAlerts = notifications;
  const unreadCount = clinicalAlerts.filter((n) => !n.read).length;

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Fallback: reload the page
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.patientId) {
      setShowNotifications(false);
      router.push(`/dashboard/patients/${notification.patientId}`);
    }
  };

  const handleDismiss = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    if (onDismissNotification) {
      onDismissNotification(notificationId);
    }
  };

  const handleQuickSearch = () => {
    if (onOpenCommandPalette) {
      onOpenCommandPalette();
    } else {
      // Fallback to synthetic event
      const event = new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <header
      className="h-14 px-4 flex items-center gap-4 bg-white border-b border-slate-200 shrink-0"
      role="banner"
    >
      {/* ========== LEFT: Search Bar (Prominent) ========== */}
      <div className="flex-1 max-w-md">
        <button
          onClick={handleQuickSearch}
          className="w-full h-9 px-3 flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors group"
        >
          <Command className="h-4 w-4 text-slate-400 group-hover:text-slate-600" aria-hidden="true" />
          <span className="text-sm text-slate-500 group-hover:text-slate-700">Search patients...</span>
          <kbd className="ml-auto px-2 h-5 text-[10px] font-medium bg-white border border-slate-200 rounded text-slate-600 shadow-sm">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ========== RIGHT: Actions & Indicators ========== */}
      <div className="flex items-center gap-2">
        {/* Critical Alert Indicator (Compact) */}
        {stats.critical > 0 && (
          <button
            onClick={() => router.push("/dashboard?filter=critical")}
            className="hidden sm:flex items-center gap-2 h-9 px-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
            aria-label={`${stats.critical} critical patients`}
          >
            <AlertCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-red-700">{stats.critical}</span>
            <span className="hidden md:inline text-xs font-medium text-red-600">Critical</span>
          </button>
        )}

        {/* Refresh */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-9 w-9 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Refresh data"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
        </Button>

        {/* Add Patient */}
        <Button 
          asChild 
          size="sm" 
          className="h-9 gap-1.5 px-3 font-medium"
        >
          <Link href="/dashboard/patients/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Add Patient</span>
          </Link>
        </Button>

        {/* Notifications Bell */}
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label={`${unreadCount} unread notifications`}
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-4.5 px-1 flex items-center justify-center text-[9px] font-bold bg-red-600 text-white rounded-full border border-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-80 p-0 border-slate-200 shadow-lg"
            align="end"
            sideOffset={8}
          >
            {/* Header */}
            <div className="px-3 py-2.5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-slate-900">
                    Alerts
                  </h3>
                  {unreadCount > 0 && (
                    <Badge className="h-5 px-1.5 text-[10px] font-bold bg-red-600 hover:bg-red-700">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && onMarkAllAsRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMarkAllAsRead}
                      className="h-6 px-2 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-slate-600 hover:text-slate-900"
                    asChild
                  >
                    <Link href="/dashboard/notifications">View all</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Alerts List */}
            <ScrollArea className="max-h-80">
              {clinicalAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                    <CheckCircle2
                      className="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">
                    All Clear
                  </h4>
                  <p className="text-xs text-slate-600 max-w-60">
                    No critical alerts at this time
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {clinicalAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="relative group"
                    >
                      <button
                        onClick={() => handleNotificationClick(alert)}
                        className="w-full p-3 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex gap-2.5">
                          {/* Icon */}
                          <div className="shrink-0 mt-0.5">
                            {alert.type === "critical" ? (
                              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                                <AlertCircle
                                  className="h-3.5 w-3.5 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                <AlertTriangle
                                  className="h-3.5 w-3.5 text-amber-600"
                                  aria-hidden="true"
                                />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <span className="font-semibold text-xs text-slate-900">
                                {alert.title}
                              </span>
                              {!alert.read && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1"
                                  aria-label="Unread"
                                />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                              {alert.message}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                              <span>{alert.time}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* Dismiss Button */}
                      {onDismissNotification && (
                        <button
                          onClick={(e) => handleDismiss(e, alert.id)}
                          className="absolute top-2 right-2 p-1 rounded hover:bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Dismiss notification"
                        >
                          <X className="h-3 w-3 text-slate-500" />
                        </button>
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

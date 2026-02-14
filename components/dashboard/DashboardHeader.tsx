"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Plus, X } from "lucide-react";
import type { DashboardStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

interface StatItemProps {
  label: string;
  value: number;
  color: string;
  isPulsing?: boolean;
  onClick?: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "critical" | "warning" | "info";
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Critical Alert",
    message: "Sarah Williams BP spike detected - 165/95",
    time: "2m ago",
    type: "critical",
    read: false,
  },
  {
    id: "2",
    title: "Warning Threshold",
    message: "Maria Garcia movement anomaly pattern",
    time: "15m ago",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "System Update",
    message: "AI model updated successfully",
    time: "1h ago",
    type: "info",
    read: true,
  },
];

function StatItem({
  label,
  value,
  color,
  isPulsing = false,
  onClick,
}: StatItemProps) {
  const isClickable = !!onClick;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors disabled:hover:bg-transparent disabled:cursor-default group"
      aria-label={
        isClickable
          ? `Filter by ${label.toLowerCase()} patients, ${value} patients`
          : undefined
      }
    >
      <div
        className={`w-2.5 h-2.5 rounded-full ${color} ${isPulsing ? "animate-pulse" : ""}`}
        role="presentation"
        aria-hidden="true"
      />
      <div className="text-left">
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
        <div className="text-xl font-semibold text-foreground leading-none mt-0.5">
          {value}
        </div>
      </div>
    </button>
  );
}

export default function DashboardHeader({ stats }: DashboardHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleStatClick = (filter: string) => {
    router.push(`/dashboard?filter=${filter}`);
  };

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log(`Action ${action} on notification:`, notificationId);
    setShowNotifications(false);
    router.push("/dashboard");
  };

  const dismissNotification = (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Dismiss notification:", notificationId);
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-card border-b shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 h-10 bg-background/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center gap-6 ml-6">
        {/* Stats Display */}
        <div className="hidden lg:flex items-center gap-1 border-r pr-6">
          <StatItem
            label="Critical"
            value={stats.critical}
            color="bg-red-500"
            isPulsing
            onClick={() => handleStatClick("critical")}
          />
          <StatItem
            label="Warning"
            value={stats.warning}
            color="bg-amber-500"
            onClick={() => handleStatClick("warning")}
          />
          <StatItem
            label="Stable"
            value={stats.stable}
            color="bg-emerald-500"
            onClick={() => handleStatClick("stable")}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="gap-2">
            <Link href="/dashboard/patients/new">
              <Plus className="h-4 w-4" />
              <span className="hidden xl:inline">New Patient</span>
            </Link>
          </Button>

          {/* Notifications */}
          <Popover open={showNotifications} onOpenChange={setShowNotifications}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] font-semibold"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto py-1 px-2"
                >
                  Mark all read
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                {MOCK_NOTIFICATIONS.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground/30 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No notifications
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {MOCK_NOTIFICATIONS.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-accent/50 transition-colors ${
                          !notification.read ? "bg-accent/20" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              notification.type === "critical"
                                ? "bg-red-500"
                                : notification.type === "warning"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-sm">
                                {notification.title}
                              </span>
                              {!notification.read && (
                                <Badge
                                  variant="secondary"
                                  className="h-5 w-5 p-0 rounded-full"
                                />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <time className="text-xs text-muted-foreground">
                                {notification.time}
                              </time>
                              {(notification.type === "critical" ||
                                notification.type === "warning") && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto py-1 px-2 text-xs"
                                  onClick={() =>
                                    handleNotificationAction(
                                      notification.id,
                                      "view",
                                    )
                                  }
                                >
                                  View Patient
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <Separator />
              <div className="p-3">
                <Button
                  variant="ghost"
                  className="w-full"
                  asChild
                  onClick={() => setShowNotifications(false)}
                >
                  <Link href="/dashboard/notifications">
                    View all notifications
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

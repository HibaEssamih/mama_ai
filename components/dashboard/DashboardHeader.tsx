"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function DashboardHeader() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const handleNotificationClick = (notificationId: string) => {
    console.log("Notification clicked:", notificationId);
    setShowNotifications(false);
    router.push(`/dashboard/notifications/${notificationId}`);
  };

  const closeNotifications = () => setShowNotifications(false);

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeNotifications();
  };

  return (
    <header
      className="h-16 px-4 sm:px-6 flex items-center justify-end bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
      role="banner"
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/dashboard/patients/new"
          className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 active:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          aria-label="Add new patient"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            add
          </span>
          <span className="hidden xl:inline">New Patient</span>
        </Link>

        <div className="relative">
          <button
            className="relative text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-lg p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={showNotifications}
            aria-haspopup="dialog"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
            {unreadCount > 0 && (
              <span
                className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                aria-hidden="true"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40 md:hidden bg-black/20"
                onClick={closeNotifications}
                onKeyDown={handleBackdropKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Close notifications"
              />
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 z-50 max-h-[calc(100vh-5rem)] flex flex-col"
                role="dialog"
                aria-label="Notifications panel"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                  <button
                    type="button"
                    className="text-xs text-sky-600 hover:text-sky-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded-lg px-2 py-1 min-h-[32px] cursor-pointer transition-colors"
                    onClick={() => console.log("Mark all as read")}
                  >
                    Mark all read
                  </button>
                </div>
                <div className="overflow-y-auto flex-1">
                  {MOCK_NOTIFICATIONS.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-30">
                        notifications_off
                      </span>
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {MOCK_NOTIFICATIONS.map((notification) => (
                        <li key={notification.id}>
                          <button
                            type="button"
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`w-full p-4 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-inset focus:ring-sky-500 cursor-pointer rounded-none ${
                              !notification.read ? "bg-sky-50/50" : ""
                            }`}
                            aria-label={`${notification.title}: ${notification.message}`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                  notification.type === "critical"
                                    ? "bg-red-500"
                                    : notification.type === "warning"
                                      ? "bg-amber-500"
                                      : "bg-sky-500"
                                }`}
                                aria-hidden="true"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <span className="font-semibold text-sm text-slate-900">
                                    {notification.title}
                                  </span>
                                  {!notification.read && (
                                    <span
                                      className="w-2 h-2 bg-sky-500 rounded-full shrink-0"
                                      aria-label="Unread"
                                    />
                                  )}
                                </div>
                                <p className="text-sm text-slate-600 mb-1">
                                  {notification.message}
                                </p>
                                <time className="text-xs text-slate-400">
                                  {notification.time}
                                </time>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="p-3 border-t border-slate-100">
                  <Link
                    href="/dashboard/notifications"
                    className="flex items-center justify-center text-center text-sm text-sky-600 hover:text-sky-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded-lg py-2 min-h-[44px]"
                    onClick={closeNotifications}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

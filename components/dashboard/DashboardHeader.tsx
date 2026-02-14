"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DashboardStats } from "@/types";

interface DashboardHeaderProps {
  stats: DashboardStats;
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
  bgColor: string;
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

function StatItem({ label, value, color, bgColor, isPulsing = false, onClick }: StatItemProps) {
  const isClickable = !!onClick;
  const Component = isClickable ? "button" : "div";
  
  return (
    <Component
      className={`flex items-center gap-2 ${isClickable ? 'hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md p-1 -m-1 cursor-pointer' : ''}`}
      onClick={onClick}
      type={isClickable ? "button" : undefined}
      aria-label={isClickable ? `Filter by ${label.toLowerCase()} patients, ${value} patients` : undefined}
    >
      <div 
        className={`w-2 h-2 rounded-full ${color} ${isPulsing ? 'animate-pulse' : ''}`}
        role="presentation"
        aria-hidden="true"
      />
      <div>
        <span className="block text-xs text-slate-500 font-medium">
          {label}
        </span>
        <span className="block text-lg font-bold text-slate-900 leading-none">
          {value}
        </span>
      </div>
    </Component>
  );
}

export default function DashboardHeader({ stats }: DashboardHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Use Next.js router for client-side navigation
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleStatClick = (filter: string) => {
    // Use Next.js router instead of window.location
    router.push(`/dashboard?filter=${filter}`);
  };

  const handleNotificationClick = (notificationId: string) => {
    // TODO: Mark notification as read
    console.log("Notification clicked:", notificationId);
    setShowNotifications(false);
    // Navigate to notification detail or patient
    router.push(`/dashboard/notifications/${notificationId}`);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  // Keyboard handler for backdrop
  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeNotifications();
    }
  };

  return (
    <header 
      className="h-16 px-4 sm:px-6 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
      role="banner"
    >
      {/* Search - Desktop */}
      <div className={`flex-1 max-w-xl ${showMobileSearch ? 'hidden sm:block' : 'hidden md:block'}`}>
        <form role="search" onSubmit={handleSearch}>
          <div className="relative">
            <label htmlFor="patient-search" className="sr-only">
              Search patients by name, ID, or symptom
            </label>
            <span 
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              id="patient-search"
              type="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-shadow"
              placeholder="Search patients..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Mobile Search Toggle */}
      <button
        type="button"
        onClick={() => setShowMobileSearch(!showMobileSearch)}
        className="md:hidden text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
        aria-label={showMobileSearch ? "Close search" : "Open search"}
        aria-expanded={showMobileSearch}
      >
        <span className="material-symbols-outlined">
          {showMobileSearch ? "close" : "search"}
        </span>
      </button>

      {/* Stats & Actions */}
      <div className="flex items-center gap-3 sm:gap-6 ml-2 sm:ml-6">
        {/* Stats Display - Hidden on small screens, shown on medium+ */}
        <div 
          className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-6"
          role="region"
          aria-label="Patient statistics"
        >
          <StatItem 
            label="Critical" 
            value={stats.critical} 
            color="bg-red-500"
            bgColor="bg-red-50"
            isPulsing 
            onClick={() => handleStatClick("critical")}
          />
          <StatItem 
            label="Warning" 
            value={stats.warning} 
            color="bg-amber-500"
            bgColor="bg-amber-50"
            onClick={() => handleStatClick("warning")}
          />
          <StatItem 
            label="Stable" 
            value={stats.stable} 
            color="bg-green-500"
            bgColor="bg-green-50"
            onClick={() => handleStatClick("stable")}
          />
        </div>

        {/* Quick Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/dashboard/patients/new"
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-md bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 active:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            aria-label="Add new patient"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              add
            </span>
            <span className="hidden xl:inline">New Patient</span>
          </Link>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
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

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              {/* Backdrop for mobile */}
              <div 
                className="fixed inset-0 z-40 md:hidden bg-black/20"
                onClick={closeNotifications}
                onKeyDown={handleBackdropKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Close notifications"
              />
              
              {/* Dropdown Panel */}
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-slate-200 z-50 max-h-[calc(100vh-5rem)] flex flex-col"
                role="dialog"
                aria-label="Notifications panel"
              >
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                  <button
                    type="button"
                    className="text-xs text-sky-600 hover:text-sky-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded px-2 py-1 min-h-[32px] cursor-pointer transition-colors"
                    onClick={() => {
                      // TODO: Mark all as read
                      console.log("Mark all as read");
                    }}
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
                            className={`w-full p-4 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-50 focus:ring-2 focus:ring-inset focus:ring-sky-500 cursor-pointer ${
                              !notification.read ? 'bg-sky-50/50' : ''
                            }`}
                            aria-label={`${notification.title}: ${notification.message}`}
                          >
                            <div className="flex items-start gap-3">
                              <div 
                                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                  notification.type === 'critical' ? 'bg-red-500' :
                                  notification.type === 'warning' ? 'bg-amber-500' :
                                  'bg-sky-500'
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

                <div className="p-3 border-t border-slate-200">
                  <Link
                    href="/dashboard/notifications"
                    className="block text-center text-sm text-sky-600 hover:text-sky-700 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded py-2 min-h-[44px] flex items-center justify-center"
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

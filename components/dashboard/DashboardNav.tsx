"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard/patients", icon: "group", label: "All Patients" },
] as const;

export default function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className="flex-1 overflow-y-auto py-6 px-4"
      aria-label="Main dashboard navigation"
    >
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-white ${
                  active
                    ? "bg-sky-50 text-sky-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-colors ${
                    active ? "text-sky-600" : "text-slate-400"
                  }`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/dashboard/patients", icon: "groups", label: "Patient List" },
  { href: "/dashboard/analytics", icon: "bar_chart", label: "Analytics" },
];

interface DashboardNavProps {
  isCollapsed?: boolean;
}

export default function DashboardNav({
  isCollapsed = false,
}: DashboardNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  if (isCollapsed) {
    return (
      <nav
        className="flex-1 overflow-y-auto py-4 px-2 space-y-1"
        aria-label="Main dashboard navigation"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex items-center justify-center w-12 h-12 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    active
                      ? "bg-slate-100 text-sky-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* AI Filters - Collapsed */}
        <div className="mt-8 pt-4 border-t border-slate-200">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="AI Filters"
              >
                <span className="material-symbols-outlined text-[20px]">
                  psychology
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>AI Filters Active</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5"
      aria-label="Main dashboard navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              active
                ? "bg-slate-100 text-sky-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* AI Filters */}
      <div className="mt-8 px-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          AI Filters
        </h4>
        <AIFilters />
      </div>
    </nav>
  );
}

function AIFilters() {
  return (
    <fieldset className="space-y-2">
      <legend className="sr-only">AI detection filters</legend>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          defaultChecked
          name="voiceStress"
          className="rounded border-slate-300 text-sky-500 focus:ring-sky-500 h-4 w-4 cursor-pointer transition-colors"
          aria-label="Enable voice stress detection"
        />
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors select-none">
          Voice Stress
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          defaultChecked
          name="bpAbnormalities"
          className="rounded border-slate-300 text-sky-500 focus:ring-sky-500 h-4 w-4 cursor-pointer transition-colors"
          aria-label="Enable blood pressure abnormality detection"
        />
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors select-none">
          BP Abnormalities
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          defaultChecked
          name="movementPatterns"
          className="rounded border-slate-300 text-sky-500 focus:ring-sky-500 h-4 w-4 cursor-pointer transition-colors"
          aria-label="Enable fetal movement pattern detection"
        />
        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors select-none">
          Movement Patterns
        </span>
      </label>
    </fieldset>
  );
}

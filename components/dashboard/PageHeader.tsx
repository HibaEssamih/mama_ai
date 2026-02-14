"use client";

import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Action {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  ariaLabel?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: Action[];
  metadata?: {
    label: string;
    value: string | number;
    icon?: string;
  }[];
  variant?: "default" | "compact";
}

export default function PageHeader({ 
  title, 
  description,
  breadcrumbs,
  actions,
  metadata,
  variant = "default"
}: PageHeaderProps) {
  const isCompact = variant === "compact";

  const getActionStyles = (actionVariant: Action["variant"] = "secondary") => {
    const base = "px-3 py-1.5 text-sm font-medium rounded transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
    
    switch (actionVariant) {
      case "primary":
        return `${base} text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-500`;
      case "danger":
        return `${base} text-white bg-red-500 hover:bg-red-600 focus:ring-red-500`;
      case "secondary":
      default:
        return `${base} text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 focus:ring-sky-500`;
    }
  };

  return (
    <header className={`${isCompact ? 'mb-4' : 'mb-6'}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-slate-400" aria-hidden="true">/</span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded px-1"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Main Header Content */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className={`font-bold text-slate-900 tracking-tight ${isCompact ? 'text-xl' : 'text-2xl'}`}>
            {title}
          </h1>
          {description && (
            <p className="text-slate-500 mt-1 text-sm">
              {description}
            </p>
          )}
          
          {/* Metadata */}
          {metadata && metadata.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm">
                  {item.icon && (
                    <span className="material-symbols-outlined text-[16px] text-slate-400" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="text-slate-500">{item.label}:</span>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex gap-2" role="toolbar" aria-label="Page actions">
            {actions.map((action, index) => (
              <button 
                key={index}
                className={getActionStyles(action.variant)}
                type="button"
                onClick={action.onClick}
                disabled={action.loading}
                aria-label={action.ariaLabel || action.label}
              >
                {action.loading ? (
                  <span 
                    className="material-symbols-outlined text-[18px] animate-spin" 
                    aria-hidden="true"
                  >
                    progress_activity
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {action.icon}
                  </span>
                )}
                <span className="hidden sm:inline">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

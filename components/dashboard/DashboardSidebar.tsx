"use client";

import Link from "next/link";
import { Settings, Activity } from "lucide-react";
import type { Doctor } from "@/types";
import DashboardNav from "./DashboardNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  doctor: Doctor;
}

export default function DashboardSidebar({ doctor }: DashboardSidebarProps) {
  return (
    <aside
      className="w-64 bg-card border-r flex flex-col shrink-0 h-screen"
      role="complementary"
      aria-label="Dashboard sidebar"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-lg hover:opacity-80 transition-opacity group"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">MamaGuard</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <DashboardNav isCollapsed={false} />
      </div>

      {/* Doctor Profile */}
      <div className="border-t bg-muted/30">
        <div className="p-4">
          <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors group cursor-pointer">
            <Avatar className="h-10 w-10 ring-2 ring-background">
              <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-sm">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate leading-tight">
                {doctor.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {doctor.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              asChild
            >
              <Link href="/dashboard/settings" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

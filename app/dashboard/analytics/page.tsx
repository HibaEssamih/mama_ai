"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// ============================================================================
// TYPES
// ============================================================================

interface AnalyticsData {
  totalPatients: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  totalMessages: number;
  totalConversations: number;
  activeAlerts: number;
  recentActivity: {
    date: string;
    patients: number;
    messages: number;
  }[];
  trimesterDistribution: {
    first: number;
    second: number;
    third: number;
  };
  topRiskPatients: {
    id: string;
    name: string;
    risk_level: string;
    gestational_week: number;
  }[];
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color = "teal" 
}: { 
  title: string; 
  value: string | number; 
  icon: string; 
  trend?: string;
  color?: "teal" | "red" | "amber" | "blue" | "emerald";
}) {
  const colorClasses = {
    teal: "bg-teal-50 text-teal-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trend && (
            <p className="text-xs text-slate-500 mt-1">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

function RiskDistributionCard({ distribution }: { distribution: AnalyticsData["riskDistribution"] }) {
  const total = distribution.low + distribution.medium + distribution.high + distribution.critical;
  
  const getPercentage = (value: number) => total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-teal-600">pie_chart</span>
        Risk Level Distribution
      </h3>
      
      <div className="space-y-4">
        {/* Low Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Low Risk</span>
            <span className="text-sm font-bold text-emerald-600">{distribution.low} ({getPercentage(distribution.low)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${getPercentage(distribution.low)}%` }}
            />
          </div>
        </div>

        {/* Medium Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Medium Risk</span>
            <span className="text-sm font-bold text-amber-600">{distribution.medium} ({getPercentage(distribution.medium)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all"
              style={{ width: `${getPercentage(distribution.medium)}%` }}
            />
          </div>
        </div>

        {/* High Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">High Risk</span>
            <span className="text-sm font-bold text-orange-600">{distribution.high} ({getPercentage(distribution.high)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${getPercentage(distribution.high)}%` }}
            />
          </div>
        </div>

        {/* Critical Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Critical Risk</span>
            <span className="text-sm font-bold text-red-600">{distribution.critical} ({getPercentage(distribution.critical)}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${getPercentage(distribution.critical)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrimesterDistributionCard({ distribution }: { distribution: AnalyticsData["trimesterDistribution"] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-600">calendar_month</span>
        Trimester Distribution
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-blue-600">{distribution.first}</span>
          </div>
          <p className="text-xs font-medium text-slate-600">1st Trimester</p>
          <p className="text-xs text-slate-500">(Weeks 1-12)</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-teal-600">{distribution.second}</span>
          </div>
          <p className="text-xs font-medium text-slate-600">2nd Trimester</p>
          <p className="text-xs text-slate-500">(Weeks 13-26)</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-purple-600">{distribution.third}</span>
          </div>
          <p className="text-xs font-medium text-slate-600">3rd Trimester</p>
          <p className="text-xs text-slate-500">(Weeks 27-40)</p>
        </div>
      </div>
    </div>
  );
}

function ActivityChartCard({ activity }: { activity: AnalyticsData["recentActivity"] }) {
  const maxMessages = Math.max(...activity.map((a) => a.messages));
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-teal-600">bar_chart</span>
        Weekly Activity
      </h3>
      
      <div className="flex items-end justify-between gap-2 h-48">
        {activity.map((day) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
            <div className="flex-1 w-full flex items-end">
              <div 
                className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all hover:from-teal-600 hover:to-teal-500"
                style={{ height: `${(day.messages / maxMessages) * 100}%` }}
                title={`${day.messages} messages`}
              />
            </div>
            <p className="text-xs font-medium text-slate-600">{day.date}</p>
            <p className="text-xs text-slate-500">{day.messages}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopRiskPatientsCard({ patients }: { patients: AnalyticsData["topRiskPatients"] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-red-600">warning</span>
        High Risk Patients
      </h3>
      
      {patients.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">No high-risk patients</p>
      ) : (
        <div className="space-y-3">
          {patients.map((patient) => (
            <Link
              key={patient.id}
              href={`/dashboard/patients/${patient.id}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  patient.risk_level === "critical" ? "bg-red-100" : "bg-orange-100"
                }`}>
                  <span className={`material-symbols-outlined text-lg ${
                    patient.risk_level === "critical" ? "text-red-600" : "text-orange-600"
                  }`}>
                    person
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                  <p className="text-xs text-slate-500">Week {patient.gestational_week}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                patient.risk_level === "critical" 
                  ? "bg-red-100 text-red-700" 
                  : "bg-orange-100 text-orange-700"
              }`}>
                {patient.risk_level}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalPatients: 0,
    riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
    totalMessages: 0,
    totalConversations: 0,
    activeAlerts: 0,
    recentActivity: [],
    trimesterDistribution: { first: 0, second: 0, third: 0 },
    topRiskPatients: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // Get total patients and risk distribution
      const { data: patients } = await supabase.from("patients").select("*");
      
      const totalPatients = patients?.length || 0;
      const riskDistribution = {
        low: patients?.filter((p) => p.risk_level === "low").length || 0,
        medium: patients?.filter((p) => p.risk_level === "medium").length || 0,
        high: patients?.filter((p) => p.risk_level === "high").length || 0,
        critical: patients?.filter((p) => p.risk_level === "critical").length || 0,
      };

      // Get trimester distribution
      const trimesterDistribution = {
        first: patients?.filter((p) => p.trimester === 1).length || 0,
        second: patients?.filter((p) => p.trimester === 2).length || 0,
        third: patients?.filter((p) => p.trimester === 3).length || 0,
      };

      // Get total messages
      const { count: totalMessages } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      // Get total conversations
      const { count: totalConversations } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true });

      // Get active alerts
      const { data: alerts } = await supabase
        .from("alerts")
        .select("*")
        .in("urgency", ["high", "critical"]);
      
      const activeAlerts = alerts?.length || 0;

      // Get top risk patients
      const topRiskPatients = (patients || [])
        .filter((p) => p.risk_level === "high" || p.risk_level === "critical")
        .sort((a, b) => (b.risk_level === "critical" ? 1 : 0) - (a.risk_level === "critical" ? 1 : 0))
        .slice(0, 5)
        .map((p) => ({
          id: p.id,
          name: p.full_name || p.name || "Unknown",
          risk_level: p.risk_level,
          gestational_week: p.gestational_week || 0,
        }));

      // Mock recent activity (in production, query messages by date)
      const recentActivity = [
        { date: "Mon", patients: 12, messages: 45 },
        { date: "Tue", patients: 15, messages: 52 },
        { date: "Wed", patients: 18, messages: 67 },
        { date: "Thu", patients: 14, messages: 48 },
        { date: "Fri", patients: 20, messages: 78 },
        { date: "Sat", patients: 16, messages: 55 },
        { date: "Sun", patients: 13, messages: 42 },
      ];

      setData({
        totalPatients,
        riskDistribution,
        totalMessages: totalMessages || 0,
        totalConversations: totalConversations || 0,
        activeAlerts,
        recentActivity,
        trimesterDistribution,
        topRiskPatients,
      });
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    const supabase = createClient();

    // Refetch data
    const { data: patients } = await supabase.from("patients").select("*");
    
    const totalPatients = patients?.length || 0;
    const riskDistribution = {
      low: patients?.filter((p) => p.risk_level === "low").length || 0,
      medium: patients?.filter((p) => p.risk_level === "medium").length || 0,
      high: patients?.filter((p) => p.risk_level === "high").length || 0,
      critical: patients?.filter((p) => p.risk_level === "critical").length || 0,
    };

    const trimesterDistribution = {
      first: patients?.filter((p) => p.trimester === 1).length || 0,
      second: patients?.filter((p) => p.trimester === 2).length || 0,
      third: patients?.filter((p) => p.trimester === 3).length || 0,
    };

    const { count: totalMessages } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true });

    const { count: totalConversations } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true });

    const { data: alerts } = await supabase
      .from("alerts")
      .select("*")
      .in("urgency", ["high", "critical"]);
    
    const activeAlerts = alerts?.length || 0;

    const topRiskPatients = (patients || [])
      .filter((p) => p.risk_level === "high" || p.risk_level === "critical")
      .sort((a, b) => (b.risk_level === "critical" ? 1 : 0) - (a.risk_level === "critical" ? 1 : 0))
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        name: p.full_name || p.name || "Unknown",
        risk_level: p.risk_level,
        gestational_week: p.gestational_week || 0,
      }));

    const recentActivity = [
      { date: "Mon", patients: 12, messages: 45 },
      { date: "Tue", patients: 15, messages: 52 },
      { date: "Wed", patients: 18, messages: 67 },
      { date: "Thu", patients: 14, messages: 48 },
      { date: "Fri", patients: 20, messages: 78 },
      { date: "Sat", patients: 16, messages: 55 },
      { date: "Sun", patients: 13, messages: 42 },
    ];

    setData({
      totalPatients,
      riskDistribution,
      totalMessages: totalMessages || 0,
      totalConversations: totalConversations || 0,
      activeAlerts,
      recentActivity,
      trimesterDistribution,
      topRiskPatients,
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-slate-500 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
                <p className="text-sm text-slate-600 mt-1">Platform performance and patient insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                Export Report
              </button>
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <span className={`material-symbols-outlined text-lg ${isLoading ? 'animate-spin' : ''}`}>refresh</span>
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={data.totalPatients}
            icon="group"
            trend="+12% from last month"
            color="teal"
          />
          <StatCard
            title="Active Conversations"
            value={data.totalConversations}
            icon="chat"
            trend="+8% from last week"
            color="blue"
          />
          <StatCard
            title="Total Messages"
            value={data.totalMessages.toLocaleString()}
            icon="forum"
            trend="+23% from last week"
            color="emerald"
          />
          <StatCard
            title="Active Alerts"
            value={data.activeAlerts}
            icon="notification_important"
            trend={data.activeAlerts > 0 ? "Requires attention" : "All clear"}
            color={data.activeAlerts > 0 ? "red" : "emerald"}
          />
        </section>

        {/* Charts and Distributions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskDistributionCard distribution={data.riskDistribution} />
          <TrimesterDistributionCard distribution={data.trimesterDistribution} />
        </section>

        {/* Activity and Risk Patients */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChartCard activity={data.recentActivity} />
          </div>
          <div>
            <TopRiskPatientsCard patients={data.topRiskPatients} />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/patients"
            className="bg-white rounded-2xl border-2 border-teal-200 p-6 hover:border-teal-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <span className="material-symbols-outlined text-teal-600 text-2xl">group</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">View All Patients</h3>
                <p className="text-sm text-slate-600">Manage patient records</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/alerts"
            className="bg-white rounded-2xl border-2 border-red-200 p-6 hover:border-red-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <span className="material-symbols-outlined text-red-600 text-2xl">emergency</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">View Alerts</h3>
                <p className="text-sm text-slate-600">Monitor critical cases</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/patients/new"
            className="bg-white rounded-2xl border-2 border-blue-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="material-symbols-outlined text-blue-600 text-2xl">person_add</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Register Patient</h3>
                <p className="text-sm text-slate-600">Add new mother</p>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}

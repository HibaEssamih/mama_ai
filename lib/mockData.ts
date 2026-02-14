import type { DashboardPatient, DashboardStats, Doctor } from "@/types";

export const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Sarah Cole",
  role: "Obstetrics Lead",
  email: "sarah.cole@mamaguard.health",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxCDxcYwS-hwhZFelLIn7JgaDkZXfSVjO-Cng4HBNLPywrWaVXxkgg7wymY81ZdxaazEh-eC5vsLCKOXNkmUP6_-On-vCfkHAsBrp6GBkYLpVtdNV6D0kGQwhcOIyNLAHxlFZ2JVT2AxAHvJMFW4iv9InrWDlAsHV3TqyoyVgPpsr7zdU4Xgha6smI1McZ1CMcpN2sIM4oby82xGp1y6Yet12ijPJIJySl80VGKOOXVftQSrpopCV3EgBnQAuTNZEv26vD-O9ErH0i",
};

export const mockStats: DashboardStats = {
  critical: 4,
  warning: 12,
  stable: 142,
};

export const mockCriticalPatients: DashboardPatient[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    patientId: "#9283",
    gestationalWeek: 32,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOD_FtHE_M2MnQU5X4ENnkwxe6hDrAzl0WEzGP3ROfYIX4RTvu05KGJtfc2JNIaSxMsopffKRrtJd17CbwGc5paeJiH2ESWNlsvLnn0fuXpS2jKHx6NWovLH1J3hyz0iewgw_Q4ZXKcESi5SPC5k1ing_7al3jEoo7E45aFqqFTjuVJs60wM5TPlSaF1dHWyFcm8Y_SMPjcOs8HmHjlS8Rv7UWtPJFrUahyMZPjATcUF51G8NpXDE2pJWUPfl2xQmqZkgkJ4r_gSA8",
    riskLevel: "critical",
    lastUpdate: "2m ago",
    alert: {
      type: "High Risk",
      category: "BP Spike",
      message: "Sudden BP spike (150/95) detected via voice analysis. Patient reported \"seeing spots\".",
    },
    metrics: [
      { label: "Heart Rate", value: "115 BPM", trend: "up" },
    ],
    trendData: [50, 45, 48, 40, 35, 38, 25, 20, 15, 10, 5],
  },
  {
    id: "2",
    name: "Priya Patel",
    patientId: "#1092",
    gestationalWeek: 36,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh95iRRavtH6vO_F9a2ks_UaduvZWXRbS3-pn9HsjTt7RNWaD0Ac4bgMhpk0vOmRtLK0ouSwI5WD8lhQxNNiuoXfjJMDsR_cHkOvQk1ViBj_yStsbzGkV_oEoYD9lO5hHZdH9mTljxV8Zs691IFvdFSsH-DALjojxQ32DUFyB8q11QWiX8plCN2bh-2KsMP4sTriDpNGUTU4hduGawYU6MZGTqAifdZFXRGYwAv8LehM1MGUgdzGFeaP9V8Ryr8k5E9ZZoSMEKFWBZ",
    riskLevel: "critical",
    lastUpdate: "45m ago",
    alert: {
      type: "High Risk",
      category: "Preeclampsia Risk",
      message: "Severe headache reported with visual disturbances. High probability of preeclampsia onset.",
    },
    metrics: [
      { label: "Pain Level", value: "8/10", trend: "up" },
    ],
    trendData: [50, 50, 48, 45, 30, 20, 15, 10, 5],
  },
];

export const mockWarningPatients: DashboardPatient[] = [
  {
    id: "3",
    name: "Amara Okafor",
    patientId: "#4421",
    gestationalWeek: 28,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrr2OmyxEYYpd39R10VC2g2BluTHskDpx3dFNpJhg6xfOBm25j3r-lMH_2uvDYhfwgELfA5g7Q77Q-FCBlGcf01W5mfuWhTvHtyvb7OCd1rzTjYOUMiBAW3Lxpoh1vN88jM9nIeaswUaoU9iY_P4Hm4RTBtPVjnqAqK0X1TLWENaehRGISfuFYHt7IPtRLZttdrr644XWmZYC-bT-VlZ-gIjhfwebF57y4yGi2zBg1Gz_JG5B_wgtaBwvv8dSyPSsUbJtcQrNV8dGX",
    riskLevel: "warning",
    lastUpdate: "2h ago",
    alert: {
      type: "Moderate",
      category: "Movement Anomaly",
      message: "Reduced fetal movement reported consecutively for 2 days. Deviates from baseline.",
    },
    metrics: [
      { label: "Activity Trend", value: "Decreasing", trend: "down" },
    ],
    trendData: [20, 15, 18, 22, 25, 30, 35, 40, 45, 50, 55],
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    patientId: "#3319",
    gestationalWeek: 34,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvcpSPrAUDRWPxtw1PsiiuoP_0lsTIMybfpbF439klcZ5u75lGzcrD60nsAcbiNKT8FH1xs8KOcRXZQSU7aBLaDiM4ir5UJsxmiD8Fb5grxu9oznRzsXpyiVBmN_IVhPo66vZuXLAbPXbSDzvNtZjaOyQbuKZM2mZVe_jserlVfU1mbeGchLoITuxb4KW7lV60RjJ3Yg97U1mX4zRe3bcvm2wfNhZ4UoG-o0qAVmfCfwiGRH9Lb57CKw7Ky6Nbq7L6VPzvxrbRmEll",
    riskLevel: "warning",
    lastUpdate: "2d ago",
    alert: {
      type: "Monitor",
      category: "Low Compliance",
      message: "Missed check-in for 2 days. Geolocation places patient 50mi from home address.",
    },
    metrics: [
      { label: "Compliance", value: "Intermittent", trend: "down" },
    ],
    trendData: [10, 10, 10, 15, 20, 40, 55, 55, 55],
  },
];

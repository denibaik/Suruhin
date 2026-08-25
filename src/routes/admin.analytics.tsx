import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  UserCheck,
  Users,
} from "lucide-react";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { DashboardShell } from "@/components/site/DashboardShell";
import { getAnalyticsDashboard } from "@/lib/api/analytics.functions";

const adminNavItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
  { to: "/admin/landing", label: "Landing Page", icon: LayoutTemplate },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export const Route = createFileRoute("/admin/analytics")({
  loader: async () => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 29);
    return getAnalyticsDashboard({
      data: { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) },
    });
  },
  head: () => ({ meta: [{ title: "Analytics Landing Page — Suruhin" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const initial = Route.useLoaderData();
  return (
    <DashboardShell items={adminNavItems} title="Landing Page Analytics">
      <AnalyticsDashboard initial={initial} />
    </DashboardShell>
  );
}

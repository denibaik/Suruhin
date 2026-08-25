import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ListChecks,
  LayoutTemplate,
  BarChart3,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
  { to: "/admin/landing", label: "Landing Page", icon: LayoutTemplate },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Suruhin" }] }),
  component: AdminPage,
});

function AdminPage() {
  const location = useLocation();
  if (location.pathname !== "/admin") return <Outlet />;

  return (
    <DashboardShell items={navItems} title="Dasbor Admin">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Total Pengguna", v: "12.408" },
          { l: "Helper Aktif", v: "3.217" },
          { l: "Tugas Hari Ini", v: "892" },
          { l: "Pendapatan (Bln)", v: "Rp 412M" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-3xl font-bold">{s.v}</p>
            <p className="mt-1 text-xs font-medium text-primary">+12,4% vs bulan lalu</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold">Pengguna Terbaru</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {["Andini P.", "Budi S.", "Citra R.", "Dimas H.", "Eka W."].map((n) => (
              <li
                key={n}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <span>{n}</span>
                <span className="text-muted-foreground">Baru bergabung</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold">Pemantauan Tugas</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { t: "Belanja groceries", s: "Selesai" },
              { t: "Antri bank BCA", s: "Sedang dikerjakan" },
              { t: "Kirim dokumen", s: "Menunggu" },
            ].map((i) => (
              <li
                key={i.t}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0"
              >
                <span>{i.t}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${i.s === "Selesai" ? "bg-primary/10 text-primary" : i.s === "Sedang dikerjakan" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {i.s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}

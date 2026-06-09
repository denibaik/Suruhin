import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Home, PlusCircle, History, User, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/dashboard", label: "Dasbor", icon: Home },
  { to: "/dashboard/new", label: "Permintaan Baru", icon: PlusCircle },
  { to: "/dashboard/history", label: "Riwayat", icon: History },
  { to: "/dashboard/profile", label: "Profil", icon: User },
];

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — Suruhin" }] }),
  component: DashboardPage,
});

const activeTasks = [
  { title: "Beli kopi di Starbucks SCBD", helper: "Rizky H.", status: "Dalam perjalanan", time: "10 menit lalu" },
  { title: "Antri di Bank BCA Sudirman", helper: "Dian P.", status: "Sedang dikerjakan", time: "30 menit lalu" },
];

function DashboardPage() {
  return (
    <DashboardShell items={navItems} title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Permintaan Aktif", value: "2", icon: Clock },
          { label: "Selesai", value: "24", icon: CheckCircle2 },
          { label: "Total Pengeluaran", value: "Rp 1.2M", icon: User },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Permintaan Aktif</h2>
        <Button asChild variant="hero"><Link to="/dashboard/new"><PlusCircle className="h-4 w-4" /> Permintaan Baru</Link></Button>
      </div>
      <div className="mt-4 space-y-3">
        {activeTasks.map((t) => (
          <div key={t.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-muted-foreground">Helper: {t.helper} · {t.time}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{t.status}</span>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
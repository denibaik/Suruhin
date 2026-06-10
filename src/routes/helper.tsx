import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Briefcase, ListChecks, Wallet, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/helper", label: "Tugas Tersedia", icon: Briefcase },
  { to: "/helper", label: "Tugas Diterima", icon: ListChecks },
  { to: "/helper", label: "Pendapatan", icon: Wallet },
  { to: "/helper", label: "Verifikasi KTP", icon: ShieldCheck },
];

export const Route = createFileRoute("/helper")({
  head: () => ({ meta: [{ title: "Dasbor Helper — Suruhin" }] }),
  component: HelperPage,
});

const tasks = [
  { title: "Beli kue ulang tahun", location: "Kemang", budget: "Rp 150.000", distance: "1.2 km" },
  {
    title: "Antri di Imigrasi Jakpus",
    location: "Menteng",
    budget: "Rp 250.000",
    distance: "3.4 km",
  },
  { title: "Print & jilid skripsi", location: "Depok", budget: "Rp 80.000", distance: "5.1 km" },
];

function HelperPage() {
  return (
    <DashboardShell items={navItems} title="Dasbor Helper">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Pendapatan Hari Ini", v: "Rp 320.000" },
          { l: "Tugas Selesai", v: "58" },
          { l: "Rating", v: "4.9 ★" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-3xl font-bold">{s.v}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-8 text-xl font-semibold">Tugas Tersedia di Sekitar</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {tasks.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/40 hover:shadow-card"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{t.title}</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t.budget}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {t.location} · {t.distance}
            </p>
            <Button variant="hero" className="mt-4 w-full">
              Terima Tugas
            </Button>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

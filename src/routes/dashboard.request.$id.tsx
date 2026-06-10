import { createFileRoute, Link } from "@tanstack/react-router";
import type { ElementType } from "react";
import { DashboardShell } from "@/components/site/DashboardShell";
import {
  Home,
  PlusCircle,
  History,
  User,
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  Clock,
  CheckCircle2,
  Package,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/dashboard", label: "Dasbor", icon: Home },
  { to: "/dashboard/new", label: "Permintaan Baru", icon: PlusCircle },
  { to: "/dashboard/history", label: "Riwayat", icon: History },
  { to: "/dashboard/profile", label: "Profil", icon: User },
];

export const Route = createFileRoute("/dashboard/request/$id")({
  head: () => ({ meta: [{ title: "Detail Permintaan — Suruhin" }] }),
  component: RequestDetailPage,
});

const mockRequest = {
  title: "Beli kopi di Starbucks SCBD",
  category: "Belanja & Antar",
  location: "Starbucks SCBD, Jakarta Selatan",
  budget: "Rp 85.000",
  date: "10 Jun 2026, 14:30 WIB",
  status: 1, // 0=Diterima, 1=Dikerjakan, 2=Selesai, 3=Dibayar
  helper: {
    name: "Rizky Handoko",
    avatar: "RH",
    rating: 4.9,
    reviews: 128,
    phone: "+62 812-3456-7890",
  },
};

const timelineSteps = [
  { label: "Diterima", icon: CheckCircle2 },
  { label: "Dikerjakan", icon: Package },
  { label: "Selesai", icon: CheckCircle2 },
  { label: "Dibayar", icon: CheckCircle2 },
];

function RequestDetailPage() {
  const { id } = Route.useParams();
  const req = mockRequest;
  const currentStep = req.status;

  return (
    <DashboardShell items={navItems} title="Detail Permintaan">
      {/* Back button */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dasbor
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content — left/center */}
        <div className="space-y-6 lg:col-span-2">
          {/* Task info card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {req.category}
                </span>
                <h2 className="mt-3 text-xl font-bold">{req.title}</h2>
              </div>
              <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Sedang Dikerjakan
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoRow icon={MapPin} label="Lokasi" value={req.location} />
              <InfoRow icon={Clock} label="Waktu" value={req.date} />
              <InfoRow icon={Package} label="Budget" value={req.budget} />
              <InfoRow icon={CheckCircle2} label="ID Permintaan" value={`#${id}`} />
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="mb-6 font-semibold">Status Pengerjaan</h3>
            <div className="relative flex items-start justify-between gap-2">
              {/* Progress bar background */}
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />
              {/* Progress bar fill */}
              <div
                className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${(currentStep / (timelineSteps.length - 1)) * 100}%` }}
              />

              {timelineSteps.map((step, idx) => {
                const done = idx <= currentStep;
                const active = idx === currentStep;
                return (
                  <div
                    key={step.label}
                    className="relative z-10 flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                        done
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                      } ${active ? "ring-4 ring-primary/20" : ""}`}
                    >
                      <step.icon className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={`text-center text-xs font-medium ${
                        done ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar — Helper card + actions */}
        <div className="space-y-6">
          {/* Helper card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="mb-4 font-semibold">Helper Kamu</h3>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/60 text-lg font-bold text-primary-foreground">
                {req.helper.avatar}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{req.helper.name}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{req.helper.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({req.helper.reviews} ulasan)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="truncate">{req.helper.phone}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href={`tel:${req.helper.phone}`}>
                <MessageCircle className="h-4 w-4" />
                Hubungi Helper
              </a>
            </Button>
            <Button variant="hero" className="w-full gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Selesaikan Tugas
            </Button>
          </div>

          {/* Quick info */}
          <div className="rounded-2xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
            Klik <strong className="text-foreground">Selesaikan Tugas</strong> setelah Helper
            menyelesaikan tugasnya. Dana akan dilepaskan ke Helper setelah konfirmasi.
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { getAdminStatus } from "@/lib/api/admin-auth.functions";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ListChecks,
  LayoutTemplate,
  BarChart3,
  Search,
  Eye,
  Star,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const adminNavItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
  { to: "/admin/landing", label: "Landing Page", icon: LayoutTemplate },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export const Route = createFileRoute("/admin/helpers")({
  beforeLoad: async () => {
    const admin = await getAdminStatus();
    if (!admin.isAdmin) throw redirect({ to: "/admin/login" });
  },
  head: () => ({ meta: [{ title: "Helper — Admin Suruhin" }] }),
  component: AdminHelpersPage,
});

type VerificationStatus = "Terverifikasi" | "Menunggu" | "Ditolak";

interface DummyHelper {
  id: number;
  nama: string;
  rating: number;
  tasksDone: number;
  joined: string;
  status: VerificationStatus;
}

const dummyHelpers: DummyHelper[] = [
  {
    id: 1,
    nama: "Rizky Hidayat",
    rating: 4.9,
    tasksDone: 312,
    joined: "5 Des 2024",
    status: "Terverifikasi",
  },
  {
    id: 2,
    nama: "Dian Permata",
    rating: 4.7,
    tasksDone: 198,
    joined: "10 Jan 2025",
    status: "Terverifikasi",
  },
  {
    id: 3,
    nama: "Siti Nurhaliza",
    rating: 4.5,
    tasksDone: 87,
    joined: "20 Feb 2025",
    status: "Terverifikasi",
  },
  {
    id: 4,
    nama: "Arif Budiman",
    rating: 0,
    tasksDone: 0,
    joined: "1 Apr 2025",
    status: "Menunggu",
  },
  {
    id: 5,
    nama: "Nadia Kusuma",
    rating: 0,
    tasksDone: 0,
    joined: "3 Apr 2025",
    status: "Menunggu",
  },
  {
    id: 6,
    nama: "Tono Supriyadi",
    rating: 0,
    tasksDone: 5,
    joined: "15 Mar 2025",
    status: "Ditolak",
  },
];

function StarRating({ value }: { value: number }) {
  if (value === 0) return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <span className="inline-flex items-center gap-1 font-semibold">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      {value.toFixed(1)}
    </span>
  );
}

function VerificationBadge({ status }: { status: VerificationStatus }) {
  const config: Record<VerificationStatus, { style: string; icon: ReactNode }> = {
    Terverifikasi: {
      style: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    Menunggu: {
      style: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      icon: <Clock className="h-3 w-3" />,
    },
    Ditolak: {
      style: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      icon: <XCircle className="h-3 w-3" />,
    },
  };
  const { style, icon } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}
    >
      {icon} {status}
    </span>
  );
}

function AdminHelpersPage() {
  return (
    <DashboardShell items={adminNavItems} title="Manajemen Helper">
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari helper..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-sm text-muted-foreground">{dummyHelpers.length} helper</span>
      </div>

      {/* Summary chips */}
      <div className="mt-4 flex flex-wrap gap-3">
        {(
          [
            {
              label: "Terverifikasi",
              count: dummyHelpers.filter((h) => h.status === "Terverifikasi").length,
              style: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            },
            {
              label: "Menunggu Review",
              count: dummyHelpers.filter((h) => h.status === "Menunggu").length,
              style: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            },
            {
              label: "Ditolak",
              count: dummyHelpers.filter((h) => h.status === "Ditolak").length,
              style: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            },
          ] as const
        ).map((chip) => (
          <span
            key={chip.label}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${chip.style}`}
          >
            {chip.label}: {chip.count}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Rating</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">
                  Tugas Selesai
                </th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">
                  Bergabung
                </th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">
                  Status Verifikasi
                </th>
                <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyHelpers.map((helper, idx) => (
                <tr
                  key={helper.id}
                  className={`border-b border-border last:border-0 transition hover:bg-muted/30 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}
                >
                  <td className="px-5 py-3 font-medium">{helper.nama}</td>
                  <td className="px-5 py-3">
                    <StarRating value={helper.rating} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{helper.tasksDone}</td>
                  <td className="px-5 py-3 text-muted-foreground">{helper.joined}</td>
                  <td className="px-5 py-3">
                    <VerificationBadge status={helper.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Verifikasi helper"
                        className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-background px-2.5 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Verifikasi
                      </button>
                      <button
                        title="Lihat detail"
                        className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5" /> Lihat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ListChecks,
  Search,
  Package,
} from "lucide-react";

const adminNavItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
];

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({ meta: [{ title: "Tugas — Admin Suruhin" }] }),
  component: AdminTasksPage,
});

type TaskStatus = "Menunggu" | "Dikerjakan" | "Selesai" | "Dibatalkan";

interface DummyTask {
  id: string;
  title: string;
  user: string;
  helper: string | null;
  status: TaskStatus;
  budget: string;
  date: string;
}

const dummyTasks: DummyTask[] = [
  { id: "TSK-001", title: "Beli kopi di Starbucks SCBD", user: "Andini P.", helper: "Rizky H.", status: "Selesai", budget: "Rp 85.000", date: "10 Jun 2025" },
  { id: "TSK-002", title: "Antri di Bank BCA Sudirman", user: "Budi S.", helper: "Dian P.", status: "Dikerjakan", budget: "Rp 120.000", date: "10 Jun 2025" },
  { id: "TSK-003", title: "Kirim dokumen ke kantor notaris", user: "Citra R.", helper: null, status: "Menunggu", budget: "Rp 75.000", date: "10 Jun 2025" },
  { id: "TSK-004", title: "Print & jilid skripsi Depok", user: "Dimas H.", helper: "Siti N.", status: "Selesai", budget: "Rp 60.000", date: "9 Jun 2025" },
  { id: "TSK-005", title: "Beli obat di apotek K-24", user: "Eka W.", helper: "Rizky H.", status: "Selesai", budget: "Rp 200.000", date: "9 Jun 2025" },
  { id: "TSK-006", title: "Antar paket ke JNE Kebon Jeruk", user: "Fajar N.", helper: null, status: "Dibatalkan", budget: "Rp 50.000", date: "8 Jun 2025" },
  { id: "TSK-007", title: "Beli bunga untuk dekorasi kantor", user: "Gita L.", helper: "Dian P.", status: "Dikerjakan", budget: "Rp 350.000", date: "8 Jun 2025" },
  { id: "TSK-008", title: "Belanja groceries Superindo", user: "Hendra W.", helper: null, status: "Menunggu", budget: "Rp 450.000", date: "8 Jun 2025" },
  { id: "TSK-009", title: "Bayar tagihan PLN di Alfamart", user: "Andini P.", helper: "Siti N.", status: "Selesai", budget: "Rp 40.000", date: "7 Jun 2025" },
  { id: "TSK-010", title: "Daftar antrian BPJS Kesehatan", user: "Budi S.", helper: null, status: "Dibatalkan", budget: "Rp 90.000", date: "7 Jun 2025" },
];

const statusConfig: Record<TaskStatus, string> = {
  Menunggu: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Dikerjakan: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Selesai: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Dibatalkan: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusConfig[status]}`}>
      {status}
    </span>
  );
}

const statusOrder: TaskStatus[] = ["Menunggu", "Dikerjakan", "Selesai", "Dibatalkan"];

function AdminTasksPage() {
  return (
    <DashboardShell items={adminNavItems} title="Manajemen Tugas">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statusOrder.map((s) => {
          const count = dummyTasks.filter((t) => t.status === s).length;
          return (
            <div key={s} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s}</p>
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-3xl font-bold">{count}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusConfig[s]}`}>{s}</span>
            </div>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari tugas..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-sm text-muted-foreground">{dummyTasks.length} tugas</span>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">ID</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Judul</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">User</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Helper</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Budget</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {dummyTasks.map((task, idx) => (
                <tr
                  key={task.id}
                  className={`border-b border-border last:border-0 transition hover:bg-muted/30 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}
                >
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{task.id}</td>
                  <td className="px-5 py-3 font-medium max-w-[200px] truncate" title={task.title}>
                    {task.title}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{task.user}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {task.helper ?? <span className="italic text-muted-foreground/60">Belum ada</span>}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{task.budget}</td>
                  <td className="px-5 py-3 text-muted-foreground">{task.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

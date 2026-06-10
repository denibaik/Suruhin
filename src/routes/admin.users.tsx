import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ListChecks,
  Search,
  Ban,
  Eye,
} from "lucide-react";

const adminNavItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
];

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Pengguna — Admin Suruhin" }] }),
  component: AdminUsersPage,
});

type UserStatus = "Aktif" | "Suspended";

interface DummyUser {
  id: number;
  nama: string;
  email: string;
  phone: string;
  joined: string;
  status: UserStatus;
}

const dummyUsers: DummyUser[] = [
  { id: 1, nama: "Andini Pratiwi", email: "andini@example.com", phone: "0812-3456-7890", joined: "2 Jan 2025", status: "Aktif" },
  { id: 2, nama: "Budi Santoso", email: "budi@example.com", phone: "0821-9876-5432", joined: "15 Jan 2025", status: "Aktif" },
  { id: 3, nama: "Citra Rahma", email: "citra@example.com", phone: "0857-1234-5678", joined: "20 Feb 2025", status: "Aktif" },
  { id: 4, nama: "Dimas Hendra", email: "dimas@example.com", phone: "0813-5555-6666", joined: "3 Mar 2025", status: "Suspended" },
  { id: 5, nama: "Eka Wulandari", email: "eka@example.com", phone: "0878-2222-3333", joined: "10 Mar 2025", status: "Aktif" },
  { id: 6, nama: "Fajar Nugroho", email: "fajar@example.com", phone: "0819-7777-8888", joined: "22 Mar 2025", status: "Aktif" },
  { id: 7, nama: "Gita Larasati", email: "gita@example.com", phone: "0822-4444-9999", joined: "5 Apr 2025", status: "Suspended" },
  { id: 8, nama: "Hendra Wijaya", email: "hendra@example.com", phone: "0856-0000-1111", joined: "18 Apr 2025", status: "Aktif" },
];

function StatusBadge({ status }: { status: UserStatus }) {
  const styles: Record<UserStatus, string> = {
    Aktif: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function AdminUsersPage() {
  return (
    <DashboardShell items={adminNavItems} title="Manajemen Pengguna">
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <span className="text-sm text-muted-foreground">{dummyUsers.length} pengguna</span>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Nama</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Email</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">No. HP</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Bergabung</th>
                <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`border-b border-border last:border-0 transition hover:bg-muted/30 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}
                >
                  <td className="px-5 py-3 font-medium">{user.nama}</td>
                  <td className="px-5 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{user.phone}</td>
                  <td className="px-5 py-3 text-muted-foreground">{user.joined}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Lihat detail"
                        className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5" /> Lihat
                      </button>
                      <button
                        title="Suspend pengguna"
                        className="flex items-center gap-1 rounded-lg border border-red-200 bg-background px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-900/20"
                      >
                        <Ban className="h-3.5 w-3.5" /> Suspend
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

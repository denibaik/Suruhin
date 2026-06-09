import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Home, PlusCircle, History, User, Star } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dasbor", icon: Home },
  { to: "/dashboard/new", label: "Permintaan Baru", icon: PlusCircle },
  { to: "/dashboard/history", label: "Riwayat", icon: History },
  { to: "/dashboard/profile", label: "Profil", icon: User },
];

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "Riwayat — Suruhin" }] }),
  component: HistoryPage,
});

const items = [
  { title: "Beli obat di Apotek K24", date: "12 Jun 2026", helper: "Maya S.", price: "Rp 75.000", rating: 5 },
  { title: "Kirim dokumen ke notaris", date: "08 Jun 2026", helper: "Andri R.", price: "Rp 120.000", rating: 5 },
  { title: "Antri tiket konser", date: "01 Jun 2026", helper: "Dewi L.", price: "Rp 200.000", rating: 4 },
];

function HistoryPage() {
  return (
    <DashboardShell items={navItems} title="Riwayat Permintaan">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr className="text-muted-foreground">
              <th className="p-4">Tugas</th><th className="p-4 hidden md:table-cell">Tanggal</th><th className="p-4 hidden md:table-cell">Helper</th><th className="p-4">Harga</th><th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.title} className="border-t border-border">
                <td className="p-4 font-medium">{i.title}</td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">{i.date}</td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">{i.helper}</td>
                <td className="p-4 font-semibold">{i.price}</td>
                <td className="p-4"><div className="flex gap-0.5 text-primary">{Array.from({length:i.rating}).map((_,k)=><Star key={k} className="h-4 w-4 fill-current"/>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Home, PlusCircle, History, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/dashboard", label: "Dasbor", icon: Home },
  { to: "/dashboard/new", label: "Permintaan Baru", icon: PlusCircle },
  { to: "/dashboard/history", label: "Riwayat", icon: History },
  { to: "/dashboard/profile", label: "Profil", icon: User },
];

export const Route = createFileRoute("/dashboard/new")({
  head: () => ({ meta: [{ title: "Buat Permintaan — Suruhin" }] }),
  component: NewRequestPage,
});

function NewRequestPage() {
  const navigate = useNavigate();
  return (
    <DashboardShell items={navItems} title="Buat Permintaan Baru">
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
        className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8"
      >
        <div className="grid gap-5">
          <div className="space-y-2"><Label>Judul Tugas</Label><Input placeholder="Beli kopi di Starbucks" required /></div>
          <div className="space-y-2"><Label>Deskripsi</Label><Textarea rows={4} placeholder="Tulis detail kebutuhanmu..." required /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Belanja</option><option>Antar Barang</option><option>Antri Layanan</option><option>Dokumen</option><option>Lainnya</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Lokasi</Label><Input placeholder="Jakarta Selatan" required /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Budget (Rp)</Label><Input type="number" placeholder="50000" required /></div>
            <div className="space-y-2"><Label>Tanggal & Waktu</Label><Input type="datetime-local" required /></div>
          </div>
          <Button type="submit" variant="hero" size="xl" className="mt-2">Kirim Permintaan</Button>
        </div>
      </form>
    </DashboardShell>
  );
}
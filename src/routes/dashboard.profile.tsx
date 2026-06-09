import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/site/DashboardShell";
import { Home, PlusCircle, History, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/dashboard", label: "Dasbor", icon: Home },
  { to: "/dashboard/new", label: "Permintaan Baru", icon: PlusCircle },
  { to: "/dashboard/history", label: "Riwayat", icon: History },
  { to: "/dashboard/profile", label: "Profil", icon: User },
];

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — Suruhin" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <DashboardShell items={navItems} title="Pengaturan Profil">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">SR</div>
          <div>
            <h3 className="font-semibold">Sari Rahmadhani</h3>
            <p className="text-sm text-muted-foreground">sari@email.com · Member since Jun 2026</p>
          </div>
        </div>
        <form className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nama Lengkap</Label><Input defaultValue="Sari Rahmadhani" /></div>
            <div className="space-y-2"><Label>No. HP</Label><Input defaultValue="+62 812 1234 5678" /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="sari@email.com" /></div>
          <div className="space-y-2"><Label>Alamat</Label><Input defaultValue="Jakarta Selatan" /></div>
          <Button variant="hero" size="lg">Simpan Perubahan</Button>
        </form>
      </div>
    </DashboardShell>
  );
}
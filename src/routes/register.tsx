import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Daftar — Suruhin" }, { name: "description", content: "Buat akun Suruhin secara gratis." }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "helper">("user");
  return (
    <AuthShell
      title="Buat Akunmu"
      subtitle="Bergabung dengan Suruhin dan mulai dalam hitungan detik."
      footer={<>Sudah punya akun? <Link to="/login" className="font-semibold text-primary hover:underline">Masuk</Link></>}
    >
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
        {(["user", "helper"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded-lg py-2 text-sm font-medium transition ${role === r ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
          >
            {r === "user" ? "Sebagai User" : "Sebagai Helper"}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: role === "helper" ? "/helper" : "/dashboard" }); }}
        className="space-y-4"
      >
        <div className="space-y-2"><Label htmlFor="name">Nama Lengkap</Label><Input id="name" required /></div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
        <div className="space-y-2"><Label htmlFor="phone">No. HP</Label><Input id="phone" type="tel" required /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" required /></div>
        <Button type="submit" variant="hero" size="xl" className="w-full">Buat Akun</Button>
      </form>
    </AuthShell>
  );
}
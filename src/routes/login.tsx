import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Masuk — Suruhin" }, { name: "description", content: "Masuk ke akun Suruhin kamu." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AuthShell
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk mengelola permintaan dan helper-mu."
      footer={<>Belum punya akun? <Link to="/register" className="font-semibold text-primary hover:underline">Daftar sekarang</Link></>}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="kamu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="rounded" /> Ingat Saya</label>
          <a href="#" className="text-primary hover:underline">Lupa Password?</a>
        </div>
        <Button type="submit" variant="hero" size="xl" className="w-full">Masuk</Button>
      </form>
    </AuthShell>
  );
}
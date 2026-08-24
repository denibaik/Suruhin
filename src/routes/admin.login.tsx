import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminStatus, loginAdmin } from "@/lib/api/admin-auth.functions";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    const status = await getAdminStatus();
    if (status.isAdmin) throw redirect({ to: "/admin" });
  },
  head: () => ({ meta: [{ title: "Login Admin — Suruhin" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Akses Admin"
      subtitle="Masuk dengan akun administrator Suruhin."
      footer={<span>Area ini hanya untuk administrator resmi.</span>}
    >
      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          try {
            const result = await loginAdmin({ data: { email, password } });
            if (!result.ok) {
              toast.error("Email atau password admin salah.");
              return;
            }
            await navigate({ to: "/admin" });
          } catch (error) {
            console.error(error);
            toast.error("Login admin belum dikonfigurasi di server.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email admin</Label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
          {loading ? "Memverifikasi..." : "Masuk sebagai Admin"}
        </Button>
      </form>
    </AuthShell>
  );
}

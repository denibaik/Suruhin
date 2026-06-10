import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/site/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Lupa Password — Suruhin" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <AuthShell
      title="Lupa Password?"
      subtitle="Masukkan emailmu dan kami akan kirimkan link untuk reset password."
      footer={
        <>
          Ingat password?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Masuk
          </Link>
        </>
      }
    >
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="kamu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">
            Kirim Link Reset
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Email Terkirim!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Email reset password telah dikirim ke{" "}
              <span className="font-medium text-foreground">{email}</span>.
              Cek inbox kamu.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Tidak menerima email? Periksa folder spam atau{" "}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline"
            >
              coba lagi
            </button>
            .
          </p>
        </div>
      )}
    </AuthShell>
  );
}

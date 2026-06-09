import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-cta p-12 text-white lg:flex">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <Logo className="[&_span]:text-white relative" />
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Suruh Apa Saja,<br />Kami yang Bantu.</h2>
          <p className="mt-4 max-w-md text-white/70">Bergabung dengan ribuan pengguna yang mempercayakan kebutuhan harian mereka pada Suruhin.</p>
        </div>
        <p className="relative text-sm text-white/50">© {new Date().getFullYear()} Suruhin</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden"><Logo /></Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight lg:mt-0">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}
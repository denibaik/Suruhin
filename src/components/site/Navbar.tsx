import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const links = [
  { href: "#home", label: "Beranda" },
  { href: "#features", label: "Fitur" },
  { href: "#how", label: "Cara Kerja" },
  { href: "#testimonials", label: "Testimoni" },
  { href: "#contact", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost">
            <Link to="/login" data-analytics-cta="nav_login_desktop">
              Masuk
            </Link>
          </Button>
          <Button asChild variant="hero">
            <Link to="/register" data-analytics-cta="nav_register_desktop">
              Mulai
            </Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login" data-analytics-cta="nav_login_mobile">
                  Masuk
                </Link>
              </Button>
              <Button asChild variant="hero" className="flex-1">
                <Link to="/register" data-analytics-cta="nav_register_mobile">
                  Daftar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

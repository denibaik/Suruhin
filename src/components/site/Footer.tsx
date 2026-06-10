import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo className="[&_span]:text-white" />
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Platform personal assistant on-demand untuk kebutuhan harianmu.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-primary">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Pers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Dukungan</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-primary">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">
                  Syarat Layanan
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@suruhin.id
              </li>
              <li>Jakarta, Indonesia</li>
              <li>+62 812 3456 7890</li>
            </ul>
            <Link
              to="/register"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Gabung Suruhin
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Suruhin. Hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}

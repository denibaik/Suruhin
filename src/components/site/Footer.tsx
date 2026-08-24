import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { defaultLandingContent, type FooterContent } from "./landing-content";
import { Logo } from "./Logo";

const socialIcons = { Facebook, Instagram, Twitter, Linkedin } as const;

export function Footer({ content = defaultLandingContent.footer }: { content?: FooterContent }) {
  const socials = [
    { name: "Facebook", url: content.facebookUrl },
    { name: "Instagram", url: content.instagramUrl },
    { name: "Twitter", url: content.twitterUrl },
    { name: "Linkedin", url: content.linkedinUrl },
  ].filter((social) => social.url);

  return (
    <footer
      id="contact"
      className="border-t border-border bg-secondary text-secondary-foreground"
      data-analytics-section="footer"
    >
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo className="[&_span]:text-white" />
            <p className="mt-4 max-w-xs text-sm text-white/70">{content.description}</p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((social) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#about" className="hover:text-primary">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary">
                  Testimoni
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Dukungan</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#faq" className="hover:text-primary">
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
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {content.email}
              </li>
              <li>{content.location}</li>
              <li>{content.phone}</li>
            </ul>
            <Link
              to="/register"
              data-analytics-cta="footer_register"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Gabung Suruhin
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {content.copyright}
        </div>
      </div>
    </footer>
  );
}

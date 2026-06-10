import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/suruhin-logo.png";

export function Logo({
  className = "",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Suruhin — Beranda"
    >
      <img src={logoMark} alt="Suruhin" className="h-12 w-12 object-contain shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-extrabold text-3xl tracking-tight text-[#0F2A82] dark:text-foreground">
          Suruhin
        </span>
        {showTagline && (
          <span className="text-[11px] sm:text-sm font-medium text-primary mt-1">
            Suruh Apa Saja, Beres.
          </span>
        )}
      </span>
    </Link>
  );
}

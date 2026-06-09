import { Link } from "@tanstack/react-router";

/**
 * Logo mark menggunakan SVG inline agar tidak bergantung pada
 * Lovable CDN (/__l5e/assets-v1/...) yang tidak jalan di luar
 * environment Lovable.
 *
 * Untuk mengganti dengan logo asli:
 * 1. Download logo dari Lovable → simpan ke src/assets/suruhin-mark.png
 * 2. Ganti <LogoMark> di bawah dengan: <img src={logoMark} className="h-12 w-12 object-contain shrink-0" alt="" />
 */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#0F2A82" />
      {/* Huruf "S" sebagai path agar konsisten di semua browser */}
      <text
        x="24"
        y="24"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, Arial, sans-serif"
      >
        S
      </text>
    </svg>
  );
}

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
      <LogoMark className="h-12 w-12 shrink-0" />
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

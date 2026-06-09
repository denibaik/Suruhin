import { FileText, UserCheck, PackageCheck, Star } from "lucide-react";

const steps = [
  { icon: FileText, title: "Buat Permintaan", desc: "Jelaskan apa yang kamu butuhkan — judul, lokasi, budget, dan tanggal." },
  { icon: UserCheck, title: "Helper Menerima", desc: "Helper terpercaya menerima dan mengonfirmasi tugasmu dalam hitungan menit." },
  { icon: PackageCheck, title: "Tugas Selesai", desc: "Helper menyelesaikan tugas. Pantau progres secara langsung." },
  { icon: Star, title: "Beri Rating", desc: "Beri rating untuk membantu menjaga kualitas komunitas kami." },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-muted/40 py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Cara Kerja</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Dapatkan bantuan dalam 4 langkah mudah</h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="rounded-2xl bg-card p-6 shadow-soft transition hover:shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-5xl font-extrabold text-muted-foreground/20">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
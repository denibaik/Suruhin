import { Clock, Layers, Tag, Lock } from "lucide-react";

const benefits = [
  { icon: Clock, title: "Hemat Waktu", desc: "Serahkan urusan dan fokus pada hal yang penting." },
  { icon: Layers, title: "Layanan Fleksibel", desc: "Dari belanja hingga dokumen — semua bisa." },
  { icon: Tag, title: "Harga Transparan", desc: "Ketahui biaya di awal, tanpa biaya tersembunyi." },
  { icon: Lock, title: "Transaksi Aman", desc: "Pembayaran terlindungi dengan jaminan pengembalian dana penuh." },
];

export function Benefits() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Keunggulan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Mengapa memilih Suruhin?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Dirancang untuk mahasiswa, profesional, dan komunitas perkotaan yang ingin menyelesaikan lebih banyak hal tanpa stres.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
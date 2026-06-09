import { ClipboardList, Zap, ShieldCheck, MapPin, MessageCircle, Star } from "lucide-react";

const features = [
  { icon: ClipboardList, title: "Permintaan Kustom", desc: "Buat tugas apa pun yang kamu butuhkan — dari belanja kebutuhan hingga antri layanan." },
  { icon: Zap, title: "Respon Cepat", desc: "Helper merespons dalam hitungan menit sehingga tugasmu langsung dikerjakan." },
  { icon: ShieldCheck, title: "Helper Terpercaya", desc: "Setiap helper telah terverifikasi dan dinilai oleh komunitas." },
  { icon: MapPin, title: "Lacak Langsung", desc: "Pantau perkembangan helper secara langsung di peta." },
  { icon: MessageCircle, title: "Chat Langsung", desc: "Chat bawaan untuk berkoordinasi langsung dengan helper." },
  { icon: Star, title: "Rating & Ulasan", desc: "Beri nilai setiap tugas dan bantu jaga kualitas layanan terbaik." },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Fitur</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Semua yang kamu butuhkan dalam satu aplikasi</h2>
          <p className="mt-4 text-lg text-muted-foreground">Fitur canggih yang dirancang untuk mempermudah kehidupan sehari-harimu.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-primary/40"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
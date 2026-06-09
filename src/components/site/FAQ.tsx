import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Apa itu Suruhin?", a: "Suruhin adalah platform personal assistant on-demand yang menghubungkan kamu dengan helper terpercaya untuk berbagai kebutuhan harian." },
  { q: "Bagaimana cara membuat request?", a: "Daftar akun, klik 'Buat Permintaan', isi detail tugas dan budget, lalu tunggu helper menerima." },
  { q: "Apakah helper-nya aman dan terpercaya?", a: "Semua helper kami melalui proses verifikasi identitas dan memiliki sistem rating dari komunitas." },
  { q: "Bagaimana sistem pembayaran?", a: "Pembayaran dilakukan secara cashless melalui platform, dengan jaminan keamanan dan refund jika tugas tidak selesai." },
  { q: "Apakah saya bisa jadi helper?", a: "Tentu! Daftarkan diri sebagai helper, lengkapi verifikasi, dan mulai dapatkan penghasilan tambahan." },
];

export function FAQ() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Pertanyaan yang sering ditanyakan</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
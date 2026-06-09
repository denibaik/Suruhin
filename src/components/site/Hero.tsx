import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-helper.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2 lg:py-32">
        <div className="flex flex-col justify-center animate-fade-in">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Asisten Pribadi On-Demand
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Suruh Apa Saja, <span className="bg-gradient-primary bg-clip-text text-transparent">Kami yang Bantu.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Platform personal assistant on-demand untuk membantu kebutuhan harianmu dengan cepat, aman, dan praktis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/dashboard/new">
                Buat Permintaan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineHero" size="xl">
              <a href="#how">Pelajari Lebih Lanjut</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div><span className="text-2xl font-bold text-foreground">10K+</span><br />Pengguna Aktif</div>
            <div><span className="text-2xl font-bold text-foreground">5K+</span><br />Helper Terpercaya</div>
            <div><span className="text-2xl font-bold text-foreground">4.9★</span><br />Rating Rata-rata</div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl" />
          <img
            src={heroImg}
            alt="Helper Suruhin membantu pelanggan dengan belanja dan pengantaran"
            width={1024}
            height={1024}
            className="relative w-full max-w-lg drop-shadow-2xl animate-scale-in"
          />
        </div>
      </div>
    </section>
  );
}
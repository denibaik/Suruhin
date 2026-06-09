import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-cta p-10 text-center shadow-card md:p-16">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Siap mempermudah hidupmu?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Bergabung dengan 10.000+ pengguna yang mempercayai Suruhin setiap hari untuk menyelesaikan tugas.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <Link to="/register">
                Mulai Gunakan Suruhin <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
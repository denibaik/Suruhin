import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Benefits } from "@/components/site/Benefits";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { getLandingContent } from "@/lib/api/landing.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Suruhin — Suruh Apa Saja, Kami yang Bantu" },
      {
        name: "description",
        content:
          "Platform personal assistant on-demand untuk membantu kebutuhan harianmu dengan cepat, aman, dan praktis.",
      },
      { property: "og:title", content: "Suruhin — Asisten Pribadi On-Demand" },
      {
        property: "og:description",
        content:
          "Suruh apa saja — belanja, antar barang, antri layanan, urus dokumen. Helper terpercaya siap bantu.",
      },
    ],
  }),
  // Loader dijalankan server-side saat SSR dan client-side saat navigasi,
  // sehingga konten yang diedit dari /admin/landing langsung tampil.
  loader: async () => getLandingContent(),
  component: Index,
});

function Index() {
  const content = Route.useLoaderData();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero content={content.hero} />
        <Features heading={content.features.heading} items={content.features.items} />
        <HowItWorks heading={content.howItWorks.heading} steps={content.howItWorks.steps} />
        <Benefits heading={content.benefits.heading} items={content.benefits.items} />
        <Testimonials heading={content.testimonials.heading} items={content.testimonials.items} />
        <FAQ heading={content.faq.heading} items={content.faq.items} />
        <FinalCTA content={content.finalCta} />
      </main>
      <Footer />
    </div>
  );
}

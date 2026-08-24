import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { About } from "@/components/site/About";
import { LandingAnalytics } from "@/components/site/LandingAnalytics";
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
      { title: "Suruhin — Teman Pendamping On-Demand yang Selalu Ada" },
      {
        name: "description",
        content:
          "Butuh teman menemani sidang skripsi, pulang malam, atau menemani ke rumah sakit? Suruhin menghubungkanmu dengan pendamping terverifikasi agar kamu tak pernah sendirian.",
      },
      { property: "og:title", content: "Suruhin — Teman Pendamping On-Demand" },
      {
        property: "og:description",
        content:
          "Temani sidang skripsi, pulang malam aman dari klitih, atau menemani aktivitas harianmu. Pendamping terpercaya siap menemani.",
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
  const themeStyle = {
    "--primary": content.theme.primaryColor,
    "--secondary": content.theme.secondaryColor,
    "--landing-primary": content.theme.primaryColor,
    "--landing-secondary": content.theme.secondaryColor,
    "--landing-radius": content.theme.borderRadius,
    backgroundColor: content.theme.backgroundColor,
    color: content.theme.textColor,
    fontFamily: content.theme.fontFamily,
  } as CSSProperties;
  return (
    <div
      className="landing-theme flex min-h-screen flex-col bg-background"
      style={themeStyle}
      data-button-style={content.theme.buttonStyle}
    >
      <LandingAnalytics />
      <Navbar />
      <main className="flex-1">
        <Hero content={content.hero} />
        <About content={content.about} />
        <Features heading={content.features.heading} items={content.features.items} />
        <HowItWorks heading={content.howItWorks.heading} steps={content.howItWorks.steps} />
        <Benefits heading={content.benefits.heading} items={content.benefits.items} />
        <Testimonials heading={content.testimonials.heading} items={content.testimonials.items} />
        <FAQ heading={content.faq.heading} items={content.faq.items} />
        <FinalCTA content={content.finalCta} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}

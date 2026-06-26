import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { defaultLandingContent, type LandingContent } from "@/components/site/landing-content";

// In-memory store untuk konten landing page.
// Catatan: ini di-reset setiap restart server. Untuk produksi, ganti
// dengan database/persistent storage. cukup gunakan pola ini sebagai
// placeholder agar fitur editor langsung bisa dicoba tanpa setup DB.

let landingContent: LandingContent = structuredClone(defaultLandingContent);

export const getLandingContent = createServerFn({ method: "GET" }).handler(async () => {
  return landingContent;
});

// Validator rekursif fleksibel: setiap object/array diterima apa adanya
// selagi bertipe object (struktur diperiksa oleh tipe LandingContent di sisi
// klien). Ini menghindari duplikasi seluruh skema zod yang panjang.
const flexibleRecord = z.record(z.any());
const landingSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    titleHighlight: z.string(),
    subtitle: z.string(),
    primaryCta: z.string(),
    primaryCtaHref: z.string(),
    secondaryCta: z.string(),
    secondaryCtaHref: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
  features: z.object({
    heading: z.object({ eyebrow: z.string(), title: z.string(), subtitle: z.string().optional() }),
    items: z.array(flexibleRecord),
  }),
  howItWorks: z.object({
    heading: z.object({ eyebrow: z.string(), title: z.string(), subtitle: z.string().optional() }),
    steps: z.array(flexibleRecord),
  }),
  benefits: z.object({
    heading: z.object({ eyebrow: z.string(), title: z.string(), subtitle: z.string().optional() }),
    items: z.array(flexibleRecord),
  }),
  testimonials: z.object({
    heading: z.object({ eyebrow: z.string(), title: z.string(), subtitle: z.string().optional() }),
    items: z.array(flexibleRecord),
  }),
  faq: z.object({
    heading: z.object({ eyebrow: z.string(), title: z.string(), subtitle: z.string().optional() }),
    items: z.array(flexibleRecord),
  }),
  finalCta: z.object({
    title: z.string(),
    subtitle: z.string(),
    cta: z.string(),
    ctaHref: z.string(),
  }),
});

export const saveLandingContent = createServerFn({ method: "POST" })
  .inputValidator(landingSchema)
  .handler(async ({ data }) => {
    landingContent = data as LandingContent;
    return { ok: true as const };
  });

export const resetLandingContent = createServerFn({ method: "POST" }).handler(async () => {
  landingContent = structuredClone(defaultLandingContent);
  return { ok: true as const };
});

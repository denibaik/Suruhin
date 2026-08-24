import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth.server";
import {
  listLandingRevisions,
  publishLanding,
  readLandingDocument,
  readPublishedLandingContent,
  resetLandingContentStore,
  saveLandingDraft,
  unpublishLanding,
} from "@/lib/landing-store.server";

const text = (max: number) => z.string().trim().max(max);
const href = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => value.startsWith("/") || value.startsWith("#") || /^https:\/\//i.test(value),
    "URL harus berupa path internal, anchor, atau HTTPS.",
  );
const imageUrl = z
  .string()
  .trim()
  .max(1000)
  .refine(
    (value) => value === "" || /^https:\/\//i.test(value),
    "Gambar harus menggunakan URL HTTPS.",
  );
const heading = z.object({ eyebrow: text(80), title: text(180), subtitle: text(400).optional() });
const iconItem = z.object({ icon: text(40), title: text(120), desc: text(500) });

export const landingSchema = z.object({
  hero: z.object({
    badge: text(100),
    imageUrl,
    title: text(180),
    titleHighlight: text(180),
    subtitle: text(500),
    primaryCta: text(80),
    primaryCtaHref: href,
    secondaryCta: text(80),
    secondaryCtaHref: href,
    stats: z.array(z.object({ value: text(30), label: text(80) })).max(6),
  }),
  about: z.object({ eyebrow: text(80), title: text(180), description: text(1000), imageUrl }),
  features: z.object({ heading, items: z.array(iconItem).max(12) }),
  howItWorks: z.object({ heading, steps: z.array(iconItem).max(8) }),
  benefits: z.object({ heading, items: z.array(iconItem).max(8) }),
  testimonials: z.object({
    heading,
    items: z
      .array(z.object({ name: text(100), role: text(120), quote: text(600), initials: text(3) }))
      .max(8),
  }),
  faq: z.object({
    heading,
    items: z.array(z.object({ q: text(240), a: text(1200) })).max(15),
  }),
  finalCta: z.object({ title: text(180), subtitle: text(500), cta: text(80), ctaHref: href }),
  footer: z.object({
    description: text(500),
    email: z.string().email().max(160),
    phone: text(40),
    location: text(120),
    copyright: text(180),
    facebookUrl: imageUrl,
    instagramUrl: imageUrl,
    twitterUrl: imageUrl,
    linkedinUrl: imageUrl,
  }),
  theme: z.object({
    primaryColor: z.string().regex(/^#[0-9a-f]{6}$/i),
    secondaryColor: z.string().regex(/^#[0-9a-f]{6}$/i),
    backgroundColor: z.string().regex(/^#[0-9a-f]{6}$/i),
    textColor: z.string().regex(/^#[0-9a-f]{6}$/i),
    fontFamily: z.enum(["Inter", "Arial", "Georgia", "system-ui"]),
    borderRadius: z.enum(["0.5rem", "0.75rem", "1rem", "1.5rem"]),
    buttonStyle: z.enum(["solid", "soft", "outline"]),
  }),
});

export const getLandingContent = createServerFn({ method: "GET" }).handler(async () =>
  readPublishedLandingContent(),
);

export const getLandingEditor = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const [document, revisions] = await Promise.all([readLandingDocument(), listLandingRevisions()]);
  return { document, revisions };
});

export const saveLandingContent = createServerFn({ method: "POST" })
  .inputValidator(landingSchema)
  .handler(async ({ data }) => {
    const admin = await requireAdmin();
    return saveLandingDraft(data, admin.email ?? "admin");
  });

export const publishLandingContent = createServerFn({ method: "POST" })
  .inputValidator(landingSchema)
  .handler(async ({ data }) => {
    const admin = await requireAdmin();
    return publishLanding(data, admin.email ?? "admin");
  });

export const unpublishLandingContent = createServerFn({ method: "POST" }).handler(async () => {
  const admin = await requireAdmin();
  return unpublishLanding(admin.email ?? "admin");
});

export const resetLandingContent = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  return resetLandingContentStore();
});

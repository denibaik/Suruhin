import type { CSSProperties } from "react";
import type { LandingContent } from "@/components/site/landing-content";

export function LandingPreview({ content }: { content: LandingContent }) {
  const style = {
    "--primary": content.theme.primaryColor,
    "--secondary": content.theme.secondaryColor,
    "--landing-radius": content.theme.borderRadius,
    backgroundColor: content.theme.backgroundColor,
    color: content.theme.textColor,
    fontFamily: content.theme.fontFamily,
  } as CSSProperties;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
      <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
        Live Preview — perubahan ini belum publik sampai tombol Publish ditekan
      </div>
      <div className="max-h-[680px] overflow-y-auto" style={style}>
        <section className="grid gap-5 bg-gradient-hero p-8 md:grid-cols-2">
          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {content.hero.badge}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold">
              {content.hero.title}{" "}
              <span className="text-primary">{content.hero.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{content.hero.subtitle}</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-[var(--landing-radius)] bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                {content.hero.primaryCta}
              </span>
              <span className="rounded-[var(--landing-radius)] border border-primary px-4 py-2 text-xs font-semibold text-primary">
                {content.hero.secondaryCta}
              </span>
            </div>
          </div>
          {content.hero.imageUrl && (
            <img
              src={content.hero.imageUrl}
              alt="Hero preview"
              className="aspect-video w-full rounded-[var(--landing-radius)] object-cover"
            />
          )}
        </section>
        <section className="p-8">
          <p className="text-xs font-semibold uppercase text-primary">{content.about.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold">{content.about.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{content.about.description}</p>
        </section>
        <section className="bg-muted/40 p-8">
          <p className="text-xs font-semibold uppercase text-primary">
            {content.features.heading.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold">{content.features.heading.title}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {content.features.items.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-[var(--landing-radius)] border bg-card p-4"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="p-8 text-center">
          <h2 className="text-2xl font-bold">{content.finalCta.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{content.finalCta.subtitle}</p>
          <span className="mt-4 inline-block rounded-[var(--landing-radius)] bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            {content.finalCta.cta}
          </span>
        </section>
      </div>
    </div>
  );
}

import {
  defaultLandingContent,
  type BenefitContent,
  type BenefitItem,
  type SectionHeading,
} from "./landing-content";
import { resolveIcon } from "./landing-icons";

interface BenefitsProps {
  heading?: SectionHeading;
  items?: BenefitItem[];
}

export function Benefits({
  heading = defaultLandingContent.benefits.heading,
  items = defaultLandingContent.benefits.items,
}: BenefitsProps) {
  return (
    <section id="benefits" className="py-20 lg:py-28" data-analytics-section="benefits">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {heading.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{heading.title}</h2>
            {heading.subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{heading.subtitle}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((b, i) => {
              const Icon = resolveIcon(b.icon);
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-card"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export type { BenefitContent };

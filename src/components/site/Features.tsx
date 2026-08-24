import { defaultLandingContent, type FeatureItem, type SectionHeading } from "./landing-content";
import { resolveIcon } from "./landing-icons";

interface FeaturesProps {
  heading?: SectionHeading;
  items?: FeatureItem[];
}

export function Features({
  heading = defaultLandingContent.features.heading,
  items = defaultLandingContent.features.items,
}: FeaturesProps) {
  return (
    <section id="features" className="py-20 lg:py-28" data-analytics-section="features">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {heading.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{heading.title}</h2>
          {heading.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{heading.subtitle}</p>
          )}
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => {
            const Icon = resolveIcon(f.icon);
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-primary/40"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

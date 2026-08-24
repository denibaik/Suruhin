import { defaultLandingContent, type HowItWorksStep, type SectionHeading } from "./landing-content";
import { resolveIcon } from "./landing-icons";

interface HowItWorksProps {
  heading?: SectionHeading;
  steps?: HowItWorksStep[];
}

export function HowItWorks({
  heading = defaultLandingContent.howItWorks.heading,
  steps = defaultLandingContent.howItWorks.steps,
}: HowItWorksProps) {
  return (
    <section id="how" className="bg-muted/40 py-20 lg:py-28" data-analytics-section="how_it_works">
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
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = resolveIcon(s.icon);
            return (
              <div key={i} className="relative">
                <div className="rounded-2xl bg-card p-6 shadow-soft transition hover:shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-5xl font-extrabold text-muted-foreground/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

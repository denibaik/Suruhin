import { Star } from "lucide-react";
import {
  defaultLandingContent,
  type SectionHeading,
  type TestimonialItem,
} from "./landing-content";

interface TestimonialsProps {
  heading?: SectionHeading;
  items?: TestimonialItem[];
}

export function Testimonials({
  heading = defaultLandingContent.testimonials.heading,
  items = defaultLandingContent.testimonials.items,
}: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="bg-muted/40 py-20 lg:py-28"
      data-analytics-section="testimonials"
    >
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
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card p-8 shadow-soft transition hover:shadow-card"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

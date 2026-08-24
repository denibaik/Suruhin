import aboutFallback from "@/assets/hero-helper.jpg";
import { type AboutContent } from "./landing-content";

export function About({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="bg-muted/40 py-20 lg:py-28" data-analytics-section="about">
      <div className="container mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <img
          src={content.imageUrl || aboutFallback}
          alt={content.title}
          className="aspect-[4/3] w-full rounded-[var(--landing-radius)] object-cover shadow-card"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{content.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}

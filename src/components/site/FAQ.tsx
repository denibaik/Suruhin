import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { defaultLandingContent, type FaqItem, type SectionHeading } from "./landing-content";

interface FAQProps {
  heading?: SectionHeading;
  items?: FaqItem[];
}

export function FAQ({
  heading = defaultLandingContent.faq.heading,
  items = defaultLandingContent.faq.items,
}: FAQProps) {
  return (
    <section id="faq" className="py-20 lg:py-28" data-analytics-section="faq">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {heading.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{heading.title}</h2>
          {heading.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{heading.subtitle}</p>
          )}
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {items.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { trackAnalyticsEvents } from "@/lib/api/analytics.functions";
import type { AnalyticsEventInput, AnalyticsEventType } from "@/lib/analytics-types";

const SESSION_KEY = "suruhin.analytics.visitor";

function getVisitorId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function clientInfo() {
  const ua = navigator.userAgent;
  const device = /tablet|ipad/i.test(ua)
    ? "Tablet"
    : /mobile|android|iphone/i.test(ua)
      ? "Mobile"
      : "Desktop";
  const browser = /edg/i.test(ua)
    ? "Edge"
    : /firefox/i.test(ua)
      ? "Firefox"
      : /safari/i.test(ua) && !/chrome/i.test(ua)
        ? "Safari"
        : /chrome/i.test(ua)
          ? "Chrome"
          : "Other";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad/i.test(ua)
        ? "iOS"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Other";
  return { device, browser, os };
}

export function LandingAnalytics() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const sessionId = getVisitorId();
    const info = clientInfo();
    const viewed = new Set<string>();
    const send = (eventType: AnalyticsEventType, eventName: string) => {
      const event: AnalyticsEventInput = {
        eventId: crypto.randomUUID(),
        sessionId,
        eventType,
        eventName,
        page: window.location.pathname,
        referrer: document.referrer,
        ...info,
      };
      void trackAnalyticsEvents({ data: { events: [event] } }).catch(() => undefined);
    };

    send("page_view", "landing_page");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.analyticsSection;
          if (entry.isIntersecting && name && !viewed.has(name)) {
            viewed.add(name);
            send("section_view", name);
          }
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-analytics-section]")
      .forEach((node) => observer.observe(node));

    const clickHandler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-analytics-cta]");
      const name = target?.dataset.analyticsCta;
      if (name) send("cta_click", name);
    };
    document.addEventListener("click", clickHandler, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", clickHandler, { capture: true });
    };
  }, []);

  return null;
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth.server";
import {
  analyticsCsv,
  getAnalyticsData,
  recordAnalyticsEvents,
} from "@/lib/analytics-store.server";

const dateRange = z.object({
  from: z.string().date(),
  to: z.string().date(),
});

export const trackAnalyticsEvents = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      events: z
        .array(
          z.object({
            eventId: z.string().uuid(),
            sessionId: z.string().uuid(),
            eventType: z.enum(["page_view", "cta_click", "section_view"]),
            eventName: z.string().trim().min(1).max(80),
            page: z.string().trim().min(1).max(200),
            referrer: z.string().trim().max(500).optional(),
            device: z.string().trim().max(30).optional(),
            browser: z.string().trim().max(30).optional(),
            os: z.string().trim().max(30).optional(),
          }),
        )
        .min(1)
        .max(20),
    }),
  )
  .handler(async ({ data }) => {
    try {
      await recordAnalyticsEvents(data.events);
    } catch (error) {
      console.error("Analytics ingestion failed", error);
    }
    return { ok: true as const };
  });

export const getAnalyticsDashboard = createServerFn({ method: "POST" })
  .inputValidator(dateRange)
  .handler(async ({ data }) => {
    await requireAdmin();
    return getAnalyticsData(data.from, data.to);
  });

export const exportAnalyticsCsv = createServerFn({ method: "POST" })
  .inputValidator(dateRange)
  .handler(async ({ data }) => {
    await requireAdmin();
    return { csv: await analyticsCsv(data.from, data.to) };
  });

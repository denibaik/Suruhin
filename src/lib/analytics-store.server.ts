import { getDatabase, hasDatabase } from "@/lib/db.server";
import type { AnalyticsDashboardData, AnalyticsEventInput } from "@/lib/analytics-types";

let schemaReady = false;

async function ensureSchema() {
  if (schemaReady) return;
  if (!hasDatabase()) throw new Error("DATABASE_URL diperlukan untuk analytics.");
  await getDatabase().query(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id UUID PRIMARY KEY,
      session_id UUID NOT NULL,
      event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'cta_click', 'section_view')),
      event_name TEXT NOT NULL,
      page TEXT NOT NULL,
      referrer TEXT,
      device TEXT,
      browser TEXT,
      os TEXT,
      occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS analytics_events_time_idx ON analytics_events (occurred_at);
    CREATE INDEX IF NOT EXISTS analytics_events_session_idx ON analytics_events (session_id);
    CREATE INDEX IF NOT EXISTS analytics_events_type_idx ON analytics_events (event_type, occurred_at);
  `);
  schemaReady = true;
}

export async function recordAnalyticsEvents(events: AnalyticsEventInput[]) {
  if (!hasDatabase()) return;
  await ensureSchema();
  const db = getDatabase();
  for (const event of events) {
    await db.query(
      `INSERT INTO analytics_events
        (id, session_id, event_type, event_name, page, referrer, device, browser, os)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (id) DO NOTHING`,
      [
        event.eventId,
        event.sessionId,
        event.eventType,
        event.eventName,
        event.page,
        event.referrer ?? null,
        event.device ?? "Unknown",
        event.browser ?? "Unknown",
        event.os ?? "Unknown",
      ],
    );
  }
}

const bounds = (from: string, to: string) => [from, to];

export async function getAnalyticsData(from: string, to: string): Promise<AnalyticsDashboardData> {
  if (!hasDatabase()) {
    return emptyAnalytics(from, to);
  }
  await ensureSchema();
  const db = getDatabase();
  const params = bounds(from, to);
  const where = `occurred_at >= $1::date AND occurred_at < ($2::date + interval '1 day')`;

  const [totals, daily, ctas, sources, devices, browsers, operatingSystems, sections, recent] =
    await Promise.all([
      db.query(
        `SELECT
          count(*) FILTER (WHERE event_type='page_view')::int AS page_views,
          count(DISTINCT session_id) FILTER (WHERE event_type='page_view')::int AS visitors,
          count(*) FILTER (WHERE event_type='cta_click')::int AS cta_clicks,
          count(DISTINCT e.session_id) FILTER (
            WHERE event_type='page_view' AND EXISTS (
              SELECT 1 FROM analytics_events old
              WHERE old.session_id=e.session_id AND old.event_type='page_view'
                AND old.occurred_at < $1::date
            )
          )::int AS returning
        FROM analytics_events e WHERE ${where}`,
        params,
      ),
      db.query(
        `WITH days AS (
           SELECT generate_series($1::date, $2::date, interval '1 day')::date AS day
         )
         SELECT to_char(days.day, 'YYYY-MM-DD') AS date,
           count(e.id) FILTER (WHERE e.event_type='page_view')::int AS page_views,
           count(DISTINCT e.session_id) FILTER (WHERE e.event_type='page_view')::int AS visitors
         FROM days LEFT JOIN analytics_events e
           ON (e.occurred_at AT TIME ZONE 'Asia/Jakarta')::date = days.day
         GROUP BY days.day ORDER BY days.day`,
        params,
      ),
      db.query(
        `SELECT event_name AS name, count(*)::int AS clicks FROM analytics_events
         WHERE ${where} AND event_type='cta_click' GROUP BY event_name ORDER BY clicks DESC LIMIT 10`,
        params,
      ),
      db.query(
        `SELECT CASE
           WHEN referrer IS NULL OR referrer='' THEN 'Direct'
           WHEN referrer ILIKE '%google.%' THEN 'Google'
           WHEN referrer ILIKE '%facebook.%' THEN 'Facebook'
           WHEN referrer ILIKE '%instagram.%' THEN 'Instagram'
           ELSE 'Other' END AS name, count(DISTINCT session_id)::int AS count
         FROM analytics_events WHERE ${where} AND event_type='page_view'
         GROUP BY name ORDER BY count DESC`,
        params,
      ),
      groupDimension("device", where, params),
      groupDimension("browser", where, params),
      groupDimension("os", where, params),
      db.query(
        `SELECT event_name AS name, count(*)::int AS views,
           count(DISTINCT session_id)::int AS visitors
         FROM analytics_events WHERE ${where} AND event_type='section_view'
         GROUP BY event_name ORDER BY views DESC`,
        params,
      ),
      db.query(
        `SELECT id::text, event_type, event_name, occurred_at
         FROM analytics_events WHERE ${where} ORDER BY occurred_at DESC LIMIT 12`,
        params,
      ),
    ]);

  const total = totals.rows[0];
  const pageViews = Number(total.page_views ?? 0);
  const uniqueVisitors = Number(total.visitors ?? 0);
  const ctaClicks = Number(total.cta_clicks ?? 0);
  const registrationClicks = ctas.rows
    .filter((row) => String(row.name).includes("register"))
    .reduce((sum, row) => sum + Number(row.clicks), 0);
  const requestClicks = ctas.rows
    .filter((row) => String(row.name).includes("request") || row.name === "hero_primary")
    .reduce((sum, row) => sum + Number(row.clicks), 0);

  return {
    range: { from, to },
    totals: {
      pageViews,
      uniqueVisitors,
      returningVisitors: Number(total.returning ?? 0),
      ctaClicks,
      conversionRate: uniqueVisitors ? Number(((ctaClicks / uniqueVisitors) * 100).toFixed(1)) : 0,
    },
    daily: daily.rows.map((row) => ({
      date: String(row.date),
      pageViews: Number(row.page_views),
      visitors: Number(row.visitors),
    })),
    ctas: ctas.rows.map((row) => ({ name: String(row.name), clicks: Number(row.clicks) })),
    sources: normalizeGroups(sources.rows),
    devices: normalizeGroups(devices.rows),
    browsers: normalizeGroups(browsers.rows),
    operatingSystems: normalizeGroups(operatingSystems.rows),
    sections: sections.rows.map((row) => ({
      name: String(row.name),
      views: Number(row.views),
      reachPercent: uniqueVisitors
        ? Number(((Number(row.visitors) / uniqueVisitors) * 100).toFixed(1))
        : 0,
    })),
    funnel: [
      { name: "Visitors", value: uniqueVisitors },
      { name: "Page Views", value: pageViews },
      { name: "CTA Clicks", value: ctaClicks },
      { name: "Registration", value: registrationClicks },
      { name: "Create Request", value: requestClicks },
    ],
    recent: recent.rows.map((row) => ({
      id: String(row.id),
      eventType: row.event_type,
      eventName: String(row.event_name),
      occurredAt: new Date(row.occurred_at).toISOString(),
    })),
  };
}

async function groupDimension(
  column: "device" | "browser" | "os",
  where: string,
  params: string[],
) {
  return getDatabase().query(
    `SELECT coalesce(nullif(${column}, ''), 'Unknown') AS name,
       count(DISTINCT session_id)::int AS count
     FROM analytics_events WHERE ${where} AND event_type='page_view'
     GROUP BY name ORDER BY count DESC`,
    params,
  );
}

function normalizeGroups(rows: Array<Record<string, unknown>>) {
  return rows.map((row) => ({ name: String(row.name), count: Number(row.count) }));
}

export async function analyticsCsv(from: string, to: string): Promise<string> {
  if (!hasDatabase()) return "timestamp,event_type,event_name,page,device,browser,os,referrer\n";
  await ensureSchema();
  const result = await getDatabase().query(
    `SELECT occurred_at, event_type, event_name, page, device, browser, os, referrer
     FROM analytics_events
     WHERE occurred_at >= $1::date AND occurred_at < ($2::date + interval '1 day')
     ORDER BY occurred_at DESC LIMIT 50000`,
    [from, to],
  );
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [
    "timestamp,event_type,event_name,page,device,browser,os,referrer",
    ...result.rows.map((row) =>
      [
        row.occurred_at,
        row.event_type,
        row.event_name,
        row.page,
        row.device,
        row.browser,
        row.os,
        row.referrer,
      ]
        .map(escape)
        .join(","),
    ),
  ].join("\n");
}

function emptyAnalytics(from: string, to: string): AnalyticsDashboardData {
  return {
    range: { from, to },
    totals: {
      pageViews: 0,
      uniqueVisitors: 0,
      returningVisitors: 0,
      ctaClicks: 0,
      conversionRate: 0,
    },
    daily: [],
    ctas: [],
    sources: [],
    devices: [],
    browsers: [],
    operatingSystems: [],
    sections: [],
    funnel: ["Visitors", "Page Views", "CTA Clicks", "Registration", "Create Request"].map(
      (name) => ({ name, value: 0 }),
    ),
    recent: [],
  };
}

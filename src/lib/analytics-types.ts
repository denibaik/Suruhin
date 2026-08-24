export type AnalyticsEventType = "page_view" | "cta_click" | "section_view";
export type DatePreset = "today" | "yesterday" | "7d" | "30d" | "month" | "custom";

export interface AnalyticsEventInput {
  eventId: string;
  sessionId: string;
  eventType: AnalyticsEventType;
  eventName: string;
  page: string;
  referrer?: string;
  device?: string;
  browser?: string;
  os?: string;
}

export interface AnalyticsDashboardData {
  range: { from: string; to: string };
  totals: {
    pageViews: number;
    uniqueVisitors: number;
    returningVisitors: number;
    ctaClicks: number;
    conversionRate: number;
  };
  daily: Array<{ date: string; pageViews: number; visitors: number }>;
  ctas: Array<{ name: string; clicks: number }>;
  sources: Array<{ name: string; count: number }>;
  devices: Array<{ name: string; count: number }>;
  browsers: Array<{ name: string; count: number }>;
  operatingSystems: Array<{ name: string; count: number }>;
  sections: Array<{ name: string; views: number; reachPercent: number }>;
  funnel: Array<{ name: string; value: number }>;
  recent: Array<{
    id: string;
    eventType: AnalyticsEventType;
    eventName: string;
    occurredAt: string;
  }>;
}

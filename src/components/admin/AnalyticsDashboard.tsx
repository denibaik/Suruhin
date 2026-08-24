import { useState } from "react";
import { Download, Eye, MousePointerClick, Percent, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { exportAnalyticsCsv, getAnalyticsDashboard } from "@/lib/api/analytics.functions";
import type { AnalyticsDashboardData } from "@/lib/analytics-types";

const palette = ["var(--primary)", "var(--secondary)", "#f59e0b", "#8b5cf6", "#06b6d4"];

export function AnalyticsDashboard({ initial }: { initial: AnalyticsDashboardData }) {
  const [data, setData] = useState(initial);
  const [from, setFrom] = useState(initial.range.from);
  const [to, setTo] = useState(initial.range.to);
  const [loading, setLoading] = useState(false);

  const load = async (nextFrom = from, nextTo = to) => {
    setLoading(true);
    try {
      const next = await getAnalyticsDashboard({ data: { from: nextFrom, to: nextTo } });
      setData(next);
      setFrom(nextFrom);
      setTo(nextTo);
    } catch (error) {
      console.error(error);
      toast.error("Analytics gagal dimuat.");
    } finally {
      setLoading(false);
    }
  };

  const preset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    void load(start.toISOString().slice(0, 10), end.toISOString().slice(0, 10));
  };

  const cards = [
    { label: "Page Views", value: data.totals.pageViews, icon: Eye },
    { label: "Unique Visitors", value: data.totals.uniqueVisitors, icon: Users },
    { label: "CTA Clicks", value: data.totals.ctaClicks, icon: MousePointerClick },
    { label: "Conversion", value: `${data.totals.conversionRate}%`, icon: Percent },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border bg-card p-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => preset(1)}>
            Today
          </Button>
          <Button size="sm" variant="outline" onClick={() => preset(7)}>
            7 Days
          </Button>
          <Button size="sm" variant="outline" onClick={() => preset(30)}>
            30 Days
          </Button>
          <label className="text-xs text-muted-foreground">
            From
            <input
              type="date"
              className="ml-2 h-9 rounded-md border bg-background px-2"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            To
            <input
              type="date"
              className="ml-2 h-9 rounded-md border bg-background px-2"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>
          <Button size="sm" onClick={() => load()} disabled={loading}>
            {loading ? "Loading..." : "Apply"}
          </Button>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            const result = await exportAnalyticsCsv({ data: { from, to } });
            const url = URL.createObjectURL(
              new Blob(["\uFEFF", result.csv], { type: "text/csv;charset=utf-8" }),
            );
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `suruhin-analytics-${from}-${to}.csv`;
            anchor.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <card.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold">
                {typeof card.value === "number" ? card.value.toLocaleString("id-ID") : card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Visitors & Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-72 w-full aspect-auto"
              config={{
                pageViews: { label: "Page Views", color: "var(--primary)" },
                visitors: { label: "Visitors", color: "var(--secondary)" },
              }}
            >
              <AreaChart data={data.daily}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="pageViews"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.18}
                />
                <Area
                  dataKey="visitors"
                  stroke="var(--secondary)"
                  fill="var(--secondary)"
                  fillOpacity={0.12}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Device</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-72 w-full aspect-auto"
              config={{ count: { label: "Visitors" } }}
            >
              <PieChart>
                <Pie
                  data={data.devices}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                >
                  {data.devices.map((item, index) => (
                    <Cell key={item.name} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CTA Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-72 w-full aspect-auto"
              config={{ clicks: { label: "Clicks", color: "var(--primary)" } }}
            >
              <BarChart data={data.ctas} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="clicks" fill="var(--primary)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.funnel.map((step, index) => (
              <div
                key={step.name}
                className="rounded-xl bg-muted p-3"
                style={{ width: `${Math.max(45, 100 - index * 11)}%`, marginInline: "auto" }}
              >
                <div className="flex justify-between text-sm">
                  <span>{step.name}</span>
                  <strong>{step.value.toLocaleString("id-ID")}</strong>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Traffic Sources", rows: data.sources },
          { title: "Browser", rows: data.browsers },
          { title: "Operating System", rows: data.operatingSystems },
        ].map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.rows.length ? (
                group.rows.map((row) => (
                  <div key={row.name} className="flex justify-between border-b pb-2 text-sm">
                    <span>{row.name}</span>
                    <strong>{row.count}</strong>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada data.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Engagement</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.sections.length ? (
            data.sections.map((section) => (
              <div key={section.name} className="rounded-xl border p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">
                    {section.name.replaceAll("_", " ")}
                  </span>
                  <strong>{section.reachPercent}%</strong>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.min(100, section.reachPercent)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{section.views} views</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada section view.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.recent.length ? (
            data.recent.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between border-b pb-3 text-sm"
              >
                <span>
                  <span className="mr-2 text-primary">●</span>
                  {event.eventType.replaceAll("_", " ")} — {event.eventName}
                </span>
                <time className="text-xs text-muted-foreground">
                  {new Date(event.occurredAt).toLocaleString("id-ID")}
                </time>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum ada aktivitas untuk rentang tanggal ini.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

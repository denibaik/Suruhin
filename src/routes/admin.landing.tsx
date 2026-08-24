import { useState } from "react";
import { createFileRoute, Link, redirect, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ListChecks,
  LayoutTemplate,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Eye,
  Upload,
  EyeOff,
  BarChart3,
} from "lucide-react";
import { DashboardShell } from "@/components/site/DashboardShell";
import { LandingPreview } from "@/components/admin/LandingPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLandingEditor,
  publishLandingContent,
  resetLandingContent,
  saveLandingContent,
  unpublishLandingContent,
} from "@/lib/api/landing.functions";
import {
  defaultLandingContent,
  type FeatureItem,
  type HowItWorksStep,
  type BenefitItem,
  type TestimonialItem,
  type FaqItem,
  type HeroStat,
  type LandingContent,
  type SectionHeading,
} from "@/components/site/landing-content";
import { landingIconNames } from "@/components/site/landing-icons";
import { getAdminStatus } from "@/lib/api/admin-auth.functions";

const adminNavItems = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard },
  { to: "/admin/users", label: "Pengguna", icon: Users },
  { to: "/admin/helpers", label: "Helper", icon: UserCheck },
  { to: "/admin/tasks", label: "Tugas", icon: ListChecks },
  { to: "/admin/landing", label: "Landing Page", icon: LayoutTemplate },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export const Route = createFileRoute("/admin/landing")({
  beforeLoad: async () => {
    const admin = await getAdminStatus();
    if (!admin.isAdmin) throw redirect({ to: "/admin/login" });
  },
  head: () => ({ meta: [{ title: "Landing Page — Admin Suruhin" }] }),
  loader: async () => getLandingEditor(),
  component: AdminLandingPage,
});

function AdminLandingPage() {
  const router = useRouter();
  const initial = Route.useLoaderData();
  const [content, setContent] = useState<LandingContent>(initial.document.content);
  const [document, setDocument] = useState(initial.document);
  const [revisions, setRevisions] = useState(initial.revisions);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const updateHero = (patch: Partial<LandingContent["hero"]>) =>
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));

  const updateFinalCta = (patch: Partial<LandingContent["finalCta"]>) =>
    setContent((c) => ({ ...c, finalCta: { ...c.finalCta, ...patch } }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await saveLandingContent({ data: content });
      setDocument(saved);
      setRevisions((items) => [saved, ...items].slice(0, 10));
      toast.success("Draft landing page berhasil disimpan.");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan. Periksa input lalu coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      const published = await publishLandingContent({ data: content });
      setDocument(published);
      setRevisions((items) => [published, ...items].slice(0, 10));
      await router.invalidate();
      toast.success("Landing page berhasil dipublish.");
    } catch (error) {
      console.error(error);
      toast.error("Publish gagal. Pastikan database dan session admin aktif.");
    } finally {
      setSaving(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      const result = await unpublishLandingContent();
      setDocument(result);
      await router.invalidate();
      toast.message("Landing page di-unpublish.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal melakukan unpublish.");
    }
  };

  const handleReset = async () => {
    try {
      const reset = await resetLandingContent();
      const fresh = structuredClone(defaultLandingContent);
      setContent(fresh);
      setDocument(reset);
      await router.invalidate();
      toast.message("Konten dikembalikan ke default.");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mereset konten.");
    }
  };

  return (
    <DashboardShell items={adminNavItems} title="Edit Landing Page">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Edit konten sebagai draft, periksa live preview, lalu publish jika sudah siap.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Status: <strong className="text-foreground">{document.status}</strong> · Versi{" "}
            {document.version} · Terakhir diubah{" "}
            {new Date(document.updatedAt).toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview((value) => !value)}>
            <Eye className="h-4 w-4" /> {showPreview ? "Tutup Preview" : "Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Reset Default
          </Button>
          {document.status === "published" && (
            <Button variant="outline" size="sm" onClick={handleUnpublish}>
              <EyeOff className="h-4 w-4" /> Unpublish
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : "Simpan Draft"}
          </Button>
          <Button variant="hero" size="sm" onClick={handlePublish} disabled={saving}>
            <Upload className="h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      {showPreview && (
        <div className="mt-6">
          <LandingPreview content={content} />
        </div>
      )}

      <Tabs defaultValue="hero" className="mt-6">
        <TabsList className="flex w-full flex-wrap justify-start h-auto gap-1 p-1">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="features">Fitur</TabsTrigger>
          <TabsTrigger value="how">Cara Kerja</TabsTrigger>
          <TabsTrigger value="benefits">Keunggulan</TabsTrigger>
          <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="cta">CTA Akhir</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="design">Desain</TabsTrigger>
        </TabsList>

        {/* HERO */}
        <TabsContent value="hero">
          <SectionCard>
            <Field label="Badge">
              <Input
                value={content.hero.badge}
                onChange={(e) => updateHero({ badge: e.target.value })}
              />
            </Field>
            <Field label="Hero image URL (HTTPS)">
              <Input
                type="url"
                placeholder="https://..."
                value={content.hero.imageUrl}
                onChange={(e) => updateHero({ imageUrl: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Judul (awal)">
                <Input
                  value={content.hero.title}
                  onChange={(e) => updateHero({ title: e.target.value })}
                />
              </Field>
              <Field label="Judul (highlight)">
                <Input
                  value={content.hero.titleHighlight}
                  onChange={(e) => updateHero({ titleHighlight: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Subtitle">
              <Textarea
                rows={2}
                value={content.hero.subtitle}
                onChange={(e) => updateHero({ subtitle: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teks Tombol Utama">
                <Input
                  value={content.hero.primaryCta}
                  onChange={(e) => updateHero({ primaryCta: e.target.value })}
                />
              </Field>
              <Field label="Link Tombol Utama">
                <Input
                  value={content.hero.primaryCtaHref}
                  onChange={(e) => updateHero({ primaryCtaHref: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teks Tombol Sekunder">
                <Input
                  value={content.hero.secondaryCta}
                  onChange={(e) => updateHero({ secondaryCta: e.target.value })}
                />
              </Field>
              <Field label="Link Tombol Sekunder">
                <Input
                  value={content.hero.secondaryCtaHref}
                  onChange={(e) => updateHero({ secondaryCtaHref: e.target.value })}
                />
              </Field>
            </div>
            <Divider />
            <ListEditor
              label="Statistik"
              items={content.hero.stats}
              onChange={(stats: HeroStat[]) => updateHero({ stats })}
              empty={() => ({ value: "", label: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nilai">
                    <Input value={item.value} onChange={(e) => set({ value: e.target.value })} />
                  </Field>
                  <Field label="Label">
                    <Input value={item.label} onChange={(e) => set({ label: e.target.value })} />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* ABOUT */}
        <TabsContent value="about">
          <SectionCard>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.about.eyebrow}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, about: { ...c.about, eyebrow: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Judul">
                <Input
                  value={content.about.title}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, about: { ...c.about, title: e.target.value } }))
                  }
                />
              </Field>
            </div>
            <Field label="Deskripsi">
              <Textarea
                rows={4}
                value={content.about.description}
                onChange={(e) =>
                  setContent((c) => ({ ...c, about: { ...c.about, description: e.target.value } }))
                }
              />
            </Field>
            <Field label="Image URL (HTTPS)">
              <Input
                type="url"
                value={content.about.imageUrl}
                onChange={(e) =>
                  setContent((c) => ({ ...c, about: { ...c.about, imageUrl: e.target.value } }))
                }
              />
            </Field>
          </SectionCard>
        </TabsContent>

        {/* FEATURES */}
        <TabsContent value="features">
          <SectionCard>
            <HeadingEditor
              heading={content.features.heading}
              onChange={(heading: SectionHeading) =>
                setContent((c) => ({ ...c, features: { ...c.features, heading } }))
              }
            />
            <Divider />
            <ListEditor
              label="Item Fitur"
              items={content.features.items}
              onChange={(items: FeatureItem[]) =>
                setContent((c) => ({ ...c, features: { ...c.features, items } }))
              }
              empty={() => ({ icon: "ClipboardList", title: "", desc: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Judul">
                      <Input value={item.title} onChange={(e) => set({ title: e.target.value })} />
                    </Field>
                    <IconSelect value={item.icon} onChange={(icon) => set({ icon })} />
                  </div>
                  <Field label="Deskripsi">
                    <Textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => set({ desc: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* HOW IT WORKS */}
        <TabsContent value="how">
          <SectionCard>
            <HeadingEditor
              heading={content.howItWorks.heading}
              onChange={(heading: SectionHeading) =>
                setContent((c) => ({ ...c, howItWorks: { ...c.howItWorks, heading } }))
              }
            />
            <Divider />
            <ListEditor
              label="Langkah"
              items={content.howItWorks.steps}
              onChange={(steps: HowItWorksStep[]) =>
                setContent((c) => ({ ...c, howItWorks: { ...c.howItWorks, steps } }))
              }
              empty={() => ({ icon: "FileText", title: "", desc: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Judul">
                      <Input value={item.title} onChange={(e) => set({ title: e.target.value })} />
                    </Field>
                    <IconSelect value={item.icon} onChange={(icon) => set({ icon })} />
                  </div>
                  <Field label="Deskripsi">
                    <Textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => set({ desc: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* BENEFITS */}
        <TabsContent value="benefits">
          <SectionCard>
            <HeadingEditor
              heading={content.benefits.heading}
              onChange={(heading: SectionHeading) =>
                setContent((c) => ({ ...c, benefits: { ...c.benefits, heading } }))
              }
            />
            <Divider />
            <ListEditor
              label="Keunggulan"
              items={content.benefits.items}
              onChange={(items: BenefitItem[]) =>
                setContent((c) => ({ ...c, benefits: { ...c.benefits, items } }))
              }
              empty={() => ({ icon: "Clock", title: "", desc: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Judul">
                      <Input value={item.title} onChange={(e) => set({ title: e.target.value })} />
                    </Field>
                    <IconSelect value={item.icon} onChange={(icon) => set({ icon })} />
                  </div>
                  <Field label="Deskripsi">
                    <Textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => set({ desc: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* TESTIMONIALS */}
        <TabsContent value="testimonials">
          <SectionCard>
            <HeadingEditor
              heading={content.testimonials.heading}
              onChange={(heading: SectionHeading) =>
                setContent((c) => ({ ...c, testimonials: { ...c.testimonials, heading } }))
              }
            />
            <Divider />
            <ListEditor
              label="Testimoni"
              items={content.testimonials.items}
              onChange={(items: TestimonialItem[]) =>
                setContent((c) => ({ ...c, testimonials: { ...c.testimonials, items } }))
              }
              empty={() => ({ name: "", role: "", quote: "", initials: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_120px]">
                    <Field label="Nama">
                      <Input value={item.name} onChange={(e) => set({ name: e.target.value })} />
                    </Field>
                    <Field label="Peran">
                      <Input value={item.role} onChange={(e) => set({ role: e.target.value })} />
                    </Field>
                    <Field label="Inisial">
                      <Input
                        value={item.initials}
                        onChange={(e) => set({ initials: e.target.value })}
                        maxLength={3}
                      />
                    </Field>
                  </div>
                  <Field label="Kutipan">
                    <Textarea
                      rows={2}
                      value={item.quote}
                      onChange={(e) => set({ quote: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <SectionCard>
            <HeadingEditor
              heading={content.faq.heading}
              onChange={(heading: SectionHeading) =>
                setContent((c) => ({ ...c, faq: { ...c.faq, heading } }))
              }
            />
            <Divider />
            <ListEditor
              label="Pertanyaan"
              items={content.faq.items}
              onChange={(items: FaqItem[]) =>
                setContent((c) => ({ ...c, faq: { ...c.faq, items } }))
              }
              empty={() => ({ q: "", a: "" })}
              renderItem={(item, set) => (
                <div className="grid gap-3">
                  <Field label="Pertanyaan">
                    <Input value={item.q} onChange={(e) => set({ q: e.target.value })} />
                  </Field>
                  <Field label="Jawaban">
                    <Textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => set({ a: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* FINAL CTA */}
        <TabsContent value="cta">
          <SectionCard>
            <Field label="Judul">
              <Input
                value={content.finalCta.title}
                onChange={(e) => updateFinalCta({ title: e.target.value })}
              />
            </Field>
            <Field label="Subtitle">
              <Textarea
                rows={2}
                value={content.finalCta.subtitle}
                onChange={(e) => updateFinalCta({ subtitle: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teks Tombol">
                <Input
                  value={content.finalCta.cta}
                  onChange={(e) => updateFinalCta({ cta: e.target.value })}
                />
              </Field>
              <Field label="Link Tombol">
                <Input
                  value={content.finalCta.ctaHref}
                  onChange={(e) => updateFinalCta({ ctaHref: e.target.value })}
                />
              </Field>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="footer">
          <SectionCard>
            <Field label="Deskripsi">
              <Textarea
                rows={3}
                value={content.footer.description}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    footer: { ...c.footer, description: e.target.value },
                  }))
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email">
                <Input
                  type="email"
                  value={content.footer.email}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, footer: { ...c.footer, email: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Telepon">
                <Input
                  value={content.footer.phone}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, footer: { ...c.footer, phone: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Lokasi">
                <Input
                  value={content.footer.location}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, footer: { ...c.footer, location: e.target.value } }))
                  }
                />
              </Field>
              <Field label="Copyright">
                <Input
                  value={content.footer.copyright}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      footer: { ...c.footer, copyright: e.target.value },
                    }))
                  }
                />
              </Field>
            </div>
            {(["facebookUrl", "instagramUrl", "twitterUrl", "linkedinUrl"] as const).map((key) => (
              <Field key={key} label={`${key.replace("Url", "")} URL (HTTPS)`}>
                <Input
                  type="url"
                  value={content.footer[key]}
                  onChange={(e) =>
                    setContent((c) => ({ ...c, footer: { ...c.footer, [key]: e.target.value } }))
                  }
                />
              </Field>
            ))}
          </SectionCard>
        </TabsContent>

        <TabsContent value="design">
          <SectionCard>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["primaryColor", "secondaryColor", "backgroundColor", "textColor"] as const).map(
                (key) => (
                  <Field key={key} label={key}>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        className="w-14 p-1"
                        value={content.theme[key]}
                        onChange={(e) =>
                          setContent((c) => ({
                            ...c,
                            theme: { ...c.theme, [key]: e.target.value },
                          }))
                        }
                      />
                      <Input
                        value={content.theme[key]}
                        onChange={(e) =>
                          setContent((c) => ({
                            ...c,
                            theme: { ...c.theme, [key]: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </Field>
                ),
              )}
              <Field label="Font">
                <select
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={content.theme.fontFamily}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      theme: {
                        ...c.theme,
                        fontFamily: e.target.value as LandingContent["theme"]["fontFamily"],
                      },
                    }))
                  }
                >
                  {["Inter", "Arial", "Georgia", "system-ui"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
              <Field label="Border radius">
                <select
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={content.theme.borderRadius}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      theme: {
                        ...c.theme,
                        borderRadius: e.target.value as LandingContent["theme"]["borderRadius"],
                      },
                    }))
                  }
                >
                  {["0.5rem", "0.75rem", "1rem", "1.5rem"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
              <Field label="Button style">
                <select
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={content.theme.buttonStyle}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      theme: {
                        ...c.theme,
                        buttonStyle: e.target.value as LandingContent["theme"]["buttonStyle"],
                      },
                    }))
                  }
                >
                  {["solid", "soft", "outline"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <div className="mt-6 rounded-2xl border bg-card p-5">
        <h3 className="font-semibold">Revision Terakhir</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {revisions.slice(0, 6).map((revision) => (
            <div
              key={`${revision.version}-${revision.updatedAt}`}
              className="rounded-xl bg-muted/50 p-3 text-xs"
            >
              <div className="flex justify-between">
                <strong>Versi {revision.version}</strong>
                <span className="capitalize text-primary">{revision.status}</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                {new Date(revision.updatedAt).toLocaleString("id-ID")}
              </p>
              <p className="text-muted-foreground">oleh {revision.updatedBy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Preview link */}
      <div className="mt-6 flex items-center gap-2 text-sm">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Lihat hasil:</span>
        <Link to="/" className="font-medium text-primary hover:underline">
          Buka Landing Page
        </Link>
      </div>
    </DashboardShell>
  );
}

/* ---------- Helper komponen ---------- */

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-2 border-t border-border" />;
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">Ikon</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        {landingIconNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function HeadingEditor({
  heading,
  onChange,
}: {
  heading: SectionHeading;
  onChange: (h: SectionHeading) => void;
}) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
        <Field label="Eyebrow (label kecil)">
          <Input
            value={heading.eyebrow}
            onChange={(e) => onChange({ ...heading, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="Judul Seksi">
          <Input
            value={heading.title}
            onChange={(e) => onChange({ ...heading, title: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Subtitle (opsional)">
        <Textarea
          rows={2}
          value={heading.subtitle ?? ""}
          onChange={(e) => onChange({ ...heading, subtitle: e.target.value })}
        />
      </Field>
    </div>
  );
}

interface ListEditorProps<T> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  empty: () => T;
  renderItem: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}

function ListEditor<T>({ label, items, onChange, empty, renderItem }: ListEditorProps<T>) {
  const update = (idx: number, patch: Partial<T>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange(next);
  };
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, empty()]);
  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">
          {label} ({items.length})
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">#{idx + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, 1)}
                  disabled={idx === items.length - 1}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
              </div>
            </div>
            {renderItem(item, (patch) => update(idx, patch))}
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Belum ada item. Klik "Tambah" untuk membuat baru.
          </p>
        )}
      </div>
    </div>
  );
}

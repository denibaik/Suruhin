import { defaultLandingContent, type LandingContent } from "@/components/site/landing-content";
import { getDatabase, hasDatabase } from "@/lib/db.server";
import type { LandingPageDocument, LandingRevision, LandingStatus } from "@/lib/landing-cms-types";

const now = () => new Date().toISOString();

let memoryDocument: LandingPageDocument = {
  content: structuredClone(defaultLandingContent),
  status: "published",
  version: 1,
  updatedAt: now(),
  updatedBy: "system",
  publishedAt: now(),
};
let memoryPublished = structuredClone(defaultLandingContent);
let schemaReady = false;

async function ensureSchema(): Promise<void> {
  if (schemaReady || !hasDatabase()) return;
  const db = getDatabase();
  await db.query(`
    CREATE TABLE IF NOT EXISTS landing_pages (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      draft_content JSONB NOT NULL,
      published_content JSONB,
      status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'unpublished')),
      version INTEGER NOT NULL DEFAULT 1,
      updated_by TEXT NOT NULL DEFAULT 'admin',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      published_at TIMESTAMPTZ
    );
    CREATE TABLE IF NOT EXISTS landing_revisions (
      id BIGSERIAL PRIMARY KEY,
      version INTEGER NOT NULL,
      content JSONB NOT NULL,
      status TEXT NOT NULL,
      updated_by TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      published_at TIMESTAMPTZ
    );
  `);
  const legacy = await db
    .query<{
      data: LandingContent;
    }>(
      `SELECT data FROM landing_content WHERE id = 1 AND to_regclass('public.landing_content') IS NOT NULL`,
    )
    .catch(() => ({ rows: [] as Array<{ data: LandingContent }> }));
  const seed = normalizeContent(legacy.rows[0]?.data);
  await db.query(
    `INSERT INTO landing_pages
      (id, draft_content, published_content, status, version, updated_by, published_at)
     VALUES (1, $1, $1, 'published', 1, 'system', now())
     ON CONFLICT (id) DO NOTHING`,
    [seed],
  );
  schemaReady = true;
}

function normalizeContent(value: Partial<LandingContent> | null | undefined): LandingContent {
  return {
    ...defaultLandingContent,
    ...value,
    hero: { ...defaultLandingContent.hero, ...value?.hero },
    about: { ...defaultLandingContent.about, ...value?.about },
    features: { ...defaultLandingContent.features, ...value?.features },
    howItWorks: { ...defaultLandingContent.howItWorks, ...value?.howItWorks },
    benefits: { ...defaultLandingContent.benefits, ...value?.benefits },
    testimonials: { ...defaultLandingContent.testimonials, ...value?.testimonials },
    faq: { ...defaultLandingContent.faq, ...value?.faq },
    finalCta: { ...defaultLandingContent.finalCta, ...value?.finalCta },
    footer: { ...defaultLandingContent.footer, ...value?.footer },
    theme: { ...defaultLandingContent.theme, ...value?.theme },
  };
}

function toDocument(row: Record<string, unknown>): LandingPageDocument {
  return {
    content: normalizeContent(row.draft_content as Partial<LandingContent>),
    status: row.status as LandingStatus,
    version: Number(row.version),
    updatedAt: new Date(row.updated_at as string).toISOString(),
    updatedBy: String(row.updated_by),
    publishedAt: row.published_at ? new Date(row.published_at as string).toISOString() : null,
  };
}

export async function readPublishedLandingContent(): Promise<LandingContent> {
  if (!hasDatabase()) return memoryPublished;
  await ensureSchema();
  const result = await getDatabase().query<{ published_content: LandingContent | null }>(
    "SELECT published_content FROM landing_pages WHERE id = 1",
  );
  return normalizeContent(result.rows[0]?.published_content);
}

export async function readLandingDocument(): Promise<LandingPageDocument> {
  if (!hasDatabase()) return memoryDocument;
  await ensureSchema();
  const result = await getDatabase().query("SELECT * FROM landing_pages WHERE id = 1");
  return toDocument(result.rows[0]);
}

export async function saveLandingDraft(
  content: LandingContent,
  updatedBy = "admin",
): Promise<LandingPageDocument> {
  if (!hasDatabase()) {
    memoryDocument = {
      ...memoryDocument,
      content,
      status: "draft",
      version: memoryDocument.version + 1,
      updatedAt: now(),
      updatedBy,
    };
    return memoryDocument;
  }

  await ensureSchema();
  const db = getDatabase();
  const result = await db.query(
    `UPDATE landing_pages
     SET draft_content = $1, status = 'draft', version = version + 1,
         updated_by = $2, updated_at = now()
     WHERE id = 1 RETURNING *`,
    [content, updatedBy],
  );
  const document = toDocument(result.rows[0]);
  await db.query(
    `INSERT INTO landing_revisions (version, content, status, updated_by)
     VALUES ($1, $2, 'draft', $3)`,
    [document.version, content, updatedBy],
  );
  return document;
}

export async function publishLanding(
  content: LandingContent,
  updatedBy = "admin",
): Promise<LandingPageDocument> {
  if (!hasDatabase()) {
    memoryPublished = structuredClone(content);
    memoryDocument = {
      content,
      status: "published",
      version: memoryDocument.version + 1,
      updatedAt: now(),
      updatedBy,
      publishedAt: now(),
    };
    return memoryDocument;
  }

  await ensureSchema();
  const db = getDatabase();
  const result = await db.query(
    `UPDATE landing_pages
     SET draft_content = $1, published_content = $1, status = 'published',
         version = version + 1, updated_by = $2, updated_at = now(), published_at = now()
     WHERE id = 1 RETURNING *`,
    [content, updatedBy],
  );
  const document = toDocument(result.rows[0]);
  await db.query(
    `INSERT INTO landing_revisions
      (version, content, status, updated_by, published_at)
     VALUES ($1, $2, 'published', $3, now())`,
    [document.version, content, updatedBy],
  );
  return document;
}

export async function unpublishLanding(updatedBy = "admin"): Promise<LandingPageDocument> {
  if (!hasDatabase()) {
    memoryDocument = {
      ...memoryDocument,
      status: "unpublished",
      version: memoryDocument.version + 1,
      updatedAt: now(),
      updatedBy,
    };
    return memoryDocument;
  }
  await ensureSchema();
  const result = await getDatabase().query(
    `UPDATE landing_pages
     SET published_content = NULL, status = 'unpublished', version = version + 1,
         updated_by = $1, updated_at = now()
     WHERE id = 1 RETURNING *`,
    [updatedBy],
  );
  return toDocument(result.rows[0]);
}

export async function resetLandingContentStore(): Promise<LandingPageDocument> {
  return saveLandingDraft(structuredClone(defaultLandingContent), "admin");
}

export async function listLandingRevisions(): Promise<LandingRevision[]> {
  if (!hasDatabase()) return [memoryDocument];
  await ensureSchema();
  const result = await getDatabase().query(
    `SELECT version, status, updated_by, created_at, published_at
     FROM landing_revisions ORDER BY version DESC LIMIT 10`,
  );
  return result.rows.map((row) => ({
    version: Number(row.version),
    status: row.status as LandingStatus,
    updatedBy: String(row.updated_by),
    updatedAt: new Date(row.created_at).toISOString(),
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
  }));
}

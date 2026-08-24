import type { LandingContent } from "@/components/site/landing-content";

export type LandingStatus = "draft" | "published" | "unpublished";

export interface LandingPageDocument {
  content: LandingContent;
  status: LandingStatus;
  version: number;
  updatedAt: string;
  updatedBy: string;
  publishedAt: string | null;
}

export interface LandingRevision {
  version: number;
  status: LandingStatus;
  updatedAt: string;
  updatedBy: string;
  publishedAt: string | null;
}

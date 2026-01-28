
import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const domains = pgTable("domains", {
  id: serial("id").primaryKey(),
  domain: text("domain").unique().notNull(), // e.g., "google.com"
  
  // Storing analysis results as JSONB to allow flexible structures for each tool
  redirectData: jsonb("redirect_data"),        // Chain of redirects
  brokenLinksData: jsonb("broken_links_data"), // List of broken links
  securityData: jsonb("security_data"),        // Headers analysis
  robotsData: jsonb("robots_data"),            // Robots.txt content and validation
  aiData: jsonb("ai_data"),                    // AI Summary, services, etc.
  whoisData: jsonb("whois_data"),              // WHOIS domain info
  
  lastScannedAt: timestamp("last_scanned_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertDomainSchema = createInsertSchema(domains);

// === TYPES ===
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = z.infer<typeof insertDomainSchema>;

// Tool specific types for JSON columns
export interface RedirectHop {
  url: string;
  status: number;
  headers: Record<string, string>;
}

export interface BrokenLinkResult {
  url: string;
  status: number | string; // status code or error message
  anchorText?: string;
}

export interface SecurityHeaderResult {
  header: string;
  value?: string;
  status: "missing" | "present" | "warning";
  description?: string;
}

export interface RobotsResult {
  content: string | null;
  isValid: boolean;
  issues: string[];
}

export interface AiSummaryResult {
  summary: string;
  services: string[];
  locations: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface WhoisResult {
  domain: string;
  data: Record<string, string | string[]>;
  rawText?: string;
  error?: string;
}

// Request types
export interface RunScanRequest {
  url: string;
  tools: ("redirect" | "broken_links" | "security" | "robots" | "ai" | "whois")[];
}

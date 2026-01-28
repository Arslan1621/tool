# WebTools.io - SEO Analysis Platform

## Overview

WebTools.io is a comprehensive web analysis and SEO tools platform built with React, Express, and PostgreSQL. It provides multiple scanning utilities for website analysis including redirect chain checking, security header auditing, robots.txt validation, broken link detection, WHOIS lookups, and AI-powered summaries.

The application follows a monorepo structure with a React frontend (client/), Express backend (server/), and shared code (shared/) for types and schemas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

The frontend is a single-page application with dedicated tool pages:
- Home page with unified scan interface
- Individual tool pages (redirect checker, security checker, robots.txt, broken links, WHOIS)
- Domain report page showing aggregated analysis results
- Static pages (About, Blog, Contact)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: REST endpoints under /api/
- **Database ORM**: Drizzle ORM with PostgreSQL
- **AI Integration**: OpenAI API (via Replit AI Integrations) for content summarization
- **External Data**: WHOIS lookups, HTTP header analysis, web scraping with Cheerio

Key backend modules:
- `server/routes.ts` - Main API endpoints for scanning tools
- `server/storage.ts` - Database storage layer with upsert patterns
- `server/db.ts` - PostgreSQL connection via node-postgres Pool
- `server/replit_integrations/` - Pre-built modules for chat, audio, image, and batch processing

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts`
- **Main Table**: `domains` table storing scan results as JSONB columns for flexibility
- **Pattern**: Each scan tool's results stored in dedicated JSONB field (redirectData, brokenLinksData, securityData, robotsData, aiData, whoisData)

### Shared Code
- `shared/schema.ts` - Database schema and TypeScript types for domain scan results
- `shared/routes.ts` - API route definitions with Zod validation schemas
- `shared/models/chat.ts` - Chat/conversation schemas for AI integrations

## External Dependencies

### Database
- **PostgreSQL** - Primary data store, connection via DATABASE_URL environment variable
- **Drizzle Kit** - Database migrations (`npm run db:push`)

### AI Services
- **OpenAI API** (via Replit AI Integrations) - Used for generating SEO summaries and content analysis
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Third-Party APIs
- **whois-json** - Domain registration lookups
- **Cheerio** - HTML parsing for broken link scanning and content extraction

### Frontend Libraries
- **shadcn/ui** - Component library (Radix UI primitives + Tailwind)
- **TanStack Query** - Server state management
- **Framer Motion** - Animations
- **date-fns** - Date formatting
- **Recharts** - Data visualization (referenced in requirements)

### Development Tools
- **Vite** - Frontend build and dev server with HMR
- **esbuild** - Production server bundling
- **TypeScript** - Full-stack type safety
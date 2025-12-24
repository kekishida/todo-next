# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A todo application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Note: This project requires Node.js >=20.9.0 (currently using 18.20.8, which may cause some compatibility issues).

## Architecture

### Framework & Routing

- **Next.js 16** with App Router architecture
- All routes are defined in `src/app/` using the file-system based routing
- Server Components by default (use `'use client'` directive for client components)

### Directory Structure

```
src/
  app/              # App Router pages and layouts
    layout.tsx      # Root layout with metadata and fonts
    page.tsx        # Home page component
    globals.css     # Global styles (Tailwind)
```

### Key Configurations

**TypeScript:**
- Strict mode enabled
- Path alias `@/*` maps to `src/*` for clean imports
- Target: ES2017
- React JSX transform enabled

**Styling:**
- Tailwind CSS v4 (configured via postcss)
- Global styles in `src/app/globals.css`
- Uses Geist Sans and Geist Mono fonts from Google Fonts
- Dark mode support built-in

**Linting:**
- ESLint with Next.js recommended config
- Configuration in `eslint.config.mjs`

### Import Conventions

Use the `@/` path alias for imports within the src directory:

```typescript
import Component from '@/components/Component'
import { util } from '@/lib/utils'
```

### Component Patterns

- Server Components are the default in the App Router
- Mark interactive components with `'use client'` directive at the top
- Use TypeScript for all components
- Export metadata from page and layout files for SEO

## Deployment

### Deploy to Vercel

**Option 1: Vercel CLI**
```bash
# Login to Vercel (opens browser for authentication)
npx vercel login

# Deploy to production
npx vercel --prod
```

**Option 2: GitHub Integration (Recommended)**
1. Push this repository to GitHub
2. Visit https://vercel.com/new
3. Import the GitHub repository
4. Vercel will auto-detect Next.js and configure build settings
5. Click "Deploy"

All commits to the main branch will automatically deploy to production.

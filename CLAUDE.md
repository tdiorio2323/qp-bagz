# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quick Printz website - a Vite + React + TypeScript application built with shadcn/ui components and Tailwind CSS. Uses Supabase as a backend and includes custom branding with a Lightning Yellow, Black, and White theme.

**Repository**: https://github.com/tdiorio2323/shop-quick-printz

## Development Commands

**Package Manager**: This project uses pnpm (v10.15.1+). Always use pnpm for consistency.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build for development
pnpm build:dev

# Lint code
pnpm lint

# Preview production build
pnpm preview
```

## Architecture

### Project Structure

- `src/pages/` - Page components (Index, About, Services, Contact, Pricing, Products, ProductDetail, MylarBags, PremadeDesigns, NotFound)
- `src/components/` - Reusable UI components (Navigation, HeroSection, ServicesGrid, Footer, BrandMark, BulkImageUploader, ErrorBoundary, LoadingSpinner)
- `src/components/ui/` - shadcn/ui component library (50+ pre-built components)
- `src/config/` - Configuration files (socialLinks.ts for social media URLs)
- `src/integrations/supabase/` - Supabase client configuration and type definitions
- `src/lib/` - Utility functions (cn utility for className merging)
- `src/hooks/` - Custom React hooks (use-toast, use-mobile)
- `public/quickprintz_assets/` - Brand assets and images
- `public/data/` - JSON data files for products and content (e.g., `quick-printz-options.json` for product configurations)

### Routing

Uses React Router v6 with lazy loading for pages. Routes are defined in `src/App.tsx`:
- `/` - Index/Home page
- `/about` - About page
- `/services` - Services page
- `/products` - Products listing page
- `/products/custom-mylar-bags` - Product detail page
- `/mylar-bags` - Mylar bags page
- `/premadedesigns` - Premade designs page
- `/contact` - Contact page
- `/pricing` - Pricing page
- `*` - 404 NotFound page (catch-all)

**Important**:
- Add all custom routes ABOVE the catch-all "*" route in App.tsx (see comment in the file)
- All pages use lazy loading with React.lazy() and are wrapped in Suspense
- SPA routing is configured for Vercel deployment via `vercel.json` (rewrites all routes to index.html)
- ErrorBoundary wraps the entire app in `src/App.tsx` to catch and display runtime errors gracefully
- LoadingSpinner is used as Suspense fallback during lazy route loading

### State Management

- React Query (@tanstack/react-query) for server state
- Query client configured in `src/App.tsx`
- No global state management (Redux/Zustand) - uses React Query and component state

### Styling System

Uses a custom Quick Printz design system defined in `src/index.css`:

**Global Background**:
- Fixed background image at `/background.jpg` with dark overlay (70% black)
- Background covers entire viewport and is fixed during scroll
- All content appears on top of this background layer

**Brand Colors (HSL format)**:
- Primary/Accent: Lightning Yellow (`--lightning-yellow: 60 100% 50%`)
- Background: Black (`--background: 0 0% 0%`)
- Foreground: White (`--foreground: 0 0% 100%`)
- Card: Dark gray (`--card: 0 0% 5%`)

**Custom Gradient Classes**:
- `.gradient-primary` - Lightning yellow gradient
- `.gradient-cannabis` - Yellow to white gradient
- `.gradient-dark` - Black to dark gray gradient
- `.gradient-lightning` - Animated shimmer effect with keyframe animation
- `.gradient-overlay` - Dark overlay with yellow accent
- `.lightning-shimmer` - Continuous shimmer animation (10s duration)

**Custom Shadow Classes**:
- `.shadow-premium` - Yellow glow shadow
- `.shadow-dark` - Deep black shadow
- `.shadow-glow` - Yellow glow effect

**Custom Transition Classes**:
- `.transition-smooth` - Smooth easing transition (0.4s cubic-bezier)
- `.transition-bounce` - Bounce effect transition (0.6s cubic-bezier)

**Custom Utility Classes**:
- `.text-gradient-primary` - Text with lightning yellow gradient fill
- `.hover-glow` - Adds glow effect and lift on hover

### Backend Integration

**Supabase (Main Database)**:
- Supabase client: `src/integrations/supabase/client.ts`
- Environment variables required:
  - `VITE_SUPABASE_PROJECT_ID`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Authentication configured with localStorage persistence and auto-refresh

**Cloudinary (Image Uploads)**:
- Environment variables required:
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CLOUDINARY_UPLOAD_PRESET`
- Used for uploading product images and designs

**Bag Designs (Separate Supabase Project)**:
- Dedicated Supabase project for managing bag design assets
- Environment variables required:
  - `VITE_BAG_DESIGNS_PROJECT_URL`
  - `VITE_BAG_DESIGNS_ANON_KEY`
  - `VITE_BAG_DESIGNS_BUCKET` (default: "bag-designs")
  - `VITE_BAG_DESIGNS_PREFIX` (default: "public")
- Stores and serves premade bag design images

### Path Aliases

TypeScript and Vite configured with `@/` alias:
```typescript
import { Component } from "@/components/Component"
import { supabase } from "@/integrations/supabase/client"
```

### UI Components

This project uses shadcn/ui components. All UI components are in `src/components/ui/`. To use them:
```typescript
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

Common components available: accordion, alert-dialog, avatar, badge, button, calendar, card, carousel, checkbox, command, dialog, dropdown-menu, form, input, label, navigation-menu, popover, select, separator, sheet, sidebar, slider, switch, tabs, textarea, toast, tooltip, and many more.

### Utilities

- `cn()` function from `src/lib/utils.ts` - Merges Tailwind classes using clsx and tailwind-merge
- Use for conditional className composition: `cn("base-class", condition && "conditional-class")`

## TypeScript Configuration

- `noImplicitAny: false` - Implicit any types allowed
- `strictNullChecks: false` - Null checks not enforced
- `noUnusedLocals: false` - Unused locals allowed
- `noUnusedParameters: false` - Unused parameters allowed
- Path mapping configured for `@/*` imports

## Deployment

Deploy this project using your preferred hosting platform (Vercel, Netlify, etc.):
- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables required (see `.env.example` for complete list):
  - **Supabase**: `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
  - **Cloudinary**: `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET`
  - **Bag Designs**: `VITE_BAG_DESIGNS_PROJECT_URL`, `VITE_BAG_DESIGNS_ANON_KEY`, `VITE_BAG_DESIGNS_BUCKET`, `VITE_BAG_DESIGNS_PREFIX`
- **Vercel**: Uses `vercel.json` for SPA routing configuration (rewrites all routes to index.html)

## Asset Management

- Brand assets stored in `public/quickprintz_assets/`
- Logo available at `/quickprintz_assets/quickprintz-256.png`
- PWA icons and manifests in `public/`
- Storefront photo at `/quick-printz-storefront.jpg`
- Background image at `/background.jpg` (used as fixed background layer for entire site)

## Data Structure

Product configurations and other dynamic content are stored as JSON files in `public/data/`:
- `quick-printz-options.json` - Contains product options for custom mylar bags (sizes, colors, finishes, print styles, quantities, addons)
- Load these files with fetch API or import them statically as needed

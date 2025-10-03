# Repository Guidelines

## Project Structure & Module Organization
Quick Printz is a Vite + React + TypeScript single-page app. `src/main.tsx` boots `App`, which lazy-loads route components from `src/pages`. Shared UI lives in `src/components` (shadcn primitives sit under `src/components/ui`; wrap them in local components before reuse). Hooks belong in `src/hooks`; API helpers and Supabase client code are in `src/lib` and `src/integrations/supabase`. Assets in `public/` are served as-is, while imported imagery stays under `src/assets/`. Build outputs go to `dist/`, and Supabase project metadata resides in `supabase/`.

## Build, Test, and Development Commands
- `pnpm install` – install dependencies after cloning or lockfile updates.
- `pnpm dev` – start Vite with HMR; requires populated `.env` values.
- `pnpm build` – produce optimized assets in `dist/`.
- `pnpm build:dev` – debug build that preserves development flags.
- `pnpm preview` – serve the last build locally.
- `pnpm lint` – run ESLint; address issues before review.

## Coding Style & Naming Conventions
Use TypeScript and functional components. Name components and pages `PascalCase.tsx`, utilities `camelCase.ts`. Tailwind handles layout; extract repeating class combinations into helpers instead of duplicating strings. Follow two-space indentation and the existing double-quote preference. Let ESLint enforce hooks rules and import order, and prefer the `@/` path alias over deep relative traversals.

## Testing Guidelines
Automated tests are absent, so linting and manual smoke tests are required. Run `pnpm lint`, load key routes (`/`, `/products`, `/contact`, `/pricing`) under `pnpm dev`, and confirm Supabase flows with valid credentials. When adding critical logic, scaffold Vitest + Testing Library specs in `src/__tests__/` and document the supporting `pnpm test` script inside the PR.

## Commit & Pull Request Guidelines
Git history uses short title-case commits (for example, `Connect Lovable Backend`). Keep commits focused and imperative. PRs should outline the problem, solution, and verification, reference issues when relevant, and include before/after visuals for UI changes. Call out any environment or config adjustments so reviewers can reproduce results.

## Environment & Configuration
Sample variables live in `env/env.txt`; copy them into a root `.env.local` before running commands. Required keys include `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, the `VITE_BAG_DESIGNS_*` values, and the Cloudinary fields used in `BulkImageUploader.tsx`. Never commit secrets, and coordinate Supabase project updates through `supabase/config.toml`.

# Omarchy OS Portfolio

A personal portfolio web app built with **Vite + React + TypeScript**, styled with **Tailwind CSS** and **shadcn/ui (Radix UI)** components.

> Repo: `yash1648/omarchy-os-portfolio`

## Tech Stack

- **Vite** (build tool / dev server)
- **React 18** + **TypeScript**
- **Tailwind CSS** (+ typography, animate utilities)
- **shadcn/ui / Radix UI** component primitives
- **React Router DOM** (routing)
- **TanStack Query** (data fetching/caching)
- **Framer Motion** (animations)
- **Vitest** + Testing Library (tests)
- **ESLint** (linting)

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- Package manager: **bun** (recommended) or **npm**

### Install dependencies

#### Using bun
```bash
bun install
```

#### Using npm
```bash
npm install
```

## Development

Run the dev server:

```bash
npm run dev
```

or

```bash
bun run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Tests

Run tests once:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Project Structure

- `src/` — application source
  - `App.tsx` — root app component
  - `main.tsx` — React entry point
  - `components/` — reusable UI components
  - `pages/` — route pages
  - `hooks/` — custom hooks
  - `lib/` — utilities/helpers
  - `config/` — app configuration
  - `test/` — test utilities/tests
- `public/` — static assets
  - `resume.pdf` — hosted resume
  - `favicon.png`, `robots.txt`, etc.

## Notes

- This repository currently has an empty `README.md` file in `main`; the content above is a generated starter README based on the repo’s dependencies and structure.
- If you want, share the deployed URL (Vercel/Netlify/GitHub Pages) and I can add a **Live Demo** section.

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) file for details.


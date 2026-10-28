# Cherrybook

A charcoal-and-cream (tan & gold accents) recipe manager: editorial landing page plus a fully working CRUD dashboard.
React + Vite + Tailwind + Framer Motion + React Hook Form + Zod. Data persists in `localStorage` (12 seeded recipes).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build && npm run preview
```

Routes (hash based): `#/` landing · `#/app` dashboard · `#/app/recipes` · `#/app/settings`.

## Structure

```
src/
  data/       schema.js (entity + zod) · seed.js · recipeApi.js (only file touching storage)
  hooks/      useRecipes (CRUD state) · useDebounce · useCountUp
  components/ Sidebar StatCard EntityCard EntityTable EntityForm DetailPanel
              ConfirmDialog Toast EmptyState Skeleton Overlay (focus trap, Esc) RecipeManager Parts
  pages/      Landing Dashboard Settings
```

## Features

Create (drawer form, floating labels, inline validation, submit disabled until valid, upload or URL image, tags) ·
Read (grid/table toggle, detail panel) · Update (edit form, optimistic status toggle, inline rename via pencil/double-click) ·
Delete (confirm dialog, 5s Undo toast, bulk select + bulk delete) · debounced search, cuisine/status filters, sort, Load more ·
skeleton / empty / error states (Settings → "Simulate network errors") · CSV export · `prefers-reduced-motion` respected.

## Customising

- **Colors:** `tailwind.config.js` → `theme.extend.colors` (brand = Charcoal, brand-mist = Gold, tan, bronze, cream).
- **Fonts:** swap the Google Fonts link in `index.html` and `fontFamily` in `tailwind.config.js`.
- **Entity & fields:** edit `src/data/schema.js` (name, categories, zod rules), then the matching inputs in
  `EntityForm.jsx` and the display in `EntityCard.jsx` / `EntityTable.jsx` / `DetailPanel.jsx`.
- **Backend:** reimplement the methods in `src/data/recipeApi.js` with `fetch` (REST, Supabase, Firebase). The UI is unchanged.

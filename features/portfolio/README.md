# Portfolio feature

This directory owns the interactive portfolio experience.

- `components/` contains focused UI sections and the client composition boundary.
- `data/portfolio-content.ts` is the single visible-content source for vibes, projects, capabilities, and process steps.
- `hooks/use-portfolio-experience.ts` owns browser state: URL selection, persisted preference, theme color, header state, and chooser focus return.
- `hooks/use-vibe-entrance-motion.ts` owns scoped Anime.js choreography and its reduced-motion fallback.
- `types.ts` contains the feature domain types.
- `schema.ts` exposes server-safe structured-data builders used by the root layout.
- `index.ts` is the public UI entry point consumed by the route.

`app/page.tsx` intentionally stays thin. Cross-feature profile links live in
`shared/config/profile-links.ts` because both metadata and portfolio UI consume
them.

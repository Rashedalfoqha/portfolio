# Portfolio feature

This directory owns the interactive portfolio experience.

- `components/` contains focused UI sections and the client composition boundary.
- `data/portfolio-content.ts` is the single visible-content source for vibes, projects, capabilities, and process steps.
- `vibes/vibe-context.tsx` owns global state, URL and local-storage persistence, the welcome state, root `data-vibe`, browser color scheme, and theme color.
- `vibes/layouts/` contains four independent page shells: terminal, Swiss editorial, liquid glass, and retro arcade.
- `vibes/heroes/` contains four independent interactive canvas systems plus the shared lifecycle hook for resolution, pointer input, reduced motion, and cleanup.
- `vibes/welcome-screen.tsx` is the accessible entry hub; `vibe-switcher.tsx` is the persistent global control.
- `types.ts` contains the feature domain types.
- `schema.ts` exposes server-safe structured-data builders used by the root layout.
- `index.ts` is the public UI entry point consumed by the route.

`app/app.tsx` intentionally stays thin and provides the global vibe boundary.
Cross-feature profile links live in `shared/config/profile-links.ts` because
both metadata and portfolio UI consume them.

# Frontend Agent Rules

## Purpose

These rules apply to any frontend project, whether starting from scratch or extending an existing codebase. They are framework-agnostic. Follow the project's established stack and conventions unless the task explicitly requires changing them.

## Instruction Priority

1. The user's current request and acceptance criteria.
2. Repository-level instructions and documented architecture.
3. Existing code patterns, tests, lint rules, and formatter settings.
4. This file.

If rules conflict, follow the higher-priority source. Never silently replace an established project convention with a personal preference.

## Working Mode

### Before changing code

- Read the relevant repository instructions, package scripts, configuration, and nearby implementation.
- Determine whether the task is a bug fix, feature, refactor, migration, or project setup.
- Trace the complete affected flow: route, UI, state, validation, data access, permissions, loading, error, and success behavior.
- Search for reusable components, hooks, utilities, types, schemas, tokens, and API functions before creating new ones.
- Identify generated files and never edit them directly; update their source or generator.
- Check the working tree and preserve unrelated user changes.
- For an existing project, prefer small, compatible, task-scoped changes. Avoid drive-by refactors.
- For a new project, establish the minimum coherent structure, tooling, and quality gates needed for the requested scope. Do not over-engineer speculative features.

### While changing code

- Keep the implementation aligned with the task and its acceptance criteria.
- Solve the underlying cause, not only the visible symptom.
- Keep diffs focused and reviewable.
- Reuse existing abstractions when they fit; do not force reuse when it increases coupling or complexity.
- Update all affected states and flows, not only the happy path.
- Do not weaken types, tests, lint rules, accessibility, or security to make a change pass.

### Before declaring completion

- Review the diff for correctness, accidental changes, hardcoded values, debug code, secrets, and dead code.
- Run the project's relevant formatter, lint, type-check, tests, and build commands.
- Add or update tests for changed behavior, especially regressions and failure paths.
- Report what changed, what was verified, and any remaining risk or command that could not be run.
- Never claim a check passed unless it was actually run successfully.

## Architecture and Organization

- Organize code by feature or domain when the project supports it; keep shared code genuinely cross-feature.
- Separate page composition, reusable UI, stateful behavior, data access, validation, and pure utilities.
- Keep route or page files thin. They should compose features and coordinate data, not contain large business workflows.
- A component, hook, function, or module should have one clear responsibility and one primary reason to change.
- Prefer simple composition over deep inheritance, oversized configuration objects, or premature abstraction.
- Extract repeated behavior only when a stable shared concept exists. Similar-looking code is not always the same responsibility.
- Avoid circular dependencies and unclear cross-feature imports.
- Use public feature entry points where the codebase follows that pattern; avoid reaching into another feature's private internals.
- Follow the existing naming, casing, import, export, and file-location conventions.

Suggested generic structure, only when no project convention already exists:

```text
src/
  app-or-routes/
  features/
    feature-name/
      components/
      hooks/
      api-or-services/
      schemas/
      types/
      utils/
  shared/
    components/
    hooks/
    api/
    config/
    constants/
    types/
    utils/
  styles/
```

## Components and UI

- Build small, focused components with explicit inputs and predictable outputs.
- Keep domain behavior close to its feature. Move only truly reusable primitives into shared UI.
- Prefer composition and clear props over hidden global behavior.
- Do not duplicate an existing design-system component.
- Support all relevant states: initial, loading, refreshing, empty, success, validation error, server error, unauthorized, and disabled.
- Preserve user input and context after recoverable failures.
- Keep destructive actions explicit and require confirmation when appropriate.
- Use semantic HTML and native controls where possible.
- Ensure keyboard access, visible focus, meaningful labels, correct heading order, sufficient contrast, and appropriate accessible names.
- Use ARIA only when native semantics are insufficient.
- Ensure responsive behavior at supported breakpoints and avoid fixed dimensions that break with long content or localization.

## Styling and Design System

- Reuse the project's tokens for color, spacing, typography, radius, elevation, and breakpoints.
- Do not introduce arbitrary visual values when a suitable token exists.
- Keep styling consistent with the existing method; do not add a second styling system without explicit need.
- Avoid excessive inline styles and duplicated style rules.
- Test long text, missing media, narrow screens, zoom, and both left-to-right and right-to-left layouts when supported.
- Do not hardcode user-facing text inside reusable UI when localization exists.

## Data Access and API Boundaries

- Centralize network configuration, base URLs, authentication, serialization, and common error normalization.
- Do not make ad hoc HTTP calls from presentation components when the project has an API, repository, query, or service layer.
- Centralize endpoint definitions or use the project's established API-client pattern.
- Give API functions names that describe the domain action.
- Type request parameters, successful responses, and error responses.
- Treat all external data as untrusted. Validate or safely narrow it at the boundary when runtime shape is not guaranteed.
- Keep transport models separate from view models when their shapes or responsibilities differ.
- Encode query, filter, search, sort, and pagination parameters consistently.
- Cancel, ignore, or guard stale requests where races are possible.
- Avoid duplicate requests, request waterfalls, and fetching data that is not needed by the current view.
- Never expose secrets or server-only credentials in client bundles, logs, source maps, or public environment variables.

## State Management

- Use local component state for local UI concerns.
- Use URL state for shareable or navigable state such as filters, search, sorting, pagination, and selected tabs when appropriate.
- Use the project's server-state solution for remote data, caching, revalidation, and mutations.
- Use global client state only for genuinely cross-cutting state.
- Do not mirror derived values in state; compute them from the source of truth.
- Avoid storing the same data in multiple stores.
- Keep state minimal, serializable where required, and scoped to its consumers.
- Model transitions explicitly when a flow has meaningful states rather than many loosely related booleans.

## Forms and Validation

- Use the project's established form and schema libraries.
- Define validation rules in a reusable schema or dedicated validation layer, not scattered event handlers.
- Keep client validation aligned with the API contract, but never assume it replaces server validation.
- Infer or share types from schemas when supported to prevent drift.
- Display field errors near their inputs and form-level errors in an accessible location.
- Prevent accidental duplicate submissions.
- Disable submission only when it improves correctness, and show progress while submitting.
- Normalize values deliberately; do not silently discard meaningful user input.
- Map server validation errors to fields when possible and preserve submitted values after failure.

## Authentication and Authorization

- Keep authentication/session logic centralized.
- Apply route protection using the framework's supported boundary, not repeated page-level checks alone.
- Treat client-side authorization as a UX layer only; the backend must enforce access.
- Render actions and navigation based on permissions through shared policy helpers where available.
- Avoid redirect loops and preserve a safe return destination after authentication.
- Never log tokens, passwords, session identifiers, authorization headers, or sensitive personal data.
- Use secure, project-approved storage. Do not introduce browser storage for sensitive credentials merely for convenience.

## Type Safety

- Use the strongest practical type system settings already supported by the project.
- Avoid `any`. Prefer exact types, generics, discriminated unions, or `unknown` followed by validation/narrowing.
- Do not silence type errors with broad assertions, ignore directives, or non-null assertions unless the invariant is proven and documented locally.
- Keep domain types centralized and avoid duplicate, drifting definitions.
- Model optional, nullable, loading, and error states explicitly.
- Remove unused types, imports, variables, and unreachable branches.

## Routing and Navigation

- Follow the router's established conventions and keep route names centralized when the project does so.
- Use framework navigation instead of forcing full page reloads for internal links.
- Validate and encode dynamic route and query values.
- Preserve meaningful URL state across refresh and back/forward navigation.
- Provide appropriate not-found, unauthorized, and error behavior.
- Do not break deep links while refactoring routes; add a migration or redirect when required.

## Configuration and Localization

- Validate required environment configuration at startup or build time.
- Separate public client configuration from secrets and server-only values.
- Never hardcode environment-specific hosts, keys, tenant IDs, or credentials.
- Keep an example environment file updated without real secrets when the project uses one.
- Put user-facing text in the localization system when localization is supported.
- Use stable translation keys and update every supported locale.
- Use locale-aware formatting for dates, time, numbers, currency, and pluralization.
- Do not build sentences by concatenating translated fragments.
- Verify layout direction, icons, alignment, and truncation for right-to-left locales when supported.

## Performance

- Measure or identify a real bottleneck before adding complex optimization.
- Minimize client-side code and use the framework's server/rendering capabilities when appropriate.
- Lazy-load large, infrequently used features where it improves the user experience.
- Avoid unnecessary re-renders by keeping state close to usage and maintaining stable data flow.
- Use memoization only when it prevents meaningful work or preserves required referential stability.
- Optimize images, fonts, and other assets using the project's supported tooling.
- Paginate or virtualize large collections when needed.
- Avoid blocking the main thread with expensive parsing, loops, or transformations.
- Prefer parallel execution only for operations that are genuinely independent; preserve ordering and dependencies where required.
- Maintain cleanup for subscriptions, observers, timers, and event listeners.

## Errors, Logging, and Resilience

- Normalize errors at boundaries and present safe, actionable messages to users.
- Distinguish validation, authentication, authorization, not-found, conflict, rate-limit, network, and unexpected failures where useful.
- Do not expose stack traces, raw server payloads, secrets, or internal implementation details in the UI.
- Use error boundaries or the framework equivalent at meaningful isolation points.
- Provide retry only when the operation is safe to repeat.
- Use structured project-approved monitoring and logging; remove debug logging before completion.
- Preserve a usable fallback when optional content or secondary requests fail.

## Security

- Never trust URL values, browser storage, third-party scripts, external HTML, or API data.
- Avoid rendering raw HTML. If unavoidable, sanitize it with a maintained, project-approved solution.
- Prevent injection by using framework escaping and safe APIs; do not construct executable code from input.
- Use CSRF protections and secure cookie/session patterns required by the backend architecture.
- Validate upload type, size, and metadata; treat file names and URLs as untrusted.
- Add third-party dependencies only when justified, maintained, compatible, and reviewed for security and bundle impact.
- Do not weaken content security, origin checks, authentication, or validation as a workaround.

## Testing and Verification

- Follow the project's test structure and naming conventions.
- Test observable behavior rather than private implementation details.
- Cover the happy path, empty/loading/error states, permissions, validation, and important accessibility behavior.
- Every bug fix should include a regression test when practical.
- Mock at system boundaries; avoid mocking the unit under test so heavily that the test proves nothing.
- Keep tests deterministic. Avoid real time, random data, external networks, and order dependence unless intentionally controlled.
- Run the smallest relevant checks during development and the broader required suite before completion.
- Do not update snapshots blindly; inspect and justify their changes.

## Code Quality and Change Discipline

- Prefer clear names and readable control flow over explanatory comments.
- Comments should explain non-obvious intent, constraints, security decisions, or tradeoffs—not restate the code.
- Keep functions and files manageable; split them when responsibilities become mixed.
- Handle every promise and cleanup path.
- Follow the configured formatter and linter rather than manual style preferences.
- Fix the cause of lint and type errors. Suppress a rule only for a narrow, documented, unavoidable case.
- Do not change package manager, framework, build system, dependency versions, public API, or browser support without task justification.
- Do not edit lockfiles unless dependency resolution legitimately changed.
- Do not manually edit generated artifacts, release versions, tags, or changelogs when automation owns them.

## Forbidden Patterns

- Direct API calls scattered through UI components.
- Business logic embedded in large page or template files.
- Unvalidated external data treated as trusted typed data.
- Secrets in source code, client variables, logs, fixtures, or screenshots.
- Hardcoded routes, hosts, permissions, user-facing messages, or design values when centralized equivalents exist.
- Duplicated server data across unrelated state stores.
- Sequential awaits for independent operations or uncontrolled parallelism for dependent operations.
- Empty catches, swallowed errors, unhandled promises, and permanent debug logging.
- Broad type escapes, blanket lint disables, and tests skipped to achieve a green run.
- Unrequested large refactors mixed into a functional change.
- Declaring completion with failing checks or without disclosing unrun checks.

## Completion Checklist

- [ ] The implementation satisfies the request and acceptance criteria.
- [ ] Existing architecture and conventions were preserved or intentionally updated.
- [ ] Loading, empty, success, error, authorization, and edge states are handled.
- [ ] Accessibility and responsive behavior were checked.
- [ ] API boundaries, types, validation, and security were reviewed.
- [ ] No secrets, debug code, dead code, accidental edits, or unjustified hardcoding remain.
- [ ] Relevant tests were added or updated.
- [ ] Formatter, lint, type-check, tests, and build passed as applicable.
- [ ] Documentation and configuration examples were updated if behavior changed.
- [ ] The final report states verification performed and any remaining limitations.

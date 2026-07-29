# Portfolio Progress Log

This log records completed improvement rounds so each pass stays cumulative and avoids repeating solved work.

## Round 1 — Responsiveness

- **Status:** Completed before this log was introduced (baseline commit `1b64666`).
- **What changed:** Hardened the full experience across compact phones, tablets, desktop, ultrawide screens, short landscape viewports, touch input, safe areas, and both English and Arabic layouts.
- **Why:** The story and composition must remain intentional rather than collapse into a desktop-only art piece.
- **Next priority:** Motion / Interactivity.

## Round 2 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a lightweight, section-aware geometric pointer trail that borrows each chapter's palette; capped it at 16 short-lived marks; limited it to fine pointers; and disabled it when reduced motion is requested.
- **What changed:** Turned the Origin pattern into a discoverable bilingual seal. It now opens a hidden line of story, resets cleanly, supports keyboard focus, exposes state through `aria-expanded`, and remains usable on touch screens.
- **Verification:** Passed the production build and automated suite; checked the interaction at 1366×768 in English and 390×844 in Arabic; confirmed the trail canvas activates on desktop and the Origin secret opens in both directions.
- **Why:** Curiosity now comes from the same geometric system as the portfolio's story, without adding a disconnected visual gimmick or blocking content.
- **Next priority:** Storytelling / Copy — sharpen the opening narrative and project progression while keeping every claim evidence-based.

## Round 3 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Research signal:** Current creative portfolios succeed when the site itself demonstrates the maker's point of view, but the strongest criticism of exploratory portfolios is still slow access to readable evidence. The copy therefore stays short, visible, and recruiter-scannable while the interaction remains optional.
- **What changed:** Reframed the hero as a direct transition from CAD geometry to working software and surfaced the AI-augmented positioning in the first role line.
- **What changed:** Rewrote all five project stories around a compact narrative arc: friction first, then the system's answer, then verified evidence. Removed defensive wording from the RA Job story without introducing a matching-algorithm claim.
- **What changed:** Strengthened the Origin reveal from a biography paragraph into the thesis “Before components, I drew systems,” then carried that same interface/API/data language into the final call to action.
- **What changed:** Updated the English and Arabic source-of-truth copy together so neither language is a shortened afterthought.
- **Verification:** Passed the production build and all five automated tests; checked the English hero and open EV story at 1366×768; checked the new Arabic hero and Origin thesis at 390×844 with RTL active.
- **Why:** The portfolio now tells one continuous story—pattern, product question, engineering method, origin, invitation—while letting a fast-scanning recruiter understand the evidence immediately.
- **Next priority:** Performance — measure the current asset and bundle cost, then reduce the highest-impact bottleneck without flattening the experience.

## Round 4 — Performance — 2026-07-21

- **Status:** Completed.
- **Measured baseline:** The portrait is 149.1 KB; the page-specific client chunk is 65.3 KB; the remaining larger files are framework/runtime chunks. The 1.6 MB social card is metadata-only and is not requested during a normal portfolio visit.
- **What changed:** Added native `content-visibility: auto` containment to the five long chapters below the hero so browsers can skip off-screen layout and paint work until each chapter approaches the viewport.
- **What changed:** Added chapter-specific intrinsic size estimates. Browsers retain the real measured size after rendering, reducing scroll jumps while preserving direct anchor navigation.
- **Fallback:** Wrapped the optimization in `@supports`, so browsers without the feature keep the original fully rendered experience.
- **Verification:** Passed the production build and all five automated tests; verified direct desktop navigation into Method and Contact at 1366×768; verified a direct mobile jump to Origin and its interactive reveal at 390×844.
- **Why:** This removes initial rendering work from the longest single-page chapters without shipping another library, hiding content from the DOM, or weakening the visual system.
- **Next priority:** Accessibility — audit focus order, live regions, contrast, and the new motion/reveal behaviors in both languages.

## Round 5 — Accessibility — 2026-07-21

- **Status:** Completed.
- **What changed:** Replaced action-only screen-reader text on the interactive portrait with stateful labels that first identify it as Rashed's portrait, then explain the available action and reset state.
- **What changed:** Gave the language control an explicit target-language label, marked the visible language token with the correct `lang`, and added a polite visually hidden status so the English/Arabic context change is announced.
- **What changed:** Added descriptive labels to both CV variants and every external project action, including the project name and new-tab behavior.
- **What changed:** Added a reusable visually hidden utility and switched focus outlines to acid yellow inside the blue Method, dark project panels, and dark Contact chapter where the global blue outline lacked enough separation.
- **Verification:** Passed the production build and all five automated tests; verified the portrait's pressed/reset state, English-to-Arabic switch label, RTL state, Arabic CV label, live language status, and the EV project's descriptive external-link name at 1366×768.
- **Why:** The experience now communicates identity, state, destination, and context without relying on color, motion, or visible decorative copy.
- **Next priority:** Code Quality — separate static portfolio data from interactive rendering and reduce the size and cognitive load of the main page module.

## Round 6 — Code Quality — 2026-07-21

- **Status:** Completed.
- **What changed:** Extracted the sliced portrait behavior into `app/components/portrait.tsx`, including its pointer geometry, pressed state, image layers, and accessible state labels.
- **What changed:** Extracted the geometric canvas trail into `app/components/pattern-trail.tsx`, isolating its lifecycle, pointer filtering, section palette, animation frame, and cleanup logic.
- **What changed:** Reduced the main narrative page by 128 logical lines and removed its direct dependency on `next/image` and React pointer-event types.
- **What changed:** Added a structural regression test that fails if either interactive primitive is copied back into the narrative page.
- **Verification:** Passed the production build and all six automated tests; verified the canvas, portrait pressed state, Origin control, and English-to-Arabic RTL switch at 1366×768 after the extraction.
- **Why:** Each interaction now has one clear ownership boundary, while `page.tsx` reads primarily as portfolio state and story composition instead of mixed canvas and image mechanics.
- **Next priority:** SEO / Metadata — audit search snippets, structured data, social previews, canonical signals, and bilingual discoverability against the current story.

## Round 7 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a server-rendered Arabic portfolio at `/ar` instead of keeping Arabic discoverable only after a client-side toggle.
- **What changed:** Replaced the state-only language button with crawlable links between `/` and `/ar`, while preserving the bilingual visual experience and direction switching.
- **What changed:** Added self-referencing canonicals, reciprocal English/Arabic `hreflang` entries, an `x-default` English destination, Arabic Open Graph locale data, and both language URLs in the sitemap.
- **What changed:** Added a route-level `lang` attribute on the portfolio landmark so assistive technology receives the correct language before and after hydration.
- **Verification:** Passed the production build and all seven automated tests; confirmed `/ar` is server-rendered in Arabic with RTL, its language link returns to the English route, and the sitemap exposes the localized URL cluster at 390×844.
- **Why:** Google recommends separate URLs and explicit links for language versions because locale-adaptive or client-only variations may not all be crawled. This makes the Arabic portfolio a first-class destination rather than hidden application state.
- **Next priority:** Visual Design — begin a new rotation by auditing whether the expanded content and language routes still share one unmistakable art-to-code visual signature.

## Round 8 — Visual Design — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a chapter registration system to all five chapters below the hero: a chapter coordinate, a constructed diamond/cross mark, and a graduated CAD measurement line.
- **What changed:** Kept one structural motif across the portfolio while letting its ink follow each chapter—dark ink on paper and orange, acid yellow on blue, and orange on the final dark chapter.
- **What changed:** Mirrored the measurement direction for RTL and tightened the mark, spacing, and line rhythm on compact screens.
- **What changed:** Made Work and Stack explicit positioning contexts so the registration system remains anchored to its own chapter at every breakpoint.
- **Verification:** Passed the production build and all seven automated tests; visually inspected the English Work composition at 1366×768 and the Arabic Origin transition at 390×844. All five marks render, the RTL version mirrors correctly, and no content or interaction is obscured.
- **Why:** The art-to-code identity now behaves like a persistent drafting language across the complete story instead of appearing as an isolated hero or Origin decoration.
- **Next priority:** Motion / Interactivity — give the new registration system one purposeful response to chapter progress without adding scroll-jacking or continuous heavy animation.

## Round 9 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **What changed:** Connected each CAD chapter register to its own native view timeline. The measurement line now reveals in the reading direction while the diamond/cross assembles from a compact construction state.
- **What changed:** Added a dedicated RTL reveal keyframe so Arabic draws from the opposite edge instead of replaying an LTR motion backward.
- **What changed:** Kept the static register as the fallback outside `animation-timeline` support, and retained the global reduced-motion override so the enhancement never becomes a requirement.
- **Regression fixed:** Visual verification exposed that a direct hash such as `#method` could stop at the previous chapter while deferred section heights settled. Added a small hash-alignment lifecycle that corrects initial and subsequent hash navigation after layout stabilizes.
- **Verification:** Passed the production build and all seven automated tests; visually confirmed a direct English jump to Method at 1366×768 and a direct Arabic jump to Origin at 390×844. Both land on the correct chapter with complete registers, readable content, and correct RTL direction.
- **Why:** Motion now explains construction and progress rather than decorating the page, while the anchor correction protects fast recruiter navigation through the long experience.
- **Next priority:** Storytelling / Copy — audit the narrative transition from project evidence into the AI method and artistic origin after the new chapter choreography.

## Round 10 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a narrative bridge after the five projects that names their shared pressure—moving faster without losing the system—and turns that pressure into the reason to enter the AI-augmented method.
- **What changed:** Added a second bridge after the four-step method that separates new tools from the older design instinct, creating a causal transition into the artistic Origin chapter.
- **What changed:** Wrote both transitions independently in English and Arabic, with explicit chapter links and direction-aware hover movement.
- **What changed:** Styled the bridges as editorial pauses rather than new content cards, using the existing serif/mono contrast and chapter borders so they remain part of the same story grammar.
- **Verification:** Passed the production build and all seven automated tests; visually inspected the English Work→Method bridge at 1366×768 and the Arabic Method→Origin bridge at 390×844. Both are readable, correctly directed, keyboard-focusable, and lead to the intended chapter.
- **Why:** The portfolio now explains why each chapter follows the previous one: product friction creates the need for a method, and the method exposes an older pattern-based instinct.
- **Next priority:** Performance — remeasure the longer narrative, route payloads, and rendering behavior after the visual and copy additions.

## Round 11 — Performance — 2026-07-21

- **Status:** Completed.
- **Measured baseline:** After the visual, motion, bilingual-route, and narrative additions, the page-specific client chunk was 68.2 KB and the client build transformed 115 modules.
- **What changed:** Replaced four `next/image` instances that all requested the same unoptimized portrait with dimensioned native images. The first slice remains eager with high fetch priority; the remaining slices are lazy and reuse the same cached source.
- **Measured result:** The page-specific client chunk fell to 26.8 KB—a 60.7% reduction—and the client build now transforms 69 modules instead of 115. The 149.1 KB portrait source and its exact visual crop remain unchanged.
- **What changed:** Preserved explicit width/height, async decoding, empty decorative alt text, and the accessible state on the parent portrait control.
- **Verification:** Passed the production build and all seven automated tests; visually verified all four broken-frame slices and the pressed/reset state at 1366×768, then verified the Arabic portrait and RTL hero at 390×844.
- **Why:** This removes a large client-side abstraction that provided no optimization in the existing setup, while keeping the exact art direction and network cache behavior.
- **Next priority:** Responsiveness — stress-test the new chapter registers and narrative bridges across narrow, short, landscape, and ultrawide layouts.

## Round 12 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **What changed:** Stress-tested the bilingual experience at 320×568, 844×390, and 1920×1080, including the fixed story rail, hero actions, portrait composition, chapter registers, and long-form project flow.
- **Issue found:** On a short 320px-wide Arabic viewport, the two hero actions wrapped into separate rows and the secondary CV action collided with the fixed story rail.
- **What changed:** Added one narrowly targeted short-screen rule that keeps both actions on the same row, assigns proportional flex space to the primary and secondary actions, and trims only their compact-screen gap, padding, and label size.
- **What changed:** Added rendered-output assertions for the new short-screen breakpoint and its no-wrap guarantee so the collision cannot silently return.
- **Verification:** Passed the production build and all seven automated tests. Browser measurements confirm both Arabic actions share the same baseline at 320×568 and finish 57px above the rail; 844×390 and 1920×1080 have no horizontal overflow, and the chapter registers remain within their content bounds.
- **Why:** The opening choice now remains usable on the smallest realistic phone viewport without weakening the editorial spacing on standard mobile, landscape, tablet, or desktop layouts.
- **Next priority:** Accessibility — audit keyboard, focus, reduced-motion, landmark, and screen-reader behavior after the recent interactive and narrative additions.

## Round 13 — Accessibility — 2026-07-21

- **Status:** Completed.
- **What changed:** Replaced the narrative first-door label on the skip link with explicit, localized “Skip to selected work” copy in English and Arabic.
- **What changed:** Made the selected-work section a programmatic focus target and connected the region to its visible heading, so activating the skip link moves both the viewport and assistive-technology focus to the intended chapter.
- **What changed:** Added native `inert` state to every closed project panel. Hidden project links now leave the keyboard and interaction tree completely, while the open panel remains available alongside its existing `aria-expanded`, `aria-controls`, and `aria-hidden` relationships.
- **What changed:** Hid directional arrow glyphs from screen readers where the surrounding text already communicates the action, and added localized new-tab labels to the GitHub and LinkedIn links.
- **Verification:** Passed the production build and all seven automated tests. Browser verification confirmed the skip link focuses `#work`, four closed panels are inert while the first open panel is not, and the Arabic route exposes the localized skip label with the same panel isolation.
- **Why:** Keyboard and screen-reader visitors now follow the same intentional story path without entering visually collapsed content or hearing decorative punctuation as instructions.
- **Next priority:** Code Quality — extract the growing navigation and project-door responsibilities from the page component without changing the experience.

## Round 14 — Code Quality — 2026-07-21

- **Status:** Completed.
- **What changed:** Extracted the complete project-door interaction into a dedicated `ProjectDoors` client component, including the open-project state, bilingual content selection, accordion relationships, inert-panel behavior, proof/stack rendering, and external project actions.
- **What changed:** Replaced the page-level project shape with the component’s exported `ProjectDoorContent` contract and reduced the main portfolio component to composition plus chapter-level state.
- **What changed:** Passed a compact localized label contract into the component so it owns behavior and structure without owning the portfolio’s English or Arabic editorial voice.
- **What changed:** Extended the component-isolation tests to prevent the accordion state from leaking back into the page and to preserve the accessibility contract introduced in Round 13.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser checks opened Tickln in English and NotNull in Arabic; each route retained one expanded panel, correct `aria-expanded` state, correct inert siblings, RTL direction, and no horizontal overflow.
- **Why:** The longest interaction on the site can now evolve independently without making the narrative page harder to reason about or risking unrelated chapter state.
- **Next priority:** SEO / Metadata — audit the current social preview, structured data, and bilingual route metadata against the evolved story and current private/public launch state.

## Round 15 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Arabic route supplied only a partial Open Graph object, which removed the inherited image, type, and site name; its X/Twitter card also inherited English title and description copy.
- **What changed:** Added a complete Arabic social-preview contract with localized Open Graph and X titles, descriptions, locale, alternate locale, site name, absolute image URL, exact image dimensions, and Arabic image alternative text.
- **What changed:** Added stable JSON-LD identities for the person and website, plus an Arabic `WebPage` entity that connects the localized route back to both while declaring `ar-JO` explicitly.
- **What changed:** Added `x-default` to both sitemap language clusters and declared the web-app manifest language and reading direction.
- **What stayed:** Kept the existing bespoke social card after visual inspection; its typography, portrait, CAD geometry, and site palette already match the current experience and remain legible at sharing-card proportions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection at 390×844 confirmed the Arabic canonical URL, localized Open Graph and X metadata, absolute social image, `website` type, three valid schema entities, correct RTL hero, and no horizontal overflow.
- **Why:** Arabic links now unfurl as a first-class localized version instead of a partially translated English card, while crawlers receive explicit relationships between the person, site, and language route.
- **Next priority:** Visual Design — refine one underdeveloped chapter surface now that structure, metadata, and interaction semantics are stable.

## Round 16 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Target chosen:** The Working Set chapter was the last major surface that still read like a conventional technology list instead of part of the portfolio’s CAD-to-code world.
- **What changed:** Rebuilt the list’s visual grammar as a technical drawing: a dashed measurement spine connects five diamond coordinate nodes, while each engineering layer receives its own restrained accent field on hover.
- **What changed:** Added two oversized, low-contrast construction squares behind the chapter and mirrored their placement in RTL, creating depth without introducing a separate illustration or competing with the content.
- **What changed:** Added a stable `#stack` coordinate so the chapter can be inspected and linked directly like the other narrative surfaces.
- **What stayed:** Preserved the exact skill claims, ordering, bilingual copy, semantic reading order, and flat editorial structure; no card grid or decorative asset was introduced.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Visual inspection at 1366×768 and Arabic 390×844 confirmed five aligned coordinate rows, readable copy, mirrored geometry, correct direct-hash alignment, and no horizontal overflow.
- **Why:** The technology chapter now feels authored by the same person who moved from geometric drafting to software systems instead of becoming a generic résumé list near the end of the story.
- **Next priority:** Motion / Interactivity — give the new Working Set blueprint one restrained, low-cost response that clarifies progression without repeating the chapter-register animation.

## Round 17 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a small blue survey marker that travels along the Working Set measurement spine as the reader moves through its five engineering layers.
- **Implementation choice:** Reused the page’s existing requestAnimationFrame-throttled scroll update and writes only one percentage custom property; no new listener loop, dependency, or component state was introduced.
- **Correction during verification:** The first CSS view-timeline prototype stayed fixed around the middle row in the target browser. It was removed and replaced with a measured section-relative progress calculation before the round was accepted.
- **What changed:** Added resize recalculation so the marker stays accurate after viewport changes, mirrored it automatically through logical positioning, and disabled it entirely under `prefers-reduced-motion`.
- **Verification:** The production build and all seven automated tests passed. Browser measurements confirmed the marker moved from 0.00% to 27.66% during desktop scrolling and reached 61.97% on the Arabic route, where it remained aligned to the right-hand RTL spine with no horizontal overflow.
- **Why:** The marker turns the blueprint into a quiet reading instrument—showing where the visitor is in the technical system—without replaying the chapter-register draw, hijacking scrolling, or adding constant ambient motion.
- **Next priority:** Storytelling / Copy — audit the transition from artistic Origin through the Working Set into the final contact ask, which now has stronger visuals than narrative connective tissue.

## Round 18 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a narrative bridge from Origin to the Working Set: the English version frames artistic pattern training as the instinct that production turned into practical tools, while the Arabic version carries the same causal idea in natural Arabic rather than mirroring the sentence literally.
- **What changed:** Added a second bridge from the Working Set to Contact, stating the standard behind the stack—technology matters when it makes complexity clear for someone else—and turning that standard into the reason to open the final door.
- **What changed:** Added direct, action-led links to `#stack` and `#contact`, preserved decorative-arrow hiding, assigned the Origin bridge across the full grid, and gave Arabic bridge copy an intentional local font and reading rhythm.
- **Verification:** The production build and all seven automated tests passed. Visual inspection confirmed the English Origin→Stack sequence at 1366×768 and the Arabic Stack→Contact sequence at 390×844; both preserve their chapter colors, direction, link affordance, story-rail clearance, and zero horizontal overflow.
- **Why:** The final third now reads as one argument instead of three adjacent sections: artistic constraints shaped the instinct, the instinct shaped the working set, and the working set exists to clarify real product complexity.
- **Next priority:** Performance — remeasure rendering and scroll work after the blueprint marker and two additional narrative surfaces.

## Round 19 — Performance — 2026-07-21

- **Status:** Completed.
- **Measured baseline:** The scroll-linked Working Set marker queried the document and read its layout on every throttled scroll frame across the entire long-form page; the page client chunk was 29,590 bytes.
- **What changed:** Added a stable element ref so the scroll loop no longer searches the DOM for `.stack-list` on every frame.
- **What changed:** Added a lightweight IntersectionObserver with a one-viewport root margin. Marker layout is now measured only as the Working Set approaches the visitor; the global progress line continues to update normally everywhere else.
- **What changed:** Recalculates correctly on viewport resize and disconnects the observer during cleanup, with no new dependency or persistent animation loop.
- **Measured result:** The page client chunk remains effectively flat at 29,711 bytes (+121 bytes) while eliminating almost all off-section marker layout reads during the Hero, Work, Method, Origin, and Contact chapters.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser checks confirmed the marker stays at 0% in the Hero, initializes at 14.00% near the Working Set, advances to 52.37% after scrolling, and introduces no horizontal overflow.
- **Why:** The new motion now costs work only where it communicates something, preserving the long page’s responsiveness instead of attaching an unnecessary layout read to every scroll frame.
- **Next priority:** Responsiveness — stress-test the two new narrative bridges and the full five-row blueprint across short landscape and very narrow screens.

## Round 20 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Stress test:** Audited the full Working Set, both new narrative bridges, the contact transition, and the fixed story navigation at Arabic 320×568, bilingual 844×390 landscape, and English 1920×1080.
- **Issue found:** In short landscape, the full-width bottom story rail occupied almost one sixth of the viewport and covered the first Working Set row at the direct `#stack` coordinate.
- **What changed:** Reconfigured the rail only for short landscape into a compact four-coordinate vertical instrument. It now shows chapter numbers, keeps the active acid marker, and sits on the inline-end edge—right in LTR and left in RTL.
- **What changed:** Reserved matching logical inline space across all narrative chapters so the rail never overlays text, project controls, blueprint rows, or the final CTA.
- **What stayed:** Standard mobile keeps the thumb-friendly bottom rail, and desktop keeps the full masthead navigation with the story rail hidden.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 844×390 the rail measures 52×171px, English content ends before its right edge, Arabic content begins after its left edge, 320×568 keeps its existing bottom layout, and 1920×1080 remains rail-free with zero horizontal overflow.
- **Why:** Short landscape now behaves as its own constrained reading mode instead of squeezing a portrait-oriented navigation pattern into 390px of height.
- **Next priority:** Accessibility — audit the new number-only landscape rail, the scroll-linked marker, and the expanded story sequence under keyboard, contrast, and assistive-technology expectations.

## Round 21 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The number-only landscape rail remained visually understandable, but its chapter links inherited the hidden visible labels as noisy accessible names; the newer Method, Origin, Stack, and Contact hash destinations also lacked a consistent programmatic focus target.
- **What changed:** Gave every story-rail link an explicit localized accessible name, so the compact coordinates announce “Work”, “Method”, “Origin”, and “Contact” in English and their natural Arabic equivalents without reading the decorative numbers.
- **What changed:** Made all four internal chapter destinations programmatically focusable with `tabindex="-1"` and connected each section to its visible heading through `aria-labelledby`.
- **What changed:** Added a restrained inward focus outline for chapter destinations, using the acid accent over dark Method and Contact surfaces so keyboard position remains visible without shifting layout.
- **What stayed:** Preserved the vertical number-only instrument, visual labels on larger breakpoints, scroll-linked Stack marker, direct hashes, and the story’s reading order.
- **Verification:** The production build and all seven automated tests passed. At 844×390, an English narrative-bridge activation moved both the URL and focus to `#method` at a 32px masthead offset; the Arabic rail exposed four localized names and moved focus to `#contact` at the same offset. Visual inspection confirmed the active 04 coordinate, contact heading, and focus treatment remain unobstructed.
- **Why:** Internal navigation now carries keyboard and assistive-technology users into the chapter itself instead of changing only the viewport, while the compact rail communicates chapter names without exposing its decorative shorthand.
- **Next priority:** Code Quality — centralize the repeated chapter destination contract so future chapters cannot silently omit focusability, heading association, or rail labeling.

## Round 22 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** Chapter identity was repeated in the observer, desktop navigation, compact rail, and five section elements. Those copies had already drifted: the narrative contains five chapters, but both navigation surfaces defined only four, omitted the Working Set, and numbered Contact as 04 while its chapter register correctly said 05.
- **What changed:** Introduced one typed chapter registry containing each stable ID, canonical number, and heading ID, plus one destination helper that supplies the focus and heading-association contract.
- **What changed:** Rebuilt the intersection observer, desktop masthead, compact rail, and all section destination attributes from that registry instead of hand-maintained arrays and repeated JSX attributes.
- **What changed:** Restored the Working Set as chapter 04 in both navigation surfaces and aligned Contact to 05; added natural localized labels “Stack” and “الأدوات”.
- **What changed:** Updated the mobile rail grid to five equal columns and expanded automated coverage for registry use, five-link output, the Stack link, and the five-column contract.
- **Verification:** TypeScript completed with zero errors; ESLint reported zero errors and the single intentional existing native-image advisory. The production build and all seven automated tests passed. Browser checks confirmed a 52×211px five-coordinate rail at 844×390, five 65.7px mobile targets at 390×844, five desktop links inside a 401px masthead navigation, correct `#stack` activation at a 32px offset, and no horizontal overflow in any mode.
- **Why:** One source now controls chapter order, numbering, accessible destinations, observation, and navigation. The refactor both prevents future drift and repaired a real mismatch that had survived separate visual and accessibility rounds.
- **Next priority:** SEO / Metadata — align structured navigation and page-level discoverability with the now-canonical five-chapter story without exposing private or unverified claims.

## Round 23 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Research check:** Confirmed against Schema.org v30 that `hasPart` is valid for CreativeWork-derived page types and that `WebPageElement` is the appropriate type for addressable parts of a page.
- **Issue found:** Crawlers could identify the person, website, and Arabic page, but the five-chapter structure repaired in Round 22 existed only in interface markup and was absent from structured data.
- **What changed:** Added a shared bilingual chapter-schema builder that emits five `WebPageElement` entities with stable fragment URLs, human names, explicit positions, and BCP 47 language values.
- **What changed:** Attached the English chapter set to the canonical ProfilePage and the localized set to the Arabic WebPage; also assigned the ProfilePage a stable `@id` so its identity is no longer implicit.
- **What stayed:** Preserved the existing Person and WebSite identities, canonical and alternate URLs, social cards, truthful skill vocabulary, and private deployment policy. No ranking claim, invented credential, or hidden keyword block was added.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Live browser parsing returned five English parts ordered Selected work → Method → Origin → Working set → Contact and five Arabic `ar-JO` parts; the Arabic Working Set resolves to `/ar#stack` at position 4.
- **Why:** Search and other structured-data consumers can now understand the portfolio as a deliberate five-part profile narrative instead of one undifferentiated page, using the same deep links visitors use.
- **Next priority:** Visual Design — refine one remaining generic surface now that the narrative, navigation, and structured representation all agree on the same five chapters.

## Round 24 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Target chosen:** The Method chapter still relied on a conventional text column beside four horizontal rows, while every other chapter had developed a visual system tied directly to the CAD-to-code story.
- **What changed:** Recast the blue Method surface as a digital calibration board using a low-contrast diamond drafting field, three concentric measurement arcs, and a direction-aware mask that concentrates geometry around the process rather than behind the explanation.
- **What changed:** Converted each process number into a precise diamond coordinate node and each directional arrow into a circular instrument; their hover states reassemble into rotated geometric forms instead of applying only a color fill.
- **What changed:** Added an open-sided return rail around the four steps so Frame → Provoke → Build → Verify reads visually as a closed engineering loop rather than four unrelated list items.
- **What stayed:** Preserved the exact bilingual workflow copy, semantic ordered list, reading order, sticky explanation, AI-tool claims, reduced-motion behavior, and direct chapter coordinate.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Visual inspection at 1366×768 confirmed four aligned 42px coordinate nodes, clear text over the masked drafting field, and a complete return rail. Arabic inspection at 390×844 confirmed correct RTL mirroring, 45px instrument controls on the inline-start edge, a 338px loop width, and no horizontal overflow.
- **Why:** The Method chapter now expresses Rashed’s actual working model as a drawn system—measurement, iteration, and ownership—rather than borrowing the visual language of a generic process section.
- **Next priority:** Motion / Interactivity — give the new calibration board one restrained stateful response that makes the four-step loop legible through progression without adding ambient distraction.

## Round 25 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **What changed:** Added a reading-band IntersectionObserver to the four Method steps. The step crossing the deliberate viewport band becomes the active calibration state without adding a scroll listener, requestAnimationFrame loop, or continuous ambient animation.
- **What changed:** The active coordinate now receives a restrained acid field, its diamond node rotates and locks, its direction instrument becomes a square, and the outer return rail fills from 25% to completion as the reader advances from Frame to Verify.
- **What changed:** Built the return rail entirely with logical inline positioning. During verification an initial physical-edge implementation incorrectly kept the rail on the right in Arabic; it was rejected and corrected so English progresses on the right and Arabic on the left.
- **What stayed:** Kept the ordered-list semantics, all step copy, manual scrolling, existing hover response, reduced-motion override, and the page’s global progress behavior. The active state is visual only and does not generate noisy live announcements.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop browser checks observed the active step move 0 → 2 → 3 and the rail’s end inset contract from 576px toward 43.9px. On Arabic 390×844, the rail resolved to `left: -19.2px` instead of the right edge, active state advanced 0 → 3, and horizontal overflow remained zero.
- **Why:** The workflow now explains itself through use: the visitor sees one engineering decision at a time and the path visibly closes at Verify, while motion remains tied to reading intent rather than decoration.
- **Next priority:** Storytelling / Copy — strengthen the transition into Method so the new calibration interaction is introduced as Rashed’s practical AI-augmented decision loop, not just discovered as a visual device.

## Round 26 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Work-to-Method bridge mentioned speed and system integrity, but it did not name the review discipline that separates an AI-augmented workflow from unowned generated output. The new interactive loop also began without a sentence explaining how its four passes form one decision system.
- **What changed:** Rewrote the bridge around a rule learned across five products: speed matters only when every fast decision can still survive review. Its CTA now opens “the decision loop” instead of generically entering a method.
- **What changed:** Expanded the Method body into an evidence-safe workflow description: Codex, Claude, Cursor, and GLM widen the search and remove repetitive work; Rashed frames the problem, challenges the output, builds in small increments, verifies the result, and retains the final judgment.
- **What changed:** Added a compact bilingual reading note above the calibration board that synthesizes Frame → Provoke → Build → Verify before the visitor activates the four states. The Arabic version is independently phrased around حدود، افتراضات، أصغر خطوة مفيدة، and التحقّق rather than mirroring English syntax.
- **What stayed:** Preserved every project claim, technology name, four-step label, Origin transition, and the distinction between practical AI use and engineering ownership. No unverified speed percentage or productivity claim was introduced.
- **Verification:** The production build and all seven automated tests passed after replacing one stale exact-copy assertion. At 1366×768, the English reading note occupies a 566×44px annotation field and leaves the first active step visible at 272px. At Arabic 390×844, the note remains 338×44px, the expanded workflow body fits in 111px, the first calibration state is visible, and horizontal overflow remains zero.
- **Why:** The chapter now has a complete causal argument: product pressure creates the need for speed, review makes that speed safe, AI widens the search, and the four-pass loop keeps responsibility human-owned.
- **Next priority:** Performance — measure the cost of the new Method field and step observer, then remove any rendering or observation work that continues outside the chapter.

## Round 27 — Performance — 2026-07-21

- **Status:** Completed.
- **Measured baseline:** The Method drafting field and arcs were already skipped off-screen by the chapter’s existing `content-visibility: auto`, but every active-step change used React state and therefore re-rendered the entire long-form Portfolio component while the reader moved through four calibration states. The page client chunk measured 31,239 bytes.
- **What changed:** Removed the active-step React state completely. The existing IntersectionObserver now performs progressive enhancement directly on the Method list, removing the previous step’s `data-active`, assigning it to the next step, and advancing the rail’s data coordinate.
- **What changed:** Preserved step 01 as the server-rendered default so the chapter remains visually complete before hydration or when JavaScript is unavailable; the observer only changes the previous and next DOM nodes after a real reading-band transition.
- **Measured result:** Method progression now causes zero Portfolio-level React re-renders. The page chunk remains effectively flat at 31,332 bytes (+93 bytes) while eliminating four potentially expensive full-tree render passes across projects, narrative chapters, and contact content.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser checks confirmed exactly one active node at all times, server state `0/0`, post-scroll state `3/3`, the same completed rail behavior, and zero horizontal overflow.
- **Why:** The interaction now updates only the two pieces of UI that visibly change. It keeps React responsible for content and authored interaction state, while treating viewport-driven calibration as lightweight progressive enhancement.
- **Next priority:** Responsiveness — stress-test the expanded Method copy, five-step rail, active calibration state, and transition into Origin across short landscape and narrow bilingual layouts.

## Round 28 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Stress test:** Audited the expanded Method narrative, calibration field, five-chapter rail, active step, and RTL return path at English and Arabic 844×390 plus Arabic 320×568.
- **Issue found:** Nothing overlapped, but 844×390 inherited the generic one-column tablet layout. A direct `#method` visit showed only the title and body; the new reading note began below the 390px viewport at y=453, so the chapter’s defining calibration interaction was invisible on entry.
- **What changed:** Added a dedicated two-column Method composition only for short-landscape widths from 760px to 980px. It balances an .82fr narrative column against a 22rem-minimum route column and retains the 5rem logical rail reservation.
- **What changed:** Tightened typography, step height, node and instrument size, copy rhythm, and vertical padding inside that single breakpoint; narrower landscape and portrait devices keep the proven one-column flow.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At English 844×390, the heading occupies x42–296 while the reading note and active Frame step begin at x347 and end at x749, safely before the rail at x768. Arabic mirrors the system: the rail ends at x61, the Method route starts at x80, the heading occupies x554–787, and overflow remains zero. Arabic 320×568 retains a 57px bottom rail, 55px heading, 166px workflow body, and zero overflow.
- **Why:** Short landscape now reveals both the argument and its interactive proof in the first chapter viewport instead of making the visitor scroll before understanding what is special about the Method surface.
- **Next priority:** Accessibility — audit the new viewport-driven active state, compact short-landscape typography, and process semantics for assistive technology and keyboard users.

## Round 29 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The active Method coordinate inherited white text while its diamond filled with the bright acid color, making the two-digit step number nearly disappear. The short-landscape reading note and rail coordinates also rendered at approximately 8.6px and 9.3px respectively.
- **What changed:** Switched the active coordinate number to ink against the acid diamond, producing a measured 16.57:1 contrast ratio while leaving the surrounding white step content unchanged.
- **What changed:** Raised both the short-landscape reading note and rail coordinate labels to a computed 10px, and raised compact step body copy to 12px without changing the 37.6px rail targets or the two-column composition.
- **What changed:** Added a natural localized accessible name to the semantic ordered list: “AI-augmented decision loop” in English and “حلقة القرار المعزّزة بالذكاء الاصطناعي” in Arabic. The viewport-driven active highlight remains deliberately absent from live regions, preventing unsolicited announcements while the user scrolls.
- **What stayed:** Preserved ordered-list and heading semantics, passive viewport observation, logical RTL progression, reduced-motion behavior, keyboard chapter navigation, and the visually active single-step state.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection at 844×390 confirmed ink `rgb(17,16,15)` over acid `rgb(216,255,66)`, 10px compact annotation and rail labels, exactly one active step, localized list names on both routes, and zero horizontal overflow.
- **Why:** The calibration state is now visibly readable instead of merely decorative, and assistive technology receives the purpose of the four-step sequence without being forced to follow a visual scroll effect.
- **Next priority:** Code Quality — extract the viewport-driven single-active-item behavior into a small reusable hook so its mutation, cleanup, and initial-state contract are isolated from the portfolio narrative.

## Round 30 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The optimized Method reading-state observer was still implemented inline inside the 500-line portfolio page, mixing viewport mechanics and DOM mutation details with bilingual narrative rendering.
- **What changed:** Extracted the full single-active-step contract into `useReadingStep`: list discovery, reading-band observation, highest-ratio selection, previous/current attribute mutation, rail-coordinate update, and observer cleanup now live in one focused hook.
- **What changed:** Reduced the Portfolio integration to one stable list ref, one hook call, and the server-rendered initial attributes. The page no longer contains Method-specific IntersectionObserver or mutation implementation details.
- **What changed:** Extended the isolation tests to verify the hook import/export, cleanup, root margin, mutation behavior, and absence of the extracted mechanics from the narrative page.
- **What stayed:** Preserved the no-state performance improvement, one-active-item invariant, first-step server default, localized list semantics, exact visual response, and four-step content.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser checks at 844×390 confirmed state `0/0` on entry, state `3/3` after scrolling, exactly one active item before and after the transition, unchanged short-landscape composition, and zero horizontal overflow.
- **Why:** The page once again reads primarily as portfolio structure and copy, while the calibration behavior has one testable owner that can be reused or changed without editing the narrative surface.
- **Next priority:** SEO / Metadata — update the Method chapter’s structured description so search consumers receive the refined human-owned AI workflow, not only the generic chapter name.

## Round 31 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** The five `WebPageElement` entities exposed stable chapter names, positions, languages, and deep links, but their structured representation stopped at generic labels such as “AI-augmented method” and did not communicate the evidence-safe purpose now visible on the page.
- **What changed:** Added concise bilingual descriptions for all five structured chapters—Selected Work, Method, Origin, Working Set, and Contact—using the same truthful boundaries as the visible portfolio.
- **What changed:** The English Method entity now describes “A human-owned, AI-augmented decision loop: frame the problem, provoke assumptions, build, and verify.” The Arabic entity carries the natural equivalent around تحديد المشكلة، اختبار الافتراضات، البناء، والتحقّق.
- **What stayed:** Preserved every chapter ID, fragment URL, position, language code, Person/ProfilePage/WebSite relationship, canonical route, social card, and the ban on unverified performance or ranking claims.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser parsing returned five described parts on each route, with the English and Arabic Method entities both at position 2 and carrying their correct localized names and descriptions.
- **Why:** Search and structured-data consumers now receive the same core meaning as human visitors: AI expands the process, but the engineering decision loop remains owned and verified by Rashed.
- **Next priority:** Visual Design — move to a different underdeveloped surface and audit the Work chapter’s closed project doors, which still rely more on typography than the geometric identity visible elsewhere.

## Round 32 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Target chosen:** The expanded project evidence panels were visually authored, but the five closed project doors still read as conventional editorial rows separated by rules. Their individual accent colors were visible only after hover or opening.
- **What changed:** Drew a four-corner aperture around every closed door using eight one-pixel measurement strokes. Each project’s existing accent now identifies its boundary before interaction, and the strokes contract inward when the door is hovered or opened.
- **What changed:** Rebuilt each small project number as an eight-point coordinate seal made from two overlapping squares. The seal uses the project accent while closed, then reassembles into an ink construction mark over the colored open state.
- **What stayed:** Preserved the button semantics, full-row hit area, project names and questions, accordion behavior, per-project color system, evidence panel layout, focus outline, and bilingual reading direction.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop closed-state inspection confirmed five 137px apertures, 41px coordinate seals, .72 corner opacity, and zero overflow; the open state contracts the frame and keeps evidence readable. Arabic 390×844 confirmed a 343×136px first door, 29px mirrored seal, text ending before the coordinate column, correct inline-start action placement, and zero overflow.
- **Why:** The Work chapter now begins with five drawn apertures rather than a résumé-like list. Each project feels like a coordinate in the same CAD-to-code system while retaining its own product color.
- **Next priority:** Motion / Interactivity — refine the door-opening transition so the new aperture and coordinate seal lead the reveal in one coherent sequence instead of moving independently.

## Round 33 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new aperture frame, coordinate seal, color field, evidence panel, and evidence content all reacted to an open action at nearly the same time, making the project door feel like several independent CSS effects instead of one authored mechanism.
- **What changed:** Sequenced the opening as an architectural reveal: the aperture contracts immediately, the coordinate seal begins reassembling at 80ms, the project color field follows at 120ms, the evidence panel expands at 160ms, and its contents resolve at 340ms.
- **What changed:** Kept closing immediate and responsive by applying delays only to the `.open` state. Hover previews still respond without the opening sequence’s deliberate pauses.
- **What changed:** Extended the reduced-motion contract to force every transition delay to zero in addition to reducing durations, preventing a motion-sensitive visitor from receiving silent pauses after animations have been removed.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection confirmed computed timing contracts of 0.08s for the seal, 0.12s for the fill, `0.16s, 0s` for panel/visibility, and 0.34s for evidence. At 70ms evidence remained at opacity 0 while the fill was still travelling; by 240ms evidence was resolving at .82; by 600ms the fill, panel, and evidence were complete.
- **Why:** Opening a project now feels like crossing a threshold: boundary, coordinate, color, structure, then proof. The sequence reinforces the “five doors” concept without slowing repeated closing or adding ambient motion.
- **Next priority:** Storytelling / Copy — audit the five project questions and evidence labels as one narrative set, then sharpen any door whose question is less specific or compelling than the others without inventing product claims.

## Round 34 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** EV Solution JO, Tickln, and NotNull opened with human product tensions, while the RA Job Search and Course Management questions still sounded like summaries of interface mechanics. The resulting five-door set lost narrative energy at its final two entries.
- **What changed:** Reframed RA Job Search around the job seeker’s real tension—turning noise into a next move—and rewrote its answer as a guided route from search to context, profile, and deliberate protected action.
- **What changed:** Reframed Course Management around the person at the screen, then opened its answer with the contrasting intent of a teacher who arrives to shape a course and a student who arrives to find one. The copy now explains role-aware journeys before naming the shared relational model.
- **What changed:** Wrote natural Arabic counterparts rather than literal word-for-word translations, while preserving the same meaning and all verifiable product boundaries on both routes.
- **What stayed:** Preserved project names, links, technology stacks, evidence lists, door order, live-product distinction, and the absence of unverified impact metrics or implementation claims.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop browser review confirmed the revised RA Job question remains a single readable door line and its expanded story fits the established evidence composition. Arabic review at 390×844 confirmed the revised RA Job and Course questions wrap cleanly inside their geometric apertures, the Course story reads naturally in RTL, and the door layout has no horizontal overflow.
- **Why:** The final two doors now begin with decisions a person recognizes, then let the technical system answer. The full project set reads as five product questions rather than five feature summaries.
- **Next priority:** Performance — profile the Work chapter’s five animated doors and reduce any paint, layout, or CSS cost introduced by the aperture and staged reveal without flattening the interaction.

## Round 35 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** Every closed project aperture animated its four-sided geometry through the `inset` property. Because `inset` changes the pseudo-element’s box on every frame, five otherwise lightweight door frames carried avoidable geometry and paint work during hover and opening.
- **What changed:** Fixed the aperture at its final inset and recreated the same subtle inward-to-open movement with a two-axis `scale()` transform. The transition now touches only `transform` and `opacity`; no `inset` transition remains on the door frame.
- **What changed:** Added regression coverage that isolates the aperture rule, confirms its transform contract, and prevents a future reintroduction of an `inset` transition on that element.
- **What stayed:** Preserved all eight measurement strokes, project accent colors, closed/open geometry, 350ms easing, hover response, staged door reveal, RTL behavior, reduced-motion behavior, and full-row button semantics.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection confirmed a closed matrix of `.985 × .94`, an open matrix of `1 × 1`, transition properties limited to `transform, opacity`, and zero horizontal overflow. Desktop screenshots confirmed the closed aperture, open blue Tickln frame, text alignment, and evidence panel remain visually intact.
- **Why:** The decorative frame no longer recalculates its box throughout the animation. The Work chapter keeps the same architectural gesture with a more animation-friendly property path.
- **Next priority:** Responsiveness — test the expanded project stories on narrow phones and short landscape screens now that the two longest narratives have changed, then correct the most constrained layout without reducing legibility.

## Round 36 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** The revised stories remained readable at 320×568 with no overflow, but the existing ≤900px tablet rule collapsed expanded doors to two columns even on 844×390 landscape. RA Job’s panel became 679.7px tall—nearly two viewport heights—and separated its evidence from the answer unnecessarily.
- **What changed:** Added a dedicated 760–980px short-landscape composition for project doors. The trigger returns to a compact four-column line, while the expanded panel restores three columns for product type, system answer, and verifiable evidence.
- **What changed:** Reduced only this constrained mode’s panel padding, gaps, story type scale, evidence rhythm, and secondary margins. Technology tags and the project link remain below the answer across the wide center/right span rather than being removed.
- **What changed:** Preserved a slightly taller Arabic line-height inside the compact mode so the space saving does not compress connected Arabic letterforms.
- **What stayed:** Preserved the standard desktop, portrait tablet, and phone layouts; full copy; all evidence; staged reveal; 44px interaction targets on the 320px phone; RTL column order; and the fixed chapter rail.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 844×390, the English RA Job panel dropped from 679.7px to 360.7px (about 47%) while retaining all three narrative columns and zero horizontal overflow. At 760×390, the longer Arabic Course story rendered in the same three-column structure at 419px with natural RTL order and zero horizontal overflow. The unchanged 320×568 phone composition retained a 273px door, 44.8px action target, readable 234.6px story measure, and zero overflow.
- **Why:** Short landscape visitors can now see the question, answer, and evidence as one designed composition instead of scrolling through a portrait-tablet stack inside a landscape window.
- **Next priority:** Accessibility — audit the newly compact landscape door reading order, focus visibility, and target geometry, then correct any mismatch between visual columns and semantic navigation.

## Round 37 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The compact landscape grid preserved semantic source order and a full-row 715×92px button target, but project triggers still inherited the global blue focus outline. On the open Tickln door, that outline visually merged with the project’s own blue field and blue aperture.
- **What changed:** Added a project-specific dual-tone keyboard focus treatment: a 3px ink outline drawn inside the trigger with a 3px paper inset ring separating it from every project color. The focused trigger is also lifted above its decorative frame so the indicator cannot be obscured.
- **What changed:** Added regression coverage for both colors in the focus treatment so future visual refactors cannot silently return the blue-on-blue state.
- **What stayed:** Preserved native button focus, full-row activation, `aria-expanded`, `aria-controls`, collapsed-panel `inert`, the semantic order of type → answer → evidence → stack → link, all pointer styling, and the compact landscape visual columns.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Keyboard-mode browser inspection at 844×390 measured a 715.25×92px focused trigger, a computed 3px ink outline at −6px offset, and a 3px paper inset ring. Screenshots confirmed the indicator is unambiguous on both the orange EV door and the previously problematic blue Tickln door, with no layout shift or overflow.
- **Why:** Keyboard users can now locate the active door independently of its accent color. The indicator remains part of the CAD-like drawing language instead of looking like a generic browser patch.
- **Next priority:** Code Quality — isolate the repeated project-door accessibility and panel ID contract from string interpolation in the render loop, then strengthen its test boundary without changing behavior.

## Round 38 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** `ProjectDoors` owned both accordion state and the full markup for every repeated project item. Trigger/panel IDs, `aria-controls`, hidden state, project content, and decorative markup were all assembled inside the map loop, leaving the item accessibility contract without a single owner.
- **What changed:** Extracted one self-contained `ProjectDoor` component and moved its content types, bilingual label type, rendering, and ID contract into `project-door.tsx`. `ProjectDoors` now owns only the one-open-item state and collection mapping.
- **What changed:** Centralized the trigger/panel pair in `getDoorIds`, added a stable trigger ID, and connected the panel back to that trigger with `aria-labelledby` while preserving the existing panel IDs used by `aria-controls`.
- **What changed:** Strengthened isolation tests: the collection component must delegate to `ProjectDoor` and may no longer own accessibility strings, while the item component must own the ID helper, controls relationship, label relationship, hidden state, and inert state.
- **What stayed:** Preserved initial EV-open state, one-open-item behavior, every class name, generated HTML content, transition timing, URLs, project order, localized copy, focus treatment, and all responsive compositions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection after opening Tickln confirmed exactly one `.door.open`, trigger `project-trigger-02` controlling `project-02`, reciprocal panel labeling, `aria-expanded=true`, `aria-hidden=false`, no active `inert`, unchanged visual output, and zero horizontal overflow.
- **Why:** State coordination and item rendering now have separate responsibilities. Future changes to a door’s semantics or content structure have one testable surface instead of requiring edits inside the accordion loop.
- **Next priority:** SEO / Metadata — inspect project-level structured data and social descriptions now that the five doors read as product questions, then add the most useful truthful project discovery signal without repeating generic technology keywords.

## Round 39 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** Structured data described Rashed, the site, and all five chapters, but the five named projects existed only in visible HTML. A search consumer could understand that a Selected Work chapter existed without receiving an explicit ordered set of software works or their canonical live/repository URLs.
- **What changed:** Added a bilingual `ItemList` for the five selected projects to both English ProfilePage and Arabic WebPage schema. Each entry has a stable fragment ID, exact position, name, truthful localized description, canonical URL, language, and a focused keyword set derived from visible evidence.
- **What changed:** Classified the live EV Solution JO URL as a `SoftwareApplication` for the web and the four GitHub-linked works as `SoftwareSourceCode`, including `codeRepository` only where the visible link is actually a repository.
- **What changed:** Added schema tests for the six-part profile composition, five stable project IDs, one application, four source-code works, both localized lists, and their project counts.
- **What stayed:** Preserved existing Person, ProfilePage, WebSite, WebPageElement, canonical/hreflang, Open Graph, Twitter, sitemap, visible copy, URLs, and the ban on invented ratings, users, performance metrics, ownership claims, or application status.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser parsing returned an ordered 1–5 English project list with the exact five visible names and URLs, one `SoftwareApplication`, and four `SoftwareSourceCode` items. Arabic parsing returned five `ar-JO` items, localized Arabic descriptions for every work, and stable `/ar#project-01…05` IDs.
- **Why:** Search systems can now distinguish the portfolio’s actual works from a generic skill list and follow the same evidence paths visitors see, while the schema remains conservative about what each link proves.
- **Next priority:** Visual Design — move beyond the now-mature Work and Method chapters and audit the transition into Origin, looking for a visual device that makes the CAD-to-code shift feel discovered rather than simply explained.

## Round 40 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** Origin already had a strong interactive pattern and accurate story, but its flat orange field and four conventional translation cells explained the CAD-to-code relationship mainly through words. The section did not visually show geometry becoming software structure.
- **What changed:** Laid a masked 32px drafting grid over the upper Origin field. It enters beneath the Method-to-Origin seam, gives the large pattern a measured CAD surface, then fades before the chapter exit so the section does not become wallpaper.
- **What changed:** Recast the four translation cells as a static conversion sequence. Each cell now contains one coordinate tile that progressively resolves from a 45° diamond through 30° and 15° to a 0° interface square.
- **What changed:** Progressively introduced the paper surface across those same four cells—0%, 8%, 16%, then 24%—so “pattern → working system” is visible as both geometry and material, while the existing REPEAT/HIERARCHY/CONSTRAINT/PRECISION meanings remain primary.
- **What stayed:** Preserved the orange identity, interactive origin mark, exact story and secret, semantic translation order, all borders, chapter bridge, RTL alignment, mobile one-column ledger, and reduced-motion behavior.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop browser inspection confirmed a 32×32px drafting grid, tile turns of 45°/30°/15°/0°, progressive paper fills, and zero horizontal overflow. English screenshots showed the pattern-to-square sequence as a coherent four-cell ledger. Arabic review at 390×844 confirmed the mirrored tile placement, natural RTL copy order, all four vertical cells, legible paper progression, and zero overflow.
- **Why:** The Origin chapter now demonstrates its thesis before the visitor finishes reading it: ornament is already a rule system, and the system gradually resolves into interface structure.
- **Next priority:** Motion / Interactivity — make the new four-cell geometric conversion respond to reading progress as one restrained sequence, while keeping every final state visible without JavaScript and respecting reduced motion.

## Round 41 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new Origin ledger showed a clear static 45°→0° conversion, but all four tiles arrived fully resolved at once. The visual metaphor did not yet behave like a reading sequence.
- **What changed:** Added a CSS view-timeline progression to the four coordinate tiles. The first resolves across entry→35% cover, then the remaining three begin at 10%/20%/30% entry and finish at 45%/55%/65% cover, producing one staggered conversion tied directly to scroll rather than time.
- **What changed:** Each tile now begins as a faint 45° half-scale source shape and resolves toward its own authored 45°/30°/15°/0° destination. Text, backgrounds, borders, and layout never move.
- **What changed:** Kept the authored final transforms as the base CSS, so browsers without view timelines receive the complete ledger. Added an explicit reduced-motion override that removes the scroll animation and immediately restores those base states.
- **What stayed:** Preserved all semantic content, static paper progression, Origin unlock interaction, mobile stacking, RTL tile placement, zero-JavaScript implementation, and the section’s existing content-visibility performance boundary.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection confirmed native view-timeline support, `tile-resolve` on all four pseudo-elements, the four distinct animation ranges, and staggered computed states at the ledger viewport (opacity .20/.179/.151/.130 with progressively unresolved transforms). The completed visual remains the base rule, and automated CSS checks confirm reduced motion disables the animation entirely.
- **Why:** The CAD tile now becomes interface structure at the pace the visitor reads it. Motion explains the conversion without moving copy, stealing focus, or creating an ambient loop.
- **Next priority:** Storytelling / Copy — audit the Origin unlock secret and the four translation labels now that the visual metaphor is stronger, then sharpen only the line that does not yet earn its place.

## Round 42 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** The unlocked line “A pattern is a system before it becomes code” was true but generic. By the time a visitor clicked the pattern, the page had already made that point visually and verbally, so the reveal did not reward curiosity.
- **What changed:** Replaced the reveal with a personal design question: “The question inside every ornament is the one I still ask in code: what repeats, what varies, and what must never drift?” The Arabic version carries the same rhythm and engineering meaning naturally rather than translating word by word.
- **What changed:** Added source-level regression coverage because the secret is deliberately absent from locked server HTML and appears only after the visitor opens the pattern.
- **Issue caught during verification:** Clicking the partially off-canvas Origin mark on a narrow RTL screen caused the browser to programmatically scroll the clipped section 124px sideways to focus the button, shifting the Arabic copy outside its intended grid.
- **What changed:** Upgraded the Origin clipping boundary from scrollable `hidden` overflow to non-scrollable `clip`, retaining `hidden` as fallback. The same click now keeps section `scrollLeft=0` and the 338.2px copy column at 18.4–356.6px inside a 390px viewport.
- **What stayed:** Preserved the four translation labels, all factual background, unlock/close behavior, live-region announcement, pattern animation, drafting grid, tile sequence, English/Arabic parity, and zero document overflow.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop reveal review confirmed the new line fits the authored rule and retains zero overflow. Arabic 390×844 review confirmed the localized reveal, stable 0px internal scroll, full-width aligned copy, visible vertical ledger, and no document overflow after the click.
- **Why:** The hidden line now reveals how Rashed thinks, not merely what the section means. The interaction also remains spatially stable for the RTL visitor who actually earns that reveal.
- **Next priority:** Performance — profile the new Origin grid and scroll-timeline tiles, then reduce any unnecessary paint or off-screen animation work without removing the visual conversion.

## Round 43 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** The masked drafting grid is static and the entire Origin chapter is already skipped off-screen by `content-visibility`, so removing or rasterizing it would trade identity for negligible benefit. The actual repeated work was the four transforming tile pseudo-elements, whose paint invalidation was not explicitly bounded to their cells.
- **What changed:** Added `contain: paint` to each translation cell, limiting every tile’s scroll-driven invalidation to its own bordered ledger box instead of the full Origin surface.
- **What changed:** Promoted only the four 4.8rem tile pseudo-elements with `will-change: transform, opacity` inside the existing view-timeline support block. Browsers without that feature create no extra hint or layer.
- **What changed:** Reset `will-change` to `auto` alongside `animation: none` in reduced-motion mode so visitors who disable the sequence do not retain four unnecessary promoted surfaces.
- **What stayed:** Preserved the masked 32px grid, all tile angles and opacities, scroll ranges, paper progression, content-visibility boundary, static fallback, RTL placement, clipping, and every visible dimension.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection returned `contain: paint` on all four 284.25×160px desktop cells, `transform, opacity` as the only will-change hints on their tiles, the same `tile-resolve` animation, and zero horizontal overflow. Visual comparison confirmed the ledger, grid, labels, and chapter bridge remain unchanged.
- **Why:** The optimization follows the actual moving pixels. It bounds and promotes four small geometric surfaces without spending memory on the full chapter or weakening the visual concept.
- **Next priority:** Responsiveness — audit the Origin unlock and conversion ledger on mid-size portrait tablets, where the pattern becomes a backdrop and the new grid/tile layers may compete with the bilingual story.

## Round 44 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** At 768×1024 the absolute Origin pattern occupied a 497.8px rotated box over a 676.2px story column, visually crossing the English body copy and sitting above it in the pointer stack. The same geometry mirrored into Arabic, while the two-column ledger itself remained sound.
- **What changed:** Added a dedicated 621–900px portrait-tablet composition. The backdrop now scales between 15rem and 19rem, moves into the outer margin, fades only its eight tiles to 22%, and leaves the interaction label at full opacity.
- **What changed:** Constrained the story to `min(32rem, 100% − 7.5rem)`, preserving a measured clear lane between copy and pattern at both 621px and 768px. The Arabic layout mirrors the same protected lane instead of relying on clipping.
- **What changed:** Repositioned the RTL instruction through the rotated coordinate system so “افتح النمط” remains visible at the left edge while the English instruction remains visible at the right edge.
- **Issue caught during verification:** The instruction bar’s text had always inherited ink-on-ink because it referenced an undefined `--white` token. Replaced it with an explicit white foreground and added a regression assertion that no `var(--white)` reference remains.
- **What stayed:** Preserved phone and desktop layouts, the two-column tablet ledger, tile motion, unlock behavior, full pattern target, drafting grid, secret copy, story rail, and zero document overflow.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 768×1024, English and Arabic copy measured 512px with no meaningful pattern overlap, both instruction labels were fully visible, and the ledger remained two columns. At the 621px breakpoint edge, both directions retained zero copy/pattern overlap, visible instructions, and zero horizontal overflow. The instruction now computes to white `rgb(255,255,255)` on ink `rgb(17,16,15)`.
- **Why:** On portrait tablets the pattern now behaves as a discoverable marginal artifact, not a watermark laid over the biography. The bilingual interaction cue is finally readable as well as programmatically named.
- **Next priority:** Accessibility — audit the Origin pattern’s expanded state, live announcement, and focus indicator across the newly separated tablet geometry, including high-contrast and keyboard-only use.

## Round 45 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Origin button’s existing acid outline followed the large rotated pattern. On portrait tablets most of that button sits outside the viewport, so a keyboard user could focus it while the strongest part of the indicator remained clipped; the visible instruction label itself did not show focus.
- **What changed:** Added a dual-tone focus indicator directly around the visible Open/Close instruction: a 3px paper outline plus a 7px ink outer ring. It stays legible on orange, paper-filled tiles, and the unlocked acid label while preserving the larger pattern outline.
- **What changed:** Added a forced-colors override that replaces the authored rings with the system `Highlight` outline and removes the box shadow, allowing Windows High Contrast to own the focus color.
- **What changed:** Marked the polite Origin live region as atomic, ensuring the entire revealed design question is announced as one thought rather than as a partial text mutation.
- **What stayed:** Preserved native button focus, `aria-expanded`, `aria-controls`, localized Open/Close names, visible label position, unlock animation, live-region politeness, tablet pattern separation, and pointer behavior.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Keyboard-mode inspection at 768×1024 measured the visible English label at 143.84×31.5px, a computed 3px paper outline at 2px offset, and a 7px ink ring while the larger button remained partly off-canvas. After activation, focus stayed associated with “Close the pattern,” `aria-expanded=true`, `aria-controls=origin-secret`, and the live region exposed `aria-live=polite`, `aria-atomic=true`, and the complete reveal sentence.
- **Why:** Focus now appears where the visitor can actually act, not only around an abstract off-screen geometry. Screen-reader users also receive the reveal with the same completeness as sighted visitors.
- **Next priority:** Code Quality — extract the Origin unlock primitive from the main portfolio page so its state, IDs, live-region contract, and eight-tile markup have one isolated owner.

## Round 46 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The main portfolio page still owned Origin’s local unlock state, action-label branch, eight-tile button, fixed IDs, live-region mutation, translation ledger, and Stack bridge. That interactive contract sat between unrelated chapter orchestration and bilingual content selection.
- **What changed:** Extracted a dedicated `OriginChapter` client component. It now owns the unlock state, stable action label, pattern button, `aria-expanded`/`aria-controls`, atomic live region, eight tiles, four translations, and outgoing narrative bridge.
- **What changed:** Reduced the main page to a declarative Origin invocation with nine resolved content props. The page still owns the bilingual source copy; the component owns how the chapter behaves and renders.
- **What changed:** Extended isolation tests to require the new component import, local `unlocked` state, live-region contract, and state transition while forbidding the old Origin state name from returning to the main narrative page.
- **What stayed:** Preserved the exact section ID and heading relationship, initial locked state, visible English/Arabic output, all CSS class names, eight-tile order, translation order, unlock animation, focus treatment, live announcement, tablet composition, and Stack link.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection found exactly one `section#origin`, four translation cells, zero overflow, and—after activation—`aria-expanded=true`, the localized Close label, the complete atomic secret, and an unchanged tablet visual composition.
- **Why:** Origin is now a cohesive, testable interaction instead of a stateful island embedded in the portfolio’s top-level story renderer. Future visual or accessibility work has one owner.
- **Next priority:** SEO / Metadata — align Origin’s structured description with the refined “what repeats / varies / must not drift” systems insight without turning hidden interaction copy into keyword repetition.

## Round 47 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** Origin’s structured description still stopped at a generic “practical systems mindset,” while the visible chapter and unlock now articulate the specific bridge from ornament to engineering: repetition, variation, constraints, and precision.
- **What changed:** Rewrote only the Origin `WebPageElement` description in both languages. English now states that Islamic arts, ornamental architecture, and CAD trained a systems mindset around those four ideas; Arabic carries the same concepts naturally as التكرار والتغيّر والقيود والدقة.
- **What changed:** Added a parsed ProfilePage assertion for the exact English Origin description, protecting its position and meaning inside the chapter schema rather than relying on a loose source-text match.
- **What stayed:** Preserved the visible unlock sentence as a curiosity reward, all chapter names/IDs/positions, Person/ProfilePage/WebPage relationships, project ItemLists, canonical URLs, language codes, and the absence of duplicated technology keywords or hidden claims.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser JSON-LD parsing returned Origin at position 3 on both routes, with the exact refined English description at `/#origin` and its complete localized Arabic counterpart at `/ar#origin` using `ar-JO`.
- **Why:** Search consumers now receive the same substantive insight as visitors without exposing or flattening the interactive reveal. The chapter is described as a transferable engineering mindset, not simply an unusual degree.
- **Next priority:** Visual Design — audit the Working Set chapter, which is now the least visually distinctive major section, and give the skills evidence a stronger systems form without turning it into a logo cloud.

## Round 48 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Working Set chapter was clear and truthful, but its five skill groups still read as a conventional bordered list. It lacked the systems character already established by the portfolio's project doors, CAD drafting language, and Origin translation ledger.
- **What changed:** Turned every skill row into a restrained system channel. Each numbered diamond now inherits its category accent, and every technology list begins at a matching geometric port connected to its rule.
- **What changed:** Added a low-opacity calibrated tick field at the far end of every desktop row. The field mirrors in RTL and disappears below 620px, keeping the phone layout compact rather than shrinking decoration into noise.
- **What stayed:** Preserved the five evidence-based categories, exact technology claims, typographic hierarchy, hover fill, chapter rail, English/Arabic order, responsive two-column row structure, and the deliberate absence of logos, mastery scores, or unsupported proficiency percentages.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 1440×1000 all five diamond borders and ports computed to their assigned accents, each tick field measured 448px, and document overflow remained zero. Arabic mirrored the ports and tick fields correctly. At 390×844 all five tick fields were hidden, all ports remained visible, and horizontal overflow stayed zero.
- **Why:** Working Set now feels like a live capability board connected to the same geometric system as the rest of the experience, while the content remains credible and quickly scannable for recruiters.
- **Next priority:** Motion / Interactivity — make the new system channels respond to the reading marker or row focus with one purposeful signal, without adding ambient loops or decorative latency.

## Round 49 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** Round 48 gave Working Set a visual system, but the existing blue reading marker moved independently of the rows. The visitor could see position and capability channels without a clear causal link between them.
- **What changed:** Connected scroll progress to exactly one current skill row through a lightweight `data-reading` signal. As the marker enters a new fifth of the board, the previous row releases and the next row becomes current without React re-renders or a second scroll listener.
- **What changed:** The current row now opens its existing color field, reveals its calibrated tick channel from the correct reading direction, and sends one short ring through the geometric port. RTL uses a mirrored channel keyframe; no ambient animation or timer loop was added.
- **What stayed:** Preserved hover feedback, the continuously moving reading marker, five truthful skill groups, mobile tick suppression, static server-rendered content, and the global reduced-motion contract, which collapses the new transitions and animations to a single near-instant frame.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. On desktop the active row moved from 2 at a 27.34% marker position to 3 at 55.96%, and after settling exactly one row retained a full color field. The Arabic phone layout selected row 3, hid every tick channel at 390×844, retained zero horizontal overflow, and mirrored the active fill correctly.
- **Why:** The board now explains itself through movement: the rail indicates where the visitor is reading, and the matching channel answers with one finite signal. Motion carries hierarchy instead of acting as decoration.
- **Next priority:** Storytelling / Copy — tighten the Working Set introduction and bridge so the new system-board behavior supports a clear claim about choosing tools by product constraint rather than reciting a stack.

## Round 50 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** Working Set moved like a purposeful capability board, but its header still jumped from a defensive kicker directly into technology rows. The visitor had no sentence explaining the engineering judgment behind the selection, and the previous bridge repeated the site's broader “make complexity obvious” refrain.
- **What changed:** Added a concise bilingual introduction that rejects tool collecting and frames the stack as the shortest reliable path through interface, API, data, delivery, and verified handoffs.
- **What changed:** Rewrote the outgoing bridge around an outcome test: tools earn their place when they make the product simpler to use, ship, and explain. The Arabic version carries the same product-centered claim rather than translating word-for-word.
- **What changed:** Gave the introduction a dedicated second-column reading line on desktop and a single-column position below the title on smaller screens, preserving the chapter's editorial hierarchy.
- **What stayed:** Preserved every technology claim, category, emerging-skill qualifier, interactive row signal, chapter title, contact offer, and the evidence-first kicker “What I can defend in the room.”
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 1440×1000 the English introduction occupied 752×56.9px with a measured 96px release before the board. At 390×844 the Arabic introduction wrapped to 75.8px, retained the same 96px release, and produced zero horizontal overflow; the revised Arabic bridge rendered intact.
- **Why:** The chapter now communicates decision-making, not inventory. A recruiter can scan the tools, while a technical reader immediately sees the principle connecting them.
- **Next priority:** Performance — profile the new scroll-driven row signal and contain its paint area so the color field, tick reveal, and port ring do not invalidate more of the page than necessary.

## Round 51 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** The finite Working Set channel reveal used `clip-path`, which required painting the changing clipped region. The animated row also had no explicit paint boundary, so its color field and port ring could invalidate beyond the row's own box.
- **What changed:** Replaced the tick reveal with a compositor-friendly `scaleX` animation. LTR channels originate at the left edge nearest their port; RTL channels originate at the right edge and reveal toward the outer margin without a separate mirrored keyframe.
- **What changed:** Added paint containment to each row. Applied `will-change: transform, opacity` only to the active tick field and `will-change: box-shadow` only to its small port; inactive rows immediately return to `auto` when `data-reading` moves.
- **What stayed:** Preserved the 620ms timing, one-shot behavior, active color field, marker logic, port ring, static tick appearance, RTL geometry, mobile tick suppression, and reduced-motion collapse.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection measured `contain: paint` on the active row, a settled channel transform of `matrix(1, 0, 0, 1, 0, 0)`, targeted `transform, opacity` promotion on only the current channel, and `auto` on previous rows. During the Arabic reveal the transform measured 0.055 at 90ms with its origin at the channel's 448px right edge, confirming the correct mirrored direction; horizontal overflow remained zero.
- **Why:** The interaction now keeps its expressive signal while shifting the large reveal to a composited transform and limiting paint work to the row that actually changed.
- **Next priority:** Responsiveness — audit Working Set across narrow tablet widths and short landscape screens now that the header includes an introduction and active row fields, then tune only the breakpoints that show real pressure.

## Round 52 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** Portrait tablet widths from 700–768px retained clean three-column rows with no label/text overlap, so they did not need another breakpoint. Short landscape screens were the real pressure point: at 900×600 the header-to-board release remained 96px and every row stayed 112px tall, leaving only one complete row comfortably visible.
- **What changed:** Added a Working Set adjustment inside the existing ≤980px, ≤600px landscape contract. Section padding now tightens to 5rem, the header release becomes 3rem, introductory copy uses a compact 0.95rem/1.45 measure, and rows reduce to 5.75rem.
- **What stayed:** Preserved the 700–768px portrait tablet composition, three-column labels and technology lists, active signal, story rail clearance, category colors, mobile two-column breakpoint, and all desktop dimensions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 900×600 the measured header release dropped from 96px to 48px and rows from 112px to 92px, bringing three rows into the initial view with zero horizontal overflow. At the 760×500 landscape edge, the 149.4px header and all five 92px rows retained zero label/text overlap; the two longest technology lines wrapped cleanly to 46.1px.
- **Why:** The compact mode now responds to the scarce dimension—height—without degrading tablet portrait layouts that were already working. The board becomes scannable sooner on small laptops and rotated tablets.
- **Next priority:** Accessibility — audit whether the scroll-selected Working Set row communicates information through color or motion alone, and ensure the static reading order and reduced-motion experience remain equally understandable.

## Round 53 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The scroll-selected row is a decorative reading aid, not a semantic selection. Adding `aria-current`, announcements, or artificial focus stops would have made assistive technology noisier. The real gap was CSS fallbacks: high-contrast mode had no explicit plan for gradients and custom accents, while reduced motion still retained active `will-change` hints after collapsing animation duration.
- **What changed:** Added a forced-colors contract that removes the row wash, tick channel, and port decorations; remaps numbered diamonds and technology rules to `CanvasText`/`Canvas`; and renders the reading marker with system `Highlight` and no custom shadow.
- **What changed:** In reduced-motion mode, the channel and port animations are now explicitly disabled and their `will-change` values reset to `auto`, complementing the already hidden moving rail marker.
- **What stayed:** Preserved the native static reading order, complete visible technology text, five plain non-focusable rows, heading relationship, decorative `data-reading` state, normal-color appearance, and the absence of live announcements for scroll position.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser DOM inspection confirmed all five complete text rows remain present, with no fabricated roles, `tabindex`, or `aria-current`, exactly one decorative active row, and zero horizontal overflow. The authored forced-color rules use system colors only, while reduced-motion assertions require both `animation: none` and `will-change: auto`.
- **Why:** The chapter stays expressive for sighted motion-enabled visitors without turning a decorative scroll cue into false semantics. High-contrast and motion-sensitive users receive the same content in a quieter, system-controlled presentation.
- **Next priority:** Code Quality — extract the Working Set scroll-marker and active-row orchestration from the portfolio page into a focused hook, leaving the top-level narrative component declarative.

## Round 54 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The top-level portfolio page still owned the RAF throttle, global progress calculation, Working Set proximity observer, marker percentage, active-row mutation, two window listeners, and cleanup. That infrastructure interrupted the chapter narrative and made the reading behavior harder to test as one contract.
- **What changed:** Extracted `usePortfolioProgress`, a focused hook that owns the shared scroll frame, global progress line, stack marker, row activation, proximity gating, passive listeners, and complete cleanup.
- **What changed:** Reduced the page to two declarative hook calls—`useReadingStep(loopRef)` and `usePortfolioProgress(rootRef, stackListRef)`—while keeping refs and visual rendering where they belong. Moved regression assertions to the new owner and added an assertion for the page integration point.
- **What stayed:** Preserved a single scroll listener, RAF throttling, the 100% observer margin, passive scroll/resize handling, exact progress formulas, `data-reading` behavior, active-row cleanup, CSS variables, and all rendered markup.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 900×600 the extracted hook moved the active row from 1 at a 17.41% marker to 3 at 51.53%, retained exactly one `data-reading` row, and produced zero horizontal overflow with an unchanged visual result.
- **Why:** Scroll orchestration now has one named owner and one test surface. The portfolio page reads as a sequence of chapters again, and future tuning no longer requires editing the main narrative component.
- **Next priority:** SEO / Metadata — align the Working Set structured description with its new product-judgment copy while keeping the technology inventory in visible content rather than duplicating it into metadata.

## Round 55 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** Working Set's JSON-LD still described a defensible list of tool categories, while the visible chapter now makes a stronger and more useful claim: choose a practical set from product constraints and verify its handoffs. Repeating the visible technology names in metadata would have added keyword duplication without meaning.
- **What changed:** Rewrote the English `WebPageElement` description around a practical working set chosen across interface, APIs, data, delivery, and emerging skills, with every handoff verified.
- **What changed:** Added a natural Arabic counterpart centered on قيود المنتج and نقاط الربط, then upgraded route tests to parse both ProfilePage graphs and require the exact localized descriptions at chapter position 4.
- **What stayed:** Preserved chapter names, IDs, positions, canonical hash URLs, language codes, project ItemLists, Person data, visible technology inventory, and the absence of hidden skill claims or repeated framework keywords.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Live browser parsing returned “Working set,” position 4, at `/#stack` with the exact English description, and “مجموعة الأدوات,” position 4, at `/ar#stack` with the exact `ar-JO` description.
- **Why:** Search consumers now receive the same decision-making signal as human visitors, while the actual tools remain in the visible, evidence-oriented chapter where they can be read in context.
- **Next priority:** Visual Design — begin a new category cycle by auditing the Contact chapter against the now-refined Working Set transition, and strengthen its final-door composition only if the CTA hierarchy is visually weaker than the preceding chapters.

## Round 56 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Contact chapter's giant headline, orbit, and acid action already formed a strong final composition. The weak point appeared on Arabic mobile: the short CTA label collapsed to 111px, reading as a small pill beneath a decisive closing statement rather than as the final door's latch. The generic capsule also carried less geometric identity than the surrounding system.
- **What changed:** Reframed the email action as a directional latch with an 18rem responsive minimum, asymmetric square-to-round corners, an inset technical edge, and a small outlined diamond signal. The geometry mirrors in RTL, including the rounded end and hover tilt.
- **What changed:** Kept the CTA as a native mail link and generated the diamond through CSS, so the stronger visual hierarchy adds no icon asset, text duplication, or accessibility-tree noise.
- **What stayed:** Preserved the email destination, bilingual labels, 72px touch target, acid/ink contrast, heading and body composition, orbit, social links, focus outline, normal document flow, and reduced-motion handling.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Arabic mobile at 390×844 grew from 111.2px to a measured 288×72px, mirrored to a 36px leading radius and 5.6px trailing corners, retained its 11.5px diamond, and produced zero overflow. English desktop measured 288.7×72px with the opposite 5.6px/36px directional corners and an unchanged final composition.
- **Why:** The final action now carries the weight of the final chapter and feels like a control from the portfolio's geometric system, not a generic button pasted beneath it.
- **Next priority:** Motion / Interactivity — give the new contact latch one finite open/engage response on hover and keyboard focus, while keeping the existing orbit from competing with the primary action.

## Round 57 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new latch had strong static geometry, but its hover tilt did not communicate “engage,” keyboard focus did not receive the diamond response, and the continuously rotating orbit kept equal visual energy while the primary action was active.
- **What changed:** Added a finite ink wash that opens from the latch's leading edge, with a mirrored 270° gradient and right-edge origin in RTL. Hover and `:focus-visible` both fill the 72px control and turn the diamond from 45° to 225°.
- **What changed:** When the latch is hovered or keyboard-focused, the Contact orbit now pauses and fades to 45%, allowing the action to become the only moving focal point. Leaving the action restores the orbit through the existing transition.
- **Issue caught during verification:** The first broad replacement attached the wash properties to the masthead underline, then to the method loop rail, instead of the Contact latch. Computed background-size exposed the mismatch. Restored both existing accents, scoped the wash inside `.contact-link`, and added regression assertions for all three owners.
- **What stayed:** Preserved the native mail link, visible focus rings, hover tilt, mirrored corners, 18rem minimum, background orbit design, no JavaScript interaction state, and the global reduced-motion collapse.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. On Arabic mobile the base latch computed to `background-size: 0% 100%` with the orbit running at opacity 1. Keyboard focus produced `:focus-visible=true`, a 100% wash, a 225° diamond matrix, orbit opacity .45, paused animation, and zero overflow; the authored focus ring remained clearly visible.
- **Why:** The final action now behaves like a latch being engaged, and keyboard users receive the same finite response as pointer users. Background motion explicitly yields rather than competing for attention.
- **Next priority:** Storytelling / Copy — audit the Contact body and email label as the final conversion moment, tightening only phrases that repeat earlier chapter language or make the opportunity scope harder to scan.

## Round 58 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Contact body clearly listed remote and freelance scope, but after the final headline it still behaved like a general availability statement. It did not tell the visitor what useful first message to send, and “Start a conversation” did not complete the question-led story established by the five project doors.
- **What changed:** Reframed the English body around a concrete prompt: send the product constraint, friction, or idea, then retained the exact remote full-stack, frontend, backend, and clearly scoped freelance offer.
- **What changed:** Wrote an equivalent Arabic prompt around القيد ونقطة الاحتكاك والفكرة and changed the latch labels to “SEND THE FIRST QUESTION” / “أرسل السؤال الأول,” closing the portfolio with the same curiosity language that opened the work chapter.
- **What stayed:** Preserved the opportunity scope, mail destination, no prefilled or manipulative email content, final headline, social alternatives, geometric latch, interaction behavior, and truthful claims.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 390×844 the Arabic body occupied 338.2×140.7px, its 288×72px latch fit cleanly, and the complete chapter remained 761.5px tall with zero overflow. English at the same width used a 338.2×168.8px body and a 308.8×72px latch; its 820.7px chapter kept the social links and bottom navigation visible without horizontal overflow.
- **Why:** The portfolio now ends with a low-friction brief, not a vague invitation. A recruiter, founder, or collaborator knows exactly how to begin, while the first-question label resolves the site's project-door narrative.
- **Next priority:** Performance — profile the Contact orbit and latch wash together, then reduce paint or animation work only where the active CTA interaction shows unnecessary cost.

## Round 59 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** The orbit already used a compositable transform, but its large rotating paint area had no explicit containment. The latch wash animated `background-size`, requiring the 288–309px control to be repainted through every transition frame.
- **What changed:** Wrapped the email label in a positioned span and moved the wash to an isolated `::after` layer. It now reveals with `scaleX(0 → 1)` from the left in LTR and the measured 288px right edge in RTL, while the text and diamond remain above it.
- **What changed:** Added paint containment and explicit transform/opacity promotion to the continuously animated Contact orbit, matching the two properties it actually animates or transitions.
- **What stayed:** Preserved the exact wash gradient, 450ms easing, latch dimensions, diamond turn, hover/focus triggers, RTL direction, orbit pause/fade response, mail semantics, visible focus ring, and reduced-motion handling.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Arabic mobile measured the idle wash as `matrix(0, 0, 0, 1, 0, 0)` with its origin at `288px 36px`, the orbit as `contain: paint` with `will-change: transform, opacity`, and zero horizontal overflow. Visual comparison confirmed unchanged text stacking, diamond placement, corners, and chapter layout.
- **Why:** The short CTA response is now handled by a compositable transform, while the only continuous large animation is explicitly isolated to its own paint boundary.
- **Next priority:** Responsiveness — audit the expanded English Contact copy and 309px latch at 320–390px widths and short mobile heights, tuning only confirmed collisions with the social links, footer, or bottom story rail.

## Round 60 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** At 320px the Contact chapter itself retained zero document overflow and the social links/footer remained reachable by scrolling. The actual pressure was inside the English latch: its available label width was roughly 185px, causing the trailing ↗ to wrap onto a second line while the 72px control still reported no overflow.
- **What changed:** Added a ≤360px latch adjustment only. Reduced the internal gap to .75rem, inline padding to .9rem, and display font to .78rem, then held the label on one line. Wider phones, Arabic sizing, and every other Contact dimension remain unchanged.
- **Issue caught during verification:** The first compact values kept the words together but still left the arrow alone on line two. A second measured pass recovered another 10.4px of inline room and verified the complete label, including the arrow, as one 206.7×18px line.
- **What stayed:** Preserved the 72px touch target, 268.2px control width at 320px, diamond, directional corners, wash layer, opportunity copy, scrollable social links/footer, bottom-rail safe area, and zero horizontal overflow.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 320×568 the final English latch measured 268.2×72px, its label 206.7×18px with `white-space: nowrap`, font 12.48px, 12px gap, 14.4px inline padding, equal 268px scroll/client widths, and zero document overflow. Arabic at 320×640 remained inside the same control width and retained its natural single line.
- **Why:** The final question now reads as one decisive action even on the narrowest supported phone, without shrinking the chapter or changing comfortable layouts to solve an edge-only constraint.
- **Next priority:** Accessibility — re-audit the Contact latch after the internal span and clipped wash layer, including focus-ring visibility, forced colors, link naming, and 320px keyboard focus.

## Round 61 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** At 320×568 the native mail link was keyboard named by its full visible text and gained `:focus-visible`, but two visual failures remained: its 4px external outline reached below the viewport, and the fixed chapter rail covered the lower portion because browsers do not account for fixed overlays when deciding whether a focused element is already visible.
- **What changed:** Gave the latch a 3px ink focus ring inset by 6px, keeping all four sides visible inside its clipped geometry and contrasting against the acid control and active wash.
- **What changed:** At ≤360px only, keyboard focus on the email latch temporarily fades and translates the bottom chapter rail below the viewport, disables its pointer events, and restores it when focus leaves. The transition is CSS-only and scoped to `:focus-visible`.
- **What changed:** Added a forced-colors contract: system ButtonFace/ButtonText, a real 2px border, no custom shadow or wash layer, and system Highlight for focus.
- **What stayed:** Preserved the native `mailto:` link name from visible text, 72px target, tab order, full label, wash/diamond response in normal colors, navigation availability outside email focus, RTL geometry, and zero JavaScript focus management.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Keyboard focus at 320×568 returned `focus-visible=true`, a 3px ink outline at −6px, the complete “SEND THE FIRST QUESTION ↗” name, and zero overflow. The story rail computed to opacity 0, pointer-events none, and a 73.19px downward transform; the screenshot showed the complete internal ring and unobstructed latch at the viewport edge.
- **Why:** The primary conversion action remains fully visible and unambiguous at the hardest keyboard viewport, while assistive technology keeps simple native link semantics and high-contrast users receive system-owned colors.
- **Next priority:** Code Quality — extract the Contact chapter from the main portfolio page now that its orbit, latch, social links, and accessibility contract form a cohesive component boundary.

## Round 62 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The top-level portfolio page still rendered Contact's section destination, register, orbit, copy, mail latch, two external links, labels, and security attributes inline. That chapter now had a cohesive visual and accessibility contract but no single code owner.
- **What changed:** Extracted `ContactChapter` with five resolved content props: kicker, title, body, email label, and localized new-tab phrase. The component owns the fixed chapter identity, orbit, mail address, GitHub/LinkedIn destinations, external-link security, and complete markup contract.
- **What changed:** Replaced the inline chapter with one declarative invocation and extended isolation tests to require the import, component export, section/heading relationship, native mail destination, and internal latch label span.
- **Issue caught during verification:** The first test edit declared the component source in the motion suite while asserting it in the isolation suite, producing one lint warning and a scoped ReferenceError. Moved the source read to its actual owner, then reran the full validation successfully.
- **What stayed:** Preserved byte-for-byte visible copy, exactly one Contact section/orbit/latch, two social links, native semantics, chapter register, all class names, mail and social URLs, focus behavior, responsive geometry, and CSS-only interactions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 320×568 the browser found exactly one `section#contact`, one orbit, one latch, two social links, `aria-labelledby=contact-title`, and zero overflow. Keyboard focus still returned `focus-visible=true`, a −6px ring, and story-rail opacity 0 with an unchanged visual result.
- **Why:** Contact now has one maintainable boundary and the portfolio page once again reads as narrative composition rather than a mixture of content and chapter internals.
- **Next priority:** SEO / Metadata — align the Contact structured description with the new “send the constraint, friction, or idea” invitation without embedding an email address or duplicating the visible CTA label.

## Round 63 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** Contact's structured description still reduced the final chapter to contact details for roles and freelance collaboration. The visible chapter now offers a more useful conversion cue—bring a product constraint, friction, or idea—without needing to expose the email address to metadata.
- **What changed:** Rewrote the English Contact `WebPageElement` as an invitation to bring that constraint, friction, or idea for remote software roles or clearly scoped freelance work.
- **What changed:** Added a natural Arabic counterpart using قيد في المنتج ونقطة احتكاك وفكرة, and extended parsed-schema tests to require both exact descriptions at chapter position 5.
- **What stayed:** Preserved the Contact chapter name, position, canonical hash URLs, `en`/`ar-JO` languages, visible CTA text, mail address, Person/ProfilePage relationships, project graphs, and the absence of email or duplicated CTA labels in JSON-LD.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser parsing returned English Contact at position 5, `/#contact`, language `en`, with the exact new description; Arabic returned التواصل at position 5, `/ar#contact`, language `ar-JO`, with the exact localized invitation.
- **Why:** Search consumers now understand the purpose of the final chapter—starting a scoped product conversation—rather than seeing a generic contact endpoint.
- **Next priority:** Visual Design — begin the next cycle by auditing the footer and Contact-to-footer handoff, strengthening the final visual stop only if identity, location, and year feel detached from the geometric chapter above.

## Round 64 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** Contact ended strongly inside its acid frame, but the footer immediately continued as a 60px black strip with tiny gray identity and year text. With no change in field or geometric anchor, it read as an unrelated legal afterthought instead of the portfolio's final coordinate.
- **What changed:** Rebuilt the footer as a paper-colored closing ledger: a three-column desktop grid for identity, a central geometric seal, and year; on mobile it becomes a two-column ledger with identity/year stacked and the seal spanning both rows.
- **What changed:** Added a CSS-only seal built from one outlined square, crossed construction axes, and an orange center tile. It is `aria-hidden`, so the footer's accessible text remains exactly the name, location, and year without decorative noise.
- **What stayed:** Preserved the bilingual identity strings, dynamic copyright year, Contact's acid boundary, zero footer links or new marketing copy, document order, mobile story rail, and the portfolio's paper/ink/orange palette.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Desktop measured a 1425×88px paper footer with `628.1px 34.4px 628.1px` columns, a 48.6px rendered rotated seal, and zero overflow. Arabic at 320×640 measured a 305×151px two-column footer, a 48.6px mirrored seal, complete identity/year text, and zero horizontal overflow.
- **Why:** The experience now closes by returning from the black product conversation to the paper-and-construction language that began the story, making the footer feel like a deliberate final coordinate rather than leftover chrome.
- **Next priority:** Motion / Interactivity — give the closing seal one finite assembly response as the footer enters view, with a static reduced-motion fallback and no new continuous loop.

## Round 65 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** Round 64 introduced a meaningful closing seal, but it arrived fully formed. The static mark missed one last opportunity to translate the portfolio's core idea—a pattern becoming a constructed product—without adding another ambient loop.
- **What changed:** Added a finite scroll-linked assembly sequence scoped to browsers that support view timelines. The outlined square resolves from an unrotated fragment, the vertical and horizontal construction axes draw in separately, and the orange core locks into place last.
- **Issue caught during visual verification:** The first motion range ended against `cover`, which a short footer at the document boundary can never fully traverse; the seal therefore remained partially assembled at maximum scroll. Rebased every phase to the footer's `entry` interval so the complete mark is guaranteed when the footer is fully visible.
- **What stayed:** Preserved the exact footer geometry, paper/ink/orange palette, bilingual identity and year, RTL placement, `aria-hidden` decoration, zero JavaScript observers, and a completely static fallback in browsers without scroll timelines.
- **Accessibility:** The existing reduced-motion contract now explicitly disables the seal, both axes, and core animations while clearing their `will-change` reservation, leaving the final assembled mark visible.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At the 1280×720 document boundary, the seal reached opacity 1, a 45-degree matrix, two fully scaled axes, and a fully visible core. Arabic at 320×640 reached the same complete state inside the 305×151px RTL footer with zero horizontal overflow.
- **Why:** The site now ends with one readable construction event rather than an endless decorative effect, reinforcing the craft-to-software narrative while respecting motion preferences and document-edge physics.
- **Next priority:** Storytelling / Copy — audit the final Contact-to-ledger wording and strengthen the closing sentence only if it can hand off naturally to the footer without repeating the CTA or inventing claims.

## Round 66 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** Contact asked for a constraint, friction, or idea and then jumped directly to availability. It was clear, but the final paragraph did not resolve the story's central metaphor before the newly constructed seal returned the page to its opening pattern language.
- **What changed:** Replaced the generic “send me” transition with one concrete working instinct: bring the constraint, friction, or idea, and the first move is to find the pattern that makes the parts meet. The Arabic version carries the same thought naturally rather than translating the sentence mechanically.
- **What stayed:** Preserved the honest role scope, remote and clearly scoped freelance availability, interface/API/data premise, primary email CTA, title, metadata, structured invitation, and every verifiable career claim. No new metric, process guarantee, or unsupported expertise was added.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded with exact English and Arabic narrative assertions. At 1280×720 the English paragraph remained a readable 672×112.6px block with zero overflow. Arabic at 320×640 remained complete inside a 268.2×197px RTL block with zero overflow.
- **Why:** The final spoken sentence now hands the reader back to the core idea—finding structure across parts—so the geometric seal feels like the story's period, not a separate ornament.
- **Next priority:** Performance — audit the new scroll-linked seal's compositor cost and remove any `will-change` reservation that persists outside the short entry interval without changing its visible sequence.

## Round 67 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** The closing seal declared `will-change: transform, opacity` whenever view timelines were supported. That reserved a compositing hint from the first paint even though the 34px source mark animates only during the footer's final entry interval.
- **What changed:** Removed the persistent `will-change` reservation from the seal while keeping the scroll-linked transform/opacity sequence intact. Added a regression assertion so the exact animation range cannot silently regain a permanent layer hint.
- **What stayed:** Preserved the square, axis, and core timing; final 45-degree geometry; fallback behavior; reduced-motion static state; RTL placement; and zero JavaScript observers or listeners.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection returned `will-change: auto` at both page start and the document boundary; at the boundary the seal still reached opacity 1, the 45-degree matrix, two fully drawn axes, a visible core, and zero horizontal overflow.
- **Why:** A tiny, one-time closing motion no longer asks the browser to retain a dedicated optimization hint across the entire long-form page, reducing unnecessary resource reservation without changing the experience.
- **Next priority:** Responsiveness — audit the longer bilingual Contact paragraph at narrow portrait and short-landscape breakpoints, then rebalance only if it crowds the CTA or hides the closing ledger below an excessive final scroll.

## Round 68 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** The expanded Contact paragraph remained readable in portrait, but at 568×320 the generic mobile spacing produced an 852px English chapter: a 191px headline, 141px paragraph, five-rem social gap, and eight-rem bottom pad made the final action require an unnecessarily long short-landscape scroll.
- **What changed:** Added a short-landscape Contact composition with a finite 4rem block pad, narrower heading scale, 1.25rem heading margins, a 34rem body measure at .92rem/1.45, a deliberate 1.5rem CTA gap, and a 2.5rem social handoff. The 72px email target and side story rail remain untouched.
- **What stayed:** Preserved the portrait composition, desktop scale, full bilingual copy, link labels, social destinations, focus behavior, footer ledger, orbit, and all safe-area/story-rail rules.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. At 568×320 English dropped from 852px to 630px while retaining a 454.6×85.3px body, 72px CTA, complete socials, and zero overflow. Arabic resolved to 544px with the same body width, CTA target, full social row, and zero overflow.
- **Why:** The closing chapter now respects a short screen as a distinct reading posture rather than merely a wide phone, reaching the invitation and closing ledger sooner without compressing the interaction target.
- **Next priority:** Accessibility — verify the compact short-landscape Contact order with keyboard focus, high contrast, and reduced motion; adjust only if the side story rail or orbit competes with the focused email action.

## Round 69 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The compact short-landscape Contact passed keyboard focus and geometry checks, but its purely decorative orbit remained eligible for forced-color remapping. In that mode, three concentric construction outlines could become equally prominent system-color lines behind the primary email action.
- **What changed:** Hidden the decorative Contact orbit only while forced colors are active. The native email link, social links, side story rail, footer text, and geometric closing seal remain available; no information or interaction was removed.
- **Keyboard verification:** At 568×320 the email action retained native focus, `:focus-visible`, a complete 3px internal ink ring, and its 72px target. The side story rail occupied a separate 52px edge lane with no geometric overlap, while the normal-color orbit paused and settled to .45 opacity on focus.
- **Bilingual verification:** English and Arabic both retained their full CTA labels, correct LTR/RTL edge rail placement, 72px target height, no rail overlap, and zero horizontal overflow. Reduced-motion rules continue to stop the orbit and explicitly leave the footer seal assembled without animation.
- **Automated verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded, including the new forced-colors regression assertion.
- **Why:** High-contrast users now receive one unmistakable primary action instead of a system-remapped decorative target, while normal-color users keep the intended geometric atmosphere and focus response.
- **Next priority:** Code Quality — centralize the Contact destination and social-link data now that the component owns stable behavior across normal, short-landscape, forced-color, and reduced-motion states.

## Round 70 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The canonical email, GitHub, and LinkedIn destinations were repeated independently across Contact, the no-script index, and Person structured data. A future profile rename or URL correction could therefore leave visible links and search metadata disagreeing.
- **What changed:** Added one typed `profileLinks` source containing the email address/href and ordered social profiles, plus a derived URL list for structured data. Contact now renders its social anchors from that source, the no-script email uses the same destination, and Person JSON-LD consumes the shared email and social URLs.
- **What stayed:** Preserved the exact visible labels, native `mailto:` behavior, GitHub-before-LinkedIn order, new-tab targets, `noopener noreferrer`, localized accessible labels, no-script fallback, Person metadata values, and all Contact geometry and interactions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven automated tests succeeded. Browser inspection found exactly one Contact, three anchors with the original destinations and security attributes, exactly two social links, and zero horizontal overflow.
- **Why:** The public identity now has one code-owned source of truth, so visible conversion paths, fallback content, and machine-readable identity cannot silently drift apart.
- **Next priority:** SEO / Metadata — verify that the centralized profile URLs surface once and consistently in Person JSON-LD and that Contact's structured invitation still resolves to the same canonical identity without redundant graph nodes.

## Round 71 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** Person JSON-LD correctly exposed the centralized profile destinations, and both pages already declared themselves about the canonical Person. Their Contact `WebPageElement`, however, ended at a descriptive invitation with no explicit machine-readable edge back to that same identity.
- **What changed:** Extended chapter schema generation with the canonical Person ID and added an `about` reference only to Contact. English ProfilePage and Arabic WebPage now point their Contact invitation to the existing Person node rather than embedding or duplicating a new Person object.
- **What stayed:** Preserved every chapter ID, URL, name, language, position, description, project list, canonical path, visible Contact copy, and the single Person entity. The shared `sameAs` order remains GitHub then LinkedIn and the canonical email remains the native `mailto:` value.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser parsing found one Person type, the shared email and two ordered social URLs, and an English Contact `about` edge equal to the ProfilePage `mainEntity.@id`. Arabic returned the same Person ID for both WebPage and Contact while preserving `/ar#contact` and `ar-JO`.
- **Why:** Search consumers can now traverse the invitation directly to Rashed's canonical identity without inferring ownership from page proximity or processing duplicate Person nodes.
- **Next priority:** Visual Design — begin the next cycle by auditing the paper footer's text hierarchy against the now-animated seal; refine only if the identity/year labels read too faintly or the center mark visually overpowers them.

## Round 72 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The paper footer gave identity, year, and seal the same inherited 9.92px weight and 68% ink. Once the seal assembled to a 48.6px geometric stop, both text anchors felt equally faint and the closing coordinate lacked a clear reading order.
- **What changed:** Added semantic visual classes for the coordinate and year. The identity/location coordinate now uses 84% ink, bold mono weight, and measured tracking in English; RTL keeps natural Arabic spacing. The copyright year steps back to 52% ink, .58rem type, and wider numeric tracking.
- **What stayed:** Preserved the three-column desktop and two-column mobile grids, exact bilingual text, dynamic year, paper/ink/orange palette, 48.6px final seal, scroll-linked assembly, `aria-hidden` decoration, and document order.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Desktop retained its 88px footer, fully assembled 48.6px seal, stronger 84% identity coordinate, quieter 52% year, and zero overflow. Arabic at 320×640 retained a 305×151px footer, natural zero tracking, bold coordinate, complete year, fully assembled seal, and zero overflow.
- **Why:** The footer now reads in a deliberate sequence—identity first, geometric signature second, legal year last—without enlarging the final stop or adding another decorative motif.
- **Next priority:** Motion / Interactivity — audit whether the newly stronger coordinate should participate in the seal's finite arrival; add motion only if a restrained reveal clarifies sequence without hiding readable text during ordinary scrolling.

## Round 73 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The seal assembled in distinct outline/axis/core phases while the newly strengthened coordinate and secondary year appeared immediately. The footer therefore had a clear static hierarchy but no shared arrival sequence.
- **What changed:** Joined both text anchors to the existing footer view timeline. The coordinate enters from its natural inline start after the seal begins resolving; RTL uses the mirrored direction. The quieter year rises last. Both finish within the footer's achievable entry interval, use no permanent `will-change`, and create no loop or JavaScript observer.
- **Accessibility:** Reduced-motion mode explicitly disables both text animations, leaving the coordinate and year fully visible in their final positions. Browsers without view timelines keep the original static footer.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At partial desktop entry the coordinate was 43% visible and 11.1px from its final position while the year remained queued; at the document boundary coordinate, year, and seal all resolved to their final matrices with zero overflow. Arabic at 320×640 used `footer-coordinate-arrive-rtl`, entered from +9px at mid-state, and completed at the document boundary with zero overflow.
- **Why:** The closing ledger now reads as one finite construction—signature, coordinate, then year—rather than one animated ornament surrounded by static labels.
- **Next priority:** Storytelling / Copy — audit the duplicated year inside the coordinate and copyright anchor; replace redundancy only if location or craft identity can carry more useful information without inventing a claim.

## Round 74 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** The closing coordinate ended with `2026` while the secondary anchor immediately repeated `© 2026`. The only phrase available to summarize the site's arc was therefore spent on duplicate chronology.
- **What changed:** Replaced the coordinate's redundant year with the portfolio's narrative signature: `PATTERN → PRODUCT`. The Arabic coordinate carries the natural equivalent `من النمط إلى المنتج`, while the copyright anchor remains the single temporal reference.
- **What stayed:** Preserved the full name, Amman location, dynamic copyright year, Contact invitation, footer hierarchy and motion, structured data, all claims, and the paper/ink/orange closing language.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with exact bilingual footer assertions. At 320×640 both coordinates wrapped cleanly to 22px over two lines, retained the complete phrase, kept the year separate, and produced a compact 305×162px footer with zero overflow.
- **Why:** The last readable phrase now resolves the entire journey—from geometric craft to working software—while time appears once in the place users expect it.
- **Next priority:** Performance — audit whether the three footer timeline animations add measurable stylesheet or compositor overhead, and consolidate shared timeline declarations only if it reduces work without changing the staged sequence.

## Round 75 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** Six footer animation targets repeated the same named timeline declaration. The duplication was small but unnecessary in a sequence intentionally owned by one footer timeline.
- **What changed:** Consolidated the seal, two axes, core, coordinate, and year under one `animation-timeline: --footer-seal` rule while preserving each target's independent name, easing, and range. The built stylesheet dropped from 48,939 to 48,873 bytes without adding selectors, JavaScript, or compositor hints.
- **Issue caught during browser verification:** The first consolidation placed the shared timeline before each `animation` shorthand. Because the shorthand resets the timeline, all six computed to `auto` and would have become load-time animations. Moved the shared declaration after every shorthand and added an ordering regression assertion.
- **What stayed:** Preserved every staged range, RTL coordinate animation name, static unsupported-browser fallback, reduced-motion behavior, final matrices, and zero horizontal overflow.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser computed all six targets back to `--footer-seal` with their original animation names/ranges; the footer remained complete at the document boundary.
- **Why:** The closing sequence now ships with one source-owned timeline declaration and slightly less CSS, while the new regression protects the subtle shorthand ordering that makes the optimization correct.
- **Next priority:** Responsiveness — audit the new two-line `PATTERN → PRODUCT` coordinate at 320px and below, especially 280–300px widths, and prevent the seal column from forcing awkward third-line wraps or clipping.

## Round 76 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new coordinate remained two lines at 300px, but at 280px the 24px grid gap and 19.2px inline pads reduced its column to 168.2px, producing an avoidable third line and a 173px closing ledger.
- **What changed:** Added one sub-300px footer refinement: 16px grid gap, 16px inline pads, and a slightly tighter .59rem/.05em English coordinate. Arabic keeps natural tracking. The seal size, year size, and 80px safe-area/story-rail clearance remain unchanged.
- **What stayed:** Preserved the complete bilingual phrase, bold 84% coordinate, quieter year, two-column mobile ledger, scroll-linked sequence, RTL direction, and all viewports above 300px.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 280×653 English returned from three lines to two, expanded its text column to 182.6px, reduced the footer from 173px to 154px, maintained 8.88px of visual separation from the rotated seal, and had zero overflow. Arabic matched the two-line 182.6px measure, natural tracking, mirrored 8.88px separation, and zero overflow.
- **Why:** The smallest supported phone width now closes with the same compact two-line signature as larger phones, without shrinking the seal or sacrificing its breathing room.
- **Next priority:** Accessibility — verify that the smaller 9.44px coordinate remains legible under increased contrast and text zoom, and ensure its decorative motion cannot cause clipping when font metrics grow.

## Round 77 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** Round 76 solved the 280px wrap partly by reducing the coordinate to 9.44px, and the secondary year still blended to roughly 3.6:1 against paper—too weak for its 9.28px size. The grid item also retained its automatic min-content floor, which could resist wrapping under enlarged text.
- **What changed:** Restored the narrow coordinate to the normal 9.92px size, tightened only its tracking to .04em, raised the year from 52% to 62% ink, and made both footer labels full ink under `prefers-contrast: more`. Added `min-width: 0` and `overflow-wrap: anywhere` to let enlarged text grow the footer instead of forcing horizontal clipping.
- **Contrast verification:** The 62% year composites to approximately RGB 102/99/94 on the 240/234/223 paper field, producing a 5.01:1 contrast ratio. The primary coordinate remains substantially stronger at 84% ink.
- **Layout verification:** At 280×653 the restored 9.92px coordinate still held two lines in its 182.6px column, preserved the 154px footer and 8.88px seal separation, and reported `min-width: 0`, `overflow-wrap: anywhere`, and zero horizontal overflow.
- **Automated verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with new contrast and wrapping contracts.
- **Why:** The smallest footer is now more legible in normal and increased-contrast modes, while text enlargement has an explicit wrapping escape path instead of relying on favorable current font metrics.
- **Next priority:** Code Quality — extract the closing ledger from the main portfolio page now that its content classes, seal markup, responsive grid, motion, and accessibility behavior form a stable component boundary.

## Round 78 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** The main portfolio page still owned the complete closing ledger markup inline even though its coordinate, dynamic year, decorative seal, motion, responsive grid, and accessibility contract had become a stable independent unit.
- **What changed:** Extracted `ClosingLedger` with one localized `coordinate` prop. The component now owns the footer element, coordinate/year classes, dynamic year, and `aria-hidden` seal; the portfolio composition renders one declarative `<ClosingLedger coordinate={c.footer} />`.
- **What stayed:** Preserved byte-for-byte visible bilingual text, dynamic year logic, exactly one footer/coordinate/seal/year, markup order, CSS selectors, animation timelines, responsive measurements, `aria-hidden` decoration, and zero new state or client effects.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with new ownership/isolation assertions. Browser inspection at 280px found exactly one of each ledger element, the full `PATTERN → PRODUCT` coordinate, `© 2026`, a hidden decorative seal, unchanged 265×154px geometry, and zero overflow.
- **Why:** The top-level page returns to narrative composition, while the entire final visual/accessibility contract now has one maintainable code owner.
- **Next priority:** SEO / Metadata — audit whether the closing `PATTERN → PRODUCT` signature should be reflected in WebSite/ProfilePage naming or already appears sufficiently in existing metadata; avoid duplicating decorative footer copy into search descriptions.

## Round 79 — SEO / Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** `From Pattern to Product` already names the WebSite, application metadata, Twitter card, and closing signature, so repeating it in search descriptions would add no meaning. The actual visible hero hook, however, was absent from ProfilePage/WebPage structured data as a distinct headline.
- **What changed:** Added `I Used to Draw Patterns. Now I Build Systems.` as the English ProfilePage `headline` and the natural Arabic `كنت أرسم الأنماط، واليوم أبني الأنظمة.` as the Arabic WebPage `headline`.
- **What stayed:** Preserved page names, titles, descriptions, WebSite name, Open Graph/Twitter metadata, canonical URLs, Person identity, Contact relationship, visible hero/footer copy, and every graph ID.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with exact bilingual headline assertions. Browser JSON-LD parsing returned the English headline on ProfilePage and the Arabic headline on WebPage exactly as rendered in the story.
- **Why:** Search consumers now receive the page's strongest narrative hook through the correct CreativeWork field, while descriptions remain factual and the closing signature avoids metadata overuse.
- **Next priority:** Visual Design — start the next cycle by auditing the transition from the animated paper ledger back to browser chrome; refine the footer boundary or safe-area treatment only if the last line feels visually cut off on tall and narrow devices.

## Round 80 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** Narrow devices correctly reserved an 80px footer field for the bottom story rail and safe area, but the uninterrupted paper made that required clearance read like leftover blank space after the coordinate rather than a deliberate final boundary.
- **What changed:** Added one non-semantic CAD-style baseline inside the mobile/tablet safe field: a one-pixel 34%-ink construction rule with a restrained orange center segment, positioned 2.5rem above the safe-area edge. It uses a pseudo-element, ignores pointer input, and adds no markup or animation.
- **What stayed:** Preserved the full 80px clearance, story rail, footer height, text and seal positions, desktop footer, RTL symmetry, paper background, scroll-linked ledger sequence, and every accessible node.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 320×780 the footer remained 162px with zero overflow; its baseline resolved to a 1px rule at y=739.95, 40px above the viewport edge, with symmetric 19.2px insets and pointer-events disabled.
- **Why:** The final safe area now reads as intentional construction space and ends on a precise baseline, while retaining the clearance needed for navigation and device chrome.
- **Next priority:** Motion / Interactivity — audit whether the new baseline should remain static or draw once with the ledger; animate only if the event remains subordinate to text and is fully disabled for reduced motion.

## Round 81 — Motion / Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new mobile baseline made the safe field intentional, but it arrived fully formed before the coordinate/year sequence finished. As the lowest and quietest construction mark, it should close the sequence rather than precede it.
- **What changed:** Added one finite `scaleX` draw from 48% to 100% of the existing footer entry timeline. The baseline draws from the natural reading edge—left in LTR, right in RTL—after the coordinate begins and alongside the final year phase. It inherits the single shared timeline rule and adds no loop, observer, or layer hint.
- **Accessibility:** Reduced-motion mode explicitly removes the baseline animation, leaving the complete static line visible. The pseudo-element remains non-semantic and pointer-transparent.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At partial English entry the line computed to 5% scale from a 0px origin; at the boundary it reached scale 1 on `--footer-seal` at 34% opacity. Arabic used the mirrored 266.6px right origin, retained the same timeline, and produced zero overflow.
- **Why:** The safe-area rule now behaves as the final CAD stroke that closes the ledger, remaining visually subordinate to the identity and geometric seal.
- **Next priority:** Storytelling / Copy — audit whether the final `PATTERN → PRODUCT` signature and Contact paragraph now repeat the pattern metaphor too closely; keep both only if they serve distinct narrative jobs.

## Round 82 — Storytelling / Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** Contact promised to “start with the pattern that makes the parts meet,” then the footer immediately resolved the whole journey as `PATTERN → PRODUCT`. Both lines were valid, but their close repetition weakened the footer's job as the singular final thesis.
- **What changed:** Made Contact operational rather than metaphorical: `I’ll start by mapping where the parts must meet.` The Arabic version naturally becomes `وسأبدأ بتحديد نقاط التقاء الأجزاء.` The footer keeps sole ownership of the Pattern-to-Product metaphor.
- **What stayed:** Preserved the product/interface/API/data premise, constraint/friction/idea invitation, exact role and freelance availability, email CTA, Contact structured description, all claims, and the bilingual footer signature.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with exact bilingual copy assertions. At 320px both complete paragraphs rendered inside their 268.2px measures with zero overflow; English measured 253.3px high and Arabic 197px.
- **Why:** Contact now explains the first concrete engineering move, while the footer alone delivers the memorable story conclusion.
- **Next priority:** Performance — audit the mobile footer baseline animation's paint/compositing behavior and remove it if a one-pixel gradient causes disproportionate repaint work compared with its narrative value.

## Round 83 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** The mobile baseline adds a scroll-linked transform to a gradient pseudo-element, so its value depended on whether the browser could keep repaint impact local rather than invalidating the surrounding long-form page.
- **Audit result:** At 320px the line paints a 266.6×1px surface—266.6 square pixels, or 0.54% of the 305×162px footer. It animates only `transform`, keeps `will-change: auto`, and remains tied to the existing footer timeline. Its narrative value is therefore not disproportionate to its paint surface.
- **What changed:** Added `contain: paint` to the closing ledger so the seal, text, and baseline animation are explicitly isolated to the footer paint box without creating a permanent layer hint.
- **What stayed:** Preserved baseline gradient/direction/timing, footer geometry, scroll timeline, unsupported-browser fallback, reduced-motion state, all text, and the full rotated seal.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser computed `contain: paint`; at the document boundary the baseline reached scale 1 on `--footer-seal`, all coordinate/year/seal bounds remained inside the footer paint box, `will-change` stayed `auto`, and horizontal overflow remained zero.
- **Why:** The one-pixel closing stroke remains because it is visually meaningful and cheap, while paint containment prevents its motion from affecting the rest of the document.
- **Next priority:** Responsiveness — verify paint containment and the animated baseline across short landscape, 280px portrait, and tablet widths so clipping never appears when the footer grid changes shape.

## Round 84 — Responsiveness — 2026-07-21

- **Status:** Completed — no layout change required.
- **Audit:** Tested the paint-contained ledger at 280×653 LTR, 568×320 RTL landscape, and 768×1024 tablet. Each grid mode kept the coordinate, year, rotated seal, and closing baseline within the footer paint box with zero horizontal overflow.
- **Evidence:** At 280px the seal retained 8.88px edge clearance and the coordinate remained two lines; at 568px RTL the 456.2px coordinate stayed one line while the seal mirrored cleanly; at 768px the three-column grid retained 352.2px seal clearance on both sides. Baselines kept symmetric 16.8px/32px insets and resolved at the document boundary.
- **Decision:** The responsive system is already excellent at the audited transitions. No CSS was changed, avoiding a breakpoint that would solve no observed defect.
- **Next priority:** Accessibility — remove the purely decorative baseline from forced-colors mode so it cannot become a system-remapped line competing with the identity and year.

## Round 85 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The mobile baseline is purely decorative and pointer-transparent, but forced-colors mode could remap its gradient into a high-contrast line with no semantic value, competing with the identity, year, and system-owned focus indicators.
- **What changed:** Hidden only the footer baseline pseudo-element while forced colors are active, matching the existing treatment of the decorative Contact orbit. The coordinate, year, seal, footer boundary, story rail, and all interactive content remain visible.
- **What stayed:** Preserved the baseline in normal and increased-contrast color modes, its LTR/RTL draw, reduced-motion static state, paint containment, and all footer geometry.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded, including the forced-colors regression assertion. In the normal-color browser check the baseline remained rendered as a block on `--footer-seal`, the 753px footer stayed intact, and horizontal overflow remained zero.
- **Why:** High-contrast users receive fewer non-semantic system lines and a clearer final identity hierarchy without losing any content or navigation.
- **Next priority:** Code Quality — separate the footer timeline target list from repeated selector strings only if doing so remains readable and preserves shorthand ordering guarantees.

## Round 86 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Audit:** The shared footer animation selector is intentionally repeated where CSS cascade order matters; extracting it would obscure the safeguard that keeps `animation-timeline` after animation shorthands. The actual ambiguity was the bilingual content key named only `footer`, although it stores the specific closing identity coordinate.
- **What changed:** Renamed the bilingual content key from `footer` to `closingCoordinate` and updated the `ClosingLedger` call site and source regression assertion. The component contract remains the focused `coordinate` prop.
- **What stayed:** Preserved every rendered character, English and Arabic output, footer component markup, timeline selectors, CSS ordering, geometry, animation, and metadata.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser checks rendered the exact English and Arabic closing coordinates with the current year and zero horizontal overflow.
- **Why:** The content model now names the story concept it owns, while the reusable component still describes the value it receives. This improves navigation and prevents a future generic footer field from becoming an unrelated catch-all.
- **Next priority:** SEO/Metadata — inspect the structured data and social metadata for one remaining generic label that can be aligned with the closing Pattern-to-Product narrative without duplicating visible copy.

## Round 87 — SEO/Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** The English `ProfilePage` correctly owned a single canonical `Person`, but the Person entity did not explicitly point back to the page for which it is the main entity. Crawlers could infer the relationship, yet the graph left that inverse edge unstated.
- **What changed:** Added a shared canonical `profilePageId`, used it for the `ProfilePage` `@id`, and linked the Person to that same node through `mainEntityOfPage`. Added a regression assertion that requires both IDs to remain identical.
- **What stayed:** Preserved visible copy, metadata titles/descriptions, canonical and language alternates, social cards, chapter/project schemas, the single-Person graph, and every interface behavior.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser-parsed JSON-LD confirmed identical page and backlink IDs, exactly one Person entity, and zero layout overflow.
- **Why:** The identity graph is now bidirectional and unambiguous without keyword stuffing or duplicate entities, strengthening entity interpretation while keeping the portfolio narrative untouched.
- **Next priority:** Visual Design — audit the final ledger after several semantic rounds and introduce one restrained visual distinction only if it improves the Pattern-to-Product resolution at both mobile and desktop sizes.

## Round 88 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The closing coordinate carried the right identity, location, and thesis, but all three fragments shared exactly the same visual treatment. The final `PATTERN → PRODUCT` resolution read as metadata instead of the portfolio's last authored thought.
- **What changed:** Structured the bilingual coordinate into identity, location, and thesis fragments, then gave only the thesis a restrained orange inset marker. The ink text color remains unchanged, so the accent works as a highlight rather than low-contrast colored copy.
- **What stayed:** Preserved every character and separator, reading order, screen-reader text, footer grid, motion timeline, seal, year, paint containment, and English/Arabic meaning.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 280px English the coordinate remained 22px high, the thesis stayed inside the footer, and overflow remained zero; at 1440px Arabic the RTL thesis remained inside the footer with the same marker and zero overflow.
- **Why:** The final transformation now resolves visually in the same orange used by the geometric system, while the name and location remain the sober coordinate that anchors it.
- **Next priority:** Motion/Interactivity — let the new thesis marker resolve with the existing footer timeline, without adding perpetual motion or changing reduced-motion behavior.

## Round 89 — Motion/Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** The new thesis marker appeared fully resolved before the rest of the closing ledger assembled, so it visually jumped ahead of the coordinate, seal, and year sequence.
- **What changed:** Rebuilt the marker as a directional background stroke and added a finite `footer-thesis-resolve` animation on the existing `--footer-seal` timeline. It draws from the reading edge between footer entry 44% and 94%; RTL starts from the right.
- **What stayed:** Preserved the marker's exact color/height, all text and geometry, the single shared footer timeline declaration, no permanent `will-change`, and the fully visible static end state when scroll timelines are unsupported.
- **Accessibility:** Added the thesis to the explicit reduced-motion animation reset, so the highlight remains complete without a draw transition.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser computed 0% marker width at the document top and 100% at the footer, on `--footer-seal`, with zero horizontal overflow.
- **Why:** The portfolio's final thesis now resolves at the right narrative beat, once, as part of the existing assembly rather than as a separate decorative effect.
- **Next priority:** Storytelling/Copy — audit whether the identity/location/thesis closing coordinate needs punctuation or wording refinement now that each fragment has a distinct narrative role; change only if clarity improves in both languages.

## Round 90 — Storytelling/Copy — 2026-07-21

- **Status:** Completed — no copy change required.
- **Audit:** Re-read the three closing roles in both languages: the full name anchors identity, Amman anchors context, and `PATTERN → PRODUCT` / `من النمط إلى المنتج` resolves the artistic-to-engineering journey. The slash cadence is concise, bilingual, and consistent with the coordinate system used throughout the experience.
- **Decision:** Kept the exact wording and punctuation. Adding a verb or another metaphor would repeat the Hero and weaken the ledger's function as a final signature.
- **Next priority:** Performance — measure the new marker's actual paint surface and compositing hints before accepting its background-size animation.

## Round 91 — Performance — 2026-07-21

- **Status:** Completed — no performance change required.
- **Audit:** At 280px the thesis occupies 1,187px², while the animated orange band paints only 364px² inside a 40,810px² footer. The containing footer retains `contain: paint`, the thesis keeps `will-change: auto`, and horizontal overflow remains zero.
- **Decision:** The finite background-size draw is proportionate and localized. Rebuilding it as an extra pseudo-element or promoted transform layer would add complexity without a measurable benefit at this surface size.
- **Next priority:** Responsiveness — verify the marker when the longer Arabic thesis fragments across lines at the narrowest supported viewport.

## Round 92 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** At 280px the Arabic thesis naturally breaks into two inline fragments. The default `box-decoration-break: slice` treats the marker as one continuous decoration, which can leave a wrapped fragment without its own complete reading-edge highlight.
- **What changed:** Enabled cloned inline decoration for the thesis, including the WebKit-prefixed form, so every wrapped fragment receives a complete marker while sharing the same RTL-aware draw direction.
- **What stayed:** Preserved the line break, text width, footer height, animation range/timeline, color, reduced-motion state, and every desktop/English layout.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 280px Arabic the browser computed `box-decoration-break: clone`, retained two 11px-high fragments, drew from the right at 100% completion, and reported zero horizontal overflow.
- **Why:** The smallest Arabic layout now looks intentionally composed rather than like a desktop marker clipped across a wrap.
- **Next priority:** Accessibility — confirm the cloned decoration remains non-semantic and ensure high-contrast modes never depend on the orange band to communicate the closing thesis.

## Round 93 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** The thesis remains fully understandable as ink text, but its orange background marker is decorative. Relying only on user-agent forced-color image suppression would leave its treatment browser-dependent.
- **What changed:** Explicitly remove the thesis background in forced-colors mode, alongside the already suppressed decorative footer baseline and Contact orbit. The full thesis text remains visible in system-controlled colors.
- **What stayed:** Preserved the marker in normal and increased-contrast color modes, cloned wrapping, RTL direction, scroll resolution, reduced-motion completion, and all semantic text.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with an explicit forced-colors regression assertion. Normal-mode browser verification retained the full Arabic marker at 100%, the ink text color, and zero horizontal overflow.
- **Why:** The closing idea never depends on color or decoration, and high-contrast users receive only the semantic thesis rather than a remapped visual cue.
- **Next priority:** Code Quality — centralize the closing-coordinate shape so bilingual content and `ClosingLedger` cannot drift into incompatible structures.

## Round 94 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** `ClosingLedger` locally described the coordinate object, while the English and Arabic content objects relied only on inference. A future rename or missing fragment could drift until the component call rather than failing at the content definition.
- **What changed:** Exported a single `ClosingCoordinate` type from the ledger component, used it for the component prop, imported it into the bilingual content module, and applied `satisfies ClosingCoordinate` to both language values. Updated source regressions to protect the shared contract.
- **What stayed:** Preserved runtime JavaScript, rendered markup, all text, animation and CSS, metadata, and the full visual result.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser output remained exactly identical in English and Arabic.
- **Why:** The content and renderer now share one compile-time contract at the point of authorship, preventing silent bilingual structure drift without adding runtime code.
- **Next priority:** SEO/Metadata — verify that the newly structured visible thesis remains represented consistently in the ProfilePage and WebSite entity names without creating duplicate slogans.

## Round 95 — SEO/Metadata — 2026-07-21

- **Status:** Completed — no metadata change required.
- **Audit:** The entity graph already assigns distinct jobs to each phrase: the `ProfilePage` name identifies Rashed and his role, its headline carries the artistic-to-systems hook, and the `WebSite` name resolves the broader `From Pattern to Product` thesis. The visible closing coordinate uses the shorter `PATTERN → PRODUCT` form without introducing a competing entity name.
- **Decision:** Kept the current graph. Adding the thesis again as an alternate name, slogan, or description would duplicate copy without improving entity clarity.
- **Verification:** Re-read the canonical ProfilePage, Person, and WebSite nodes together and confirmed a single Person, one canonical profile-page ID, and one website identity with the existing bilingual language declaration.
- **Next priority:** Visual Design — move beyond the mature footer and inspect the primary chapters at narrow mobile widths for typography that is being clipped inside intentionally overflow-hidden art direction.

## Round 96 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The English Origin headline used the shared 14vw mobile display scale. Its longest word extended beyond the 338px content measure at the common 390px viewport—and beyond the 228px measure at 280px—then disappeared inside the chapter's intentional overflow clipping even though document overflow remained zero.
- **What changed:** Added a language-specific mobile scale for the English Origin headline: `clamp(1.9rem, 10.8vw, 4.2rem)` with a full available measure. Arabic and all other chapter headings keep their existing scales.
- **What stayed:** Preserved the headline copy and line breaks, display typeface, Origin geometry/grid, geometric artwork, body measure, desktop/tablet typography, and every Arabic rule.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 390px the English headline measured 338.2px inside a 375px viewport; at 280px it measured 228.2px inside 265px. Both reported zero horizontal overflow, while the Arabic headline retained its 42.12px scale and stayed inside the same measure.
- **Why:** The full sentence is now readable at the two narrowest audited widths without weakening the bolder shared scale used by Work, Stack, or the Arabic narrative.
- **Next priority:** Motion/Interactivity — verify that the Origin headline's new mobile measure does not change the timing or discoverability of the nearby hidden-pattern interaction, then improve only if the interaction cue is visually or functionally late.

## Round 97 — Motion/Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** On mobile the partially hidden Origin pattern kept the intended mystery, but its transformed button center landed exactly on the viewport edge—375px at the common 390px device and 265px at the 280px audit. Standard pointer activation therefore targeted outside the page even though part of the artwork and label remained visible. In closed Arabic at 280px, rotation also pulled the longer `افتح النمط` cue fully past the left edge.
- **What changed:** Shifted the LTR mobile pattern two rem units inward, mirrored the RTL artwork with a slightly larger safe inset, and added a closed-state Arabic label translation that compensates for the rotated coordinate system. The pattern remains deliberately cropped, but its actionable center and both labels now live inside the viewport.
- **What stayed:** Preserved the 16rem pattern scale, 45-degree closed geometry, unlocked transformation, hover/touch choreography, exact labels and secret copy, `aria-expanded`, live region, and zero-overflow chapter composition.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 390px LTR the button center moved from the 375px edge to 343px and click revealed the complete secret; at 280px RTL the center measured 48px, the closed label occupied 4.46–96.85px, click toggled `aria-expanded` to true, and the settled reset label remained fully visible with zero horizontal overflow.
- **Why:** The interaction now earns curiosity through partial visual disclosure rather than through an accidental unreachable hit target.
- **Next priority:** Storytelling/Copy — verify that the hidden ornament question now rewards the more discoverable interaction and that its relation to the visible Origin paragraph is specific rather than repetitive.

## Round 98 — Storytelling/Copy — 2026-07-21

- **Status:** Completed — no copy change required.
- **Audit:** The visible Origin paragraph explains the transferable skills—hierarchy, repetition, constraints, and precision—while the hidden line rewards interaction with the sharper engineering question: what repeats, what varies, and what must never drift? The Arabic version preserves the same sequence and meaning.
- **Decision:** Kept both texts. The secret advances from biography to an actionable systems heuristic rather than restating the degree or CAD history, and its brevity matches the one-step reveal.
- **Next priority:** Performance — reassess the perpetual touch-only tile animation now that the label and hit target provide sufficient discoverability without ambient motion.

## Round 99 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** Touch devices continuously animated four odd pattern tiles with a 5.5-second infinite transform loop—even while Origin sat thousands of pixels below the first viewport. That battery/compositing work was originally a discovery cue, but Round 97 made the label and actionable center reliably visible.
- **What changed:** Replaced the perpetual `tile-breathe` loop and staggered delay with a static 8-degree, 0.9-scale asymmetry on odd tiles for hoverless devices. The existing state transition still animates the pattern when the user deliberately opens it.
- **What stayed:** Preserved desktop hover choreography, touch visual asymmetry, unlocked transformations, transitions, labels, secret reveal, reduced-motion behavior, and all chapter geometry.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with regressions that require the static touch treatment and forbid the removed infinite keyframes. Pointer-mode browser checks retained the untouched default geometry, click reveal, exact secret, and zero horizontal overflow.
- **Why:** Motion now follows intent instead of spending energy before the chapter is seen; the pattern remains alive when interacted with, not forever in the background.
- **Next priority:** Responsiveness — re-audit the shifted Origin artwork and both labels in short landscape, narrow portrait, and tablet portrait so the new safe hit center does not collide with copy when the layout mode changes.

## Round 100 — Responsiveness — 2026-07-21

- **Status:** Completed.
- **Issue found:** The safer mobile hit center exposed two adjacent layout defects. At 568×320 the 16rem absolute pattern and its label crossed the English Origin headline; in 768px portrait the tablet rule still placed the rotated button center 12.8px beyond the right edge, with the mirrored RTL center equally unsafe on the left.
- **What changed:** Added a short-landscape composition with an 8rem pattern in the upper corner, a tiny RTL vertical correction, and no inherited Arabic closed-label translation. Tightened the 621–900px portrait inset from −10.3rem to −7rem in both directions so the transformed center stays inside the touch surface.
- **What stayed:** Preserved the larger narrow-portrait treatment, tablet pattern scale, landscape side navigation, complete labels, hidden secret, chapter copy, click animation, and intentional partial cropping.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 568×320 both language variants kept artwork and label clear of the headline, labels fully inside, clickable centers at 409px LTR and 144px RTL, and zero overflow. At 768px portrait centers moved to 713px LTR and 40px RTL within a 753px viewport; both labels stayed inside, avoided the headline, and pointer activation toggled state.
- **Why:** Every responsive mode now expresses the same idea—partially hidden artwork, fully available interaction—without letting rotation turn intentional cropping into blocked text or an off-screen hit target.
- **Next priority:** Accessibility — inspect focus visibility and focus order for the newly repositioned Origin button at all three layout modes, including whether its transformed outline remains visible inside the clipped chapter.

## Round 101 — Accessibility — 2026-07-21

- **Status:** Completed — no accessibility change required.
- **Audit:** Keyboard focus on the transformed Origin button produces a 3px acid outline with a 10px offset, while the action label receives its own 3px paper outline, 2px offset, and 7px ink halo. Because the label is the semantic cue and is now fully inside every audited viewport, the intentionally cropped geometric outline never becomes the only focus indicator.
- **Evidence:** At 280px portrait, 568×320 landscape, and 768px RTL tablet, keyboard input produced `:focus-visible`, the full label outline remained inside the viewport, more than 200px of the transformed button stayed visible at the narrowest size, focus order remained native DOM order, and overflow stayed zero. The component remains a native button with `aria-expanded`, `aria-controls`, and a polite atomic reveal region.
- **Decision:** Kept the current two-layer focus treatment; adding another fixed ring would compete with the pattern and duplicate an already strong in-viewport indicator.
- **Next priority:** Code Quality — make the four Origin translation rows structurally explicit so each bilingual entry must always contain both a source concept and a software outcome.

## Round 102 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** `OriginChapter` accepted `string[][]`, allowing future content to pass a one-item or three-item row even though rendering always destructures exactly `[from, to]`.
- **What changed:** Exported an `OriginTranslation` readonly tuple, changed the component prop to a readonly tuple list, imported that contract into the bilingual content, and applied `satisfies readonly OriginTranslation[]` to both language sets. Added source regression coverage for the shared type.
- **What stayed:** Preserved runtime output, array order, four rows, numbering, animation, copy, layout, and every responsive state.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser verification rendered the same four English and four Arabic concept-to-outcome pairs in order with zero Arabic overflow.
- **Why:** A visual storytelling unit that always has two roles now has a matching compile-time structure, preventing incomplete rows without adding runtime logic.
- **Next priority:** SEO/Metadata — inspect whether Origin's artistic background is represented strongly enough in the Person entity's `knowsAbout` and education graph without turning a software portfolio into an art-keyword list.

## Round 103 — SEO/Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** The visible portfolio makes Islamic arts, ornamental architecture, and geometric pattern design the differentiating origin, while the canonical Person entity listed only software subjects. `alumniOf: WISE University` established education but not the field that shaped the systems perspective.
- **What changed:** Added exactly two factual `knowsAbout` subjects—`Islamic arts and ornamental architecture` and `Geometric pattern design`—after the technical working set. Added structured-data regressions for both.
- **What stayed:** Preserved the software-first job title, technical skills, WISE/MERAKI education graph, single canonical Person, visible copy, metadata descriptions, and all social-preview fields.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. Browser-parsed JSON-LD returned the two artistic subjects, both education organizations, exactly one Person entity, and zero layout overflow.
- **Why:** Search entities can now connect the uncommon artistic background to Rashed without keyword stuffing or implying that art is the target profession.
- **Next priority:** Visual Design — inspect the four Origin translation rows now that their content contract and entity context are stable, focusing on whether the transformation from art concept to software outcome reads as a designed sequence rather than a generic list.

## Round 104 — Visual Design — 2026-07-21

- **Status:** Completed.
- **Issue found:** The translation rows themselves remained strong, but their upstream visual cue was compromising the reading sequence: the rotated button transformed its action label in the same coordinate system as the tiles. On narrow portrait the label crossed copy, RTL compensation moved diagonally, and opening the pattern let semi-opaque tile fills compete with the headline.
- **What changed:** Split the Origin control into an `origin-tiles` visual layer and an independent `origin-action` label inside the same native button. Only the tiles rotate/resolve; below 980px they become a 22% geometric layer while the action stays full-contrast, upright, and pinned to the visible reading-side edge. Removed the fragile RTL translation hacks and retained the safe responsive button centers from Rounds 97/100.
- **What stayed:** Preserved the single accessible button, exact labels and secret, 8-tile pattern, closed 45-degree geometry, unlocked tile choreography, hover/focus effects, chapter copy, translation rows, and desktop bottom-centered label treatment.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded. At 280px English and Arabic, 568×320 landscape, and 768px RTL tablet, action labels stayed fully inside and clear of both headline and body with zero overflow; button centers remained safe. The 390px visual check showed readable copy under a restrained 22% pattern layer and a full-contrast cue. Click still changed the tile matrix, label, `aria-expanded`, and secret; keyboard focus retained the 3px outlined action.
- **Why:** The chapter now reads in the intended order—story, invitation, discovery, translation—while the geometry remains curious rather than becoming an obstacle laid over the text.
- **Next priority:** Motion/Interactivity — tune the newly separated tile and label transitions so the action cue does not visually jump when the tile layer resolves, while keeping reduced motion immediate.

## Round 105 — Motion/Interactivity — 2026-07-21

- **Status:** Completed — no motion change required.
- **Audit:** After the layer split, `origin-tiles` owns a single 0.7-second transform transition. The mobile `origin-action` computes to `transform: none` in both states and only eases background/color over 0.3 seconds; it cannot jump position while the geometry resolves. There is no idle animation, and the global reduced-motion rule collapses all transitions to 0.01ms.
- **Decision:** Kept the timing. Adding a delay would make the label acknowledge the click late, while synchronizing every property to 0.7 seconds would make the state response feel sluggish.
- **Verification:** Browser-computed transition properties and durations matched the intended separation, the open state completed at the same coordinate, and the action remained fully inside with zero overflow.
- **Next priority:** Storytelling/Copy — strengthen the generic `HIERARCHY → information` translation so it names the actual software discipline produced by hierarchy.

## Round 106 — Storytelling/Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** Three Origin pairs ended in concrete engineering outcomes, while `HIERARCHY → information` stopped at a broad noun and undersold how visual hierarchy transfers into interface structure.
- **What changed:** Refined the pair to `HIERARCHY → information architecture`; the Arabic equivalent now reads `التسلسل → بنية المعلومات`. Both remain factual extensions of the visible hierarchy premise.
- **What stayed:** Preserved the four-row sequence, numbering, source concept, all other pairs, tile geometry, typography, interaction, and the broader Origin paragraph.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with exact bilingual copy assertions. At 280px Arabic the new target stayed inside its 228.2px row; at desktop English it stayed inside its 320.25px tile. Both reported zero overflow.
- **Why:** The row now connects artistic hierarchy to a recognizable software practice rather than merely repeating the word “information.”
- **Next priority:** Performance — measure the separated tile layer's paint/compositing surface at mobile and tablet sizes and keep its opacity/transform implementation only if the finite interaction remains proportionate.

## Round 107 — Performance — 2026-07-21

- **Status:** Completed — no performance change required.
- **Audit:** The rotated tile layer has a 362px transformed bound on mobile and 430px on tablet, but it has no animation, keeps `will-change: auto`, sits at 22% opacity, and changes only through one finite 0.7-second transform after deliberate interaction. Its untransformed paint boxes remain 256² and 304² pixels respectively.
- **Decision:** Kept the implementation. A permanent layer hint would reserve memory while the chapter is idle; paint containment would clip rotated corners. Modern browsers can promote the finite transform only while needed.
- **Verification:** Browser-computed animation remained `none`, transition scope remained transform-only, opacity and overflow stayed stable at both audited sizes.
- **Next priority:** Responsiveness — confirm the independent action edge and restrained tile layer remain clear across narrow portrait, short landscape, and RTL tablet after the visual split.

## Round 108 — Responsiveness — 2026-07-21

- **Status:** Completed — no responsive change required.
- **Audit:** Rechecked 280px LTR/RTL, 568×320 landscape, and 768px RTL tablet after separating label and geometry. In every mode the action remained fully inside, avoided both headline and body, kept the safe centers from Round 100, and produced zero horizontal overflow. Landscape and tablet artwork also stayed clear of the headline.
- **Decision:** The responsive positioning now has one stable rule: artwork may crop, action text may not. No new breakpoint or compensation is needed.
- **Next priority:** Accessibility — prevent the decorative tile layer from becoming a system-colored grid over text in forced-colors mode while preserving the button and its action label.

## Round 109 — Accessibility — 2026-07-21

- **Status:** Completed.
- **Issue found:** `origin-tiles` is explicitly `aria-hidden`, but forced-colors could still remap its eight borders/fills into a high-contrast grid over the Origin heading. The geometry communicates no information that is absent from the label and secret.
- **What changed:** Hide only `origin-tiles` when forced colors are active. The native button, full action label, focus indicator, expanded state, and live reveal remain available in system colors.
- **What stayed:** Preserved the tiles in normal and increased-contrast color modes, all interaction semantics, focus treatment, reduced-motion behavior, responsive positions, and visible copy.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with an explicit forced-colors regression. Normal-mode browser verification retained the grid at 22% opacity, the complete action label, and zero overflow.
- **Why:** High-contrast users receive the interactive meaning without a decorative system-colored overlay competing with the text it is meant to support.
- **Next priority:** Code Quality — centralize the Origin action/tile class contract or remove any selector that still assumes the pre-split DOM, ensuring future refactors cannot silently orphan a visual state.

## Round 110 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Audit:** Confirmed that no stylesheet or test selector still assumes the pre-split Origin DOM. The remaining maintenance risk was the literal run of eight empty tile nodes inside the component.
- **What changed:** Added one `ORIGIN_TILE_COUNT` constant and generate the decorative nodes from it with stable React keys. The rendered DOM and all visual states remain identical, while future tile-count changes now have one source of truth.
- **What stayed:** Preserved the native button, isolated action label, eight-tile composition, unlock/reset behavior, forced-colors treatment, responsive positioning, bilingual copy, and animation timing.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with regression assertions for the centralized count. Browser verification found exactly eight tiles, zero horizontal overflow, and a successful Arabic reveal with the complete live-region message.
- **Why:** The component now expresses the geometry as data instead of duplicated markup without adding abstraction or changing runtime behavior.
- **Next priority:** SEO/Metadata — re-audit the bilingual structured data and social metadata against the visible role, Origin narrative, and private deployment URL; if already complete, record that and move immediately to Visual Design.

## Round 111 — SEO/Metadata → Visual Design — 2026-07-21

- **Status:** Completed.
- **SEO audit:** The English and Arabic canonicals, language alternates, Open Graph/Twitter cards, Person/ProfilePage/WebPage schemas, project ItemList, sitemap, robots policy, production URLs, current role, and Origin subjects remain mutually consistent. No metadata edit was warranted.
- **Visual issue found:** The same right-pointing translation glyph was used in both languages. In the RTL Origin ledger it pointed away from each Arabic outcome, contradicting the right-to-left reading and transformation flow.
- **What changed:** Mirror only the Origin translation arrows inside an RTL context. English keeps its right-pointing arrows; Arabic now reads naturally from each artistic principle toward its engineering outcome on the left.
- **What stayed:** Preserved the bilingual copy, semantic DOM, tile geometry, grid order, source/outcome alignment, typography, spacing, and all metadata/schema output.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded with an RTL-arrow regression. Browser-computed transforms were `none` in English and `matrix(-1, 0, 0, 1, 0, 0)` in Arabic, with zero overflow; visual inspection confirmed four left-pointing Arabic arrows.
- **Why:** Direction is part of meaning in this ledger. The corrected arrows now communicate the intended transfer from pattern-making to software practice instead of visually reversing it.
- **Next priority:** Motion/Interactivity — inspect the Origin unlock sequence now that geometry, label, and directional meaning are isolated; refine only if the reveal lacks a clear, finite response.

## Round 112 — Motion/Interactivity — 2026-07-21

- **Status:** Completed.
- **Issue found:** Odd Origin tiles reacted whenever the pointer entered the entire chapter. The broad hover area made the ornament move before the visitor reached the discoverable control and gave pointer users feedback that keyboard users could not trigger at the same moment.
- **What changed:** Scoped the tile preview motion to `origin-mark` hover and focus-visible. The finite unlock choreography remains unchanged after activation.
- **What stayed:** Preserved the eight-tile geometry, 0.6-second easing, unlocked rotations/colors, action-label state, live secret reveal, touch treatment, reduced-motion rules, and all responsive positions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional existing native-image advisory), the production build passed, and all seven tests succeeded while preventing the broad chapter-hover selector from returning. Browser activation still changed the first tile from a transparent untransformed state to the acid 45-degree unlocked state and set `aria-expanded=true`.
- **Why:** Motion now behaves as an affordance for the actual control, including keyboard focus, rather than ambient movement across a large reading area.
- **Next priority:** Storytelling/Copy — audit the Origin action and secret as one curiosity loop; strengthen only if the promise, reveal, and bridge do not form a complete narrative beat in both languages.

## Round 113 — Storytelling/Copy — 2026-07-21

- **Status:** Completed — no copy change required.
- **Audit:** Read the Origin chapter as a full bilingual curiosity loop: the chapter establishes the uncommon background, the action promises a pattern, the reveal names the recurring systems question, the four translations prove the transfer, and the bridge carries the reader into the working stack.
- **Decision:** Kept every line. The promise, payoff, evidence, and next step are distinct but continuous in both languages; adding explanation would repeat the visible ledger, while shortening the reveal would remove its most ownable idea.
- **Verification:** Rechecked the live English and Arabic sequences after the motion refinement. The Arabic route settled to `lang=ar` and `dir=rtl` on both the document root and portfolio, retained zero horizontal overflow, and the reveal remained announced through its atomic live region.
- **Why:** A strong narrative beat does not need perpetual rewriting. This one already turns biography into a defensible engineering heuristic and then moves forward.
- **Next priority:** Performance — measure the shipped Origin and portrait costs, including duplicate visual instances and social-only assets, and optimize only work that affects loading or interaction rather than archive size alone.

## Round 114 — Performance — 2026-07-21

- **Status:** Completed.
- **Audit:** The 1.70MB Open Graph PNG is social-crawler-only and does not enter the initial page load. The visible portrait does: its four slices reuse one URL/cache entry, but the 600×800 JPEG was still 152,643 bytes.
- **What changed:** Added a visually matched 600×800 WebP portrait encoded at quality 82 and switched the four slice instances to that source. The original JPEG remains as the stable schema/profile image and source fallback asset.
- **Measured result:** The visible portrait transfer source fell to 104,918 bytes — 47,725 bytes, or 31.3%, smaller — with identical intrinsic dimensions.
- **What stayed:** Preserved the crop, saturation/contrast treatment, slice masks, pointer response, high-priority first slice, lazy secondary slices, click state, metadata image URL, and original JPEG.
- **Verification:** Compared both source assets at original resolution, then verified the portfolio rendered the WebP at 600×800 with all four slices complete and zero overflow. TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with an explicit WebP-source regression.
- **Why:** This removes bytes from the actual first visual experience without changing the portrait composition or optimizing an asset that social cards alone request.
- **Next priority:** Responsiveness — test the newly encoded portrait and its fracture interaction across narrow portrait and short landscape dimensions, preserving the hero hierarchy and avoiding clipped controls.

## Round 115 — Responsiveness → Accessibility → Code Quality — 2026-07-21

- **Status:** Completed.
- **Responsive audit:** The WebP retains the JPEG's exact 600×800 intrinsic dimensions, so every existing object-fit crop, portrait bound, slice mask, and short-landscape rule resolves identically. Live English and Arabic renders retained zero horizontal overflow.
- **Accessibility audit:** All four visual copies remain inside `aria-hidden` slice wrappers; the portrait is still exposed as one native button with a complete changing label and `aria-pressed` state. No new image announcement or focus target was introduced.
- **Code-quality issue found:** The component encoded its four-slice visual contract as a literal `[0, 1, 2, 3]` array, separate from the four CSS slice classes.
- **What changed:** Added one `PORTRAIT_SLICE_COUNT` constant and generate the keyed slices from it. The rendered DOM is unchanged, and the slice count now has one source of truth in the component.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with count/source regressions. Browser verification rendered four slices and four images, retained zero overflow, and changed the portrait from `aria-pressed=false` to `true` with the fractured class after activation.
- **Why:** The asset swap did not justify new breakpoints or semantics; centralizing the actual repeated contract removes a maintenance seam without changing the experience.
- **Next priority:** SEO/Metadata — ensure the optimized visible portrait and the stable profile/schema image intentionally remain separate, and confirm crawlers receive a valid absolute image URL after deployment.

## Round 116 — SEO/Metadata — 2026-07-21

- **Status:** Completed.
- **Issue found:** The Person schema exposed the stable absolute JPEG only as a bare string. It was valid, but gave crawlers no intrinsic dimensions, caption, stable image identity, or representative-page signal after the visible portrait moved to WebP.
- **What changed:** Promoted the Person `image` field to a fully described `ImageObject` with its own `@id`, absolute `url` and `contentUrl`, 600×800 dimensions, factual Amman caption, and `representativeOfPage: true`.
- **What stayed:** The UI continues to use the lighter WebP; structured data continues to reference the compatible JPEG. Person/ProfilePage IDs, Open Graph image, social card, and all other schema properties remain unchanged.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with exact ImageObject regressions. Browser parsing confirmed `ImageObject`, the absolute production JPEG URL, 600×800 dimensions, the representative flag, and a separate `/rashed-photo.webp` visible source.
- **Why:** Crawlers now understand exactly what the profile image is while visitors receive the optimized format; neither audience forces the other's trade-off.
- **Next priority:** Visual Design — inspect the fractured portrait state with the WebP source at rest and after activation, then refine only if the slice separation loses edge clarity or visual balance.

## Round 117 — Visual Design → Motion/Interactivity — 2026-07-21

- **Status:** Completed.
- **Visual audit:** The WebP preserves face detail, foliage texture, slice-edge clarity, blue negative space, and the hero's asymmetric balance both at rest and after fracture. No color, crop, border, or spacing correction was warranted.
- **Motion issue found:** All four slices separated on the same frame. The result was legible but read as four layers translating together rather than one pattern progressively resolving into pieces.
- **What changed:** Added a restrained 45ms cadence across slices 1–3: 0ms, 45ms, 90ms, and 135ms from first to last. Rest/return remains immediate, and the existing 0.75-second transforms still determine the overall feel.
- **What stayed:** Preserved every final slice position, clip path, image treatment, pointer offsets, click state, hero overlap, caption, reduced-motion override, and button semantics.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with cadence regressions. Browser-computed delays matched 0/45/90/135ms, activation retained `aria-pressed=true`, the final fractured composition remained balanced, and overflow stayed zero.
- **Why:** The tiny stagger makes the interaction feel authored and pattern-like without slowing the response or turning the hero into a showreel effect.
- **Next priority:** Storytelling/Copy — evaluate the portrait's action and state labels against the “draw patterns / build systems” hook so the first interaction advances the story rather than merely describing an effect.

## Round 118 — Storytelling/Copy — 2026-07-21

- **Status:** Completed.
- **Issue found:** The discovered portrait caption, `FRAME BROKEN / TAP TO RESET`, only repeated the control behavior. It did not reward the first interaction with an idea connected to the hero's pattern-to-system thesis.
- **What changed:** Replaced the visible discovered caption with `FRAME BROKEN / SYSTEM INTACT`; the Arabic counterpart is `الإطار مكسور / النظام متماسك`.
- **Accessibility preserved:** The changing `aria-label` still explicitly tells English and Arabic users that the frame is broken and pressing again resets it. The visual line can therefore carry the narrative payoff without hiding the next action from assistive technology.
- **What stayed:** Preserved the initial hint, portrait action, reset behavior, cadence, geometry, bilingual hero copy, button state, and every factual claim.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with exact bilingual caption regressions. Browser verification confirmed both new visible captions, both complete reset labels, and zero overflow; visual inspection retained clear vertical-caption placement in LTR and RTL.
- **Why:** The first hidden interaction now demonstrates the portfolio's core idea: appearance can fracture while the underlying system remains coherent.
- **Next priority:** Performance — profile the portrait's pointer-tracking path; eliminate repeated layout reads or unbounded style writes only if they exceed one update per animation frame.

## Round 119 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** Every portrait `pointermove` synchronously called `getBoundingClientRect()` and wrote both CSS variables. High-frequency pointing devices can emit several events inside one paint interval, creating redundant layout reads and style writes.
- **What changed:** Store only the latest pointer sample and process it through one queued `requestAnimationFrame`. Additional events before that frame now replace the sample instead of scheduling more work. Pointer leave clears the sample, cancels pending work, and restores both variables; unmount also cancels any pending frame.
- **What stayed:** Preserved the exact normalized −1..1 coordinate math, three-decimal precision, CSS variable names, slice transforms, hover/click states, touch behavior, caption, and visual cadence.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with batching/cancellation regressions. Browser pointer input produced the expected `--mx: 0.600` and `--my: -0.500` at an 80%/25% sample, with zero overflow and unchanged visual response.
- **Why:** Pointer tracking is now bounded to the display's frame budget: at most one layout read and two style writes per rendered frame, independent of raw event frequency.
- **Next priority:** Responsiveness — validate the portrait's pointer-derived transforms and fixed fracture offsets remain contained at the smallest supported hero widths; adjust offsets, not the image crop, if any slice threatens the viewport edge.

## Round 120 — Responsiveness → Accessibility — 2026-07-21

- **Status:** Completed.
- **Responsive audit:** The batching refactor changes event timing only; it preserves every computed coordinate, final translate offset, breakpoint, crop, and portrait bound. Existing narrow/short-landscape containment rules therefore remain valid, and live LTR/RTL renders continued to report zero horizontal overflow.
- **Accessibility issue found:** Reduced-motion mode removed slice transforms but left `--mx` and `--my` live. The portrait background and both crossing lines still consumed those variables, so pointer movement could retain parallax after the main fracture was disabled.
- **What changed:** Force both portrait motion variables to zero with reduced-motion-important custom properties. Inline pointer samples can no longer move any dependent layer in that preference mode.
- **What stayed:** Preserved the state/caption change, button semantics, focus behavior, static composition, and all normal-motion pointer and fracture behavior.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with the reduced-motion variable lock. In normal motion, browser pointer input still produced `--mx: 0.700` and `--my: -0.600`; the page retained zero overflow.
- **Why:** Reduced motion now governs the whole portrait composition, not only the most obvious slices, while the interaction's meaning remains available through state and copy.
- **Next priority:** Code Quality — extract the pointer-frame lifecycle from the Portrait component only if doing so clarifies ownership without hiding the simple coordinate math.

## Round 121 — Code Quality — 2026-07-21

- **Status:** Completed.
- **Issue found:** After frame batching, the Portrait component devoted more code to pointer sampling, scheduling, cancellation, and cleanup than to its visual/state contract. That obscured the component without making the motion lifecycle reusable or independently testable.
- **What changed:** Extracted the complete lifecycle into `usePointerMotion`: typed sample ownership, one-frame queueing, normalized coordinate math, CSS-variable writes, pointer-leave reset, and unmount cancellation. Portrait now consumes only `movePointer` and `resetPointer` alongside its broken-state logic.
- **What stayed:** Preserved the exact calculations, event types, frame bound, cancellation behavior, CSS variables, JSX, four-slice contract, labels, and visual output. The hook remains deliberately specific to a button-driven motion surface rather than introducing generic abstractions.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded across component wiring and hook lifecycle assertions. Browser input still produced `--mx: 0.700` / `--my: -0.600`; activation retained four slices, the narrative caption, `aria-pressed=true`, and zero overflow.
- **Why:** Rendering and scheduling now have clear owners, while the coordinate math remains readable in one focused file.
- **Next priority:** SEO/Metadata — verify the new hook split does not alter server-rendered portrait markup, and revalidate the ProfilePage/ImageObject graph on the deployed production version before moving to Visual Design.

## Round 122 — SEO/Metadata → Visual Design → Motion/Interactivity — 2026-07-21

- **Status:** Completed.
- **SEO audit:** The pointer hook remains client-side behavior behind identical portrait markup. Build/test parsing retained the ProfilePage → Person → ImageObject graph, absolute JPEG URL, dimensions, and separate visible WebP. Production version 138 deployed successfully; its owner-only URL correctly returned the authentication gate to the unauthenticated test browser, confirming private access was not weakened.
- **Visual audit:** Rechecked the selected-work heading and expanded EV Solution door. The editorial whitespace, question-led hierarchy, orange/ink contrast, proof column, and focus outline remain balanced; no visual restyling was warranted.
- **Interaction issue found:** Door geometry and color previewed on pointer hover, but a keyboard user received only an outline before activation. The control's discoverable motion language was therefore input-dependent.
- **What changed:** Apply the same sliding color plane, corner-register resolution, and rotating door-ID geometry to `door-trigger:focus-visible`. The native outline remains above the preview.
- **What stayed:** Preserved hover/open selectors, expansion state, timing, panel semantics, colors per project, reduced-motion behavior, and click/keyboard activation.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with focus-preview regressions. On a closed second door, keyboard focus produced `focus-visible=true`, a zero-translation color plane, full corner opacity, the 90-degree ID mark, `aria-expanded=false`, and zero overflow.
- **Why:** Curiosity is now offered before activation regardless of whether the visitor points or tabs.
- **Next priority:** Storytelling/Copy — audit the five project questions as a sequence, ensuring each opens a distinct systems problem and none collapses into generic feature language.

## Round 123 — Storytelling/Copy — 2026-07-21

- **Status:** Completed — no copy change required.
- **Audit:** Read all five questions independently and as one sequence. They open five distinct system tensions: operational visibility for EV charging, task context before inspection, coherence across many social interactions, signal-to-action in job discovery, and role-dependent behavior in course management.
- **Decision:** Kept every English and Arabic question. Each one creates curiosity before naming features, predicts the answer inside its panel, and belongs only to its project; none relies on an unsupported metric or generic “solution” language.
- **Verification:** Rechecked each question against its story, proof list, technology tags, and source/live link. The order also scales coherently from operations → collaboration → social space → personal decision → controlled access.
- **Why:** Rewriting a differentiated question set would trade specificity for novelty. The current sequence already turns five cards into five product-thinking prompts rather than five résumé entries.
- **Next priority:** Performance — inspect closed project panels for unnecessary active layout/paint work and preserve the grid-row reveal only if hidden doors remain inert, non-visible, and cheap at rest.

## Round 124 — Performance — 2026-07-21

- **Status:** Completed.
- **Issue found:** Closed doors were correctly `inert`, `aria-hidden`, visually hidden, and collapsed to a zero grid row, but their full story/proof/tag subtree could still participate in internal style and layout work.
- **What changed:** Added a progressive `content-visibility` lifecycle behind `@supports (transition-behavior: allow-discrete)`. Closed panels become computationally hidden only after the 0.72-second collapse; opening panels become visible immediately before their delayed grid expansion. Browsers without the discrete-transition contract retain the proven visibility/grid implementation unchanged.
- **What stayed:** Preserved every panel node, close animation, opening delay, accessibility state, intrinsic expanded height, project content, link, background, and reduced-motion behavior.
- **Verification:** TypeScript and ESLint completed with zero errors (one intentional native-image advisory), the production build passed, and all seven tests succeeded with progressive-enhancement regressions. Browser inspection showed the inactive second panel at `content-visibility:hidden`, `visibility:hidden`, zero rows, `inert`, and `aria-hidden=true`; during a door switch the closing content stayed visible while collapsing; after 950ms the former panel became computationally hidden and the new panel was fully visible at its original 760.7px height. Visual inspection found no cropped content or timing break, and overflow remained zero.
- **Why:** Four inactive case studies now avoid unnecessary subtree work without sacrificing the authored reveal or relying on an unsupported behavior.
- **Next priority:** Responsiveness — verify the optimized door lifecycle across the compact single-column panel layout and short-landscape two-column layout, especially when rapidly switching projects.

## Round 125 — Final engineering-first revision — 2026-07-21

- **Status:** Completed. This is the final requested portfolio round.
- **Direction:** Rebalanced the experience from designer-first to software-engineer-first. The hero now leads with full-stack product delivery, a UI → API → DATA → SHIP path, a restrained blue engineering accent, and a direct availability signal.
- **Content:** Removed the Arabic route, language switch, Arabic sitemap entry, bilingual structured data, and Arabic fallback copy. Rewrote the full English experience in simpler, more direct language and removed unsupported or over-styled claims.
- **Skills:** Expanded the working stack into six clear groups: frontend, backend, data, workflow, AI workflow, and growing skills. Added authentication, RBAC, data modeling, Docker, VS Code, API integration, review, type checks, and manual testing where supported by the known profile. Python and microservices remain clearly labeled as growing skills. React Native was intentionally excluded.
- **Visual design:** Added compact engineering icons to section headings and skill groups, improved section spacing, changed project questions into direct product summaries, and reduced the visual dominance of the art/CAD story. The design background remains as a supporting advantage.
- **GitHub:** Replaced the dense SYSTEM ATLAS profile README with a calmer, easier-to-scan engineering profile. Added a small verified Luffy GIF, concise stack, selected work table, AI workflow, and design-background note.
- **Verification:** TypeScript and ESLint passed with zero errors (one known native-image advisory). The production build passed and all five updated tests succeeded. Browser QA confirmed the final hero, section order, six skill groups, no Arabic links, no horizontal overflow, and correct accessible document structure. GitHub was verified live after commit.
- **Next priority:** None. End of requested iteration cycle.

## Round 126 — Engineered aesthetic redesign — 2026-07-22

- **Status:** Completed against the supplied redesign brief.
- **Identity:** Reframed the hero around “Full-Stack Software Engineer” with maintainable production-grade web apps, explicit ownership of architecture/validation/code quality, and AI positioned as a reviewed accelerator.
- **Visual system:** Preserved the black, warm beige, electric blue, and burnt orange rhythm. Added monospace metadata, terminal prompts, syntax-shaped stack tags, six oversized ghost indices, intentional negative space, and a true terminal-window portrait with window chrome, scanlines, and quiet code overlay. Replaced the social preview with a bespoke terminal/CAD card using the same system and verified text.
- **Content:** Added Software Engineer at CartBuzz, freelance full-stack work with Independent + Vero IT, MERAKI Academy’s 400+ hour bootcamp, WISE University degree details, and freelance CAD dates. Kept company product detail appropriately high-level and omitted the phone number.
- **Projects:** Expanded EV Solution JO, Tickln, and Course Management with supplied specifics; kept NotNull and RA Job Search concise. Made EV Solution JO a full-width dark featured card and rendered each stack as code syntax.
- **Motion:** Added line-by-line hero typing, staggered technology tags, 280ms section reveals, subtle ghost-number parallax, a one-frame project-stack glitch, and a 4px hover arrow shift. Reduced-motion mode resolves all animated states immediately.
- **Responsive/accessibility:** Added six-item responsive navigation, repaired the mobile headline width, preserved keyboard-operable project disclosures and portrait state, and confirmed no horizontal overflow at 1280×720 and 390×844.
- **Verification:** TypeScript and ESLint passed with zero errors (one known native-image advisory), the production build and six tests passed, all required sections and seven skill groups rendered, project switching updated accessible state correctly, and browser logs contained no errors or warnings.
- **Next priority:** Publish this exact validated state privately.

## Round 127 — Skills capability console — 2026-07-23

- **Status:** Completed.
- **Visual hierarchy:** Replaced the understated skill rows with seven high-contrast capability cards. Frontend and backend lead as large core modules; data, delivery, systems, AI workflow, and growing skills follow in a responsive 12-column composition.
- **Icons:** Added a distinct code-native symbol tile to every category, with geometric linework that stays consistent with the terminal and pattern language. No external icon package or extra asset weight was introduced.
- **Content:** Split every technology into a scannable tag and added short, factual context for what each group contributes. Added CORE, DELIVERY, SYSTEMS, REVIEWED, and EMERGING labels to communicate role without inventing proficiency scores.
- **Interaction:** Cards now lift into their accent color during hover and scroll reading states; their skill tags invert for faster recognition. Reduced-motion mode keeps the emphasis without movement.
- **Responsive/accessibility:** The layout resolves from 2/3-column groups to two columns and then one column on mobile. Technology groups have accessible labels, decorative symbols stay hidden from assistive technology, and emerging skills remain explicit.
- **Verification:** Production build completed and all six server-render, content, metadata, responsive UI, and motion-safety tests passed.
- **Next priority:** None requested; publish the verified skills update.

## Round 128 — Visible code layer — 2026-07-23

- **Status:** Completed from direct design critique.
- **Typography:** Added and self-hosted the JetBrains Mono variable font instead of relying on an unavailable fallback name. Applied it consistently to metadata, dates, labels, technology tags, terminal paths, process descriptions, statuses, project proof labels, contact details, and the closing ledger while preserving bold sans-serif display headings.
- **Hero portrait:** Removed the electric-blue decorative frame and rebuilt the container as a restrained terminal window with a thin graphite border, subtle dark chrome, three compact window dots, and the literal path `~/rashed/portrait.jpg`.
- **Process:** Increased the vertical rhythm between Define, Plan, Build, and Verify; exposed 01–04 as clean mono indices; removed the diamond number treatment; enlarged each step title; and simplified the blocks into spacious code-like rows.
- **Skills:** Reworked the capability cards into an airy index. Removed heavy borders, colored boxes, and hard shadows; reduced each category icon to a small accent glyph; introduced thin accent lines; and converted technology pills into understated mono labels.
- **Design bridge:** Changed the equal ornamental tile matrix into an asymmetric six-column component grid with varied UI-like regions while retaining the reveal interaction.
- **CTA:** Rebuilt the final contact section inside a matching command console with `~/rashed/contact.sh`, READY state, grid workspace, numbered background, square mono CTA, and terminal social ledger.
- **Responsive/accessibility:** Added compact mobile variants for the terminal, process rows, skill index, component grid, and contact console. Existing keyboard semantics, reduced-motion handling, and accessible labels remain intact.
- **Verification:** The production build completed, JetBrains Mono assets were emitted locally, and all six server-render, content, metadata, responsive UI, and motion-safety tests passed.
- **Next priority:** Publish the validated code-layer revision.

## Round 129 — Layout stability and typographic clarity — 2026-07-23

- **Status:** Completed from direct layout and spacing critique.
- **Experience flow:** Removed long-page rendering containment from the major sections and established an explicit normal-flow boundary around the experience list and closing narrative. The narrative now clears the cards, has a deliberate 6–9rem separation, and uses a readable white-on-dark treatment.
- **Skip navigation:** Confirmed there is no “Skip to resources” control in the source. The real keyboard skip link is now fully clipped while dormant and becomes a clearly styled control only on keyboard focus, preventing it from appearing as a detached screenshot artifact.
- **Design story:** Forced the Design Eye copy to remain fully opaque and in normal document flow instead of depending on a scroll-timeline reveal. The Islamic Arts/CAD narrative is visible again beneath the heading on every viewport.
- **Typography:** Kept bold sans-serif for display headings and made the supporting layer unambiguous: JetBrains Mono for dates, project technologies, capability tags, and background indices; clean sans-serif for descriptions and narrative copy.
- **Skills readability:** Increased technology-label size, weight, line height, row gap, and column gap so the stack reads as an important capability index rather than secondary microcopy.
- **Mobile polish:** Moved the Design Eye reveal control fully inside the 390px viewport and retained the compact “LINK” label without horizontal overflow.
- **Visual verification:** At 1440×900, the experience list and narrative have a 129.6px clear gap; at 390×844 the gap is 72px. Both layouts report no overlap and zero horizontal overflow. The Design Eye copy computes to full opacity, and technology labels render at 12.8px desktop / 12.16px mobile in JetBrains Mono.
- **Automated verification:** Production build and all six tests pass.
- **Next priority:** None. Publish this validated layout-stability revision.

## Round 130 — Figma developer-tool case study — 2026-07-23

- **Status:** Completed from newly supplied project information.
- **Selected work:** Added “Figma Design Intelligence Plugin” as the second case study, directly after EV Solution JO. The story presents it as developer tooling that reads design structure rather than flattening screens.
- **Technical scope:** Highlighted design-system extraction, Smart Animate relationships, prototype-graph capture, and motion/interaction metadata. The technology layer names Figma Plugin API, TypeScript, Design Systems, and Smart Animate.
- **Truthfulness:** The project has no invented public URL. Its panel uses a clear `PRIVATE BUILD / CASE STUDY SOON` status instead of a false or generic source link.
- **Skills and discovery:** Added Figma Plugin API and Design Systems to the systems capability module, SEO keywords, Person knowledge graph, and the structured project list.
- **Content count:** Updated the Selected Work introduction, accessible disclosure test, and structured-data count from five to six projects.
- **Verification:** The production build completed and all six server-render, content, metadata, responsive UI, and motion-safety tests passed.
- **Next priority:** Publish the validated developer-tool case study.

## Round 131 — Final engineered polish audit — 2026-07-23

- **Status:** Completed against the supplied Final Build Prompt, audited section by section.
- **Critical bugs:** Confirmed no “Skip to resources” element exists; the real keyboard skip link remains clipped until focus. The Experience list and closing statement remain in normal flow with 129.6px desktop and 72px mobile clearance and no overlap. The Design Eye heading and full Islamic Arts/CAD narrative render at full opacity.
- **Two-font system:** Enforced JetBrains Mono on navigation, buttons, labels, dates, descriptions, project questions and stories, process copy, technology tags, skill captions, origin copy, CTA copy, and footer metadata. The bold display face is now limited to the hero, section headings, company/project titles, and capability-card titles.
- **Terminal language:** Preserved the terminal portrait with one-pixel neutral frame, three window dots, and `~/rashed/portrait.jpg`. Define/Plan/Build/Verify retain 01–04 labels and generous 51.2px desktop row spacing.
- **Background indices:** All six sections retain 001–006 in JetBrains Mono at 8% opacity. Reduced their footprint and moved them into reserved top-edge space; measured heading overlap is false for all six sections on both 1440×900 and 390×844.
- **Spacing and rhythm:** Desktop section padding measures 115.2–179.2px; closing bridges retain at least 64px separation through section grid gaps or explicit margins. The final CTA keeps the same 006 index and terminal-frame grammar.
- **Motion:** Preserved 280ms section-heading reveals, slow index parallax, project-stack flicker, four-pixel project-arrow motion, staggered hero headline motion, and delayed hero tags. Corrected the open-project arrow transform so its close rotation is preserved during hover.
- **Responsive verification:** At 1440×900 and 390×844 there is no horizontal overflow. Project and skill tags render in JetBrains Mono at 12.8px desktop and 12.16px mobile with expanded gaps. The mobile Design Eye story, link control, experience bridge, and CTA remain visible and unclipped.
- **Runtime verification:** Browser console contains no warnings or errors. The production build completed and all six automated tests passed.
- **Next priority:** Publish this exact validated revision.

## Round 132 — Personal developer identity + truthful tooling showcase — 2026-07-25

- **Status:** Completed.
- **Personal identity:** Rewrote the hero around “I build software end to end,” introduced Rashed by name in the opening copy, changed the masthead signature to `RASHED / DEV`, and added a three-part “Now” strip for current work, developer-tool experiments, and remote/freelance availability. Experience, selected work, skills, and the closing CTA now speak in Rashed’s voice instead of reading like a software company.
- **Icon system:** Added the tree-shaken `react-icons` package and a typed icon registry for the working stack. Brand icons now identify primary technologies, while restrained Lucide symbols cover architecture concepts, project types, skill groups, AI tools, and section labels. Icons are decorative where the adjacent text already carries the meaning.
- **Skills hierarchy:** Expanded the toolkit from seven to eight modules and promoted Developer Tooling into a featured capability. It now names supported work across the Figma Plugin API, design systems, SVG pipelines, package architecture, ESM/CommonJS exports, generated TypeScript types, and build validation. Python and microservices remain explicitly emerging.
- **Recent work:** Added `Booster Icon System` as a seventh case study using facts read from its package and dashboard source: 25,396 SVG files, 4,154 unique names, seven style families, direct SVG consumption, ESM/CommonJS/TypeScript outputs, SVGO optimization, package parity checks, runtime tests, and deliberate release gating. Kept the Figma Design Intelligence Plugin beside it with its structural, Smart Animate, prototype-graph, and motion-metadata scope.
- **Layout and interaction:** Added project-type glyphs to every disclosure, technology icons inside expanded project stacks, an asymmetric featured tooling skill card, responsive one-column status and skill layouts, visible focus parity, and reduced-motion fallbacks.
- **SEO and structured data:** Updated keywords, Person knowledge areas, project schema, metadata copy, project count, and `dateModified` to include SVG package engineering and the seventh project.
- **Verification:** TypeScript passed; ESLint completed with zero errors and one existing native-image advisory. The Vinext production build completed and all six server-render, accessibility, content, metadata, responsive UI, and motion-safety tests passed. The largest changed page asset remains 85.9 KB before transfer compression.
- **Next priority:** Publish this exact validated source state.

## Round 133 — Skills overlap repair — 2026-07-25

- **Status:** Completed after direct visual feedback.
- **Root cause:** A legacy `.stack-list span` selector applied a fixed 2.2rem diamond treatment to every new technology wrapper. The new icons were correct, but the inherited geometry forced labels into the same narrow area and created the visible overlap.
- **Fix:** Scoped the legacy rule to direct legacy children only, explicitly removed pseudo-content from technology rows, and rebuilt each capability list as an auto-fitting grid with readable minimum widths, contained labels, and responsive two-column mobile rows.
- **Visual verification:** At 1440×900, all 37 technology rows render with zero pairwise overlap, no pseudo-element diamonds, and zero horizontal overflow. Developer Tooling, AI Workflow, and Growing remain balanced. At 390×844, the same 37 rows retain zero overlap and zero overflow; Frontend and Backend resolve into clean two-column lists.
- **Automated verification:** TypeScript passed, ESLint completed with zero errors and the existing native-image advisory, the production build completed, and all six tests passed. Added a regression assertion that rejects the unscoped legacy selector.
- **Next priority:** Publish the corrected layout immediately.

## Round 134 — LinkedIn / portfolio identity sync — 2026-07-25

- **Status:** Completed.
- **Cross-profile audit:** Compared the live LinkedIn profile, current portfolio, supplied CV, and verified conversation facts. Preserved the current-employer naming conflict for user confirmation instead of guessing between GoldenTik and CartBuzz.
- **Skills:** Added the confirmed LinkedIn-only capabilities Linux, API Development, Database Design, and SaaS to the portfolio. Restored confirmed working tools that were absent from the visible site: HTML5, CSS3, Bootstrap, jQuery, and VS Code. Kept Python and microservices explicitly emerging.
- **Languages:** Added a visible mono language ledger for Arabic (native), English (professional), and Turkish (professional), matching the structured profile data.
- **Brand system:** Replaced the legacy geometric favicon with a personal R/component-node mark and integrated it into the masthead. Created a matching 1584×396 LinkedIn cover using the terminal frame, warm-paper surface, engineering blue, burnt-orange endpoint, component grid, mono metadata, and the portfolio’s `001` registration language.
- **Layout safety:** Kept every expanded technology label inside the repaired auto-fit skill grid; added a compact one-column language ledger for mobile.
- **Verification:** TypeScript, ESLint, the production build, and all server-rendered tests passed after the content and asset update.
- **Next priority:** Publish the synchronized portfolio source, then verify the uploaded LinkedIn cover on desktop and mobile.

## Round 135 — Company rename + SCSS correction — 2026-07-25

- **Status:** Completed from user confirmation.
- **Company identity:** Replaced the outdated current-company display name CartBuzz with GoldenTik across the visible experience, current-status strip, structured experience description, and Person employment schema. Kept “formerly CartBuzz” once in the experience copy and as the organization’s structured alternate name so the rename remains understandable without implying a job change.
- **Skills:** Added SCSS to the visible Frontend capability group, technology icon registry, search metadata, Person knowledge graph, and regression tests.
- **Privacy:** Kept the current product description high-level and did not add confidential implementation details.
- **Next priority:** Publish the corrected identity and confirm Sass/SCSS on LinkedIn.

## Round 136 — Quiet Artifact redesign — 2026-07-27

- **Status:** Complete and visually verified at 1440×1100 and 390×844.
- **Direction:** Replaced the accumulated dark, high-fatigue visual system with “Quiet Artifact”: warm paper, deep ink, one ultramarine system color, and a restrained orange event marker.
- **Clarity:** The first viewport now identifies Rashed as a Software Engineer in Amman available remotely, with an editorial headline, direct work/CV actions, and a compact primary stack.
- **Curiosity:** Added one intentional interactive geometric artifact that translates pattern logic into component logic. Removed decorative competition elsewhere.
- **Projects:** Promoted EV Solution JO, Booster Icon System, and Figma Design Intelligence into expandable editorial case studies; condensed the four foundation projects into a readable archive.
- **Spacing:** Rebuilt the site on a 1320px content system with consistent section rhythm, normal-flow project details, and explicit mobile layouts. Visual QA found no overlap or horizontal overflow.
- **Skills:** Consolidated the working stack into five visible capability groups with icons and readable mono technology labels. Python and microservices remain explicitly emerging.
- **Performance and access:** Added responsive optimized portrait loading, keyboard-operable project and artifact controls, visible structure, and reduced-motion handling.
- **Social sharing:** Created `og-quiet-artifact.png` to match the new visual identity and updated metadata.
- **Next priority:** Publish the saved version and verify the production deployment.

## Round 137 — One engineer, four signals — 2026-07-28

- **Status:** Complete and browser-verified.
- **Welcome experience:** Added an optional first-visit protocol asking “How do you want to meet me?” with four animated previews and a direct recommended-view escape.
- **Four distinct experiences:** Quiet Artifact remains the calm editorial default; System Override rebuilds the surface as a dark technical console; Living Geometry foregrounds the art-to-system origin; Product Playground turns the work into a bold experimental product lab.
- **Not cosmetic themes:** Each experience changes its hero thesis, typography behavior, component geometry, image treatment, project presentation, skill surfaces, and closing interaction while sharing one verified content source.
- **Choice system:** The selected experience is stored on the visitor’s device, can be changed from the persistent `VIEW / 0X` control, and can be shared directly with `?vibe=quiet`, `?vibe=system`, `?vibe=geometry`, or `?vibe=playground`.
- **Accessibility and resilience:** All choices are native buttons, the selector can be reopened without navigation, reduced-motion behavior remains in place, and the native portrait asset works in both local and edge previews.
- **Social identity:** Added a bespoke “ONE ENGINEER. FOUR SIGNALS.” social card that visually connects the four systems.
- **Verification:** All six server-rendered regression tests pass; TypeScript and ESLint report no errors; desktop browser checks confirmed every experience and no horizontal overflow.
- **Next priority:** Publish when the existing Sites project connection is restored.

## Round 138 — Four genuinely different compositions — 2026-07-28

- **Status:** Complete and production-build verified.
- **Shared truth layer:** Preserved one factual content source for projects, experience, skills, origin, AI workflow, and contact details. Switching views never changes claims or hides evidence.
- **Quiet Artifact:** Strengthened the calm editorial voice with a serif display system, sparse registration marks, long-form spacing, and the existing restrained project ledger.
- **System Override:** Rebuilt the desktop composition around a fixed vertical command rail, mono-only typography, terminal telemetry, and a three-column module grid for selected work.
- **Living Geometry:** Reversed the hero narrative/visual order, introduced a floating elliptical navigation object, added large geometric field lines, and turned selected work into an asymmetric twelve-column spatial sequence.
- **Product Playground:** Added a heavy display voice, floating physical shapes, a two-column bento project board, and three independent experience cards with playful offsets and shadows.
- **Welcome protocol:** Retained the first-visit four-signal chooser, compact previews, persistent device preference, shareable query parameters, and the always-available `VIEW / 0X` switch.
- **Accessibility:** All selectors remain native buttons, content remains available in the same semantic order, mobile falls back to readable single-column layouts, and reduced-motion behavior covers the added atmosphere layer.
- **Verification:** TypeScript and ESLint completed with zero errors, the Vinext production build succeeded, and all six rendered-output regression tests passed.
- **Next priority:** Publish this exact multi-composition revision.

## Round 139 — Four independent art directions — 2026-07-28

- **Status:** Complete after current-portfolio research and direct desktop/mobile browser QA.
- **Research translation:** Applied the strongest recurring lesson from 2025–2026 interactive portfolios: motion must carry the narrative, typography must establish the identity immediately, and experimentation cannot obscure the evidence a recruiter needs.
- **Quiet Artifact:** Rebuilt as a restrained printed monograph using Fraunces, long editorial measures, folio marks, a grayscale arched portrait, hairline project ledgers, and slow paper-like reveals.
- **System Override:** Rebuilt as a live engineering console using JetBrains Mono throughout, a full-height command rail, compiled-file hero panel, scanline telemetry, boot/reveal motion, terminal project modules, and green-on-black system states.
- **Living Geometry:** Rebuilt as an architectural spatial composition using Unbounded headings with Bricolage body copy, radial orbit motion, asymmetric hero order, clipped project polygons, diagonal section rhythm, and geometric reveal choreography.
- **Product Playground:** Rebuilt as a tactile product lab using Bricolage Grotesque, boxed bento composition, high-contrast stickers, elastic hover motion, floating artifact/portrait layers, rotated cards, and playful physical shadows.
- **Real font separation:** Added self-hosted Fraunces, Unbounded, and Bricolage Grotesque font packages; System retains JetBrains Mono. The welcome selector now previews the real typography of every destination.
- **Layout repair:** Fixed a direct-child positioning rule that pushed the System hero below an empty viewport. Removed horizontal overflow from Geometry and Playground and repaired Quiet's mobile status strip.
- **Verification:** TypeScript and ESLint completed without errors, the Vinext production build succeeded, all six regression tests passed, all four desktop views reported zero horizontal overflow, and all four mobile views passed at 390×844.
- **Next priority:** Review the four art directions in the welcome selector, then publish the chosen revision once hosting is reconnected.

## Round 140 — Skill-guided interface hardening — 2026-07-28

- **Status:** Complete after code audit, production build, and direct desktop/mobile browser QA.
- **Design guidance:** Installed and applied Vercel Web Interface Guidelines, UI/UX Pro Max, Redesign Existing Projects, High-End Visual Design, and the relevant Taste skill guidance. Kept the work as a targeted evolution instead of rewriting the four finished art directions.
- **Welcome experience:** Rebuilt the view chooser as a mounted modal dialog with an accessible title, current-view state, Escape handling, keyboard focus containment, focus restoration, and background scroll locking.
- **Root-cause repair:** Removed the main-container blur animation that created a fixed-position containing block and stretched the chooser to the full document height. The chooser now fits the viewport on desktop and mobile.
- **Navigation performance:** Replaced the continuous header scroll listener with one IntersectionObserver marker and limited header transitions to explicit visual properties.
- **Interaction quality:** Added consistent visible focus treatment, 44px navigation targets, intentional tap feedback, safe-area padding, tabular numeric details, anchor scroll margins, and transform-led artifact motion.
- **Visual cleanup:** Removed decorative section numbering from section eyebrows and status labels while preserving meaningful project, process, and view numbers. Replaced the old scroll instruction with a content-oriented closing signal.
- **Responsive verification:** Quiet, System, Geometry, and Playground all report zero horizontal overflow. Quiet passed at 390×844; the chooser fits the viewport at desktop and mobile; all four desktop art directions remain visually distinct.
- **Verification:** TypeScript and ESLint completed with zero errors, the Vinext production build succeeded, all six rendered-output regression tests passed, and the chooser was verified at desktop and mobile sizes with explicit focus management.
- **Next priority:** Restore the Sites project connection, publish this exact revision, then verify the production URL and social card.

## Round 141 — Full skill audit and production cleanup — 2026-07-28

- **Status:** Complete after source audit, production build, rendered-output tests, and live browser checks across all four views.
- **Skills applied:** Re-audited the portfolio with Design Taste Frontend, Vercel Web Interface Guidelines, UI/UX Pro Max, and Redesign Existing Projects. Reviewed the available curated skill catalog as well; no additional installation closes a real gap that is not already covered by the current fifteen local skills plus the built-in Browser, Sites, Figma, image, document, PDF, and spreadsheet capabilities.
- **Code cleanup:** Removed eleven unused legacy components and hooks left behind by the previous portfolio architecture. This also removed a dead global scroll listener and eliminated the last lint warning from an unused image component.
- **Interface hierarchy:** Removed the redundant decorative hero footer and the generic Quiet-view “FIELD NOTE” label, tightened the hero’s vertical release, shortened the opening copy, and changed the persistent contact action to the clearer “Send brief.”
- **Technical identity:** Kept code and stack labels protected from automatic translation, retained the real mono technology layer, and simplified the portrait caption to factual identity and location.
- **Vibe-aware browser chrome:** Each view now updates `theme-color` and `color-scheme` correctly: warm light for Quiet, true dark for System, parchment light for Geometry, and playful cream for Playground.
- **Modal accessibility:** Added a dialog description, contained scroll chaining, preserved background scroll locking, kept focus inside the chooser, and repaired deterministic focus return to the persistent view switch after closing or selecting a view.
- **Content polish:** Replaced long dash punctuation in visible copy, dates, and metadata with clearer punctuation; updated structured-data modification time to this revision.
- **Verification:** TypeScript and ESLint completed with zero warnings or errors. The Vinext production build succeeded and all six rendered-output tests passed. Browser checks confirmed zero horizontal overflow in Quiet, System, Geometry, and Playground; each view reported the correct theme color and color scheme; the chooser focused its close action on open and returned focus to `VIEW / 04` on close.
- **Next priority:** Reconnect the existing Sites project ID, publish this exact source state, then verify the production URL, social card, and mobile safe areas.

## Round 142 — AGENTS.md architecture refactor — 2026-07-28

- **Status:** Complete after type checking, expanded lint coverage, production build, rendered-output tests, and live four-view browser QA.
- **Thin route:** Reduced `app/page.tsx` from a large stateful implementation to a 131-byte server composition route that renders the portfolio feature through its public entry point.
- **Feature ownership:** Created `features/portfolio/` with explicit `components`, `data`, `hooks`, types, a server-safe schema entry, a public UI entry, and a short architecture README.
- **Separated responsibilities:** Visible portfolio facts now live in one typed content module. Browser state for URL selection, local preference, theme color, header state, and chooser focus lives in one dedicated hook. Each visible section now has one focused component.
- **Shared configuration:** Moved profile links from the route directory into `shared/config/profile-links.ts` because both the root metadata layer and portfolio UI consume them.
- **Domain placement:** Moved technology icons and structured portfolio schema builders out of the route folder and into the portfolio feature that owns their meaning.
- **Import boundaries:** Replaced cross-domain parent-directory chains with the existing `@/` project alias. Internal feature imports remain short relative imports.
- **Quality-gate repair:** Expanded `check` and `lint` scripts so ESLint covers `features/` and `shared/`; the previous scripts only covered `app`, `tests`, and config.
- **Behavior preserved:** All four vibes retain their copy, projects, skills, visual identity, URL state, persistent choice, theme colors, modal focus management, and zero horizontal overflow.
- **Verification:** TypeScript and ESLint passed with zero errors or warnings. The Vinext production build succeeded. All six rendered-output tests passed. Live browser checks confirmed three featured project cards, five capability groups, correct theme colors, zero horizontal overflow in every vibe, chooser focus on open, and focus restoration to the view switch on close.
- **Next priority:** Split the accumulated global stylesheet only as a dedicated low-risk CSS architecture round; do not mix that mechanical move with visual redesign.

## Round 143 — Netlify deployment compatibility — 2026-07-29

- **Status:** Complete after production-equivalent Netlify export verification.
- **Root cause:** Netlify's Next.js plugin expected `.next`, while Vinext produces `dist/client` and `dist/server`.
- **Implementation:** Added a static exporter and repository-owned Netlify configuration that publishes `netlify-dist`, including the home page, custom 404, assets, icon, manifest, robots, and sitemap.
- **SEO portability:** Canonical URLs, Open Graph metadata, structured data, robots, and sitemap now use Netlify's build-provided production URL automatically.
- **Verification:** TypeScript and ESLint passed. `pnpm run build:netlify` completed successfully and produced every required deployment artifact.
- **Dashboard requirement:** Disable the UI-installed `@netlify/plugin-nextjs`, then clear the build cache and redeploy.

## Round 144 — Vite migration — 2026-07-29

- **Status:** Complete after production build, content regression tests, and desktop/mobile browser verification.
- **Runtime migration:** Replaced Next.js and Vinext with a standard Vite 8 + React 19 entry while preserving the existing portfolio components, copy, CSS, assets, state, interactions, and four visual modes.
- **Static delivery:** Vite now builds directly to `dist/`. A small post-build step creates the custom 404, robots, and sitemap; the web manifest and existing public assets ship unchanged.
- **Metadata:** Moved title, description, canonical, Open Graph, Twitter card, and crawler metadata to the Vite HTML entry. Structured data remains generated from the same portfolio schema and resolves against the live origin.
- **Netlify:** Simplified the repository configuration to `pnpm run build` with `dist` as the publish directory. The Next.js runtime plugin is no longer required.
- **Quality tooling:** Replaced Next-specific TypeScript and ESLint configuration with Vite/browser and Node-script boundaries. Removed Next, Vinext, Cloudflare runtime, RSC, and Wrangler dependencies from the application build.
- **Verification:** TypeScript and ESLint passed. The Vite production build passed and all four regression tests passed. Quiet, System, Geometry, and Playground rendered with their expected theme state and zero horizontal overflow on desktop and at 390×844. The mobile vibe chooser fits the viewport.

## Round 145 — Four independent vibe systems — 2026-07-29

- **Priority:** Creative architecture, motion, and interaction.
- **Theme engine:** Replaced the legacy view model with the explicit `cyberpunk`, `minimal`, `glass`, and `retro` domain and added backwards-compatible URL migration.
- **Global state:** Added a typed React context that owns vibe selection, the entry hub, URL and local-storage persistence, root `data-vibe`, color scheme, and browser theme color.
- **Independent systems:** Added dedicated layout wrappers and hero modules for every vibe rather than branching one generic hero. Each system has its own typography, palette, spatial language, navigation treatment, and interaction character.
- **Interactive art:** Added four dependency-light canvas experiences: reactive terminal portrait and matrix field, inertial geometric mesh, pointer-responsive liquid sphere, and frame-stepped pixel engineer.
- **Entry and switching:** Added an accessible welcome hub plus a persistent global vibe switcher. Vibe changes use `AnimatePresence` and retain the selected system between visits.
- **Responsive and accessibility:** Canvas rendering respects device pixel ratio and reduced motion, interactions support pointer input, dialogs manage focus and keyboard dismissal, and mobile-specific compositions preserve readable spacing.
- **Verification:** TypeScript, ESLint, the Vite production build, and all four rendered-output tests passed. Local browser inspection confirmed the Cyberpunk canvas, theme state, sizing, and zero horizontal overflow; the remaining browser session became unavailable before the full eight-viewport matrix could be completed.
- **Deployment:** Published commit `5604dd7` from `main` through the existing Netlify Git workflow. Netlify reported a ready Vite production deploy, and the live HTML and JavaScript returned HTTP 200 with all four vibe systems present.
- **Next priority:** Complete a focused visual polish pass after stakeholder review of the four live directions.

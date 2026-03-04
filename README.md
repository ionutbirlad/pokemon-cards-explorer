# 🎴 Pokémon Cards Explorer — Frontend Assessment

This repository contains my implementation of the **Pokémon Cards Explorer** assessment.  
The goal of the project was to build a small client application capable of:

- listing Pokémon cards
- displaying detailed information for a specific Pokémon
- simulating a combat through an asynchronous job system
- updating the UI according to job progress and results

The project focuses on **clean architecture, maintainability, and predictable data flow**, while keeping the implementation lightweight and aligned with the scope of the assessment.

---

# 🛠 Tech Stack

- React
- TypeScript
- React Router v6
- TanStack Query v5
- SCSS Modules
- Vite
- MSW (Mock Service Worker)
- DOMPurify
- Storybook
- GitHub Actions (CI)

---

# 🏗 Architectural Principles

The implementation follows a few guiding principles:

### 1. Separation of Concerns

Responsibilities are clearly separated between layers:

| Layer        | Responsibility                                    |
| ------------ | ------------------------------------------------- |
| API          | network requests and response parsing             |
| Mappers      | convert remote responses to domain models         |
| Domain types | stable application models, decoupled from the API |
| Hooks        | data fetching, mutations, and server state        |
| ViewModels   | UI derivation logic                               |
| Components   | presentation only                                 |

This avoids coupling UI components to raw API responses and keeps each layer independently testable.

---

### 2. Data Layer

The data layer is split into two levels.

**Generic `api.ts` wrapper** — handles all transport concerns:

- distinguishes network errors (fetch throws) from HTTP errors (non-2xx responses)
- safely parses response payloads without assuming shape
- returns typed error structures compatible with TanStack Query
- AbortError is detected and re-thrown separately so callers can ignore it silently

**Entity-specific APIs** (`pokemonApi.ts`, `jobsApi.ts`) — handle domain requests:

- call the generic wrapper and apply the relevant mapper before returning
- throw typed `ApiClientError` instances — TanStack Query catches these automatically
- no transport or HTTP concerns leak into hooks or UI components

---

### 3. Domain Mapping

API responses are **never used directly in the UI**.

All remote responses are mapped into domain models before reaching hooks or components. This means:

- backend naming conventions (`snake_case`) are isolated at the API boundary
- UI code works exclusively with stable, camelCase domain types
- if the API changes, only the mapper needs to be updated

Example:

```typescript
// Remote response
export type RemoteJob = {
  status: RemoteJobStatus;
  progress: number;
  health_points: number | null;
};

// Domain model
export type Job = {
  jobId: string;
  status: JobStatus;
  progress: number;
  healthPoints: number | null;
};

// Mapper
export function mapJob(remote: RemoteJob, jobId: string): Job {
  return {
    jobId,
    status: remote.status,
    progress: remote.progress,
    healthPoints: remote.health_points,
  };
}
```

> Note: `jobId` is passed explicitly to the mapper because the job polling endpoint (`GET /api/jobs/:job_id`) does not include the id in the response body — it is only available from the request context.

---

### 4. Error Handling

Five error layers are handled consistently across the application:

| Layer                | Scenario                             | Handling                                                                                                                                                              |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 — Global           | Network failure, HTTP 5xx            | Caught by TanStack QueryCache — currently logged via `console.error`, placeholder for a future toast/notification system                                              |
| 2 — HTTP errors      | All HTTP error responses             | Intercepted by the generic API client and normalized via `errors.ts`, which adds a user-facing message based on the status code when the backend does not provide one |
| 3 — 200 with failure | Job `failed` status in response body | Handled locally in the component — the error message is displayed directly via the card overlay                                                                       |
| 4 — Abort            | Request cancelled on navigation      | Silently ignored — `AbortError` is detected and swallowed without affecting the UI                                                                                    |
| 5 — Error Boundary   | Unexpected runtime crashes           | Caught by `AppErrorBoundary` at the component tree root and by `RouterErrorBoundary` on the router level — both render a fallback UI via `ErrorFallback`              |

Local errors (4xx) are handled inline in the component using a `TextBlock` with `variant="empty"`. The 404 case on the detail page redirects to the `NotFoundPage` via React Router.

---

### 5. ViewModel Layer

To keep components clean and focused on rendering, a **ViewModel layer** was introduced for the detail page combat feature.

```
hooks/viewModels/usePokemonCardCombat.viewmodel.tsx
```

The ViewModel receives raw data from hooks and computes everything the UI needs:

- effective HP (base or post-combat)
- combat state (`idle | queued | running | done | failed`)
- card status (`default | warning | expired`)
- button label
- progress value
- error overlay state
- card widget items

The page component acts purely as an orchestrator — it handles data fetching, mutations, navigation, and side effects, then delegates all UI derivation to the ViewModel.

---

### 6. React Query for Server State

TanStack Query is used for:

- Pokémon list and detail fetching
- combat job mutations
- job status polling (with automatic stop on terminal state)
- cache invalidation on combat completion

This eliminates manual loading/error state management and keeps server state predictable and centralized.

---

### 7. HTML Sanitization

The Pokémon detail page renders a `longDescription` field that arrives from the backend as an HTML string containing `<p>`, `<ul>`, and `<li>` tags.

DOMPurify is used to sanitize the string before rendering it via `dangerouslySetInnerHTML`. This prevents XSS while preserving the intended markup.

The container component applies scoped SCSS styles to the rendered HTML tags, keeping styling concerns out of the raw content.

---

### 8. Component-Driven Development

UI components were built following a **component-driven development** approach using Storybook.

Each component was developed and validated in isolation before being integrated into pages. This means:

- components are tested visually in all their variants and states before touching any page
- props, edge cases, and visual regressions are caught early
- the component API is designed to be reusable and decoupled from the page context

All `components/ui` entries (`Button`, `Badge`, `ProgressBar`, `Spinner`, `TextBlock`) and the `PokemonCard` domain component have corresponding Storybook stories covering their variants and states.

> The full design system and component implementation can be reviewed in [PR #4 — Design System & Components](https://github.com/ionutbirlad/pokemon-cards-explorer/pull/4).

---

### 9. Loading State

Loading state is managed via `isLoading` from TanStack Query hooks, rendered through a `LoadingOverlay` component with `position: fixed`.

**Why not React Router loaders:** in a Vite SPA without SSR, using `await` in a Router loader blocks navigation but React is not yet mounted on hard refresh — resulting in a blank page with no feedback. This approach was evaluated and discarded for this reason.

**Why `isLoading` + `LoadingOverlay`:** simple, explicit, and correct. The `position: fixed` overlay covers the full viewport regardless of where it appears in the DOM. TanStack Query's `isLoading` is `true` only on the first fetch when no cached data exists — background refetches do not trigger it.

**`isLoading` vs `isFetching`:**

| Property     | When `true`                                           |
| ------------ | ----------------------------------------------------- |
| `isLoading`  | First fetch only, no cached data available            |
| `isFetching` | Any fetch in progress, including background refetches |

`isLoading` is used for the overlay — background updates do not block the user.

**`staleTime`:** with `staleTime: 30_000`, data stays fresh for 30 seconds. Navigating back and forth within this window serves data from cache — `isLoading` is immediately `false` and no overlay appears.

**Structural limitation:** on a pure SPA, a brief blank moment before React mounts is unavoidable on hard refresh. This is a structural constraint of client-side rendering, not a fixable bug. The enterprise alternative would be skeleton loading or SSR — neither applicable here given the project scope and Vite setup.

> **Simulating loading in development:** uncomment `await delay(3000)` in any MSW handler to simulate a slow response and verify overlay behaviour.

---

# 📁 Project Structure

```
src
 ├─ api
 │   ├─ api.ts               # generic fetch wrapper
 │   ├─ pokemonApi.ts        # pokemon-specific requests
 │   ├─ jobsApi.ts           # job-specific requests
 │   └─ mappers
 │       ├─ pokemon.mapper.ts
 │       ├─ job.mapper.ts
 │       └─ typology.mapper.tsx
 │
 ├─ components
 │   ├─ ui                   # generic, domain-agnostic components
 │   │   ├─ Button
 │   │   ├─ Badge
 │   │   ├─ ProgressBar
 │   │   ├─ Spinner
 │   │   └─ TextBlock
 │   ├─ PokemonCard          # domain component
 │   ├─ AppErrorBoundary     # root-level error boundary (class component)
 │   ├─ RouterErrorBoundary  # React Router errorElement wrapper
 │   ├─ ErrorFallback        # shared error UI
 │   ├─ LoadingOverlay
 │   ├─ AppHeader
 │   └─ AppFooter
 │
 ├─ hooks
 │   ├─ pokemon
 │   │   ├─ usePokemonList.ts
 │   │   ├─ usePokemon.ts
 │   │   └─ keys.ts
 │   ├─ jobs
 │   │   ├─ useJob.ts
 │   │   ├─ useStartJob.ts
 │   │   └─ keys.ts
 │   └─ viewModels
 │       └─ usePokemonCardCombat.viewmodel.tsx
 │
 ├─ pages
 │   ├─ DeckPage
 │   ├─ DetailPage
 │   └─ NotFoundPage
 │
 ├─ types
 │   ├─ domain
 │   │   ├─ pokemon.ts
 │   │   ├─ job.ts
 │   │   └─ ui.ts
 │   ├─ remote
 │   │   ├─ pokemon.ts
 │   │   └─ job.ts
 │   └─ shared
 │       └─ api.ts
 │
 ├─ utils
 │   └─ getCardStatus.ts
 │
 └─ styles
     ├─ tokens
     │   ├─ _colors.scss
     │   ├─ _typography.scss
     │   ├─ _sizes.scss
     │   └─ _radius.scss
     └─ foundations
         ├─ _reset.scss
         └─ _base.scss
```

---

# 📄 Pages

## 🃏 Deck Page

Displays the full list of Pokémon cards.

- fetches list data via `usePokemonList`
- renders cards in a responsive grid
- handles empty state and local errors inline
- navigates to detail page on card click

---

## 🔍 Detail Page

Displays detailed information about a Pokémon and hosts the combat feature.

The component acts as an **orchestrator**:

- fetches Pokémon detail via `usePokemon`
- triggers combat via `useStartJob`
- polls job status via `useJob`
- invalidates Pokémon cache on combat completion
- delegates all UI derivation to `usePokemonCardCombat` ViewModel

---

## 🚫 Not Found Page

Displayed when navigating to an unknown route or when a Pokémon detail returns 404.

Vertically centered layout with a navigation link back to the deck.

---

# ⚔️ Combat System

The application simulates combat through an **asynchronous job system**.

### Flow

1. User clicks **Simulate Combat**
2. A `POST /api/items/:id/jobs` request creates a job
3. The UI polls `GET /api/jobs/:job_id` every second
4. Progress updates in real time via a `ProgressBar`
5. On completion:
   - Pokémon detail cache is invalidated
   - HP updates to the post-combat value
   - Card status recalculates (`default | warning | expired`)
   - Button label reflects the outcome

### Combat States

```
idle     → no combat started
queued   → job created, not yet running
running  → combat in progress
done     → combat completed
failed   → job error
```

---

# ⚙️ CI Pipeline

A GitHub Actions workflow runs on every pull request and push to `main` and `release/v1-beta`.

Steps executed on each run:

| Step                 | Command             |
| -------------------- | ------------------- |
| Install dependencies | `npm ci`            |
| Format check         | `npm run format`    |
| Lint                 | `npm run lint`      |
| Type check           | `npm run typecheck` |
| Build                | `npm run build`     |

Concurrent runs on the same branch are automatically cancelled to avoid redundant checks. Draft pull requests are excluded from the pipeline.

---

# 🎨 Styling

The project uses **SCSS Modules** with a structured design system.

Conventions followed:

- **BEM** methodology for class naming
- **Mobile-first** approach with breakpoints at `640px`, `768px`, `1024px`, `1280px`
- Media queries colocated inside their respective SCSS block
- Semantic nesting only — nesting reflects real BEM parent/child relationships
- Top-level blocks (`.page`, `.hero`, `.panel`) kept flat

### Design Tokens

Both primitive and semantic tokens are defined as **standard CSS custom properties** on `:root`. This makes them globally available across the entire application without any additional configuration or import — any component can consume them directly via `var(--token-name)`.

Tokens are organized into:

- `_colors.scss` — primitive color scale (`--p-color-neutral-*`, `--p-color-red-*`) and semantic tokens (`--color-surface-1`, `--color-on-surface-1`, etc.)
- `_typography.scss` — font family variables and SCSS mixins (`heading-1/2/3`, `paragraph-1/2/3`, `label-1/2`)
- `_sizes.scss` — spacing scale
- `_radius.scss` — border radius tokens

### Component Structure

Components are split into two categories:

- **`components/ui`** — generic, domain-agnostic components (`Button`, `Badge`, `ProgressBar`, `Spinner`, `TextBlock`). These have no knowledge of Pokémon or any application domain and can be reused in any context.
- **Domain components** (`PokemonCard`, `AppErrorBoundary`, `RouterErrorBoundary`, `ErrorFallback`, `LoadingOverlay`, `AppHeader`, `AppFooter`) — components that carry application context and are not intended for generic reuse.

---

# 📋 Design Decisions Summary

| Decision                        | Rationale                                                         |
| ------------------------------- | ----------------------------------------------------------------- |
| Domain mapping                  | isolates API from UI, single point of change                      |
| ViewModel layer                 | keeps components focused on rendering                             |
| TanStack Query                  | predictable server state, no manual loading management            |
| Global vs local errors          | consistent UX, appropriate granularity                            |
| DOMPurify for HTML content      | XSS prevention without losing backend flexibility                 |
| React Error Boundary            | catches unexpected runtime errors at app and router level         |
| Mobile-first SCSS               | progressive enhancement, standard breakpoints                     |
| Component-driven with Storybook | components validated in isolation before page integration         |
| isLoading + LoadingOverlay      | simple and correct for SPA, avoids Router loader blank page issue |
| GitHub Actions CI               | automated format, lint, typecheck and build on every PR           |

---

# 📝 Implementation Notes

A few practical notes on decisions made during the assessment:

**1. Designer communication**
In a normal work context, several implementation details would have been clarified directly with the designer — spacing, edge cases in the UI, component behaviour in intermediate states. Given the assessment context, going back and forth would have taken too long, so many of these details were inferred from the Figma and from general design conventions.

**2. Mobile layout**
No mobile designs were provided in the Figma. Rather than blocking progress or asking for additional specs, the mobile layout was handled autonomously based on common best practices and personal experience.

**3. Combat flow details**
Some aspects of the combat flow and other minor interaction details were not fully specified. These were filled in with reasonable assumptions to keep the implementation coherent and complete without over-engineering.

**4. SVG icons**
The icons provided needed to be modified to use `fill: currentColor`. Without this change it was not possible to control their color via CSS/SCSS, as the fill was hardcoded in the SVG markup. This is standard practice for icon systems that need to respond to theming or state changes.

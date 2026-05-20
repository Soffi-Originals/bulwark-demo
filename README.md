# Bulwark

> Command the response. Close the incident.

Bulwark is an **incident command console** built as a standalone workspace app
for early Soffi users. It is intentionally serious and B2B in tone — the kind
of surface an SRE, security responder, or platform engineer would actually
trust in the middle of a SEV-1.

This repo is the vibe-coded reference app for the Soffi workspace. It is
designed so Soffi can edit visuals (colors, type, spacing, layout order)
without touching component logic.

---

## Stack

- **TypeScript** end-to-end
- **Vite + React 18** for the app shell
- **TailwindCSS 3.4** with **class-driven theming** (toggle `class="dark"` on
  `<body>`)
- **Semantic design tokens** as CSS custom properties — everything (color,
  border, type, radius, shadow) is a `--token` in `src/index.css`
- **class-variance-authority (CVA)** for component variants
- **Storybook 8** with a light/dark theme toolbar
- **Flexbox-driven** layout (every region is its own flex container) so panels
  can be rearranged inside Soffi

---

## Getting started

```bash
npm install
npm run dev          # app at http://localhost:5173
npm run storybook    # component explorer at http://localhost:6006
```

To build:

```bash
npm run build
npm run build-storybook
```

---

## Project layout

```
src/
├── index.css                       # all semantic tokens (light + dark)
├── main.tsx
├── App.tsx                         # top-level flex layout
├── lib/cn.ts                       # clsx + tailwind-merge helper
├── components/                     # core CVA components
│   ├── Button.tsx + Button.stories.tsx
│   ├── Card.tsx   + Card.stories.tsx
│   ├── Badge.tsx  + Badge.stories.tsx
│   ├── Input.tsx  + Input.stories.tsx
│   └── Avatar.tsx + Avatar.stories.tsx
└── features/
    ├── TopBar.tsx
    └── incident/
        ├── IncidentSidebar.tsx     # list of active incidents
        ├── IncidentHeader.tsx      # title, severity, status, responders
        ├── IncidentTimeline.tsx    # authoritative event log
        ├── ResponderPanel.tsx      # who is on the response
        ├── CommsPanel.tsx          # outbound customer + internal updates
        ├── severity.tsx            # <SeverityBadge>, <StatusBadge>
        ├── types.ts                # domain types
        └── mockData.ts             # sample incidents
```

---

## Semantic tokens

All tokens live in `src/index.css` as CSS custom properties, organized by
purpose (not by raw color). Edit one variable and the whole UI re-themes.

| Group        | Tokens                                                      |
| ------------ | ----------------------------------------------------------- |
| Surface      | `canvas`, `surface`, `surface-raised`, `surface-sunken`     |
| Foreground   | `fg`, `fg-muted`, `fg-subtle`, `fg-inverted`                |
| Border       | `border`, `border-subtle`, `border-strong`                  |
| Brand        | `brand`, `brand-hover`, `brand-fg`                          |
| Accent       | `accent`, `accent-fg`, `accent-subtle`                      |
| Status       | `critical`, `warning`, `success`, `info` (+ `-fg`, `-subtle`) |
| Radius       | `radius-sm` … `radius-2xl`                                  |
| Typography   | `font-sans`, `font-mono`, `text-xs` … `text-3xl`, `leading-*` |
| Shadows      | `shadow-xs` … `shadow-lg`                                   |

Colors are stored as HSL channels (e.g. `222 47% 26%`, no `hsl()` wrapper)
so Tailwind's `<alpha-value>` syntax works for opacity utilities like
`bg-brand/20`.

### Theme switching

Theming is **class-driven**:

```html
<body class="dark">…</body>   <!-- dark theme -->
<body>…</body>                <!-- light theme -->
```

The `TopBar` includes a sun/moon toggle that adds/removes `.dark` on `<body>`.
Soffi can drive this the same way — no JS required, just toggle the class.

---

## Core components

Every core component uses **class-variance-authority** to expose variants and
states. The CVA recipe is exported alongside the component (e.g.
`buttonVariants`) so Soffi can compose new variants from outside.

### `Button`

```tsx
<Button variant="primary" size="md" loading={false}>Acknowledge</Button>
```

- **variant**: `primary` · `secondary` · `outline` · `ghost` · `subtle` · `destructive`
- **size**: `sm` · `md` · `lg` · `icon` · `icon-sm`
- **states**: default · hover · active · focus-visible · disabled · loading
- **slots**: `leftIcon`, `rightIcon`

### `Badge`

```tsx
<Badge variant="sev1" pulse leftIcon={<AlertOctagon className="size-3" />}>SEV-1</Badge>
```

- **variant**: `sev1` · `sev2` · `sev3` · `sev4` · `critical` · `warning` · `success` · `info` · `brand` · `neutral` · `outline`
- **size**: `sm` · `md` · `lg`
- **pulse** on `sev1` for active critical incidents

### `Card`

```tsx
<Card variant="raised" padding="md" interactive>…</Card>
```

- **variant**: `default` · `raised` · `sunken` · `critical` · `ghost`
- **padding**: `none` · `sm` · `md` · `lg`
- **interactive** for hover/active affordances

Subparts: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### `Input`

```tsx
<Input size="md" state="error" leftIcon={<Search className="size-3.5" />} />
```

- **state**: `default` · `error` · `success`
- **size**: `sm` · `md` · `lg`

### `Avatar`

```tsx
<Avatar name="Mira Okafor" size="md" status="oncall" />
```

- **size**: `xs` · `sm` · `md` · `lg` · `xl`
- **status**: `online` · `away` · `offline` · `oncall` · `none`

---

## Layout: flex everywhere

Every region of the screen is its own flex container with a clear direction
and gap. Soffi can reorder children without rewriting layout primitives.

```
App  (flex-col)
├── TopBar                     (flex-row)
└── body  (flex-row, flex-1)
    ├── IncidentSidebar        (flex-col, w-[320px])
    └── main  (flex-col, flex-1)
        ├── IncidentHeader     (flex-col)
        └── body  (flex-row, flex-1, gap-4, p-4)
            ├── left   (flex-col, flex-1)
            │   └── IncidentTimeline
            └── right  (flex-col, w-[340px], gap-4)
                ├── ResponderPanel
                └── CommsPanel
```

---

## Domain model

Defined in [`src/features/incident/types.ts`](src/features/incident/types.ts):

- **`Incident`** — ref, title, summary, severity, status, service, commander,
  affected customer count, responders, timeline, comms
- **`Severity`** — `sev1` | `sev2` | `sev3` | `sev4`
- **`IncidentStatus`** — `investigating` | `identified` | `monitoring` | `resolved`
- **`TimelineEvent`** — typed by `kind` (`detected`, `escalation`, `updated`,
  `comms`, `mitigation`, `resolved`)
- **`CommsMessage`** — typed by `channel` (`slack`, `email`, `status-page`,
  `pager`)
- **`Responder`** — name, role, team, presence

Sample data lives in [`src/features/incident/mockData.ts`](src/features/incident/mockData.ts).

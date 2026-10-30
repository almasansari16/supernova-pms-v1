# SuperNova · Product Serialization Management System

Frontend demonstration build for pharmaceutical unit-pack serialization, master carton
aggregation and GS1 labelling, with product master data arriving from SAP S/4HANA.

Designed & Developed by **ERManager Consulting Services**.

---

## Run it

```bash
npm install
npm run dev
```

Opens on <http://localhost:5173>. Sign in with any credentials — the **Sign in as** dropdown
on the login screen picks the role, and you can switch roles later from the profile menu in
the top right.

```bash
npm run build      # production bundle into dist/
npm run preview    # serve the built bundle
```

Requires Node 18 or newer.

---

## What's in the demo

Twelve screens, reachable from the sidebar. The menu filters itself by role.

| Screen | What it shows |
| --- | --- |
| Dashboard | Role-specific KPIs, 7-day production, serialization progress, hourly packaging trend, top products, live activity stream |
| SAP Sync | The ten read-only master-data fields, interface status, round-trip timing, manual re-pull |
| Production Orders | Released orders with progress against order quantity; opens a packaging run |
| Serialization | The serial register with search, product/status filters, pagination, exports, bulk generate, and a live explainer of how the number is composed |
| Packaging | The six-step run: select product → fetch SAP data → generate serials → build carton → print labels → complete |
| Master Cartons | Expandable parent → child aggregation tree |
| Barcode Scanner | Decodes a unit pack or a carton; cartons open into an expandable table of contents |
| Label Printing | Unit pack and master carton artwork, GS1 element strings, 1D and 2D previews, printer selection |
| Reports | Seven standing reports with range/scope filters and an on-screen preview |
| Audit Logs | Append-only activity trail, filterable by event |
| Settings | Company, SAP configuration and field mapping, label configuration, printers, barcode format, serial rules, theme |
| Users | Accounts, permission matrix, and what each role lands on |

### Serial number scheme

```
Unit pack      <ProductID><9-digit sequence>        1004 000000001  ->  1004000000001
Master carton  <ProductID><marker 5><8-digit seq>   1004 5 00000001 ->  1004500000001
```

Every product keeps its own independent counter, so product 1005 starts again at
`1005000000001` and two products can never produce the same number. The interface colours
the three parts differently — prefix in indigo, padding in grey, the live sequence in ink,
and the carton marker in ring teal — so the rule is visible rather than explained.

The counters continue from wherever the seeded data stopped; nothing is ever reissued.

### Production line

Captured in the run context and stored against every serial, shown in the register and the
audit trail, and **absent from both label artworks and from the scan response**. It is also
explicitly locked off in Settings → Label configuration.

---

## Project layout

Feature-based architecture with a shared domain ("entities") layer:

```
src/
├── main.jsx            entry: mounts <App/> and the global stylesheet
├── app/                app wiring — providers, router, authenticated layout
├── features/<name>/    one folder per screen: pages/ components/ hooks/ data/ lib/ + index.js
├── entities/<name>/    domain models shared by many features (product, serial, register, session…)
├── shared/             business-agnostic building blocks: ui, hooks, lib, config, api, barcode, brand
└── styles/             design tokens and component CSS (scoped under .sn)
```

Dependency rule — a layer only imports from layers below it:

```
app  ->  features  ->  entities  ->  shared
```

- Features never import other features; shared behaviour moves to `entities/` and
  cross-screen hand-off goes through the URL (`/scanner?code=…`, `/label-printing?serial=…`).
- Import a feature or entity only through its `index.js`.
- Screens, menu, role access and lazy loading are all declared in `src/app/router/routes.config.js`.
- `import.meta.env` is read only in `src/shared/config/env.js`. Copy `.env.example` to
  `.env.local` to override values; `VITE_` variables are public, never put secrets there.
- `@/` is an alias for `src/`.

Dependencies: `react`, `react-router-dom`, `recharts` and `lucide-react`.

---

## Brand

| Token | Value | Used for |
| --- | --- | --- |
| Wordmark navy | `#1E0D63` | SuperNova letters on light, label and barcode ink |
| Ring gradient | `#044F93 → #1585AE → #33B8CC → #45E3DC` | the planet ring, sampled from the supplied artwork |
| Nova indigo | `#3A22A8` / `#5236D6` | primary actions, links, first chart series |
| Ring teal | `#12A5B8` | brand accent: active nav, carton marker digit, accent series |
| Sidebar | `#140A38 → #22105C` | navigation gradient |
| Amber | `#F5A623` | reserved for warning states only |
| ERManager red / navy | `#E2191A` / `#1C295E` | footer credit |

Type: **Sora** for display, **Inter** for UI, **JetBrains Mono** with tabular figures for
every serial number. Loaded from Google Fonts inside the component; the stack falls back to
system faces offline.

The SuperNova wordmark was vector-traced from the supplied 2048px artwork into 11 letter
contours and 3 planet/ring contours, so it stays sharp at 19px on a label and at any print
size. On the dark sidebar it reverses to white while the planet keeps its gradient.
ERManager is set as live type rather than traced, because the supplied file was 195px and
soft — swap `ERMLogo` for an `<img>` if you get vector artwork.

---

## Known limits of the demonstration build

**Barcodes are visual previews.** `Barcode1D` and `DataMatrix` render authentic-looking
symbols from a deterministic hash of the data, and they are labelled as previews in the
interface. They will not decode on a scanner. For production, install `bwip-js` and replace
the two component bodies — the props and footprint stay the same:

```js
import bwipjs from "bwip-js";

// GS1 DataMatrix, unit pack
bwipjs.toCanvas(canvasEl, {
  bcid: "gs1datamatrix",
  text: `(01)${gtin}(21)${serial}(10)${batch}(17)${yymmdd}`,
  scale: 3,
  parsefnc: true,
});
```

**No backend.** State lives in React for the session and resets on reload. SAP calls,
printer spooling, exports and scanner input are simulated with realistic timing. The seams
where a real integration lands are the `generate` and `aggregate` functions in `App`, the
`SapSync` pull, and the report export handlers.

**No persistence.** Browser storage is intentionally not used, so the demo behaves
identically on every run in front of a client.

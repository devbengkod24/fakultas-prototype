---
name: Enterprise Academic & Workflow Workspace
colors:
  background: "#FFFFFF"
  surface: "#F8FAFC"
  surface_elevated: "#FFFFFF"
  muted: "#F1F5F9"
  primary: "#1E40AF"
  primary_hover: "#1E3A8A"
  accent: "#2563EB"
  secondary: "#E2E8F0"
  text_primary: "#0F172A"
  text_secondary: "#475569"
  text_muted: "#64748B"
  border: "#E2E8F0"
  success: "#10B981"
  success_soft: "#ECFDF5"
  warning: "#F59E0B"
  warning_soft: "#FFFBEB"
  error: "#EF4444"
  error_soft: "#FEF2F2"
  info: "#3B82F6"
  info_soft: "#EFF6FF"
---

# Design System: Enterprise Academic & Workflow Workspace

## 1. Visual Theme & Atmosphere

The visual identity embodies a crisp, authoritative, and highly structured enterprise workspace tailored for multi-role administrative, academic, and operational workflows. Built upon a cool-toned neutral foundation of pure alabaster and whisper-quiet slate grays, the interface prioritizes cognitive clarity and effortless scannability across information-dense views. Generous internal card padding and clean hairline borders prevent visual fatigue, allowing complex data tables, multi-stage submission trackers, and analytical charts to breathe within a disciplined modular grid.

The atmosphere balances institutional trust with modern SaaS agility. Rather than relying on heavy drop shadows or decorative gradients, depth and hierarchy are achieved through subtle surface contrast, crisp 1px structural borders, and purposeful bursts of semantic color. Interactive elements respond with immediate, understated precision, while translucent status badges—in emerald, amber, rose, and cobalt—act as visual wayfinding beacons that guide coordinators, reviewers, and applicants through intricate approval pipelines.

---

## 2. Color Palette & Roles

### Primary Foundation
- **Crisp Alabaster Canvas** (`#FFFFFF`) — Primary root background and elevated card surfaces, creating a clean, high-contrast stage for data and typography.
- **Whisper Cool Slate** (`#F8FAFC`) — Secondary workspace background, table header fills, and subtle section containers that gently separate content zones without heavy dividers.
- **Soft Cloud Mist** (`#F1F5F9`) — Muted surface fill used for inactive tab rails, skeleton loading placeholders, avatar fallbacks, and secondary pill backgrounds.
- **Hairline Silver Slate** (`#E2E8F0`) — Structural 1px border token for cards, table cells, form inputs, and layout dividers.

### Accent & Interactive
- **Deep Institutional Cobalt** (`#1E40AF`) — Primary brand anchor used for main call-to-action buttons, active sidebar indicators, and key structural highlights.
- **Royal Interactive Blue** (`#2563EB`) — High-energy interactive accent for focus rings, active links, progress bars, and primary data visualization series.
- **Midnight Navy Press** (`#1E3A8A`) — Hover and active pressed state for primary buttons and interactive badges.
- **Frosted Cobalt Tint** (`#EFF6FF`) — Soft background wash for active navigation items, selected table rows, and informational context banners.

### Typography & Text Hierarchy
- **Obsidian Slate Ink** (`#0F172A`) — Primary typography color for page titles, card headings, metric values, and core table cell content.
- **Charcoal Slate** (`#475569`) — Secondary text color for form labels, table column headers, and supporting body copy.
- **Muted Pewter Gray** (`#64748B`) — Tertiary text color for timestamps, metadata captions, input placeholders, and empty-state descriptions.

### Functional States
- ** Botanical Emerald** (`#10B981`) paired with **Mint Whisper Fill** (`#ECFDF5`) — Indicates approved submissions, active periods, completed milestones, and positive KPI trends.
- **Warm Amber Ochre** (`#F59E0B`) paired with **Sunlit Cream Fill** (`#FFFBEB`) — Signals pending verifications, draft states, in-review queues, and approaching deadlines.
- **Crimson Rose Alert** (`#EF4444`) paired with **Soft Blush Fill** (`#FEF2F2`) — Reserved for rejected submissions, validation errors, quota overflows, and destructive confirmation actions.
- **Clear Sky Azure** (`#3B82F6`) paired with **Ice Blue Fill** (`#EFF6FF`) — Highlights active workflow stages, informational tooltips, and system announcements.

---

## 3. Typography Rules

### Hierarchy & Weights
The typographic system relies on **Inter** (or **Geist Sans**), a neo-grotesque sans-serif chosen for its tall x-height, open apertures, and exceptional legibility at small sizes in dense data tables. Monospace data (IDs, registration codes, timestamps) uses **JetBrains Mono** for tabular alignment.

- **Page Display Title (H1)**: `24px` (`1.5rem`), Bold (`700`), letter-spacing `-0.025em`, line-height `1.25`. Used once per view at the top of the workspace to establish immediate context.
- **Section & Modal Heading (H2)**: `20px` (`1.25rem`), Semi-Bold (`600`), letter-spacing `-0.02em`, line-height `1.35`. Anchors major dashboard zones and dialog headers.
- **Card Title & Widget Header (H3)**: `16px` (`1rem`), Semi-Bold (`600`), letter-spacing `-0.01em`, line-height `1.4`. Used inside analytical cards, submission cards, and timeline headers.
- **KPI Metric Display**: `28px` to `32px` (`1.75rem`–`2rem`), Bold (`700`), letter-spacing `-0.03em`, line-height `1.1`, tabular numerals enabled. Commands attention inside top-row stat cards.
- **Body & Table Cell Copy**: `14px` (`0.875rem`), Regular (`400`) or Medium (`500`) for emphasis, letter-spacing `0em`, line-height `1.5`. The workhorse size for forms, descriptions, and data rows.
- **Metadata, Badges & Table Headers**: `12px` (`0.75rem`), Medium (`500`) to Semi-Bold (`600`), letter-spacing `+0.02em`, line-height `1.4`. Provides crisp hierarchy for status pills, timestamps, and column titles.

### Spacing Principles
- Headings maintain a tight vertical tether to their accompanying subtitle or description (`4px` to `6px` gap), forming a unified header lockup before a larger `16px` or `24px` break into the content body.
- Body paragraphs and timeline notes use a relaxed `1.5` to `1.6` line-height to ensure multi-line review comments remain comfortable to read.
- Numeric columns, IDs, and quota counters always enforce tabular figure spacing so vertical columns of numbers align with mechanical precision.

---

## 4. Component Stylings

### Buttons
- **Shape & Geometry**: Clean, professional rounded corners at `6px` (`0.375rem`) with a standard touch-friendly height of `36px` (`40px` for prominent form actions, `32px` for compact table toolbar controls).
- **Primary Variant**: Solid **Deep Institutional Cobalt** (`#1E40AF`) fill with crisp white medium-weight text (`14px`), transitioning smoothly (`150ms ease-in-out`) to **Midnight Navy Press** (`#1E3A8A`) on hover with a subtle `1px` inner highlight.
- **Secondary & Outline Variants**: Crisp white surface with a `1px` **Hairline Silver Slate** (`#E2E8F0`) border and **Obsidian Slate Ink** text; hovering washes the background in **Whisper Cool Slate** (`#F8FAFC`).
- **Ghost & Icon Actions**: Transparent background used for row-level table actions and header utilities, revealing a soft `#F1F5F9` pill background on hover.
- **Destructive Variant**: Solid **Crimson Rose Alert** (`#EF4444`) or soft blush outline for high-risk actions like rejecting a submission or deleting master data.

### Cards & Dashboard Containers
- **Corner Radius**: Slightly softer than buttons at `12px` (`0.75rem`) for primary dashboard cards and modals, creating a friendly yet structured frame around inner `6px`-radius controls.
- **Shadow & Border Strategy**: Flat-first elevation using a crisp `1px` solid `#E2E8F0` border paired with a whisper-light ambient shadow (`0 1px 2px rgba(15, 23, 42, 0.04)`). Interactive queue cards elevate subtly on hover with a slightly deeper border tint (`#CBD5E1`).
- **Internal Padding**: Standardized at `20px` to `24px` (`1.25rem`–`1.5rem`), divided into distinct header, content, and footer zones separated by `1px` hairline borders when actions are present.

### Navigation
- **Collapsible Left Sidebar**: Fixed vertical navigation rail (`256px` expanded, `64px` icon-only collapsed) set against a `#F8FAFC` or `#FFFFFF` surface with a right-hand `1px` border.
- **Menu Items**: Horizontal pill rows (`36px` height, `8px` radius, `12px` horizontal padding) featuring a `16px` stroke icon and `14px` medium label. Active routes display a **Frosted Cobalt Tint** (`#EFF6FF`) background with **Deep Institutional Cobalt** (`#1E40AF`) text and icon weight increase.
- **Sticky Workspace Header**: A `56px`-tall translucent top bar (`backdrop-filter: blur(8px)` over `#FFFFFF/90`) housing the sidebar toggle, hierarchical breadcrumb trail, global context/period selector, and user profile menu.
- **Mobile Adaptation**: Automatically collapses the sidebar into a smooth slide-over sheet drawer triggered from the top-left header icon.

### Inputs & Forms
- **Field Styling**: `36px`–`40px` height with `6px` rounded corners, `1px` solid `#E2E8F0` border over a `#FFFFFF` background, and `12px` horizontal padding.
- **Focus Behavior**: Replaces the default border with a crisp **Royal Interactive Blue** (`#2563EB`) border and a `3px` diffused cobalt glow ring (`rgba(37, 99, 235, 0.15)`).
- **Validation States**: Invalid fields shift their border to **Crimson Rose Alert** (`#EF4444`) with a `12px` rose helper message directly beneath the control (`4px` gap).
- **Form Structure**: Complex multi-step submissions group related fields inside titled cards or divide sections with horizontal hairline separators, accompanied by a read-only preview stage before final submission.

### Domain-Specific Components
- **Active Period / Context Banner**: A full-width top callout bar with a `1px` tinted border (`#BFDBFE`), soft azure background wash (`#EFF6FF`), calendar icon badge, bold period title, date range metadata, and a live pill badge (`Active` / `Open`) on the far right.
- **KPI Stat Cards**: Four-column summary cards featuring a muted top label (`13px`), prominent bold metric value (`28px`), a `40x40px` rounded-lg icon container tinted in 10% brand/semantic color in the top-right corner, and a bottom trend/subtitle line.
- **Filterable Data Table & Toolbar**: A unified table block preceded by a split toolbar—left side housing a debounced search input with magnifier icon and faceted filter dropdowns; right side housing secondary export/import buttons and the primary "+ Add" CTA. Table headers use `#F8FAFC` background with `12px` semi-bold muted labels.
- **Status Queue Cards with Counter Tabs**: A horizontal segmented tab bar (`All`, `Pending`, `Approved`, `Revision`) where each tab includes a compact numeric counter pill, filtering a responsive grid of entity cards with avatar headers, 2-line clamped titles, metadata rows, and split approve/detail footers.
- **Chronological Logbook Timeline**: A vertical activity stream anchored by a `2px` `#E2E8F0` left guide line and color-coded status nodes (`12px` circles in emerald, amber, or cobalt). Each node expands into a structured card displaying the date, activity notes, attachment chips, and reviewer feedback box.

---

## 5. Layout Principles

### Grid & Structure
- **App Shell Architecture**: Persistent left navigation sidebar paired with a fluid main content viewport (`flex-1 min-w-0`).
- **Container Width**: Main workspace stretches fluidly up to `1600px` max-width (centered on ultra-wide monitors) to accommodate wide multi-column data tables and side-by-side analytics.
- **Grid Systems**:
  - **KPI Summary Row**: 4-column CSS Grid (`1fr` each) on desktop, collapsing to 2 columns on tablet and 1 column on mobile.
  - **Dashboard Split View**: 12-column asymmetrical grid—typically `8 columns` for primary charts or tables paired with `4 columns` for activity logs or announcement panels.
  - **Queue & Submission Cards**: 3-column responsive grid (`minmax(320px, 1fr)`).
- **Breakpoints**: Mobile (`< 640px`), Tablet (`640px – 1024px`), Desktop (`1024px – 1280px`), Wide Desktop (`> 1280px`).

### Whitespace Strategy
- **Base Unit**: Strict `4px` spatial scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`).
- **Viewport Padding**: `16px` (`1rem`) on mobile viewports, scaling up to `24px` (`1.5rem`) or `32px` (`2rem`) on desktop workspaces.
- **Vertical Rhythm**: Major page sections (Banner $\rightarrow$ KPI Row $\rightarrow$ Filter Toolbar $\rightarrow$ Main Table/Grid) maintain a consistent `24px` (`1.5rem`) vertical stack gap.
- **Card Grid Gaps**: `16px` (`1rem`) between stat cards and `20px` (`1.25rem`) between detailed submission cards.

### Alignment & Visual Balance
- **Strict Left Alignment**: All page headers, section titles, form labels, and textual table columns are flush-left aligned to create strong vertical reading axes.
- **Right-Anchored Actions & Numerics**: Primary page CTAs, card header filters, status badges, and numeric/action table columns are flush-right aligned to create counter-balanced tension across every row.
- **Skeleton Symmetry**: Loading states never collapse layout height; skeleton placeholders mirror the exact bounding boxes of banners, 4-column stat cards, and table rows.

### Responsive Behavior & Touch
- **Mobile-First Adaptation**: Multi-control table toolbars stack vertically on narrow screens, with the search bar expanding to 100% width above horizontally scrollable filter pills.
- **Overflow Protection**: Data tables wrap in a horizontal scroll container with sticky action columns on smaller viewports so data is never truncated or broken.
- **Touch Targets**: All interactive controls, pagination buttons, and row action triggers maintain a minimum `36x36px` (`44x44px` on mobile drawers) hit area.

---

## 6. Design System Notes for Stitch Generation

### Language to Use
When prompting Stitch to generate or refine screens in this design system, describe the aesthetic as:
> *"Clean enterprise academic SaaS workspace inspired by Shadcn UI and Linear, featuring a crisp alabaster white and cool slate gray foundation, 1px hairline silver borders, deep institutional cobalt primary actions, translucent semantic status pills, high-legibility Inter typography, and structured modular cards with generous internal breathing room."*

### Color References
Always reference these exact descriptive names and hex tokens in Stitch prompts:
- **Canvas Background**: Crisp Alabaster Canvas (`#FFFFFF`) & Whisper Cool Slate (`#F8FAFC`)
- **Muted Fill / Skeletons**: Soft Cloud Mist (`#F1F5F9`)
- **Borders & Dividers**: Hairline Silver Slate (`#E2E8F0`)
- **Primary Brand / CTA**: Deep Institutional Cobalt (`#1E40AF`) & Royal Interactive Blue (`#2563EB`)
- **Primary Text**: Obsidian Slate Ink (`#0F172A`)
- **Secondary / Muted Text**: Charcoal Slate (`#475569`) & Muted Pewter Gray (`#64748B`)
- **Approved / Active Status**: Botanical Emerald (`#10B981`) on Mint Whisper Fill (`#ECFDF5`)
- **Pending / Review Status**: Warm Amber Ochre (`#F59E0B`) on Sunlit Cream Fill (`#FFFBEB`)
- **Rejected / Danger Status**: Crimson Rose Alert (`#EF4444`) on Soft Blush Fill (`#FEF2F2`)
- **Info / Stage Status**: Clear Sky Azure (`#3B82F6`) on Ice Blue Fill (`#EFF6FF`)

### Component Prompts
Use these natural-language prompt templates to generate core screens in Stitch:

1. **Coordinator Analytics & Monitoring Dashboard**:
   > *"Create a desktop enterprise academic dashboard with a collapsible left sidebar on a Whisper Cool Slate (`#F8FAFC`) background and a sticky top breadcrumb header. At the top of the workspace, place a full-width Active Period Banner in Ice Blue Fill (`#EFF6FF`) with a 1px azure border showing the current academic wave and an Emerald 'Active' pill badge. Below it, arrange a 4-column row of KPI stat cards on Crisp Alabaster (`#FFFFFF`) surfaces with 12px rounded corners, 1px `#E2E8F0` borders, bold 28px Obsidian Slate metrics, and soft tinted icon squares in the top right. In the main lower section, use an 8-column / 4-column split: on the left, a bordered card containing a clean multi-series bar and area chart in Royal Interactive Blue (`#2563EB`); on the right, a scrollable Recent Activity & Announcements panel with timestamps and semantic status dots."*

2. **Reviewer Approval Queue & Status Card Grid**:
   > *"Design a submission verification screen inside the workspace shell. Below the page title and subtitle, add a horizontal segmented tab bar ('All 42', 'Pending 14', 'Approved 25', 'Revision 3') on a Soft Cloud Mist (`#F1F5F9`) pill track alongside a search input and category filter dropdown. Display a 3-column grid of submission cards on `#FFFFFF` with 12px radius and 1px `#E2E8F0` borders. Each card header shows an applicant avatar, full name in 15px semi-bold `#0F172A`, ID number in monospace `#64748B`, and a top-right semantic pill badge (Warm Amber `#F59E0B` on `#FFFBEB` for Pending). The card body displays a 2-line topic title and metadata icons for supervisor and submission date. Separate the card footer with a 1px hairline border containing an outline 'View Details' button and a solid Deep Institutional Cobalt (`#1E40AF`) 'Verify' button."*

3. **Chronological Activity Logbook & Multi-Stage Tracker**:
   > *"Create a student supervision logbook and status tracking view. At the top, place an Entity Summary Card on `#FFFFFF` with a 1px `#E2E8F0` border showing the thesis/project title, assigned supervisors with avatars, and a horizontal progress bar in Royal Interactive Blue (`#2563EB`) indicating '8 of 10 Minimum Logs Verified'. Below, render a filter toolbar and a vertical chronological timeline anchored by a 2px `#E2E8F0` left line with color-coded circular status nodes (Emerald `#10B981` for verified, Amber `#F59E0B` for pending review). Each timeline entry is a structured white card containing the session date, meeting notes in 14px `#0F172A` body text, a downloadable PDF attachment chip, and a recessed `#F8FAFC` comment box showing supervisor feedback."*

### Incremental Iteration
When refining generated screens in Stitch, apply these targeted adjustments:
- **If a screen feels too cluttered or heavy**: Replace drop shadows with flat `1px` solid `#E2E8F0` borders, increase internal card padding to `24px`, and shift secondary labels to `12px` Muted Pewter Gray (`#64748B`).
- **If status indicators overpower the layout**: Convert solid-fill badges into soft-tint badges (10% semantic background wash with a 20% border tint and dark semantic text).
- **If data tables feel cramped**: Ensure row height is at least `48px`, apply `#F8FAFC` to the header row, left-align text columns, right-align numeric and action columns, and consolidate row actions into a clean 3-dot ghost icon button.
## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## UI Style Consistency & Design Tokens (Style Guardian)

Every developer and agent modifying pages, components, or styles in this repository must strictly enforce and respect these design tokens and conventions:

1. **Colors & Tokens**:
   - Primary text / Headings: `text-[#0f172a]` (slate-900) font-semibold.
   - Secondary / Subtitle / Meta: `text-xs text-[#64748b]` (slate-500) font-normal. (Never use saturated blue `text-[#2563eb]` or bold font for plain subtitles/descriptions).
   - Borders: Neutral `border-[#e2e8f0]` (slate-200) or `border-[#f1f5f9]`.
   - Card backgrounds: `bg-white`, subtle containers `bg-[#f8fafc]`.
   - Action / Brand: `text-[#2563eb]`, button `bg-[#2563eb] hover:bg-[#1d4ed8] text-white`.
   - Status badges: Soft pastel badges with light border (`bg-green-50 text-green-700 border-green-200`, `bg-amber-50 text-amber-700 border-amber-200`, `bg-slate-50 text-slate-500 border-slate-200`).

2. **Border & Radius Hierarchy**:
   - Standard cards, panels, inputs, and buttons: `rounded-md border border-[#e2e8f0]`. Never use oversized `rounded-2xl` on standard dashboard cards.
   - Modals & Drawers: `rounded-lg` or `rounded-xl`.
   - Badges & Avatars: `rounded-full`.
   - Shadows: Prefer `shadow-none` (flat-clean) or `shadow-sm` on page cards.

3. **Typography & Font**:
   - Page Header: `text-xl sm:text-2xl font-bold text-[#0f172a]`.
   - Card/Section Header: `text-sm font-semibold text-[#0f172a]`.
   - Subtitle/Meta: `text-xs text-[#64748b] mt-1 font-normal`.
   - Table Headers: `text-xs font-semibold text-[#64748b] uppercase tracking-wider`.
   - Table Body: `text-sm font-medium text-[#0f172a]` with `text-xs text-[#64748b]` for secondary data.

4. **Copywriting & Academic Domain**:
   - Official terms: "Mahasiswa Bimbingan", "Logbook Bimbingan", "Jadwal & Penilaian Sidang", "Catatan Pembimbing", "Nilai Pembimbing", "Nilai Penyelia (Mitra)".
   - Action labels: "View details" / "Lihat Detail", "Simpan Catatan", "Batal", "Tutup".
   - Search placeholders: "Cari nama atau NIM mahasiswa...".
   - Anti-slop: Keep tone concise, professional, calm, and free of hyperbolic marketing text.

5. **Sibling Parity**:
   - Cards or list items in the same container must maintain identical layout heights, padding (`p-4`), typography scales, and icon placements. Never make one card arbitrarily stand out with conflicting colors.

6. **Verification**:
   - Always run `npm run build` after any UI modifications.

## Git Worktree Convention
All linked worktrees for this repository must reside inside `.worktree/<name>` (e.g. `git worktree add .worktree/<name> <branch>` or `git wt-add <name> <branch>`). Do not create worktrees in parent or sibling directories.


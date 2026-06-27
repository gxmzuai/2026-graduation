# Guangxi Minzu University · Class of 2026 Graduation Keepsake

**English** · [简体中文](./README.zh-CN.md)

A cinematic memorial site for three years spent by Xiangsi Lake (相思湖) — a time gallery,
the dorm, the class, and a quiet background score that follows you across the pages.

🔗 Live: <https://gxmzu.gujiakai.top>

## Tech stack

- **[Astro 6](https://astro.build/)** — content-first, ships almost no JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** — CSS-first `@theme` tokens via the official `@tailwindcss/vite` plugin
- **[APlayer](https://github.com/DIYgod/APlayer)** — a tiny vanilla background music player
- **Astro View Transitions** (`<ClientRouter />`) — so the music keeps playing across navigation
- **Pure Astro + vanilla `<script>`** — no UI-framework runtime

Visual direction: **cinematic dark** (deep ink-green night) with a **soft rose-gold** accent,
ornamented with the **hibiscus (朱槿, Nanning's city flower)** and **Zhuang brocade (壮锦)** motifs.

## Getting started

```sh
pnpm install
pnpm dev       # local preview at http://localhost:4321
pnpm build     # astro check + build to dist/
pnpm preview   # preview the production build
```

> Uses **pnpm**; Node 18+ recommended. The output in `dist/` is fully static — deploy it to any static host.

## Content lives in data files

Every image loads from a **remote URL** — there are no image assets committed to the repo.

| What | File | Shape |
| --- | --- | --- |
| Gallery photos | `src/data/gallery.json` | `{ year, url, title, description, date }` — `year` is `year-1` / `year-2` / `year-3` |
| Music tracks | `src/data/music.json` | `{ name, artist, url, cover?, lrc? }` — `url` is a direct audio link |
| Dorm members | `src/data/roommates.json` | `{ id, name, qq, gender }` |
| Classmates | `src/data/classmates.json` | `{ id, name, qq, gender }` |
| Site text & dates | `src/data/site.ts` | title, nav, repo, and the "days together" start/end dates |

- **Photos & music** are plain `<img>` / `<audio>` pointing straight at your links — to add one,
  append an entry to the matching JSON file (display order = array order; empty `url` entries are skipped).
- **Avatars** come from QQ's public avatar API (keyed by `qq`); a name-initial placeholder shows if one fails to load.
- **Music never autoplays** — the visitor starts it from the floating mini player in the corner, which keeps
  playing as they move between pages.
- The **"days together" counter** counts up from `2023-09-10` and freezes at `2026-06-23`.

## Project structure

```
src/
├─ components/   Nav · Footer · Ornament (motifs) · Avatar · MemberCard · Lightbox · MusicPlayer · …
├─ data/         site.ts · members.ts · gallery.ts + *.json
├─ layouts/      BaseLayout.astro
├─ pages/        index · gallery · roommates · classmates
└─ styles/       global.css   (Tailwind v4 theme tokens + base styles)
```

## Credits

A personal graduation keepsake — please don't reuse the photos or names.
Designed and built with the help of Anthropic's Claude.

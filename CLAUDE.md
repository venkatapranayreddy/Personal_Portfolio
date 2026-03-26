# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start          # node index.js on port 3000

# Start server (development with auto-reload)
npm run dev        # nodemon
```

The site is served at `http://localhost:3000`. There is no build step — static files are served directly from `public/`.

## Architecture

**Stack:** Node.js + Express (server), vanilla HTML/CSS/JS (frontend), Supabase (configured but unused in static pages).

**Pages (3):** All HTML in `public/`, routed by `index.js`:
- `GET /` → `public/index.html` — main portfolio (skills, experience, education, certs)
- `GET /careers` → `public/careers.html` — detailed experience and projects
- `GET /running` → `public/running.html` — running achievements and Strava stats

**CSS structure:**
- `public/css/style.css` — all light-mode styles for all 3 pages (~1665 lines, sections are clearly commented)
- `public/css/dark-mode.css` — dark-mode overrides, loaded dynamically by `dark-mode.js`

**JS structure:**
- `public/js/dark-mode.js` — `DarkModeManager` class: toggles `dark-mode` class on `<body>`, dynamically loads/unloads `dark-mode.css`, persists to localStorage, Ctrl/Cmd+J shortcut, system preference detection
- `public/js/script.js` — `NavbarManager` class + scroll animations, intersection observers, mobile nav, resume download
- `public/js/3d-effects.js` — IIFE: orbiting profile image rings/particles, Vanilla Tilt on cards, magnetic buttons, text reveal, parallax

**Dark mode pattern:** `DarkModeManager` adds/removes the `dark-mode` class on `<body>`. All dark styles in `dark-mode.css` are scoped under `body.dark-mode`. Theme state lives in `localStorage` key `darkMode`.

**Vanilla Tilt** is loaded from CDN in `index.html` and applied in `3d-effects.js` to: `.skill-category`, `.certification-card`, `.education-card`, `.timeline-content`, `.pb-card`, `.race-card`.

**Responsive breakpoints:** 768px (tablet) and 480px (mobile), defined at the bottom of `style.css`.

**No build pipeline, no bundler, no TypeScript** — everything is plain HTML/CSS/JS files.

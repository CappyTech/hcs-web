# hcs-web
Heron Constructive Solutions LTD Website

# main branch

## What this is

A barebones Node.js app using:

- Express (server + routing)
- EJS (server-rendered views)
- Controller / Route / View / Service structure
- Plain static assets in `public/` (CSS/JS) like a classic static site

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Set up environment variables (dotenv)

This project uses `dotenv` to load variables from a local `.env` file.

Copy the example file:

```bash
# Git Bash / macOS / Linux
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Edit `.env` if you want a different port.

IMPORTANT: When you add new environment variables, update `.env.example` too.

### 3) Run the app

```bash
npm start
```

Dev mode (auto-reload):

```bash
npm run dev
```

Open:

- http://localhost:3000

## Folder structure

- `server.js` starts the server
- `app.js` configures Express (middleware, routes, errors)
- `routes/` maps URLs to controller functions
- `controllers/` handles requests and renders views
- `services/` provides data/business logic for views
- `views/` contains EJS templates (pages + partials)
- `public/` contains static CSS/JS

## Where the content comes from

Content — case studies, blog posts, services, accreditations and the site's own
identity — is authored in **hcs-app** at `/website` and pulled from its content
API. **This site is a cache of that database, not a client of it.**

`services/contentCache.js` pulls the payload on a timer, mirrors it (and its
images) to disk, and every page renders from the local copy. With hcs-app
switched off — a redeploy, a broken tunnel, the whole box down — this site keeps
serving its last known good copy and visitors notice nothing. Nothing here may
make rendering depend on a request succeeding.

Three levels, in order:

1. **the disk mirror** — `data/content.json` plus `public/images/managed/`,
   written by the last successful pull. Both are gitignored: the app root is
   also the git working tree on the server, and a dirty tree breaks the next
   deploy pull.
2. **a live pull** — refreshes the mirror, on a timer and on `POST /revalidate`,
   which hcs-app calls when someone publishes.
3. **the seed data** — the arrays still in `services/*Data.js`.

**The seed arrays are deliberately not deleted.** They are the floor: a fresh
checkout with no mirror and no reachable API still renders the content the repo
ships with. They are also the shape the views read, which is why each getter
translates the cached payload back into it rather than the views changing.

`GET /version` reports which of the three answered and how old the mirror is.
With no CI and no monitoring on this app, it is the only place a site quietly
serving a month-old copy would show up.

Configure with `CONTENT_API_URL`, `CONTENT_API_TOKEN`, `CONTENT_REFRESH_SECONDS`
and `CONTENT_REVALIDATE_SECRET` — see `.env.example`. Leave the first two blank
and the site serves the seed content, which is a supported state, not a broken
one.

Two things specific to this host. **Passenger runs several worker processes**,
so `/revalidate` only ever reaches one of them; the others converge through the
shared disk mirror on their next tick. And **the document root is the app root**,
so the mirror is reachable over HTTP unless the `.htaccess` source rules are in
place — it holds public website copy, so nothing leaks, but it should not be
served by accident.

# Accreditations

Safe Contractor
- 2021 - 2026

CHAS
- 2019 - 2020


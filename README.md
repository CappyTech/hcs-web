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
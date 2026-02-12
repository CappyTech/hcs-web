# Copilot Instructions (hcs-web)

This repo is a small Node.js/Express web app using EJS templates.

## Goals
- Make focused, minimal changes that match the existing code style.
- Prefer simple, maintainable solutions over clever ones.
- Keep UX unchanged unless the task explicitly requests UI/behavior changes.

## Tech Stack
- Runtime: Node.js
- Server: Express
- Views: EJS in `views/`
- Static assets: `public/` (CSS/JS)
- Routes: `routes/`
- Controllers: `controllers/`
- Services: `services/`
- Middleware: `middleware/`

## Project Conventions
- Use CommonJS (`require`/`module.exports`) as used in the repo.
- Put request/response logic in controllers; keep services reusable and side-effect limited.
- Keep route definitions thin: route -> controller.
- Avoid introducing new frameworks or large dependencies unless explicitly requested.

## Coding Style
- Match existing formatting and naming patterns.
- Avoid refactors unrelated to the requested change.
- Add small helper functions only when they reduce duplication.

## Safety & Quality
- Validate and sanitize user input in controllers/services.
- Do not log secrets or personal data.
- Handle errors via existing middleware (`middleware/errorHandler.js`).

## How to Run
- Install: `npm install`
- Start (typical): `npm start` (see `package.json` scripts)

## When Changing Views
- Keep markup changes limited to the specific page/partial.
- Prefer updating shared partials (`views/partials/*`) for shared layout changes.

## When Adding/Updating Routes
- Add route in `routes/index.js` (or appropriate route module).
- Implement handler in `controllers/pageController.js` (or appropriate controller).
- Business logic goes in `services/*`.

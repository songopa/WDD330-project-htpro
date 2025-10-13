# Health Track Pro

A small front-end project for tracking health-related activities and nutrition. Built with Vite and plain JavaScript modules.

## Quick start

Prerequisites
- Node.js (v16+ recommended)

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

Other available scripts

- `npm run lint` — run ESLint
- `npm run format` — run Prettier to format files

## Project structure

Top-level files

- `package.json` — project metadata and npm scripts
- `vite.config.js` — Vite configuration
- `README.md` — this file

Source files

- `index.html` — app entry HTML
- `src/css/` — styles (normalize and project styles)
- `src/js/` — main JavaScript and modules
- `public/` — static assets (images, json)
- `views/` — HTML views used by the app (home, profile, nutrition, etc.)

## Notes

- This repository uses Vite as a dev server and build tool. The `type: "module"` setting in `package.json` enables ES modules.
- If you add new files that should be linted/formatted, update your editor settings or run the npm scripts above.

## Contributing

Open an issue or submit a pull request. Keep changes small and test locally with `npm run dev`.


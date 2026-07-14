# Sneakrush — Frontend Showcase

This repository contains the frontend UI for Sneakrush, an auction-style sneaker marketplace. This `frontend/` folder is a standalone UI showcase intended to demonstrate layout, responsive design, and interactions — the original backend has been removed from this repository.

## Status
- Frontend-only: interactive features use mock data or a mock server.
- Built with React + Vite, Tailwind CSS and modern React patterns.
- All dependencies are configured and ready to use.

## Prerequisites
- Node.js 16+ (recommended: Node.js 20+)
- npm or yarn package manager

## Quick Start

### 1. Clone and Install
 - Download Zip file
 - Extract All
 - In terminal
```bash
cd AUCTION_WEB UI
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The app will open on `http://localhost:5173`

### 3. Build for Production
```bash
npm build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run mock` | Start mock API server on port 4000 |

## Mock API (Optional)

To run the mock server with sample data:
```bash
npm run mock
```
This uses `json-server` with routes defined in `json-server.routes.json` and data from `db.json`.

```bash
npx json-server --watch db.json --port 4000
```


## Notes for reviewers
- This repo is intended for UI review; the backend was removed to keep the repo focused on visual design.
- To show end-to-end flows, add `db.json` and run `json-server`, or connect to a separate backend repository.

## Deployment
- Deploy the `Frontend` folder to Vercel, Netlify, or GitHub Pages. Vercel auto-detects Vite projects.

## Mock API examples
If you run the mock API with `npm run mock` (starts `json-server` at `http://localhost:4000`), here are example `curl` requests you can use to exercise the UI endpoints:

- List auctions

```bash
curl http://localhost:4000/api/auctions
```

- Get a single auction (id = 1)

```bash
curl http://localhost:4000/api/auctions/1
```

- List bids for all auctions

```bash
curl http://localhost:4000/api/bids
```

- Create a new bid (replace `auctionId`, `userId`, and `amount` as needed)

```bash
curl -X POST http://localhost:4000/api/bids \
	-H "Content-Type: application/json" \
	-d '{"auctionId":1,"userId":2,"amount":230,"time":"2026-07-14T12:00:00Z"}'
```

- List users

```bash
curl http://localhost:4000/api/users
```

Notes:
- `json-server` will persist to `db.json` while running.
- If your frontend is configured to call different endpoints, update the API base URL to `http://localhost:4000/api/` or adjust the `json-server.routes.json` file.





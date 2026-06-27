# TAKUMI

TAKUMI is a production-ready SocialFi experience for Canopy Network. Every user interaction is captured through a transaction-backed activity layer, and the UI exposes the full social loop: profile setup, on-chain posts, follows, notifications, search, and reputation metrics.

## What is included

- Wallet-ready local Canopy identity generation and persisted activity history
- On-chain-style submission flow for posts, likes, reposts, comments, follows, and profile updates
- Feed, search, notifications, profile editor, and network settings pages
- React + Tailwind frontend with Canopy RPC fallback handling

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment variables

- VITE_RPC_PRIMARY — default http://127.0.0.1:50002
- VITE_RPC_SECONDARY — default http://127.0.0.1:50003

## Deployment notes

The app is buildable as a static Vite bundle and can be deployed to any static host. For full on-chain confirmation, expose a reachable Canopy RPC endpoint and ensure the node accepts the submission payload shape used by the app.

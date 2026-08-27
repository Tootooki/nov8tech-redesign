# NOV8TECH storefront redesign

A standalone, mobile-first redesign preview for [NOV8TECH](https://www.nov8tech.com/). It preserves verified product information and imagery from the current store while introducing a focused pool-equipment catalog, a separate Legacy Clearance collection for hubs and masks, responsive search, product-detail preview, cart interactions, trust messaging, and support content.

This repository is an independent preview. It does not alter or connect checkout to the production Shopify store.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
npm run build:pages
npm test
```

The project uses vinext for local/server preview and a dedicated Vite build for GitHub Pages hosting.

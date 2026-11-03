# Centrl

Marketing site for Centrl, AI-native software for small service businesses.

Public site: [https://centrl.rossinetwork.com](https://centrl.rossinetwork.com)

One place for everything you use. Ask once. Centrl handles the rest.

## Develop

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

`npm run build` typechecks, writes a static `dist/` folder, and checks that public copy stays on the product. Preview serves that folder at `http://localhost:4173`.

## Deploy on Cloudflare Pages

`wrangler.toml` points Pages at `dist`.

Dashboard:

1. Create a Pages project named `centrl` from this repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Attach the custom domain `centrl.rossinetwork.com`.

From a machine that is already logged in to Wrangler:

```bash
npm run build
npx wrangler pages deploy dist --project-name centrl
```

Known routes are rewritten to the app in `public/_redirects`, so a direct visit to `/features`, `/pricing`, `/about`, `/contact`, `/privacy`, or `/terms` loads the right page. Any other path serves `public/404.html`.

## Pages

- Home
- Features
- Pricing (`$149` a month)
- About
- Contact (`hello@centrl.rossinetwork.com`)
- Privacy
- Terms
- 404

## Copy

Public pages describe the product, who it is for, and the published monthly plan. Do not add internal planning notes, unpublished financials, or claims of live customers.

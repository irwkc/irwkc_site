# irwkc — Portfolio

Personal portfolio at [irwkc.ru](https://irwkc.ru). Admin: [irwkc.irwkc.ru](https://irwkc.irwkc.ru).

Visual language inspired by Hyperstudio (obsidian canvas, hairline structure). Interactive accents from React Bits: ASCII text, Dot Grid, Orb.

## Stack

- Next.js 16 · TypeScript · Tailwind CSS v4
- Framer Motion · Three.js · OGL
- Standalone Node deploy behind nginx

## Run locally

```bash
cp .env.example .env.local
# set ADMIN_PASSWORD and ADMIN_SECRET
npm install
npm run dev
```

## Content

- Site copy / links / services: `src/data/site.ts`
- Projects: `data/projects.json` (also editable in admin)

## Production

```bash
npm run build
npm start
```

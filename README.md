# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

# 🧱 Architecture Overview
```sh
nuxest/
├── assets/
│   └── css/main.css
├── components/
│   ├── ui/        → atomic or base components (Button, Card, etc.)
│   ├── layout/    → header, footer, nav, toggler, etc.
│   └── listings/  → real estate specific components (PropertyCard.vue, FilterSidebar.vue)
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue  → homepage (landing with listings)
│   └── properties/[slug].vue → dynamic property pages
├── composables/
│   └── useProperties.ts → future composable to fetch data
├── utils/
├── public/
├── app.vue
├── nuxt.config.ts
└── tailwind.config.ts
```

---

# 🧭 Development Roadmap

🔹 Phase 1: Core Setup
 - [x] Nuxt project created
 - [x] Tailwind + Color Mode + SEO modules added
 - [ ] Add default layout with Header/Footer/ThemeToggle
 - [ ] Implement reusable UI atoms (Button, Card, Badge, etc.)

🔹 Phase 2: Home Page (MVP)
 - [ ] Create hero section: intro text + CTA
 - [ ] Display featured properties in grid
 - [ ] Add FilterSidebar (search, price range, etc.)

🔹 Phase 3: Dynamic Property Pages
 - [ ] Add /properties/[slug].vue page
 - [ ] Use definePageMeta for SEO meta tags
 - [ ] Show full property detail (images, price, description, features)

🔹 Phase 4: SEO Optimization
 - [ ] Add Open Graph, Twitter Card meta
 - [ ] Generate sitemap
 - [ ] Use Nuxt Head utilities
 - [ ] Lazy load images & optimize fonts

🔹 Phase 5: Enhancements
 - [ ] Add useProperties() composable (mock or future API-ready)
 - [ ] Create pagination & filters (by type, location, etc.)
 - [ ] Add scroll animations (using vueuse/motion or Anime.js)
 - [ ] Add Nuxt Image module for optimized media

---

> Built with love and a cup of tea by a fellow developer.

# Kiwi and Code

The website for [Kiwi and Code](https://kiwiandcode.co.uk): clean, affordable websites for small and local businesses in County Down and across Northern Ireland.

Built with [Astro](https://astro.build) as a static site, hosted on Cloudflare Pages. The homepage ships almost no JavaScript (just a scroll-reveal helper and the "copy email" button), and the fonts are self-hosted.

## Run it locally

You need Node.js 22.22 or newer (`node -v` to check).

```sh
npm install      # first time only
npm run dev      # start the dev server at http://localhost:4321
```

The dev server reloads as you edit. Other commands:

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run build`   | Builds the finished site into `dist/`           |
| `npm run preview` | Serves the built `dist/` folder to check it     |
| `npm run icons`   | Redraws the PNG icons in `public/` from the logo |

## Where things live

```text
public/                     copied to the site as-is
  og-image.png              1200×630 image for social shares
  logo-square.png           1080×1080 logo for Instagram and other profiles
  apple-touch-icon.png      home-screen icon for iPhones
  robots.txt, _headers      search engine and Cloudflare settings
src/
  data/site.ts              name, email, Instagram, SEO text and nav links
  styles/tokens.css         colours, fonts, sizes (the design system)
  styles/global.css         base styles, buttons, section themes, animations
  layouts/BaseLayout.astro  <head>, SEO tags, header, footer, shared scripts
  lib/kiwiMark.ts           geometry of the logo mark (kiwi slice cut by a "/")
  components/
    LogoMark.astro          the logo mark as SVG (header, hero, footer)
    Header.astro, Footer.astro
    home/                   one component per homepage section
  pages/
    index.astro             the homepage
    favicon.svg.ts          builds /favicon.svg from the logo geometry
    examples/               example sites (bakery, personal trainer)
scripts/
  make-icons.mjs            renders the PNG icons (needs Google Chrome)
```

## Common edits

- **Text on the homepage:** each section's words are at the top of its file in `src/components/home/`.
- **Email, Instagram, SEO title or description:** `src/data/site.ts`. Set `instagram` to your profile URL and the footer link appears.
- **Your photo:** save it as `src/assets/marcus.jpg` and follow the steps at the top of `src/components/home/About.astro`.
- **Colours:** `src/styles/tokens.css`. Check any new text colour for at least 4.5:1 contrast ([WebAIM checker](https://webaim.org/resources/contrastchecker/)).

## Adding pages later

1. Create the page in `src/pages/`, for example `src/pages/contact.astro` or `src/pages/examples/index.astro`.
2. Wrap it in the shared layout:

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---
   <BaseLayout title="Contact | Kiwi and Code" description="Get in touch with Marcus about a website for your business.">
     <section class="section theme-light">
       <div class="container">...</div>
     </section>
   </BaseLayout>
   ```

3. Point the buttons at the new page by changing `links.examples` or `links.contact` in `src/data/site.ts` (for example to `'/contact/'`). The header, hero and examples section all update from there.

Sections use `theme-dark` or `theme-light` for colours, `container` for width and `data-reveal` for the fade-in animation.

## Deploy to Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repository.
2. Framework preset: **Astro**. Build command `npm run build`, output directory `dist`.
3. The `.node-version` file tells Cloudflare which Node version to use.
4. Under the project's **Custom domains**, add `kiwiandcode.co.uk` (and `www` if you want it).
5. Optional: under **Metrics**, turn on **Web Analytics**. It's free, cookieless and needs no code changes.

Every push to the main branch redeploys the site; other branches get preview URLs.

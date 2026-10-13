# Mallika in Dubai

A redesign of [mallikaindubai.com](https://www.mallikaindubai.com): Dubai real estate guidance for Singapore families. We inform. You decide.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and shadcn/ui.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How the page works

Most sections are pinned while you scroll. A small hook (`components/site/scroll.tsx`) writes the scroll progress through each tall section to a `--p` CSS variable, and the CSS animates from that, so nothing re-renders on scroll.

- **Hero:** Mallika's portrait shrinks into a collage of Dubai photos.
- **How we help you:** step cards stack into a browser-style frame.
- **Services:** cards pan sideways, each with a small looping line graphic.
- **Statement:** words fill in while photos drift from blurred to sharp.
- **Resources, Meet Mallika, FAQ and the footer** fade up as they enter.

## Where things live

| Path | What it holds |
|---|---|
| `app/page.tsx` | Page layout and the static sections |
| `app/site.css` | All site styles and scroll animations |
| `components/site/scroll-sections.tsx` | The four pinned, scroll-driven sections |
| `components/site/content.ts` | Copy, links and image sources |
| `components/site/service-glyphs.tsx` | Line graphics inside the service cards |
| `public/art/` | Step illustrations |
| `DESIGN.md` | Colours, type and design rules |

## Notes

- Mallika's photos, logo and report covers load from mallikaindubai.com. Dubai and home photos come from Unsplash.
- Copy is taken from mallikaindubai.com. Swap in real client testimonials before launch rather than inventing any.

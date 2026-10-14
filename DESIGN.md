# DESIGN.md · Mallika in Dubai

How this site should look and feel. Read before changing any UI.

## Read

Landing page for Singapore families weighing a Dubai property purchase. Trust-first, warm, calm.
Brand voice: plain, helpful, never salesy ("We inform. You decide.").

Dials: VARIANCE 6 · MOTION 6 · DENSITY 3.

## Colour

One neutral family (cool lilac-grey) and one accent (her brand burgundy). Never add a second accent.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#f3f1f4` | Page ground |
| `--card` | `#ffffff` | Raised surfaces on the ground |
| `--ink` | `#1c1418` | Headlines, body on light |
| `--muted` | `#665a62` | Secondary copy (AA on `--bg`) |
| `--soft` | `#8c8088` | Captions, fine print only |
| `--line` | `#e4dfe5` | Hairlines |
| `--wine` | `#7c2d3b` | The accent: links, active states, the brand |
| `--plum` / `--plum-2` | `#2a0e15` / `#3b1520` | Dark cards, primary buttons on light |
| `--pink` | `#e9a3b1` | Data on dark surfaces only |
| `--cream` | `#eef0d0` | Primary button on burgundy |

Dark surfaces are burgundy-to-plum gradients, never black. Shadows are tinted with `rgba(74,21,32,…)`, never neutral grey.
Text on burgundy is white or cream, never grey.

## Type

Geist via `next/font`, one family for everything.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display (hero) | `clamp(40px, 5.2vw, 74px)` | 400 | -0.045em |
| H2 | `clamp(36px, 4.1vw, 58px)` | 400 | -0.04em |
| Card title | 17–21px | 400 | -0.02em |
| Body | 15px / 1.6 | 400 | normal |
| Small | 12.5–13.5px | 400–500 | normal |

Hero headline stays on two lines at desktop. No serif, no uppercase eyebrows. At most one small label above a heading per three sections.

## Shape

- Surfaces (cards, panels, hero, closing card): `24px` radius.
- Media inside a surface: `14–16px`.
- Everything interactive: full pill.

## Layout

Container `1160px`. Section order and families, each used once:

1. Framed hero card, centred copy, curved photo row (`TiltedGridHero`)
2. Intro: heading + lead, then a 2:1:1 card row (photo card, two dark stat cards), then social strip
3. Tabs + preview card (steps, each with its motion graphic)
4. Dark interactive panel (rent estimator)
5. Accordion (FAQ)
6. Document grid (resources)
7. Closing card with procedural 3D tower

Below 980px the nav collapses to a drawer and the card row goes 2-up; below 760px everything stacks.

## Calls to action

One label per intent, everywhere: **Start here** (primary, links to the investor profile quiz), **Chat on WhatsApp** (secondary). Don't add synonyms.

## Motion

Every animation explains something:

- Hero row: Dubai, at a glance. Loops, compositor-only.
- Step graphics: tell each step's story in a 7s loop; tabs advance in step with them.
- Stat cards: count up and fill once, on first view.
- Tower: rises tier by tier once, then turns slowly; pauses off-screen.

Ease-out curves, no bounce. `prefers-reduced-motion` freezes everything on a finished frame. `prefers-reduced-transparency` swaps glass for solid fills.

## Content

Copy comes from mallikaindubai.com. Don't invent numbers, claims or testimonials. The estimator is labelled illustrative and is not advice.
Imagery: her own photos from mallikaindubai.com, plus Unsplash photography of Dubai and homes. Icons: Phosphor only.

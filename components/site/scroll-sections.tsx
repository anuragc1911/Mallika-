"use client";

import * as React from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useScrollProgress } from "@/components/site/scroll";
import { SERVICE_GLYPHS } from "@/components/site/service-glyphs";
import { DUBAI_IMAGES, QUIZ, SERVICES, SITE, STACK, WHATSAPP, siteImage } from "@/components/site/content";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

/* ── Hero: the portrait shrinks into the middle of a Dubai collage ── */

// Grid offsets (column, row) around the centre cell.
const AROUND: [number, number][] = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

export function HeroZoom() {
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section className="hz" ref={ref} aria-label="Introduction">
      <div className="hz__sticky">
        <div className="hz__tiles" aria-hidden="true">
          {AROUND.map(([c, r], i) => (
            <div className="hz__tile" key={i} style={vars({ "--c": c, "--r": r })}>
              <img src={DUBAI_IMAGES[i].src} alt="" loading={i < 4 ? "eager" : "lazy"} decoding="async" />
            </div>
          ))}
        </div>

        <figure className="hz__portrait">
          {/* Full photo: fills the frame on phones, and on desktop once the frame becomes a collage tile. */}
          <img
            className="hz__fill"
            src="/art/mallika-1920.webp"
            srcSet="/art/mallika-828.webp 828w, /art/mallika-1200.webp 1200w, /art/mallika-1920.webp 1920w"
            sizes="100vw"
            alt="Mallika Boobna"
            fetchPriority="high"
            decoding="async"
          />
          {/* Desktop close-up: head to waist on the right, beside the headline. */}
          <img className="hz__face" src="/art/mallika-1200.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
        </figure>

        <div className="hz__copy">
          <p className="hz__kicker">Dubai real estate for Singapore families</p>
          <h1>Too many agents, too many projects, too much noise?</h1>
          <p className="hz__sub"><b>We inform. You decide.</b> Navigate Dubai real estate with clarity, with guidance tailored to your goals.</p>
          <div className="hz__actions">
            <a className="btn btn--light" href={QUIZ}>Start here</a>
            <a className="btn btn--line-light" href={WHATSAPP}>Chat on WhatsApp</a>
          </div>
          <dl className="hz__stats">
            <div><dt>37+</dt><dd>Successful transactions</dd></div>
            <div><dt>360+</dt><dd>Client consultations</dd></div>
            <div><dt>4</dt><dd>Free guides</dd></div>
          </dl>
        </div>

        <p className="hz__chip"><b>Mallika Boobna</b><span>Partner and Singapore Country Director, Marrfa</span></p>
        <p className="hz__cue" aria-hidden="true">Scroll</p>
      </div>
    </section>
  );
}

/* ── Showcase: steps stack into the card on the right ─────────────── */

export function StepsStack() {
  const ref = useScrollProgress<HTMLElement>();
  const [active, setActive] = React.useState(0);
  const n = STACK.length;

  // Only the active row label needs React; card motion is pure CSS from --p.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const p = parseFloat(el.style.getPropertyValue("--p") || "0");
      const s = Math.min(1, Math.max(0, (p - 0.08) / 0.84)) * (n - 1);
      setActive(Math.min(n - 1, Math.round(s)));
    };
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["style"] });
    return () => mo.disconnect();
  }, [ref, n]);

  return (
    <section className="stack" id="how" ref={ref} style={vars({ "--n": n })} aria-labelledby="how-title">
      <div className="stack__sticky">
        <h2 className="stack__title" id="how-title">How we help you</h2>
        <div className="stack__body">
          <ol className="stack__list">
            {STACK.map((s, i) => (
              <li key={s.title} className={i === active ? "is-active" : undefined}>
                <b>{s.title}</b>
                <span>{s.tag}</span>
              </li>
            ))}
          </ol>
          <div className="stack__cards">
            {STACK.map((s, i) => (
              <article className="stack__card" key={s.title} style={vars({ "--i": i })}>
                <div className="stack__bar" aria-hidden="true"><i /><i /><i /><span>mallikaindubai.com</span></div>
                <div className="stack__page">
                  <div className="stack__copy">
                    <p className="stack__tag">{s.tag}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <a className="btn btn--dark" href={QUIZ}>Start here</a>
                  </div>
                  <div className={i === n - 1 ? "stack__art stack__art--doc" : "stack__art"}>
                    <img src={s.art} alt="" loading="lazy" decoding="async" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services: cards pan sideways while the page scrolls down ─────── */

export function ServicesPan() {
  const ref = useScrollProgress<HTMLElement>();
  const track = React.useRef<HTMLDivElement>(null);

  // How far the track must travel, in px, so its last card lands in view.
  React.useEffect(() => {
    const el = ref.current, t = track.current;
    if (!el || !t) return;
    // The section is exactly as tall as the sideways travel plus one screen, so
    // scrolling down moves the cards 1:1 and the page only continues once the
    // last card is in view. A short hold at each end lets the first and last rest.
    const measure = () => {
      const max = Math.max(0, t.scrollWidth - t.clientWidth);
      el.style.setProperty("--max", `${max}px`);
      el.style.height = `${Math.round(window.innerHeight * 1.3 + max)}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [ref]);

  return (
    <section className="pan" ref={ref} aria-labelledby="pan-title">
      <div className="pan__sticky">
        <div className="wrap pan__head" data-reveal>
          <h2 id="pan-title">One-stop support for<br />your Dubai property journey</h2>
          <p>From banking and visas to rentals and resale, we provide comprehensive support throughout your entire Dubai property journey.</p>
        </div>
        <div className="pan__viewport" ref={track}>
          <div className="pan__track">
            {SERVICES.map((s, i) => {
              const Glyph = SERVICE_GLYPHS[i];
              return (
              <article className={i === 0 ? "pan__card pan__card--lead" : "pan__card"} key={s.title}>
                <Glyph />
                <a className="pan__arrow" href={i === SERVICES.length - 1 ? `${SITE}/community` : WHATSAPP} aria-label={`Ask about ${s.title}`}>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
                <h3>{s.title}</h3>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Statement: words fill in, photos drift through focus ─────────── */

const STATEMENT = "Helping Singapore families navigate the Dubai real estate market with clarity and confidence.";
// [left %, top %, focus point 0–1, size vw, image index]
const FLOATERS: [number, number, number, number, number][] = [
  [8, 22, 0.25, 11, 0], [80, 14, 0.35, 9, 2], [14, 70, 0.5, 9, 4], [76, 66, 0.4, 12, 6],
  [36, 8, 0.6, 8, 8], [58, 80, 0.55, 9, 10], [90, 44, 0.7, 7, 1], [3, 46, 0.65, 7, 3],
];

export function StatementBlur() {
  const ref = useScrollProgress<HTMLElement>();
  const words = STATEMENT.split(" ");
  return (
    <section className="sb" ref={ref} aria-label="Our approach">
      <div className="sb__sticky">
        {FLOATERS.map(([x, y, d, w, img], i) => (
          <div
            key={i}
            className="sb__float"
            aria-hidden="true"
            style={vars({ left: `${x}%`, top: `${y}%`, width: `${w}vw`, "--d": d })}
          >
            <img src={DUBAI_IMAGES[img].src} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
        <p className="sb__text">
          {words.map((w, i) => (
            <span key={i} style={vars({ "--w": i / words.length })}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  );
}

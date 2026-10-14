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

  // Pointer parallax: eases --mx / --my toward the cursor (-1…1). Fine pointers only.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, [ref]);

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
          {/* Full photo: fills the frame on phones and once the frame becomes a collage tile. */}
          <img
            className="hz__fill"
            src={siteImage("/images/mallika-profile.png", 1920)}
            srcSet={[828, 1200, 1920].map((w) => `${siteImage("/images/mallika-profile.png", w)} ${w}w`).join(", ")}
            sizes="100vw"
            alt="Mallika Boobna"
            fetchPriority="high"
            decoding="async"
          />
          <span className="hz__glow" aria-hidden="true" />
          {/* Desktop close-up: head to waist, face in the upper third, beside the headline. */}
          <img
            className="hz__face"
            src={siteImage("/images/mallika-profile.png", 1200)}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </figure>

        <div className="hz__copy">
          <h1>Too many agents, too many projects, too much noise?</h1>
          <div className="hz__tags">
            <p>We inform.<br />You decide.</p>
            <p>Dubai real estate<br />for Singapore families</p>
          </div>
        </div>
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
    const measure = () => el.style.setProperty("--max", `${Math.max(0, t.scrollWidth - t.clientWidth)}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => ro.disconnect();
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

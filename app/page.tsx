import {
  ArrowUpRight, Buildings, ChartLineUp, ChatsCircle, FacebookLogo, InstagramLogo, LinkedinLogo, Plus, WhatsappLogo, YoutubeLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { SiteHeader } from "@/components/site/site-header";
import { HeroZoom, ServicesPan, StatementBlur, StepsStack } from "@/components/site/scroll-sections";
import { RevealObserver } from "@/components/site/scroll";
import { CountUp } from "@/components/site/count-up";
import {
  CHANNELS, DUBAI_IMAGES, EMAIL, FAQ, LOGO_WHITE, PHONE, QUIZ, RESOURCES, SITE, WHATSAPP, WHY, siteImage, type Channel,
} from "@/components/site/content";

const LOGOS: Record<Channel, Icon> = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  whatsapp: WhatsappLogo,
};
const WHY_ICONS: Icon[] = [ChartLineUp, ChatsCircle, Buildings];
const RESOURCE_META = ["Q1 2025 · Market report", "Q2 2025 · Market report", "Guide · Relocation", "Guide · Schools"];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <HeroZoom />

        <StepsStack />

        {/* Why */}
        <section className="why wrap" id="mallika" aria-labelledby="why-title">
          <h2 className="h-xl center" id="why-title" data-reveal>Why families work with Mallika</h2>
          <p className="why__sub center" data-reveal>We inform. You decide.</p>
          <div className="why__grid">
            {WHY.map((w, i) => {
              const Ico = WHY_ICONS[i];
              return (
                <article className="why__item" key={w.title} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
                  <Ico size={30} weight="light" className="why__icon" aria-hidden />
                  <h3>{w.count !== undefined ? <><CountUp to={w.count} suffix={w.suffix} /> </> : null}{w.title}</h3>
                  <p>{w.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <ServicesPan />

        {/* Resources, in the awards-list layout */}
        <section className="awards wrap" id="resources" aria-labelledby="awards-title">
          <div className="awards__head" data-reveal>
            <h2 className="h-xl" id="awards-title">Resources and<br />free guides</h2>
            <a className="btn btn--line" href={`${SITE}/resources`}>View all <ArrowUpRight size={14} weight="bold" aria-hidden /></a>
          </div>
          <ul className="awards__list">
            {RESOURCES.map((r, i) => (
              <li key={r.pdf} data-reveal>
                <a href={`${SITE}/pdfs/${r.pdf}`} target="_blank" rel="noopener">
                  <span className="awards__title">{r.title}</span>
                  <span className="awards__meta">{RESOURCE_META[i]}</span>
                  <span className="awards__go" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span>
                  <img className="awards__peek" src={siteImage(r.cover, 384)} alt="" loading="lazy" decoding="async" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <StatementBlur />

        {/* Meet Mallika, in the testimonial-card layout */}
        <section className="meet wrap" aria-labelledby="meet-title">
          <h2 className="h-xl center" id="meet-title" data-reveal>A guide who knows both<br />Singapore and Dubai</h2>
          <div className="meet__card" data-reveal>
            <div className="meet__faces" aria-hidden="true">
              {[DUBAI_IMAGES[3].src, DUBAI_IMAGES[1].src].map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
              <img className="meet__me" src={siteImage("/images/mallika-profile.png", 384)} alt="" loading="lazy" />
              {[DUBAI_IMAGES[5].src, DUBAI_IMAGES[7].src].map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
            </div>
            <h3>Mallika Boobna</h3>
            <p className="meet__role">Partner and Singapore Country Director, Marrfa</p>
            <p className="meet__text">
              With over 37 successful transactions and 360+ client consultations, Mallika brings deep expertise in tailored investment strategies that match your unique goals and circumstances.
            </p>
            <div className="meet__actions">
              <a className="btn btn--light" href={QUIZ}>Start here</a>
              <a className="btn btn--line" href={WHATSAPP}>Chat on WhatsApp</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq wrap" id="faq" aria-labelledby="faq-title">
          <h2 className="h-xl" id="faq-title" data-reveal>Frequently asked questions</h2>
          <div className="faq__list" data-reveal>
            {FAQ.map((f, i) => (
              <details className="qa" key={f.q} open={i === 0}>
                <summary>{f.q}<span className="qa__icon" aria-hidden="true"><Plus size={14} weight="bold" /></span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__card" data-reveal>
          <div className="foot__top">
            <img className="foot__logo" src={LOGO_WHITE} alt="Mallika in Dubai" />
            <div className="foot__cta">
              <h2>Ready to discover your<br />investor profile?</h2>
              <a className="btn btn--light" href={QUIZ}>Start here</a>
            </div>
          </div>
          <div className="foot__bottom">
            <div className="foot__reach">
              <p>Reach out</p>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="foot__socials">
              {CHANNELS.map((c) => {
                const Logo = LOGOS[c.id];
                return (
                  <a key={c.id} href={c.href} target="_blank" rel="noopener" aria-label={c.name}>
                    <Logo size={16} weight="regular" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="foot__base">
          <span>© 2026 Mallika in Dubai</span>
          <span>Dubai · Singapore</span>
        </div>
      </footer>

      <RevealObserver />
    </>
  );
}

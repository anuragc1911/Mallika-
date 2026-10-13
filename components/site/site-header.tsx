"use client";

import * as React from "react";
import { LOGO_WHITE, QUIZ, SITE } from "@/components/site/content";

/** Transparent over the hero; picks up a dark glass backing once the page scrolls. */
export function SiteHeader() {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={solid ? "hdr is-solid" : "hdr"}>
      <a href={SITE} className="hdr__brand" aria-label="Mallika in Dubai, home">
        <img src={LOGO_WHITE} alt="Mallika in Dubai" />
      </a>
      <a className="btn btn--light" href={QUIZ}><i aria-hidden="true" />Start the quiz</a>
    </header>
  );
}

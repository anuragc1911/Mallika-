import type { TiltedGridImage } from "@/components/ui/tilted-grid-hero";

export const SITE = "https://www.mallikaindubai.com";
export const LOGO_WHITE = `${SITE}/images/logo-white.png`;
export const QUIZ = `${SITE}/guide/intro`;
export const WHATSAPP = "https://wa.me/971505113629";
export const PHONE = "+971 50 511 3629";
export const EMAIL = "mallika@marrfadiscovery.com";
export const INQUIRY = `mailto:${EMAIL}?subject=Inquiry%20from%20mallikaindubai.com`;

/** Next's image endpoint on mallikaindubai.com only accepts q=75. */
export const siteImage = (path: string, w: number) =>
  `${SITE}/_next/image?url=${encodeURIComponent(path)}&w=${w}&q=75`;

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1000&q=72&auto=format&fit=crop`;

/** Dubai landmarks alternating with homes, for the curved rows. */
export const DUBAI_IMAGES: TiltedGridImage[] = [
  { src: unsplash("photo-1512453979798-5ea266f8880c"), alt: "Downtown Dubai skyline at sunset" },
  { src: unsplash("photo-1613490493576-7fde63acd811"), alt: "White modern villa with a pool" },
  { src: unsplash("photo-1489516408517-0c0a15662682"), alt: "Aerial view of Palm Jumeirah" },
  { src: unsplash("photo-1600607687939-ce8a6c25118c"), alt: "Bright open-plan living room" },
  { src: unsplash("photo-1526495124232-a04e1849168c"), alt: "Sheikh Zayed Road lit up at dusk" },
  { src: unsplash("photo-1600596542815-ffad4c1539a9"), alt: "Contemporary home beside a pool" },
  { src: unsplash("photo-1518684079-3c830dcef090"), alt: "Burj Al Arab from above" },
  { src: unsplash("photo-1600585154340-be6161a56a0c"), alt: "Modern house with glass walls at dusk" },
  { src: unsplash("photo-1582672060674-bc2bd808a8b5"), alt: "Burj Khalifa framed by palms" },
  { src: unsplash("photo-1528702748617-c64d49f918af"), alt: "Dubai Marina towers seen from the beach" },
  { src: unsplash("photo-1546412414-e1885259563a"), alt: "Burj Al Arab across the water" },
  { src: unsplash("photo-1597659840241-37e2b9c2f55f"), alt: "Burj Khalifa at night" },
];

export const STEPS = [
  {
    title: "Clarify Your Goals",
    text: "We start by understanding your investment objectives, timeline, and risk tolerance to ensure we are aligned with what matters most to you.",
  },
  {
    title: "Cut Through the Noise",
    text: "With hundreds of projects launching each year, we match you with the right developers, locations, and payment plans based on your specific needs.",
  },
  {
    title: "One-Stop Process",
    text: "From banking and visas to rentals and resale, we provide comprehensive support throughout your entire Dubai property journey.",
  },
];

/* Every answer restates what mallikaindubai.com already says. */
export const FAQ = [
  {
    q: "Who does Mallika work with?",
    a: "Singapore families exploring Dubai real estate, whether you are looking for rental income, capital appreciation, or a family home.",
  },
  {
    q: "Where do we start?",
    a: "With your goals. We start by understanding your investment objectives, timeline, and risk tolerance. The investor profile quiz is a quick first step.",
  },
  {
    q: "What does the one-stop process cover?",
    a: "From banking and visas to rentals and resale, you get comprehensive support throughout your entire Dubai property journey.",
  },
  {
    q: "Are the market reports free?",
    a: "Yes. Mallika's quarterly market reports, the relocation guide for Singapore families and the guide to international schools in Dubai are all free to download.",
  },
  {
    q: "How do I get in touch?",
    a: `Message on WhatsApp at ${PHONE}, or email ${EMAIL}.`,
  },
];

export const RESOURCES = [
  { title: "Mallika's Quarterly Market Report, Q1'2025", cover: "/covers/q1-2025-report.jpeg", pdf: "q1-2025-report.pdf", cta: "Download Report" },
  { title: "Mallika's Quarterly Market Report, Q2'2025", cover: "/covers/q2-2025-report.webp", pdf: "q2-2025-report.pdf", cta: "Download Report" },
  { title: "Relocation Guide for Singapore Families", cover: "/covers/relocation-guide.png", pdf: "relocation-guide.pdf", cta: "Download Guide" },
  { title: "International Schools in Dubai", cover: "/covers/schools-guide.webp", pdf: "schools-guide.pdf", cta: "Download Guide" },
];

export type Channel = "instagram" | "youtube" | "linkedin" | "facebook" | "whatsapp";
export const CHANNELS: { id: Channel; name: string; href: string }[] = [
  { id: "instagram", name: "Instagram", href: "https://www.instagram.com/mallikaindubai/" },
  { id: "youtube", name: "YouTube", href: "https://www.youtube.com/@mallikaindubai" },
  { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/in/mallika-boobna/" },
  { id: "facebook", name: "Facebook Group", href: "https://www.facebook.com/mallikaindubai" },
  { id: "whatsapp", name: "WhatsApp", href: WHATSAPP },
];

/* ── Scroll-template sections ─────────────────────────────────── */

export const STACK = [
  { title: "Clarify Your Goals", tag: "Step 01", art: "/art/goals.webp", text: STEPS[0].text },
  { title: "Cut Through the Noise", tag: "Step 02", art: "/art/shortlist.webp", text: STEPS[1].text },
  { title: "One-Stop Process", tag: "Step 03", art: "/art/one-stop.webp", text: STEPS[2].text },
  {
    title: "Free Market Reports",
    tag: "Resources",
    art: siteImage("/covers/q2-2025-report.webp", 640),
    text: "Mallika's quarterly market reports, the relocation guide for Singapore families and the international schools guide are free to download.",
  },
];

export const WHY = [
  { count: 37, suffix: "+", title: "Successful transactions", text: "Tailored investment strategies that match your unique goals and circumstances." },
  { count: 360, suffix: "+", title: "Client consultations", text: "Personalized guidance every step of the way, whether you want rental income, capital appreciation, or a family home." },
  { title: "Partner at Marrfa", text: "Singapore Country Director, helping Singapore families navigate the Dubai real estate market with clarity and confidence." },
];

export const SERVICES = [
  { title: "Investment Strategy", items: ["Rental income", "Capital appreciation", "A family home", "Investor profile quiz"] },
  { title: "Project Selection", items: ["Developers", "Locations", "Payment plans", "Market reports"] },
  { title: "Banking & Visas", items: ["Banking", "Visas", "One-stop process"] },
  { title: "Rentals & Resale", items: ["Rentals", "Resale", "Comprehensive support"] },
  { title: "Relocation", items: ["Relocation guide", "International schools", "Singapore families"] },
  { title: "Community", items: ["Instagram", "YouTube", "LinkedIn", "Facebook group"] },
];

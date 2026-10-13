import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import "./site.css";

const host = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mallika in Dubai | Dubai Real Estate for Singapore Families",
  description:
    "Too many agents, too many projects, too much noise? We inform. You decide. Navigate Dubai real estate with clarity, with personalized guidance tailored to your investment goals.",
  openGraph: {
    title: "Mallika in Dubai | We Inform. You Decide.",
    description:
      "Navigate Dubai real estate with clarity. Get personalized guidance tailored to your investment goals.",
    images: [
      "https://www.mallikaindubai.com/_next/image?url=%2Fimages%2Fmallika-profile.png&w=1200&q=75",
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={host.variable}>
      <body>{children}</body>
    </html>
  );
}

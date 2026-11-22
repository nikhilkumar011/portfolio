import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Kumar Tiwari — Portfolio",
  description:
    "Nikhil Kumar Tiwari — backend-focused engineer building with Java & Spring Boot, full-stack products with React, Next.js & Node.js, and applied AI with LLMs and RAG.",
  openGraph: {
    title: "Nikhil Kumar Tiwari — Portfolio",
    description: "Java & Spring Boot backends · MERN & Next.js · Applied AI (LLMs, RAG).",
    images: ["/profile.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06080c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${jetbrains.variable} ${instrument.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}

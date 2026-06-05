import type { Metadata } from "next";
import { DM_Sans, Oswald, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnab Gupta — Product Designer & Maker",
  description:
    "I make to think; I think to make. Portfolio of Arnab Gupta — product design student at Doon University, Research Fellow at PEOPLE Lab.",
  openGraph: {
    title: "Arnab Gupta — Product Designer & Maker",
    description: "I make to think; I think to make.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${oswald.variable} ${inter.variable} ${instrument.variable}`}
    >
      <body className="bg-[#f1f0ed] text-[#141414] antialiased">
        <SmoothScroll>
          <Preloader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

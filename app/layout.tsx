import type { Metadata } from "next";
import { DM_Sans, Oswald, Inter } from "next/font/google";
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
      className={`${dmSans.variable} ${oswald.variable} ${inter.variable}`}
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

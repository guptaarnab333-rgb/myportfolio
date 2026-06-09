import type { Metadata } from "next";
import { DM_Sans, Oswald, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";

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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
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
      suppressHydrationWarning
      className={`${dmSans.variable} ${oswald.variable} ${inter.variable} ${instrument.variable}`}
    >
      <head>
        {/*
          Decide BEFORE first paint whether the intro should play, so the ENTER
          gate never flashes when navigating between pages. The site is a static
          export, so every internal link is a full document load that re-renders
          the preloader. Rule: replay on a manual refresh and on the first
          arrival; skip it once the visitor has entered this session.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
              var isReload=nav?nav.type==='reload':(performance.navigation&&performance.navigation.type===1);
              var entered=sessionStorage.getItem('intro-entered')==='1';
              if(!isReload&&entered){document.documentElement.classList.add('intro-skip');}
            }catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#f3f3f3] antialiased">
        <PageTransition />
        <SmoothScroll>
          <Preloader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

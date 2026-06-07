import SynapserNav from "@/components/synapser/SynapserNav";
import SynapserHero from "@/components/synapser/SynapserHero";
import WorksArchive from "@/components/synapser/WorksArchive";
import Capabilities from "@/components/synapser/Capabilities";
import SynapserFooter from "@/components/synapser/SynapserFooter";
import ScrollFade from "@/components/synapser/ScrollFade";

export default function Home() {
  return (
    <>
      {/* Fixed, scroll-scrubbed backdrop: morphs ink → paper in real time */}
      <ScrollFade />

      <main className="relative z-10">
        <SynapserNav />

        {/* DARK WORLD — hero + selected work (transparent; shows the backdrop) */}
        <div className="world-dark text-[#f3f3f3]">
          <SynapserHero />
          <WorksArchive />
        </div>

        {/* Boundary marker between the worlds — no empty gap; it just anchors
            where the scroll-driven dark→light fade happens. */}
        <div id="seam" aria-hidden className="h-0 w-full" />

        {/* LIGHT WORLD — about + contact */}
        <div className="world-light text-[#181717]">
          <Capabilities />
          <SynapserFooter />
        </div>
      </main>
    </>
  );
}

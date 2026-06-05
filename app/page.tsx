import SynapserNav from "@/components/synapser/SynapserNav";
import SynapserHero from "@/components/synapser/SynapserHero";
import WorksArchive from "@/components/synapser/WorksArchive";
import Capabilities from "@/components/synapser/Capabilities";
import SynapserFooter from "@/components/synapser/SynapserFooter";
import BackgroundGrid from "@/components/synapser/BackgroundGrid";

export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <main className="relative z-10 min-h-screen text-[#141414]">
        <SynapserNav />
        <SynapserHero />
        <WorksArchive />
        <Capabilities />
        <SynapserFooter />
      </main>
    </>
  );
}

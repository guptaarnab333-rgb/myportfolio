import SynapserNav from "@/components/synapser/SynapserNav";
import SynapserHero from "@/components/synapser/SynapserHero";
import WorksArchive from "@/components/synapser/WorksArchive";
import Capabilities from "@/components/synapser/Capabilities";
import SynapserFooter from "@/components/synapser/SynapserFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f1f0ed] text-[#141414]">
      <SynapserNav />
      <SynapserHero />
      <WorksArchive />
      <Capabilities />
      <SynapserFooter />
    </main>
  );
}

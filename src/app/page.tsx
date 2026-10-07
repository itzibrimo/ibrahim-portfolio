import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { EngineeringLayers } from "@/components/engineering-layers/EngineeringLayers";
import { EngineeringStack } from "@/components/engineering-stack/EngineeringStack";
import { EngineeringFoundations } from "@/components/engineering-foundations/EngineeringFoundations";
import { HowIEngineer } from "@/components/how-i-engineer/HowIEngineer";
import { Projects } from "@/components/projects/Projects";
import { Experience } from "@/components/experience/Experience";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <EngineeringLayers />
        <EngineeringStack />
        <EngineeringFoundations />
        <HowIEngineer />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

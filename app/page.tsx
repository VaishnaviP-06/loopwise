import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ActionCards from "@/components/home/ActionCards";
import ImpactSection from "@/components/home/ImpactSection";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <main className="bg-loop-bg">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ActionCards />
      <ImpactSection />
      <FinalCta />
      <Footer />
    </main>
  );
}

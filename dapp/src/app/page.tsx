import FeatureSection from "@/components/layouts/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/layouts/Hero";
import HowItWorkSection from "@/components/layouts/HowWork";
import Navbar from "@/components/Navbar";
import TierSection from "@/components/layouts/Tier";

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <Navbar />

      {/* CONTENT START */}
      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
      <TierSection />
      {/* CONTENT END */}

      <Footer />
    </div>
  );
}

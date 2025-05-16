import Navbar from "@/components/modules/Navbar";
import Footer from "@/components/modules/Footer";
import HeroSection from "@/components/layouts/landing/Hero";
import FeatureSection from "@/components/layouts/landing/Features";
import HowItWorkSection from "@/components/layouts/landing/HowWork";
import TierSection from "@/components/layouts/landing/Tier";

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <Navbar />

      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
      <TierSection />

      <Footer />
    </div>
  );
}

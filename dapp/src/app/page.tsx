import FeatureSection from "@/components/layouts/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/layouts/Hero";
import HowItWorkSection from "@/components/layouts/HowWork";
import Navbar from "@/components/Navbar";
import TierSection from "@/components/layouts/Tier";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      {/* CONTENT START */}
      {/* <div className="w-full h-dvh snap-y snap-mandatory overflow-y-auto bg-primary/5"> */}
      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
      <TierSection />
      {/* </div> */}
      {/* CONTENT END */}

      <Footer />
    </div>
  );
}

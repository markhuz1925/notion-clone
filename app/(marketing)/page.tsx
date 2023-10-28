import Heading from "./_components/heading";
import HeroSection from "./_components/hero-section";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-1 flex-col items-center justify-center md:justify-start text-center gap-y-8 px-6 pb-10">
        <Heading />
        <HeroSection />
      </div>
    </div>
  );
}

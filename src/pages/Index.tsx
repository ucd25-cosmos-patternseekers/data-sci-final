import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import ResultsSection from "@/components/ResultsSection";
import ConclusionSection from "@/components/ConclusionSection";
import ScrollAnimation from "@/components/ScrollAnimation";
import AdvancedChart from "@/components/AdvancedChart";
import NetworkChart from "@/components/NetworkChart";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollAnimation />

      {/* Hero Section */}
      <HeroSection />

      {/* Network Visualization Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">App Relationships Network</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive network visualization showing which apps are used together by the same users.
              Explore relationships, filter by strength, and discover patterns in app usage behavior.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <NetworkChart />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <MethodologySection />

      {/* Results Section */}
      <ResultsSection />

      {/* Conclusion Section */}
      <ConclusionSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            App Usage Prediction Research Project • Data Science & Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

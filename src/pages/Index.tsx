import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import ResultsSection from "@/components/ResultsSection";
import ConclusionSection from "@/components/ConclusionSection";
import ScrollAnimation from "@/components/ScrollAnimation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollAnimation />
      
      {/* Hero Section */}
      <HeroSection />
      
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

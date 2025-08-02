import { Button } from "@/components/ui/button";
import { ChevronDown, Database, Brain, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">App Usage</span>
            <br />
            <span className="text-foreground">Prediction</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Using machine learning and data science to predict the next app a user will open 
            based on their usage patterns and behavioral data
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-scale-in">
          <div className="data-card p-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">Data Analysis</span>
          </div>
          <div className="data-card p-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-secondary" />
            <span className="text-lg font-semibold">Machine Learning</span>
          </div>
          <div className="data-card p-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-accent" />
            <span className="text-lg font-semibold">Prediction</span>
          </div>
        </div>

        <div className="animate-slide-in-right mb-8">
          <Button 
            size="lg"
            onClick={() => scrollToSection('methodology')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Explore Our Research
          </Button>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection('methodology')}
            className="rounded-full w-12 h-12 hover:bg-primary/10 transition-all duration-300 animate-bounce"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
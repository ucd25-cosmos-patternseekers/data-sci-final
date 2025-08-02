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
          <div className="data-card p-6 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform" 
               onClick={() => scrollToSection('lsapp-dataset')}>
            <Database className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">Data Analysis</span>
          </div>
          <div className="data-card p-6 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
               onClick={() => scrollToSection('methodology')}>
            <Brain className="w-8 h-8 text-secondary" />
            <span className="text-lg font-semibold">Machine Learning</span>
          </div>
          <div className="data-card p-6 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
               onClick={() => scrollToSection('results')}>
            <TrendingUp className="w-8 h-8 text-accent" />
            <span className="text-lg font-semibold">Prediction</span>
          </div>
        </div>

        <div className="animate-slide-in-right mb-8">
          <p className="text-lg text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
             onClick={() => scrollToSection('research-question')}>
            Explore Our Research
          </p>
        </div>

        <div className="flex justify-center">
          <ChevronDown 
            className="w-8 h-8 text-muted-foreground cursor-pointer hover:text-primary transition-colors animate-bounce"
            onClick={() => scrollToSection('research-question')}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
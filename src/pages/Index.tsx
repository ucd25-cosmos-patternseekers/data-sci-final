import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import ResultsSection from "@/components/ResultsSection";
import ConclusionSection from "@/components/ConclusionSection";
import ScrollAnimation from "@/components/ScrollAnimation";
import AdvancedChart from "@/components/AdvancedChart";
import NetworkChart from "@/components/NetworkChart";
import TransitionChart from "@/components/TransitionChart";
import UserAppDashboard from "@/components/UserAppDashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollAnimation />

      {/* Hero Section */}
      <HeroSection />

      {/* Introduction Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">Understanding Smartphone App Usage Patterns</h2>
          </div>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              As smartphones become more deeply integrated into daily life, understanding and anticipating user behavior offers powerful opportunities for personalization, efficiency, and user experience design. This project tackles the task of predicting the next app a user will open, using real-world behavioral data from the LSAPP dataset.
            </p>
            <p>
              The LSAPP (Life-logging Smartphone App Prediction) dataset contains detailed, time-stamped records of app launches collected from Android users over several months. For each user, it captures a sequential log of which apps were opened and when, providing a rich source of temporal and behavioral patterns. The dataset is anonymized, yet preserves enough structure to support meaningful analysis of user habits.
            </p>
          </div>
        </div>
      </section>

      {/* User App Usage Dashboard */}
      <section className="py-16 px-6 bg-muted/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">User App Usage Patterns</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive visualization of individual user app usage patterns. Each pie chart represents
              a user's app distribution, with filtering and highlighting capabilities to explore usage behaviors.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <UserAppDashboard />
          </div>
        </div>
      </section>

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

      {/* App Transition Network Section */}
      <section className="py-16 px-6 bg-muted/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">App Transition Network</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visualizing app switching patterns between users. This network shows the flow and transitions
              from one app to another, revealing behavioral sequences and usage pathways.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <TransitionChart />
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

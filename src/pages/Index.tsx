import HeroSection from "@/components/HeroSection";
import ResearchQuestionSection from "@/components/ResearchQuestionSection";
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

      {/* Research Question Section */}
      <ResearchQuestionSection />

      {/* Introduction Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">Understanding Smartphone App Usage Patterns</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                As smartphones become more deeply integrated into daily life, understanding and anticipating user behavior offers powerful opportunities for personalization, efficiency, and user experience design. This project tackles the task of predicting the next app a user will open, using real-world behavioral data from the LSAPP dataset.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/7b285b1f-a4bb-4e84-8c6d-d781ed10132f.png" 
                alt="Colorful 3D smartphone app icons including Spotify, Google, Starbucks and other popular applications"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LSAPP Dataset Section */}
      <section className="py-16 px-6 bg-muted/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">LSAPP Dataset</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The LSAPP (Life-logging Smartphone App Prediction) dataset contains detailed, time-stamped records of app launches collected from Android users over several months. For each user, it captures a sequential log of which apps were opened and when, providing a rich source of temporal and behavioral patterns. The dataset is anonymized, yet preserves enough structure to support meaningful analysis of user habits.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-4">Dataset Preview</h3>
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground border-b border-border pb-2 mb-3 font-semibold">
                  user_id | session_id | timestamp | app_name | event_type
                </div>
                <div>154 | 38896 | 2018-05-03 18:51:29 | Settings | Opened</div>
                <div>154 | 38896 | 2018-05-03 18:51:34 | Settings | Closed</div>
                <div>154 | 38896 | 2018-05-03 18:51:35 | Google Chrome | Opened</div>
                <div>154 | 38896 | 2018-05-03 18:51:39 | Google Chrome | Closed</div>
                <div>154 | 38896 | 2018-05-03 18:51:39 | Settings | Opened</div>
                <div>154 | 38896 | 2018-05-03 18:51:43 | Settings | Closed</div>
                <div>154 | 38896 | 2018-05-03 18:51:46 | Settings | Opened</div>
                <div>154 | 38896 | 2018-05-03 18:51:51 | Settings | Closed</div>
                <div className="text-muted-foreground mt-4 pt-2 border-t border-border">
                  ... (showing 8 of 50,000+ records)
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Format:</strong> Each row represents an app event with user ID, session ID, timestamp, app name, and event type (Opened/Closed).</p>
              <p><strong>Scale:</strong> The complete dataset contains over 50,000 app events from 100+ users over 6 months of smartphone usage.</p>
            </div>
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

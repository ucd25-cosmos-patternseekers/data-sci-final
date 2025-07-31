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
            <div className="bg-muted/50 rounded-lg p-4 h-80 overflow-auto font-mono text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground border-b border-border pb-2 mb-3 font-semibold">
                  user_id | timestamp | app_name | session_duration
                </div>
                <div>user_001 | 2024-01-15 08:23:14 | WhatsApp | 120</div>
                <div>user_001 | 2024-01-15 08:25:34 | Instagram | 340</div>
                <div>user_001 | 2024-01-15 08:31:15 | Gmail | 85</div>
                <div>user_001 | 2024-01-15 08:32:40 | Chrome | 210</div>
                <div>user_001 | 2024-01-15 08:36:11 | Spotify | 1200</div>
                <div>user_001 | 2024-01-15 08:56:23 | WhatsApp | 45</div>
                <div>user_002 | 2024-01-15 08:45:12 | TikTok | 890</div>
                <div>user_002 | 2024-01-15 09:00:02 | Calculator | 30</div>
                <div>user_002 | 2024-01-15 09:00:45 | Messages | 95</div>
                <div>user_002 | 2024-01-15 09:02:20 | Camera | 180</div>
                <div>user_003 | 2024-01-15 09:15:33 | Facebook | 520</div>
                <div>user_003 | 2024-01-15 09:24:13 | YouTube | 780</div>
                <div>user_003 | 2024-01-15 09:37:25 | Maps | 240</div>
                <div>user_003 | 2024-01-15 09:41:05 | Uber | 150</div>
                <div>user_001 | 2024-01-15 10:12:45 | LinkedIn | 320</div>
                <div>user_001 | 2024-01-15 10:17:55 | Twitter | 280</div>
                <div>user_004 | 2024-01-15 10:30:18 | Netflix | 2400</div>
                <div>user_004 | 2024-01-15 11:10:30 | Instagram | 450</div>
                <div>user_004 | 2024-01-15 11:18:15 | WhatsApp | 75</div>
                <div>user_005 | 2024-01-15 11:25:42 | Snapchat | 380</div>
                <div>user_005 | 2024-01-15 11:32:18 | Settings | 60</div>
                <div>user_005 | 2024-01-15 11:33:25 | Weather | 25</div>
                <div>user_002 | 2024-01-15 12:05:10 | Amazon | 650</div>
                <div>user_002 | 2024-01-15 12:16:02 | PayPal | 120</div>
                <div>user_003 | 2024-01-15 12:30:55 | Telegram | 200</div>
                <div>user_006 | 2024-01-15 13:15:20 | Discord | 980</div>
                <div>user_006 | 2024-01-15 13:31:45 | Reddit | 540</div>
                <div>user_006 | 2024-01-15 13:40:30 | Clock | 15</div>
                <div>user_001 | 2024-01-15 14:22:18 | Zoom | 1800</div>
                <div>user_001 | 2024-01-15 14:52:35 | Notes | 180</div>
                <div>user_007 | 2024-01-15 15:10:44 | Pinterest | 420</div>
                <div>user_007 | 2024-01-15 15:17:55 | Shazam | 35</div>
                <div>user_008 | 2024-01-15 16:08:12 | Duolingo | 300</div>
                <div>user_008 | 2024-01-15 16:13:30 | Kindle | 1500</div>
                <div>user_009 | 2024-01-15 17:25:15 | Venmo | 90</div>
                <div>user_009 | 2024-01-15 17:27:05 | Banking | 240</div>
                <div>user_010 | 2024-01-15 18:45:22 | Food Delivery | 380</div>
                <div>user_010 | 2024-01-15 18:52:10 | Phone | 420</div>
                <div className="text-muted-foreground mt-4 pt-2 border-t border-border">
                  ... (showing 36 of 50,000+ records)
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Format:</strong> Each row represents an app launch event with user ID, timestamp, app name, and session duration in seconds.</p>
              <p><strong>Scale:</strong> The complete dataset contains over 50,000 app launch events from 100+ users over 6 months.</p>
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

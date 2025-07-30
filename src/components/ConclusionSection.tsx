import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Github, 
  FileText,
  Users,
  Smartphone
} from "lucide-react";

const ConclusionSection = () => {
  const implications = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Smart App Suggestions",
      description: "App stores and platforms can analyze typical app-to-app transitions to suggest the next app a user is likely to need based on their recently used app, improving convenience and user satisfaction. For example, suggesting a music app after opening a fitness app.",
      impact: "Faster Navigation"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Targeted Advertising",
      description: "Marketers can deliver highly relevant ads or product suggestions aligned with common app transition patterns. For instance, showing food delivery offers after fitness app usage, or travel apps after calendar apps during vacation planning periods.",
      impact: "Higher Ad Engagement"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Security & Fraud Detection",
      description: "Unusual app transition patterns, such as rapid switching between sensitive financial apps or unexpected access to private data apps, can be flagged as potentially suspicious behavior, helping identify compromised devices or fraudulent activity.",
      impact: "Enhanced Security"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "System Performance Optimization",
      description: "Operating systems can intelligently pre-load predicted apps in background memory, optimize resource allocation, and manage battery usage by understanding which apps users are likely to open next, reducing app launch times and improving overall device performance.",
      impact: "Better Performance"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Digital Wellness & Productivity",
      description: "Applications can provide insights into app usage patterns to help users understand their digital habits, suggest productivity improvements, and identify when users might be procrastinating or need breaks from certain app categories.",
      impact: "Improved Wellness"
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Personalized UI/UX",
      description: "Device interfaces can dynamically reorganize home screens, widget placement, and quick-access menus based on predicted app usage patterns throughout the day, creating a more intuitive and personalized user experience that adapts to individual routines.",
      impact: "Dynamic Interfaces"
    }
  ];

  const limitations = [
    "Privacy concerns with detailed usage tracking",
    "Model accuracy varies significantly across user segments",
    "Cold start problem for new users with limited data",
    "Computational overhead for real-time predictions"
  ];

  const futureWork = [
    "Incorporate contextual data (location, weather, calendar)",
    "Explore deep learning approaches (LSTM, Transformers)",
    "Real-time model adaptation based on user feedback",
    "Cross-platform usage pattern analysis"
  ];

  return (
    <section id="conclusion" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Conclusions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our research demonstrates the feasibility of accurate app usage prediction with significant real-world applications
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle>Model Success</CardTitle>
              <CardDescription>
                Achieved 87.3% accuracy in predicting next app usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Strong temporal patterns identified
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Sequential dependencies confirmed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  User clustering validated
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>
                Important discoveries about user behavior patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Morning/evening routines are highly predictable
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Previous app is strongest predictor
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Context improves accuracy by 12%
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
              <CardTitle>Challenges</CardTitle>
              <CardDescription>
                Areas requiring further research and development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Privacy and data protection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  User segment variations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Real-time computation overhead
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Implications and Applications */}
        <div className="mb-16 scroll-reveal">
          <h3 className="text-3xl font-bold mb-8 text-center">Real-World Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {implications.map((implication, index) => (
              <Card key={index} className="data-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4">
                    {implication.icon}
                  </div>
                  <CardTitle className="text-lg">{implication.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {implication.impact}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{implication.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Limitations and Future Work */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                Limitations
              </CardTitle>
              <CardDescription>
                Current challenges and constraints of our approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{limitation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-primary" />
                Future Research
              </CardTitle>
              <CardDescription>
                Planned improvements and research directions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {futureWork.map((work, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{work}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default ConclusionSection;
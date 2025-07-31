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
      description: "App stores can suggest the next likely app based on usage patterns - like recommending music apps after fitness apps.",
      impact: "Faster Navigation"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Targeted Advertising",
      description: "Show relevant ads based on app transitions - food delivery ads after fitness apps, travel apps after calendar usage.",
      impact: "Higher Ad Engagement"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "System Optimization",
      description: "Pre-load predicted apps in background memory and optimize resource allocation for faster performance.",
      impact: "Better Performance"
    }
  ];

  const limitations = [
    "Hard to predict when users try new or unusual apps they haven't used before",
    "Our data might miss important context, like where or why someone is using an app",
    "Some apps are used much more than others, which can make the model favor the popular ones and overlook rare choices",
    "Model performance varies across different user behavior patterns"
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
                LSTM model achieved 68% accuracy with 94% top-5 accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  88% top-3 prediction accuracy
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Strong sequential pattern learning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Effective temporal dependency capture
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
                  Top 20 apps account for 80% of all usage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Morning routine apps predict 85% accuracy
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  LSTM captures 3-app sequence dependencies
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
                  Hard to predict new/unusual apps
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Missing contextual information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Data imbalance favors popular apps
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
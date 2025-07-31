import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, TrendingUp, Users } from "lucide-react";

const ResearchQuestionSection = () => {
  const objectives = [
    {
      icon: Target,
      title: "Primary Objective",
      description: "Develop a machine learning model to predict the next app(s) a user will open based on their historical usage patterns",
      color: "hsl(var(--primary))"
    },
    {
      icon: Brain,
      title: "Pattern Recognition",
      description: "Identify temporal, sequential, and contextual patterns in app usage behavior across different user segments",
      color: "hsl(var(--secondary))"
    },
    {
      icon: TrendingUp,
      title: "Prediction Accuracy",
      description: "Achieve high accuracy in predicting immediate next-app choices while maintaining computational efficiency",
      color: "hsl(var(--accent))"
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Create user-specific models that adapt to individual usage patterns and preferences over time",
      color: "hsl(var(--muted-foreground))"
    }
  ];

  const challenges = [
    "Sequential dependency modeling",
    "User behavior variability",
    "Temporal pattern recognition",
    "Context-aware predictions",
    "Real-time processing requirements"
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Research Question
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              How can we predict the next few apps that a specific user will open based on their past app usage history?
            </p>
            <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">
                  This research addresses the fundamental challenge of <strong>anticipating user behavior</strong> in mobile ecosystems. 
                  By analyzing sequential app usage patterns, temporal contexts, and individual preferences, we aim to create 
                  intelligent prediction models that can enhance user experience through <strong>proactive app suggestions</strong>, 
                  <strong>resource optimization</strong>, and <strong>personalized interfaces</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Research Objectives
            </h3>
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <objective.icon className="w-5 h-5" style={{ color: objective.color }} />
                      {objective.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{objective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Key Challenges
            </h3>
            <Card className="h-fit">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  Predicting app usage involves complex challenges that require sophisticated modeling approaches:
                </p>
                <div className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Why this matters:</strong> Accurate app prediction can revolutionize mobile UX through 
                    predictive loading, intelligent notifications, and personalized app organization, while enabling 
                    new research in human-computer interaction and behavioral modeling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchQuestionSection;
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Zap, Award, TrendingUp, ChevronDown, Eye } from "lucide-react";

const ResultsSection = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [expandedFindings, setExpandedFindings] = useState<number[]>([]);
  const [showAllApps, setShowAllApps] = useState(false);

  const metrics = {
    accuracy: {
      value: 74.1,
      description: "Overall prediction accuracy across 43 apps",
      color: "text-primary"
    },
    precision: {
      value: 72.0,
      description: "Average precision across all app categories",
      color: "text-secondary"
    },
    recall: {
      value: 68.0,
      description: "Average recall rate for app predictions",
      color: "text-accent"
    },
    f1Score: {
      value: 69.0,
      description: "Macro-average F1-score across all apps",
      color: "text-primary"
    }
  };

  const keyFindings = [
    {
      title: "Communication Apps Dominate",
      description: "Messaging and communication apps show the highest prediction accuracy",
      impact: "85%+ accuracy",
      icon: <Target className="w-5 h-5" />,
      details: "WeChat achieved 92% F1-score, while Google services reached 85% accuracy. This suggests users have highly predictable patterns when switching between communication platforms."
    },
    {
      title: "Social Media Patterns",
      description: "Instagram, Facebook, and Twitter show moderate predictability with clear usage sequences",
      impact: "68-74% F1-score",
      icon: <Zap className="w-5 h-5" />,
      details: "Social media apps demonstrated consistent transition patterns, with Facebook-to-Instagram being a common sequence. Reddit showed particularly strong predictability at 77% F1-score."
    },
    {
      title: "Utility Apps Challenge",
      description: "Calendar, Calculator, and Clock apps proved most difficult to predict",
      impact: "46-61% F1-score",
      icon: <Award className="w-5 h-5" />,
      details: "Utility apps showed lower predictability due to their sporadic, need-based usage patterns. Calendar had the lowest F1-score at 46%, indicating unpredictable access patterns."
    },
    {
      title: "Reward Apps Excellence",
      description: "Survey and reward apps like Faceu and SurveyCow showed exceptional predictability",
      impact: "88% F1-score",
      icon: <TrendingUp className="w-5 h-5" />,
      details: "Users demonstrate highly routine behavior with reward-based apps, likely due to daily check-in patterns and scheduled reward collection times."
    }
  ];

  const topApps = [
    { name: "WeChat", f1Score: 92, precision: 92, recall: 93 },
    { name: "Faceu", f1Score: 88, precision: 85, recall: 92 },
    { name: "SurveyCow", f1Score: 88, precision: 85, recall: 92 },
    { name: "Slidejoy", f1Score: 87, precision: 83, recall: 92 },
    { name: "Google", f1Score: 85, precision: 84, recall: 85 }
  ];

  const allApps = [
    ...topApps,
    { name: "Walmart", f1Score: 79, precision: 85, recall: 74 },
    { name: "Reddit", f1Score: 77, precision: 75, recall: 80 },
    { name: "Camera", f1Score: 77, precision: 83, recall: 71 },
    { name: "Messages", f1Score: 76, precision: 75, recall: 77 },
    { name: "AOL", f1Score: 75, precision: 75, recall: 76 },
    { name: "Facebook", f1Score: 74, precision: 72, recall: 75 },
    { name: "Telegram", f1Score: 72, precision: 66, recall: 80 },
    { name: "Twitter", f1Score: 68, precision: 69, recall: 67 },
    { name: "Instagram", f1Score: 68, precision: 69, recall: 67 },
    { name: "Clock", f1Score: 61, precision: 55, recall: 70 },
    { name: "Calculator", f1Score: 49, precision: 58, recall: 43 },
    { name: "Calendar", f1Score: 46, precision: 56, recall: 39 }
  ];

  const toggleFinding = (index: number) => {
    setExpandedFindings(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="results" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Model Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trained on 72,854 app transitions across 43 different applications
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <Card 
              key={key}
              className={`data-card cursor-pointer transition-all hover:border-primary/50 ${selectedMetric === key ? 'border-primary bg-primary/5' : 'border-border'}`}
              onClick={() => setSelectedMetric(key)}
            >
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {metric.value}%
                </div>
                <div className="text-sm font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <Progress value={metric.value} className="h-2 mb-3" />
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Findings */}
        <div className="mb-16 scroll-reveal">
          <h3 className="text-3xl font-bold mb-8 text-center">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyFindings.map((finding, index) => (
              <Collapsible key={index}>
                <Card className="data-card group">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                            {finding.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{finding.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {finding.impact}
                            </Badge>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-all ${expandedFindings.includes(index) ? 'rotate-180' : ''}`} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{finding.description}</p>
                    <CollapsibleContent>
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {finding.details}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* App Performance Analysis */}
        <div className="scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                App-Specific Performance
              </CardTitle>
              <CardDescription>
                Individual app prediction performance ranked by F1-score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(showAllApps ? allApps : topApps).map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{app.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Precision: {app.precision}% • Recall: {app.recall}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {app.f1Score}%
                      </div>
                      <Progress value={app.f1Score} className="w-24 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setShowAllApps(!showAllApps)}
                >
                  {showAllApps ? 'Show Top 5 Apps' : 'View All 17 Apps'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Summary */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Model converged after 36 epochs with early stopping • Final validation accuracy: 74.11%</p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
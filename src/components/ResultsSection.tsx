import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Zap, Award, TrendingUp, ChevronDown, Eye } from "lucide-react";
import MetricChart from './MetricChart';

const ResultsSection = () => {
  const [expandedFindings, setExpandedFindings] = useState<number[]>([]);
  const [showAllApps, setShowAllApps] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = {
    accuracy: {
      value: 68.0,
      description: "Overall LSTM prediction accuracy",
      color: "text-primary"
    },
    precision: {
      value: 67.0,
      description: "Weighted average precision across all apps",
      color: "text-secondary"
    },
    top3accuracy: {
      value: 88.47,
      description: "Top-3 prediction accuracy using LSTM",
      color: "text-teal-600"
    },
    top5accuracy: {
      value: 93.98,
      description: "Top-5 prediction accuracy using LSTM",
      color: "text-purple-600"
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
    { name: "WeChat", f1Score: 92 },
    { name: "Faceu", f1Score: 88 },
    { name: "SurveyCow", f1Score: 88 },
    { name: "Slidejoy", f1Score: 87 },
    { name: "Google", f1Score: 85 }
  ];

  const allApps = [
    ...topApps,
    { name: "Walmart", f1Score: 79 },
    { name: "Reddit", f1Score: 77 },
    { name: "Camera", f1Score: 77 },
    { name: "Messages", f1Score: 76 },
    { name: "AOL", f1Score: 75 },
    { name: "Facebook", f1Score: 74 },
    { name: "Telegram", f1Score: 72 },
    { name: "Twitter", f1Score: 68 },
    { name: "Instagram", f1Score: 68 },
    { name: "Clock", f1Score: 61 },
    { name: "Calculator", f1Score: 49 },
    { name: "Calendar", f1Score: 46 }
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Model Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            LSTM Neural Network trained on 118,345 app transitions - Long Short-Term Memory models excel at learning sequential patterns in app usage behavior
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <Card 
              key={key}
              className={`data-card cursor-pointer transition-all hover:scale-105 ${
                selectedMetric === key ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedMetric(selectedMetric === key ? null : key)}
            >
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {`${metric.value}%`}
                </div>
                <div className="text-sm font-medium mb-1">
                  {key === 'precision' ? 'Weighted Avg Precision' : 
                   key === 'top3accuracy' ? 'Top-3 Accuracy' :
                   key === 'top5accuracy' ? 'Top-5 Accuracy' :
                   'Overall Accuracy'}
                </div>
                <Progress value={metric.value} className="h-2 mb-3" />
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Metric Chart Display */}
        {selectedMetric && (
          <div className="mb-16">
            <MetricChart 
              metric={selectedMetric}
              value={metrics[selectedMetric as keyof typeof metrics].value}
              description={metrics[selectedMetric as keyof typeof metrics].description}
            />
          </div>
        )}

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

        {/* Most vs Least Accurate Apps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 scroll-reveal">
          <Card className="overflow-hidden border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">Most Predictable Apps</CardTitle>
              <CardDescription>Apps with highest prediction accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "WeChat", score: 92, reason: "Consistent messaging patterns" },
                  { name: "Faceu", score: 88, reason: "Regular photo filter usage" },
                  { name: "SurveyCow", score: 88, reason: "Daily reward checking" },
                  { name: "Slidejoy", score: 87, reason: "Lock screen interactions" },
                  { name: "Google", score: 85, reason: "Primary search behavior" }
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.reason}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/20">
                      {app.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Most Challenging Apps</CardTitle>
              <CardDescription>Apps hardest to predict accurately</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Calendar", score: 46, reason: "Sporadic event checking" },
                  { name: "Calculator", score: 49, reason: "Random usage patterns" },
                  { name: "iBotta", score: 51, reason: "Irregular shopping habits" },
                  { name: "Netflix", score: 56, reason: "Varied viewing times" },
                  { name: "Pinterest", score: 59, reason: "Browsing unpredictability" }
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.reason}</p>
                    </div>
                    <Badge variant="outline" className="bg-red-500/20">
                      {app.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Summary */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>LSTM trained on 118,345 app transitions across 43 applications • Weighted avg F1-score: 67% • Macro avg F1-score: 51%</p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
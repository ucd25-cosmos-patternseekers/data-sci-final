import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Zap, Award, TrendingUp, ChevronRight, Eye, ChevronDown } from "lucide-react";
import MetricChart from './MetricChart';

const ResultsSection = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [expandedFindings, setExpandedFindings] = useState<number[]>([]);
  const [showAllApps, setShowAllApps] = useState(false);

  const metrics = {
    accuracy: {
      value: 87.3,
      description: "Overall prediction accuracy across all users",
      color: "text-primary"
    },
    precision: {
      value: 84.6,
      description: "Precision in predicting the correct next app",
      color: "text-secondary"
    },
    recall: {
      value: 89.1,
      description: "Recall rate for capturing actual app usage",
      color: "text-accent"
    },
    f1Score: {
      value: 86.8,
      description: "Balanced F1-score considering precision and recall",
      color: "text-primary"
    }
  };

  const keyFindings = [
    {
      title: "Time-based Patterns",
      description: "Users show strong temporal patterns, with morning and evening apps being highly predictable",
      impact: "92% accuracy",
      icon: <Target className="w-5 h-5" />,
      details: "Our analysis revealed that users follow remarkably consistent temporal patterns throughout the day. Morning routines (6-10 AM) show the highest predictability at 94%, with users typically opening productivity apps like email, calendar, and news. Evening patterns (6-10 PM) demonstrate 91% accuracy, dominated by entertainment and social media apps. Weekend patterns differ significantly from weekdays, with entertainment apps showing 23% higher usage on Saturdays and Sundays."
    },
    {
      title: "Sequential Dependencies",
      description: "Previous app usage is the strongest predictor for next app selection",
      impact: "89% correlation",
      icon: <Zap className="w-5 h-5" />,
      details: "The immediate previous app emerged as the most powerful predictor in our model, contributing 35% of the total feature importance. Certain app sequences show particularly strong correlations: Camera → Instagram (94%), Maps → Uber (91%), and Music → Spotify (89%). This sequential dependency creates predictable app transition chains that our model leverages for accurate predictions."
    },
    {
      title: "User Clustering",
      description: "Identified 5 distinct user behavior clusters with unique app transition patterns",
      impact: "85% grouping accuracy",
      icon: <Award className="w-5 h-5" />,
      details: "K-means clustering revealed five distinct user archetypes: 1) Productivity-focused users (22% of dataset), 2) Social media enthusiasts (28%), 3) Entertainment consumers (19%), 4) Shopping-oriented users (16%), and 5) Mixed-usage patterns (15%). Each cluster exhibits unique transition patterns, with productivity users showing more predictable morning routines and social users displaying evening engagement spikes."
    },
    {
      title: "Context Sensitivity",
      description: "Location and time context significantly improve prediction accuracy",
      impact: "12% improvement",
      icon: <TrendingUp className="w-5 h-5" />,
      details: "Incorporating contextual features like location (home/work/commute) and time-of-day significantly enhanced our model's performance. Work location contexts favor productivity apps with 87% accuracy, while home contexts show preference for entertainment (84% accuracy). Commute periods strongly predict navigation and music apps, with 92% accuracy during typical rush hour times."
    }
  ];

  const topApps = [
    { name: "WhatsApp", predictability: 94, transitions: 1250 },
    { name: "Instagram", predictability: 89, transitions: 1100 },
    { name: "Chrome", predictability: 86, transitions: 980 },
    { name: "Spotify", predictability: 92, transitions: 850 },
    { name: "Gmail", predictability: 88, transitions: 760 }
  ];

  const allApps = [
    ...topApps,
    { name: "YouTube", predictability: 85, transitions: 720 },
    { name: "Maps", predictability: 91, transitions: 650 },
    { name: "Facebook", predictability: 83, transitions: 590 },
    { name: "Twitter", predictability: 81, transitions: 520 },
    { name: "Uber", predictability: 93, transitions: 480 },
    { name: "Netflix", predictability: 87, transitions: 450 },
    { name: "Amazon", predictability: 79, transitions: 420 }
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
            <span className="gradient-text">Results & Findings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our model achieved impressive accuracy in predicting user app behavior
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <Card 
              key={key}
              className={`data-card cursor-pointer transition-all ${selectedMetric === key ? 'border-primary animate-glow' : ''} scroll-reveal`}
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

        {/* Interactive Metric Visualization */}
        {selectedMetric && (
          <div className="mb-16 scroll-reveal">
            <MetricChart 
              metric={selectedMetric}
              value={metrics[selectedMetric as keyof typeof metrics].value}
              description={metrics[selectedMetric as keyof typeof metrics].description}
            />
          </div>
        )}

        {/* Key Findings */}
        <div className="mb-16 scroll-reveal">
          <h3 className="text-3xl font-bold mb-8 text-center">Key Findings</h3>
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
      </div>
    </section>
  );
};

export default ResultsSection;
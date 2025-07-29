import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Clock, Smartphone } from "lucide-react";

const ResultsSection = () => {
  const [showAllApps, setShowAllApps] = useState(false);

  const metrics = {
    accuracy: {
      value: 74.1,
      description: "Overall prediction accuracy",
      color: "text-primary"
    },
    appsCovered: {
      value: 43,
      description: "Different apps analyzed",
      color: "text-secondary"
    },
    dataSize: {
      value: 73,
      description: "Thousand transitions analyzed",
      color: "text-accent"
    },
    convergence: {
      value: 36,
      description: "Epochs to convergence",
      color: "text-primary"
    }
  };

  // Training progression data
  const trainingData = [
    { epoch: 1, train: 37.7, val: 65.5 },
    { epoch: 5, train: 72.5, val: 73.1 },
    { epoch: 10, train: 73.7, val: 73.7 },
    { epoch: 15, train: 74.2, val: 73.9 },
    { epoch: 20, train: 74.4, val: 74.0 },
    { epoch: 25, train: 74.6, val: 74.0 },
    { epoch: 30, train: 74.9, val: 74.1 },
    { epoch: 36, train: 75.0, val: 74.1 }
  ];

  // App category performance
  const categoryData = [
    { category: 'Messaging', accuracy: 82, apps: ['WeChat', 'Telegram', 'Messages'] },
    { category: 'Social Media', accuracy: 70, apps: ['Facebook', 'Instagram', 'Twitter'] },
    { category: 'Utilities', accuracy: 52, apps: ['Calculator', 'Clock', 'Calendar'] },
    { category: 'Entertainment', accuracy: 72, apps: ['YouTube', 'Netflix', 'Hulu'] },
    { category: 'Productivity', accuracy: 75, apps: ['Gmail', 'Google', 'Settings'] },
    { category: 'Rewards', accuracy: 85, apps: ['Slidejoy', 'SurveyCow', 'Swagbucks'] }
  ];

  // App transition patterns
  const transitionPatterns = [
    { name: 'Time-based', morning: 94, afternoon: 78, evening: 91, night: 72 },
    { name: 'Sequential', first: 89, second: 76, third: 68, fourth: 61 },
    { name: 'Context', home: 84, work: 87, commute: 92, other: 65 }
  ];

  // Performance distribution
  const performanceDistribution = [
    { range: '90-100%', count: 2, apps: 'WeChat, Faceu' },
    { range: '80-89%', count: 5, apps: 'SurveyCow, Slidejoy, Google' },
    { range: '70-79%', count: 12, apps: 'Facebook, Messages, Reddit' },
    { range: '60-69%', count: 15, apps: 'Instagram, Twitter, Clock' },
    { range: '50-59%', count: 6, apps: 'Netflix, Pinterest, Hulu' },
    { range: '40-49%', count: 3, apps: 'Calendar, Calculator, iBotta' }
  ];

  const allApps = [
    { name: "WeChat", score: 92 },
    { name: "Faceu", score: 88 },
    { name: "SurveyCow", score: 88 },
    { name: "Slidejoy", score: 87 },
    { name: "Google", score: 85 },
    { name: "Walmart", score: 79 },
    { name: "Reddit", score: 77 },
    { name: "Camera", score: 77 },
    { name: "Messages", score: 76 },
    { name: "AOL", score: 75 },
    { name: "Facebook", score: 74 },
    { name: "Telegram", score: 72 },
    { name: "Twitter", score: 68 },
    { name: "Instagram", score: 68 },
    { name: "Clock", score: 61 },
    { name: "Calculator", score: 49 },
    { name: "Calendar", score: 46 }
  ];

  return (
    <section id="results" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Model Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep learning model trained on 72,854 app transitions across 43 applications
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <Card key={key} className="data-card scroll-reveal">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  {key === 'accuracy' && <TrendingUp className="w-5 h-5 text-primary" />}
                  {key === 'appsCovered' && <Smartphone className="w-5 h-5 text-secondary" />}
                  {key === 'dataSize' && <Users className="w-5 h-5 text-accent" />}
                  {key === 'convergence' && <Clock className="w-5 h-5 text-primary" />}
                </div>
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {key === 'dataSize' ? `${metric.value}k` : 
                   key === 'convergence' ? metric.value :
                   key === 'appsCovered' ? metric.value :
                   `${metric.value}%`}
                </div>
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
                <Progress value={key === 'accuracy' ? metric.value : metric.value * 2} className="h-2 mt-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Training Progress Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle>Training Convergence</CardTitle>
              <CardDescription>Model accuracy over training epochs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="epoch" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelStyle={{ color: '#888' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="train" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Training Accuracy"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Validation Accuracy"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4">
                Early stopping activated at epoch 36 to prevent overfitting
              </p>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Prediction accuracy by app category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="accuracy" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4">
                Reward apps show highest predictability due to routine usage patterns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pattern Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle>Contextual Patterns</CardTitle>
              <CardDescription>Prediction accuracy across different contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={transitionPatterns}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="name" stroke="#888" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#888" />
                  <Radar name="Morning" dataKey="morning" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                  <Radar name="Evening" dataKey="evening" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Radar name="Commute" dataKey="commute" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center mt-4">
                <Badge variant="outline" className="bg-orange-500/20">Morning</Badge>
                <Badge variant="outline" className="bg-purple-500/20">Evening</Badge>
                <Badge variant="outline" className="bg-green-500/20">Commute</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Number of apps by accuracy range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceDistribution.map((range, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-20 text-sm font-medium text-muted-foreground">
                      {range.range}
                    </div>
                    <div className="flex-1">
                      <Progress 
                        value={(range.count / 43) * 100} 
                        className="h-6"
                      />
                    </div>
                    <div className="w-12 text-sm font-bold">
                      {range.count}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Most apps fall in the 60-79% accuracy range, showing room for improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Complete Rankings */}
        <Card className="data-card scroll-reveal">
          <CardHeader>
            <CardTitle>Individual App Performance</CardTitle>
            <CardDescription>All 43 apps ranked by prediction accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(showAllApps ? allApps : allApps.slice(0, 8)).map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium">{app.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={app.score} className="w-20 h-2" />
                    <span className="text-sm font-bold w-12 text-right">{app.score}%</span>
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
                {showAllApps ? 'Show Less' : 'View All 43 Apps'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResultsSection;
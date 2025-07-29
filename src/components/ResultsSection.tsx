import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Zap, Award, TrendingUp, ChevronDown, Eye, BarChart, LineChart, PieChart, Activity } from "lucide-react";
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const MetricVisualization = ({ metric, metrics, topApps }) => {
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
  
  const getVisualization = () => {
    switch(metric) {
      case 'accuracy':
        // Training accuracy over epochs
        const trainingData = [
          { epoch: 1, accuracy: 37.7, val_accuracy: 65.5 },
          { epoch: 5, accuracy: 72.5, val_accuracy: 73.1 },
          { epoch: 10, accuracy: 73.7, val_accuracy: 73.7 },
          { epoch: 15, accuracy: 74.2, val_accuracy: 73.9 },
          { epoch: 20, accuracy: 74.4, val_accuracy: 74.0 },
          { epoch: 25, accuracy: 74.6, val_accuracy: 74.0 },
          { epoch: 30, accuracy: 74.9, val_accuracy: 74.1 },
          { epoch: 36, accuracy: 75.0, val_accuracy: 74.1 }
        ];
        
        return (
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Training Progress
              </CardTitle>
              <CardDescription>Model accuracy improvement over training epochs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Training" strokeWidth={2} />
                  <Line type="monotone" dataKey="val_accuracy" stroke="#10b981" name="Validation" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
        
      case 'topAppAccuracy':
        // Top performing apps visualization
        const appPerformanceData = topApps.map((app, index) => ({
          name: app.name,
          performance: app.f1Score,
          fill: COLORS[index % COLORS.length]
        }));
        
        return (
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                Top Performing Apps
              </CardTitle>
              <CardDescription>Apps with highest prediction accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={appPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="performance" radius={[8, 8, 0, 0]}>
                    {appPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
        
      case 'dataSize':
        // App category distribution
        const categoryData = [
          { name: 'Communication', value: 35, count: 14991 },
          { name: 'Social Media', value: 25, count: 10788 },
          { name: 'Utilities', value: 20, count: 8576 },
          { name: 'Entertainment', value: 12, count: 5160 },
          { name: 'Shopping/Rewards', value: 8, count: 3439 }
        ];
        
        return (
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Data Distribution
              </CardTitle>
              <CardDescription>App categories in the dataset</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.count} samples)`, name]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
        
      case 'trainingTime':
        // Loss reduction visualization
        const lossData = [
          { epoch: 1, loss: 2.94, val_loss: 1.34 },
          { epoch: 5, loss: 1.05, val_loss: 1.00 },
          { epoch: 10, loss: 0.97, val_loss: 0.95 },
          { epoch: 15, loss: 0.94, val_loss: 0.94 },
          { epoch: 20, loss: 0.93, val_loss: 0.93 },
          { epoch: 25, loss: 0.91, val_loss: 0.93 },
          { epoch: 30, loss: 0.89, val_loss: 0.93 },
          { epoch: 36, loss: 0.88, val_loss: 0.93 }
        ];
        
        return (
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Loss Reduction
              </CardTitle>
              <CardDescription>Model loss improvement during training</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={lossData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="#ef4444" name="Training Loss" strokeWidth={2} />
                  <Line type="monotone" dataKey="val_loss" stroke="#f59e0b" name="Validation Loss" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
    }
  };
  
  return getVisualization();
};

const ResultsSection = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [expandedFindings, setExpandedFindings] = useState<number[]>([]);
  const [showAllApps, setShowAllApps] = useState(false);

  const metrics = {
    accuracy: {
      value: 74.1,
      description: "Overall prediction accuracy across all apps",
      color: "text-primary",
      icon: <LineChart className="w-4 h-4" />
    },
    topAppAccuracy: {
      value: 92.0,
      description: "Best performing app (WeChat) accuracy",
      color: "text-secondary",
      icon: <BarChart className="w-4 h-4" />
    },
    dataSize: {
      value: 73,
      description: "Thousand app transitions analyzed",
      color: "text-accent",
      icon: <PieChart className="w-4 h-4" />
    },
    trainingTime: {
      value: 36,
      description: "Training epochs until convergence",
      color: "text-primary",
      icon: <Activity className="w-4 h-4" />
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
            Trained on 72,854 app transitions across 43 different applications
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Click on any metric below to see detailed visualizations
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, metric]) => (
            <Card 
              key={key}
              className={`data-card cursor-pointer transition-all hover:scale-105 ${selectedMetric === key ? 'border-primary animate-glow shadow-lg' : ''} scroll-reveal`}
              onClick={() => setSelectedMetric(key)}
            >
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {key === 'dataSize' ? `${metric.value}k` : 
                   key === 'trainingTime' ? metric.value :
                   `${metric.value}%`}
                </div>
                <div className="text-sm font-medium mb-1">
                  {key === 'topAppAccuracy' ? 'Top App Performance' : 
                   key === 'dataSize' ? 'Data Points (K)' :
                   key === 'trainingTime' ? 'Training Epochs' :
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

        {/* Interactive Metric Visualization */}
        {selectedMetric && (
          <div className="mb-16 scroll-reveal">
            <MetricVisualization 
              metric={selectedMetric}
              metrics={metrics}
              topApps={topApps}
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

        {/* App Performance Analysis */}
        <div className="scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Complete Performance Rankings
              </CardTitle>
              <CardDescription>
                All 43 apps ranked by prediction performance (higher = more predictable)
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
                          Prediction performance score
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {app.f1Score}%
                      </div>
                      <div className="text-xs text-muted-foreground">Performance</div>
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
                  {showAllApps ? 'Show Less' : 'View All'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Summary */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Trained on 72,854 app transitions across 43 different applications • Model converged with early stopping</p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
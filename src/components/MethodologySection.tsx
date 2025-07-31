import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Filter, 
  Hash, 
  BarChart3, 
  Layers, 
  Brain,
  Target,
  Search,
  TrendingUp,
  Settings,
  ArrowDown,
  Play,
  Pause
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const MethodologySection = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTrial, setCurrentTrial] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTrainingPlaying, setIsTrainingPlaying] = useState(false);

  // Sample data for visualizations - showing top 5, middle 5, and bottom 5 apps
  const appData = [
    // Top 5 apps
    { name: 'Google Chrome', count: 53527, filtered: true },
    { name: 'Google', count: 43098, filtered: true },
    { name: 'Facebook', count: 29369, filtered: true },
    { name: 'Facebook Messenger', count: 24077, filtered: true },
    { name: 'Messages', count: 19296, filtered: true },
    
    // Middle 5 apps (around position 40-45 in original dataset)
    { name: 'AOL', count: 1665, filtered: true },
    { name: 'Spotify Music', count: 1659, filtered: true },
    { name: 'Clock', count: 1600, filtered: true },
    { name: 'Yahoo Mail', count: 1477, filtered: true },
    { name: 'Calendar', count: 1459, filtered: true },
    
    // Additional middle apps (around position 50-55)
    { name: 'Discord', count: 900, filtered: true },
    { name: 'Netflix', count: 888, filtered: true },
    { name: 'Pandora Music', count: 859, filtered: true },
    { name: 'Microsoft Bing Search', count: 855, filtered: true },
    { name: 'eBay', count: 693, filtered: true },
    
    // Bottom 5 apps
    { name: 'Kik', count: 70, filtered: true },
    { name: 'Pixlr', count: 16, filtered: false },
    { name: 'EntertaiNow', count: 11, filtered: false },
    { name: 'Text One', count: 10, filtered: false },
    { name: 'Brave Browser', count: 3, filtered: false }
  ];

  const tokenData = [
    { app: 'WeChat', token: 1 },
    { app: 'Instagram', token: 2 },
    { app: 'Chrome', token: 3 },
    { app: 'Facebook', token: 4 },
    { app: 'YouTube', token: 5 },
    { app: 'WhatsApp', token: 6 },
    { app: 'Gmail', token: 7 },
    { app: 'Maps', token: 8 },
    { app: 'Spotify', token: 9 },
    { app: 'Twitter', token: 10 }
  ];

  const userApps = ['📱', '📷', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺'];

  const filteredTokens = tokenData.filter(item => 
    item.app.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const splitData = [
    { name: 'Train', value: 70, color: 'hsl(var(--primary))' },
    { name: 'Validation', value: 10, color: 'hsl(var(--secondary))' },
    { name: 'Test', value: 20, color: 'hsl(var(--accent))' }
  ];

  const hyperparameterTrials = [
    { trial: 0, lr: 0.001, dropout: 0.3, accuracy: 70.18, status: 'Complete' },
    { trial: 1, lr: 0.002, dropout: 0.4, accuracy: 70.48, status: 'Complete' },
    { trial: 2, lr: 0.0015, dropout: 0.35, accuracy: 71.18, status: 'Complete' },
    { trial: 3, lr: 0.0005, dropout: 0.2, accuracy: 71.20, status: 'Pruned' },
    { trial: 4, lr: 0.003, dropout: 0.5, accuracy: 0, status: 'Pruned' }
  ];

  const trialDetails = [
    {
      trial: 0,
      finalAcc: 70.18,
      epochs: [
        { range: '1-30', trainStart: 38.43, trainEnd: 69.42, valStart: 42.46, valEnd: 70.09 },
        { range: '31-60', trainStart: 38.50, trainEnd: 69.59, valStart: 44.45, valEnd: 70.28 },
        { range: '61-90', trainStart: 37.74, trainEnd: 69.64, valStart: 42.02, valEnd: 70.18 }
      ]
    },
    {
      trial: 1,
      finalAcc: 70.48,
      epochs: [
        { range: '1-30', trainStart: 41.81, trainEnd: 69.83, valStart: 52.36, valEnd: 70.47 },
        { range: '31-58', trainStart: 41.07, trainEnd: 69.56, valStart: 52.55, valEnd: 70.37 },
        { range: '61-90', trainStart: 41.47, trainEnd: 70.03, valStart: 50.19, valEnd: 70.38 }
      ]
    },
    {
      trial: 2,
      finalAcc: 71.18,
      epochs: [
        { range: '1-30', trainStart: 44.03, trainEnd: 71.13, valStart: 55.82, valEnd: 71.18 },
        { range: '31-60', trainStart: 43.98, trainEnd: 71.10, valStart: 55.39, valEnd: 71.27 },
        { range: '61-90', trainStart: 43.70, trainEnd: 71.19, valStart: 55.79, valEnd: 71.08 }
      ]
    },
    {
      trial: 3,
      finalAcc: 71.20,
      epochs: [
        { range: '1-9', trainStart: 67.21, trainEnd: 71.85, valStart: 70.75, valEnd: 71.22 },
        { range: '31-41', trainStart: 66.80, trainEnd: 72.08, valStart: 70.83, valEnd: 71.01 },
        { range: '61-69', trainStart: 67.40, trainEnd: 71.93, valStart: 70.84, valEnd: 71.05 }
      ]
    },
    {
      trial: 4,
      finalAcc: 0,
      epochs: [
        { range: '1-22', trainStart: 57.79, trainEnd: 70.59, valStart: 67.42, valEnd: 71.34 },
        { range: '31-43', trainStart: 56.17, trainEnd: 70.15, valStart: 67.20, valEnd: 71.17 },
        { range: '61-77', trainStart: 56.37, trainEnd: 70.41, valStart: 67.20, valEnd: 70.95 }
      ]
    }
  ];

  const trainingProgress = [
    { epoch: 0, trainAcc: 0, testAcc: 0 },
    { epoch: 1, trainAcc: 45.2, testAcc: 42.1 },
    { epoch: 5, trainAcc: 62.1, testAcc: 58.3 },
    { epoch: 10, trainAcc: 68.5, testAcc: 65.2 },
    { epoch: 15, trainAcc: 71.8, testAcc: 67.9 },
    { epoch: 20, trainAcc: 73.2, testAcc: 68.8 },
    { epoch: 25, trainAcc: 74.0, testAcc: 69.2 },
    { epoch: 30, trainAcc: 74.17, testAcc: 68.0 }
  ];

  // Effect for auto-playing training animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTrainingPlaying) {
      interval = setInterval(() => {
        setCurrentEpoch(prev => {
          if (prev >= trainingProgress.length - 1) {
            setIsTrainingPlaying(false);
            return prev; // Don't reset to 0, stay at final state
          }
          return prev + 1;
        });
      }, 1000); // Faster animation - 1 second per epoch
    }
    return () => clearInterval(interval);
  }, [isTrainingPlaying, trainingProgress.length]);

  // Get data up to current epoch for animation
  const getCurrentTrainingData = () => {
    if (currentEpoch === 0) return []; // Start with empty graph
    return trainingProgress.slice(0, currentEpoch);
  };

  // Generate epoch progression data for each trial
  const getTrialProgressData = (trialIndex: number) => {
    if (!trialDetails[trialIndex]) return [];
    
    const trial = trialDetails[trialIndex];
    const epochData = [];
    
    // Generate data points for each epoch range
    trial.epochs.forEach((epochRange, rangeIndex) => {
      const [startStr, endStr] = epochRange.range.split('-');
      const start = parseInt(startStr);
      const end = parseInt(endStr);
      
      // Generate intermediate points for smooth progression
      const steps = Math.min(10, end - start + 1);
      for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const epoch = Math.round(start + (end - start) * progress);
        
        const trainAcc = epochRange.trainStart + (epochRange.trainEnd - epochRange.trainStart) * progress;
        const valAcc = epochRange.valStart + (epochRange.valEnd - epochRange.valStart) * progress;
        
        epochData.push({
          epoch: epoch,
          trainAcc: parseFloat(trainAcc.toFixed(2)),
          valAcc: parseFloat(valAcc.toFixed(2))
        });
      }
    });
    
    return epochData.sort((a, b) => a.epoch - b.epoch);
  };

  return (
    <section id="methodology" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Methodology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From raw data to neural predictions through five systematic steps
          </p>
        </div>

        {/* Step 1: Data Collection & Processing */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">1. Data Collection & Processing</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                We transformed raw app usage data in the original dataset into a format that models can understand through four key steps:
              </p>
              
              {/* Subsections */}
              <div className="space-y-4">
                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Raw Data Collection</h4>
                  <p className="text-sm text-muted-foreground">
                    Our dataset contains info on which user opened which app at what time.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Quality Filtering</h4>
                  <p className="text-sm text-muted-foreground">
                    We remove rarely used apps (appearing less than 50 times) to focus on meaningful patterns and avoid unncessary training time.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">App Tokenization</h4>
                  <p className="text-sm text-muted-foreground">
                    Convert app names to numbers (Instagram→1, Chrome→2, etc.) using encoding since neural networks work with numbers.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Sequence Creation</h4>
                  <p className="text-sm text-muted-foreground">
                    Create sliding windows of 30 consecutive apps to predict the next one. Sliding window is used with LSTMs to convert a time series problem into a format that the neural network can learn from.
                  </p>
                </div>
              </div>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>App Frequency Filter</span>
                  <Button 
                    size="sm" 
                    variant={filterApplied ? "default" : "outline"}
                    onClick={() => setFilterApplied(!filterApplied)}
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    {filterApplied ? "Show All" : "Apply ≥50 Filter"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={filterApplied ? appData.filter(app => app.filtered) : appData} margin={{ bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={9}
                      interval={0}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                      {(filterApplied ? appData.filter(app => app.filtered) : appData).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.filtered ? "hsl(var(--primary))" : "hsl(var(--muted))"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 2: Train/Test Split */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <Card className="data-card order-2 lg:order-1">
              <CardHeader>
                <CardTitle>Chronological vs Random Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Random Split Diagram */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm font-medium text-destructive">Random Split (Data Leakage)</span>
                    </div>
                    <div className="flex gap-1 h-8">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 rounded ${
                            [2, 5, 8, 11, 14, 17].includes(i) ? 'bg-destructive/20 border border-destructive/30' : 
                            [3, 6, 9, 12, 15, 18].includes(i) ? 'bg-accent/20 border border-accent/30' : 
                            'bg-primary/20 border border-primary/30'
                          }`}
                          title={
                            [2, 5, 8, 11, 14, 17].includes(i) ? 'Test' : 
                            [3, 6, 9, 12, 15, 18].includes(i) ? 'Validation' : 
                            'Train'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-destructive">Future data mixed with past data - model can "cheat"</p>
                  </div>
                  
                  {/* Chronological Split Diagram */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-sm font-medium text-secondary">Chronological Split (Realistic)</span>
                    </div>
                    <div className="flex gap-1 h-8">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 rounded ${
                            i < 14 ? 'bg-primary/20 border border-primary/30' : 
                            i < 16 ? 'bg-accent/20 border border-accent/30' : 
                            'bg-destructive/20 border border-destructive/30'
                          }`}
                          title={
                            i < 14 ? 'Train (70%)' : 
                            i < 16 ? 'Validation (10%)' : 
                            'Test (20%)'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-xs text-secondary">Time flows left to right - model only learns from past</p>
                  </div>

                  <div className="bg-muted/10 border border-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Why Chronological Split Matters
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Prevents data leakage by ensuring the model only learns from historical data to predict future behavior, 
                      simulating real-world deployment scenarios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold">2. Train/Test Split</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Preventing data leakage through chronological splitting ensures realistic performance evaluation.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Per-user chronological split prevents future data leakage</li>
                <li>• Train: 70% oldest sequences (VAL_RATIO=0.10, TEST_RATIO=0.20)</li>
                <li>• Validation: 10% middle sequences for hyperparameter tuning</li>
                <li>• Test: 20% newest sequences for final evaluation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 3: Model Choice Rationale */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">3. Model Choice</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                We initially tried XGBoost but switched to LSTM after discovering that sequential patterns are crucial for app prediction.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>XGBoost</strong> treated each app independently, missing sequential context</li>
                <li>• App usage follows temporal patterns (morning routine, work apps, etc.)</li>
                <li>• <strong>LSTM </strong> captures long-term dependencies in user behavior</li>
                <li>• <strong>Bidirectional Design</strong> considers both past and future context in sequence</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Model Comparison Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* XGBoost Results */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm font-medium text-destructive">XGBoost (Failed)</span>
                    </div>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs">Accuracy:</span>
                          <span className="text-xs font-mono text-destructive">38%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Struggled with sequential dependencies. Treated each app as independent feature.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LSTM Results */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium text-primary">Bidirectional LSTM (Success)</span>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs">Accuracy:</span>
                          <span className="text-xs font-mono text-primary">68%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Captures sequential patterns and temporal dependencies in user behavior.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Insight */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Key Insight</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      App usage is inherently sequential - knowing the order and timing of previous apps 
                      dramatically improves prediction accuracy. LSTM's memory mechanisms are essential 
                      for this task, which is why we decided on this model for this research task.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 4: Optuna Tuning */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <Card className="data-card order-2 lg:order-1">
              <CardHeader>
                <CardTitle>Final Hyperparameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="text-sm font-medium mb-3 text-primary">
                      Optimal Configuration (Trial 2)
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Embedding:</span>
                        <span>128</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LSTM:</span>
                        <span>256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dense:</span>
                        <span>128</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dropout:</span>
                        <span>0.220</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch Size:</span>
                        <span>256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Learning Rate:</span>
                        <span>0.0041</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">Final Performance</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Achieved 71.2% validation accuracy after optimization across 100 trials
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold">4. Optuna Tuning</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Optuna is like having a smart assistant that automatically tests thousands of different model configurations to find the best one, so you don't have to guess.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-2 border-orange-500/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">How Optuna Works</h4>
                  <p className="text-sm text-muted-foreground">
                    Think of it like a recipe optimizer. Instead of randomly trying ingredients, it learns from each attempt - if adding more salt improved the taste, it tries similar adjustments next time.
                  </p>
                </div>
                
                <div className="border-l-2 border-orange-500/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Smart Pruning</h4>
                  <p className="text-sm text-muted-foreground">
                    It can tell early if a configuration is performing poorly and stops the trial, saving time and computational resources.
                  </p>
                </div>
                
                <div className="border-l-2 border-orange-500/30 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Our Results</h4>
                  <p className="text-sm text-muted-foreground">
                    After testing 100 different configurations, Optuna found the optimal settings that achieved 71.2% accuracy - our best performing model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
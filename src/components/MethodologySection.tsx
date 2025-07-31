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

  // Sample data for visualizations
  const appData = [
    { name: 'WeChat', count: 8542, filtered: true },
    { name: 'Instagram', count: 6234, filtered: true },
    { name: 'Chrome', count: 5821, filtered: true },
    { name: 'Facebook', count: 4932, filtered: true },
    { name: 'YouTube', count: 4203, filtered: true },
    { name: 'WhatsApp', count: 3876, filtered: true },
    { name: 'Gmail', count: 3421, filtered: true },
    { name: 'Maps', count: 2987, filtered: true },
    { name: 'Spotify', count: 2654, filtered: true },
    { name: 'Twitter', count: 2341, filtered: true },
    { name: 'Netflix', count: 1987, filtered: true },
    { name: 'TikTok', count: 1654, filtered: true },
    { name: 'LinkedIn', count: 1234, filtered: true },
    { name: 'Uber', count: 987, filtered: true },
    { name: 'Camera', count: 876, filtered: true },
    { name: 'Calculator', count: 234, filtered: false },
    { name: 'Weather', count: 123, filtered: false },
    { name: 'Notes', count: 87, filtered: false },
    { name: 'Clock', count: 45, filtered: false },
    { name: 'Settings', count: 23, filtered: false }
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
                Raw dataset contains user interactions with timestamps. We filter for quality and convert text to numerical tokens.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Dataset: user_id, app_name, timestamp triplets</li>
                <li>• Filter apps appearing ≥50 times (removes noise)</li>
                <li>• Tokenize app names to integers for neural processing</li>
                <li>• Create sliding windows of 30 apps + 1 target</li>
              </ul>
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
                  <BarChart data={filterApplied ? appData.filter(app => app.filtered) : appData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
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
                      <span className="text-sm font-medium text-destructive">❌ Random Split (Data Leakage)</span>
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
                      <span className="text-sm font-medium text-secondary">✅ Chronological Split (Realistic)</span>
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
                      just like in real-world deployment scenarios.
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

        {/* Step 3: Model Choice */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">3. Model Architecture</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Bidirectional LSTM with embedding layer captures both sequential patterns and app relationships.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Embedding layer: Dense representations of app relationships</li>
                <li>• Bidirectional LSTM: Forward + backward sequence processing</li>
                <li>• Dense layers: Context processing with LeakyReLU activation</li>
                <li>• Softmax output: Probability distribution over all apps</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Bidirectional LSTM Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Input Layer */}
                  <div className="relative">
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-xs font-bold">1</div>
                        <span className="text-sm font-medium">Input Sequence</span>
                      </div>
                      <div className="text-xs bg-primary/20 px-2 py-1 rounded">30 app tokens</div>
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Embedding Layer */}
                  <div className="relative">
                    <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-secondary/20 rounded flex items-center justify-center text-xs font-bold">2</div>
                        <div>
                          <span className="text-sm font-medium">Embedding Layer</span>
                          <div className="text-xs text-muted-foreground">Dense vector representation</div>
                        </div>
                      </div>
                      <div className="text-xs bg-secondary/20 px-2 py-1 rounded">128-dim vectors</div>
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Bidirectional LSTM */}
                  <div className="relative">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-accent/20 rounded flex items-center justify-center text-xs font-bold">3</div>
                        <span className="text-sm font-medium">Bidirectional LSTM</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-2 bg-accent/5 rounded border border-accent/10">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Forward LSTM →</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-accent/5 rounded border border-accent/10">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs">← Backward LSTM</span>
                        </div>
                      </div>
                      <div className="text-xs text-center text-muted-foreground">Concatenated: 512 features</div>
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Dense Layers */}
                  <div className="relative">
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center text-xs font-bold">4</div>
                        <div>
                          <span className="text-sm font-medium">Dense + Dropout</span>
                          <div className="text-xs text-muted-foreground">Feature extraction + regularization</div>
                        </div>
                      </div>
                      <div className="text-xs bg-purple-500/20 px-2 py-1 rounded">256 → 128</div>
                    </div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Output Layer */}
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-xs font-bold">5</div>
                      <div>
                        <span className="text-sm font-medium">Softmax Output</span>
                        <div className="text-xs text-muted-foreground">Probability distribution</div>
                      </div>
                    </div>
                    <div className="text-xs bg-green-500/20 px-2 py-1 rounded">43 apps</div>
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
                <CardTitle className="flex items-center justify-between">
                  <span>Hyperparameter Optimization</span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentTrial(Math.max(0, currentTrial - 1))}
                      disabled={currentTrial === 0}
                    >
                      ←
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setCurrentTrial((prev) => (prev + 1) % hyperparameterTrials.length)}
                    >
                      Trial {currentTrial + 1}/5
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentTrial(Math.min(hyperparameterTrials.length - 1, currentTrial + 1))}
                      disabled={currentTrial === hyperparameterTrials.length - 1}
                    >
                      →
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={hyperparameterTrials}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="trial" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[69, 72]} />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          const isPruned = payload.status === 'Pruned';
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={4} 
                              fill={isPruned ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                              stroke={isPruned ? "hsl(var(--destructive))" : "hsl(var(--primary))"} 
                              strokeWidth={2}
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="bg-muted/20 rounded-lg p-3">
                    <div className="text-sm font-medium mb-2">
                      Trial {currentTrial} {hyperparameterTrials[currentTrial].status === 'Pruned' ? '(Pruned)' : ''} - Final Validation Accuracy: {hyperparameterTrials[currentTrial].accuracy}%
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div>Learning Rate: {hyperparameterTrials[currentTrial].lr}</div>
                        <div>Dropout: {hyperparameterTrials[currentTrial].dropout}</div>
                      </div>
                      
                      {trialDetails[currentTrial] && (
                        <div className="mt-3 space-y-2">
                          <div className="font-medium text-foreground">Epoch Progression:</div>
                          {trialDetails[currentTrial].epochs.map((epoch, index) => (
                            <div key={index} className="bg-muted/10 rounded p-2">
                              <div className="font-medium text-xs mb-1">Epochs {epoch.range}</div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>Train: {epoch.trainStart}% → {epoch.trainEnd}%</div>
                                <div>Val: {epoch.valStart}% → {epoch.valEnd}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                Automated hyperparameter search across 5 trials using Tree-structured Parzen Estimator.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Embedding: 64-128 dimensions</li>
                <li>• LSTM units: 64-256 (bidirectional)</li>
                <li>• Dense layers: 64-256 units</li>
                <li>• Dropout: 0.2-0.5 (prevent overfitting)</li>
                <li>• Learning rate: 1e-4 to 1e-2 (log scale)</li>
                <li>• Batch size: 128-256 samples</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 5: Final Model Training */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold">5. Final Training</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Retrain with best parameters on combined train+validation data, evaluate on held-out test set.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Best trial: emb=128, lstm=256, dense=256</li>
                <li>• Combined train+validation for final training</li>
                <li>• Early stopping on test loss (patience=5)</li>
                <li>• Cosine decay learning rate schedule</li>
                <li>• Final test accuracy: 74.17%</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Training Progress Animation</span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setCurrentEpoch(0);
                        setIsTrainingPlaying(false);
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        if (!isTrainingPlaying && currentEpoch >= trainingProgress.length - 1) {
                          setCurrentEpoch(0); // Reset to 0 when replaying after completion
                        }
                        setIsTrainingPlaying(!isTrainingPlaying);
                      }}
                    >
                      {isTrainingPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isTrainingPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Epoch {currentEpoch}/{trainingProgress.length} 
                    {isTrainingPlaying && <span className="ml-2 animate-pulse">● Training...</span>}
                  </div>
                  
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getCurrentTrainingData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="epoch" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        domain={[0, 30]}
                        type="number"
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        domain={[0, 80]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="trainAcc" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        name="Train Accuracy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="testAcc" 
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                        name="Test Accuracy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-primary rounded"></div>
                      <span>Train Accuracy: {currentEpoch > 0 ? getCurrentTrainingData()[currentEpoch - 1]?.trainAcc.toFixed(1) : '0.0'}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-secondary rounded" style={{ borderTop: "2px dashed hsl(var(--secondary))" }}></div>
                      <span>Test Accuracy: {currentEpoch > 0 ? getCurrentTrainingData()[currentEpoch - 1]?.testAcc.toFixed(1) : '0.0'}%</span>
                    </div>
                  </div>

                  <Progress value={currentEpoch / trainingProgress.length * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
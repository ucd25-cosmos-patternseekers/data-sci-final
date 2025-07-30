import { useState } from 'react';
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
  Settings
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const MethodologySection = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowPosition, setWindowPosition] = useState(0);
  const [currentTrial, setCurrentTrial] = useState(0);

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
    { trial: 1, embedding: 64, lstm: 128, dense: 64, dropout: 0.3, lr: 0.001, accuracy: 68.2 },
    { trial: 2, embedding: 128, lstm: 256, dense: 128, dropout: 0.4, lr: 0.002, accuracy: 71.5 },
    { trial: 3, embedding: 64, lstm: 64, dense: 256, dropout: 0.2, lr: 0.0005, accuracy: 69.8 },
    { trial: 4, embedding: 128, lstm: 128, dense: 128, dropout: 0.35, lr: 0.0015, accuracy: 73.1 },
    { trial: 5, embedding: 128, lstm: 256, dense: 256, dropout: 0.3, lr: 0.001, accuracy: 74.17 }
  ];

  const trainingProgress = [
    { epoch: 1, loss: 2.8, accuracy: 45.2 },
    { epoch: 5, loss: 1.9, accuracy: 62.1 },
    { epoch: 10, loss: 1.4, accuracy: 68.5 },
    { epoch: 15, loss: 1.1, accuracy: 71.8 },
    { epoch: 20, loss: 0.9, accuracy: 73.2 },
    { epoch: 25, loss: 0.8, accuracy: 74.0 },
    { epoch: 30, loss: 0.75, accuracy: 74.17 }
  ];

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
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={appData.slice(0, 15)}>
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
                      {appData.slice(0, 15).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={filterApplied && !entry.filtered ? "hsl(var(--muted))" : "hsl(var(--primary))"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Hash className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium">Tokenizer Example</span>
                  </div>
                  <Input
                    placeholder="Search app name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {filteredTokens.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span>{item.app}</span>
                        <span className="text-primary">Token: {item.token}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 2: Train/Test Split */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <Card className="data-card order-2 lg:order-1">
              <CardHeader>
                <CardTitle>Chronological Data Split</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={splitData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {splitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Why Chronological?
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Random splitting would allow the model to "cheat" by learning from future data to predict the past. 
                      Time-based splits simulate real-world scenarios.
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
                <CardTitle>Neural Network Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-sm font-medium">Input Sequence</span>
                    <div className="text-xs bg-primary/20 px-2 py-1 rounded">30 tokens</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                    <span className="text-sm font-medium">Embedding Layer</span>
                    <div className="text-xs bg-secondary/20 px-2 py-1 rounded">64-128 dim</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <span className="text-sm font-medium">Bi-LSTM</span>
                    <div className="text-xs bg-accent/20 px-2 py-1 rounded">64-256 units</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <span className="text-sm font-medium">Dense Layers</span>
                    <div className="text-xs bg-purple-500/20 px-2 py-1 rounded">2x layers</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <span className="text-sm font-medium">Softmax Output</span>
                    <div className="text-xs bg-green-500/20 px-2 py-1 rounded">Probabilities</div>
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
                  <Button 
                    size="sm" 
                    onClick={() => setCurrentTrial((prev) => (prev + 1) % hyperparameterTrials.length)}
                  >
                    Trial {currentTrial + 1}/5
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={hyperparameterTrials}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="trial" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="bg-muted/20 rounded-lg p-3">
                    <div className="text-sm font-medium mb-2">
                      Trial {currentTrial + 1} Parameters:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Embedding: {hyperparameterTrials[currentTrial].embedding}</div>
                      <div>LSTM: {hyperparameterTrials[currentTrial].lstm}</div>
                      <div>Dense: {hyperparameterTrials[currentTrial].dense}</div>
                      <div>Dropout: {hyperparameterTrials[currentTrial].dropout}</div>
                      <div>Learning Rate: {hyperparameterTrials[currentTrial].lr}</div>
                      <div className="text-primary font-medium">Accuracy: {hyperparameterTrials[currentTrial].accuracy}%</div>
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
                <CardTitle>Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={trainingProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Area 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">74.17%</div>
                      <div className="text-xs text-muted-foreground">Test Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">0.75</div>
                      <div className="text-xs text-muted-foreground">Final Loss</div>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">30</div>
                      <div className="text-xs text-muted-foreground">Epochs</div>
                    </div>
                  </div>
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
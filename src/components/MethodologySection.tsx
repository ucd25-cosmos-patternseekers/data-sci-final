import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Filter, 
  Hash, 
  BarChart3, 
  Layers, 
  Brain,
  Target,
  Search
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const MethodologySection = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [trainRatio, setTrainRatio] = useState([70]);
  const [valRatio, setValRatio] = useState([10]);
  const [windowPosition, setWindowPosition] = useState(0);

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

  const userApps = ['📱', '📷', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️', '📱', '💬', '🌐', '📧', '🎵', '📺', '🗺️'];

  const filteredTokens = tokenData.filter(item => 
    item.app.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const testRatio = 100 - trainRatio[0] - valRatio[0];

  return (
    <section id="methodology" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Methodology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five-step process from raw data to predictions
          </p>
        </div>

        {/* Step 1: Preparing Data */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">1. Preparing Data</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Raw data consists of user ID, app name, and timestamps. We focus the model on common usage patterns.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Dataset contains user interactions with apps over time</li>
                <li>• Filter out apps appearing fewer than 50 times</li>
                <li>• Map each app name to unique integer tokens for neural network processing</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>App Usage Filtering</span>
                  <Button 
                    size="sm" 
                    variant={filterApplied ? "default" : "outline"}
                    onClick={() => setFilterApplied(!filterApplied)}
                  >
                    {filterApplied ? "Show All" : "Apply Filter"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={appData.slice(0, 12)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      fontSize={10}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                      {appData.slice(0, 12).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={filterApplied && !entry.filtered ? "hsl(var(--muted))" : "hsl(var(--primary))"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {filterApplied ? "Filtered apps (gray) removed from training" : "All apps before filtering"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 2: Creating Sequences */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <Card className="data-card order-2 lg:order-1">
              <CardHeader>
                <CardTitle>Sliding Window Technique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">User Timeline</span>
                  <Button 
                    size="sm" 
                    onClick={() => setWindowPosition((prev) => (prev + 1) % (userApps.length - 30))}
                  >
                    Slide →
                  </Button>
                </div>
                <div className="flex gap-1 overflow-x-auto p-3 bg-muted/20 rounded-lg">
                  {userApps.slice(0, 20).map((app, index) => (
                    <div 
                      key={index}
                      className={`w-6 h-6 flex items-center justify-center text-sm rounded border flex-shrink-0 transition-all ${
                        index >= windowPosition && index < windowPosition + 15 
                          ? 'bg-primary/20 border-primary scale-110' 
                          : index === windowPosition + 15 
                          ? 'bg-accent/20 border-accent scale-110' 
                          : 'bg-background border-border'
                      }`}
                    >
                      {app}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-primary/20 border border-primary rounded"></div>
                    <span>Input (30 apps)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-accent/20 border border-accent rounded"></div>
                    <span>Target</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold">2. Creating Sequences</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Transform continuous app usage into training sequences using a sliding window approach.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Take 30 consecutive apps as input sequence</li>
                <li>• Use the next app as prediction target</li>
                <li>• Slide window across entire user history</li>
                <li>• Creates thousands of training examples per user</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 3: Chronological Split */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">3. Chronological Split</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Time-based splitting prevents data leakage and simulates real-world prediction scenarios.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Random shuffling would allow "cheating" from future data</li>
                <li>• 70% oldest sequences for training the model</li>
                <li>• 10% middle sequences for validation and tuning</li>
                <li>• 20% newest sequences for final testing</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Data Split Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Train', value: 70, color: 'hsl(var(--primary))' },
                      { name: 'Val', value: 10, color: 'hsl(var(--secondary))' },
                      { name: 'Test', value: 20, color: 'hsl(var(--accent))' }
                    ]} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {[
                          { fill: 'hsl(var(--primary))' },
                          { fill: 'hsl(var(--secondary))' },
                          { fill: 'hsl(var(--accent))' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-muted-foreground text-center">
                    Timeline: Past → Present → Future
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step 4: Building Model */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
            <Card className="data-card order-2 lg:order-1">
              <CardHeader>
                <CardTitle>Neural Network Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Input Layer</span>
                    <div className="w-16 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">30 apps</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Embedding</span>
                    <div className="w-16 h-8 bg-secondary/20 rounded flex items-center justify-center text-xs">Dense</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Bi-LSTM</span>
                    <div className="w-16 h-8 bg-accent/20 rounded flex items-center justify-center text-xs">Context</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium">Output</span>
                    <div className="w-16 h-8 bg-green-500/20 rounded flex items-center justify-center text-xs">Softmax</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-3xl font-bold">4. Building Model</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Bidirectional LSTM architecture with automated hyperparameter optimization using Optuna.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Embedding layer learns app relationships</li>
                <li>• Bi-LSTM reads sequences forward and backward</li>
                <li>• Dense layers process context for final prediction</li>
                <li>• Optuna runs 5 trials to find optimal parameters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 5: Evaluation */}
        <div className="scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold">5. Final Evaluation</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Model performance on unseen future data demonstrates real-world prediction capability.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Retrained on combined train + validation sets</li>
                <li>• Tested on completely unseen future sequences</li>
                <li>• Achieved 74.17% overall accuracy</li>
                <li>• 72% macro precision across all app categories</li>
              </ul>
            </div>
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Accuracy</span>
                    <span className="text-lg font-bold text-primary">74.17%</span>
                  </div>
                  <Progress value={74.17} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Macro Precision</span>
                    <span className="text-lg font-bold text-secondary">72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Macro Recall</span>
                    <span className="text-lg font-bold text-accent">68%</span>
                  </div>
                  <Progress value={68} className="h-3" />
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
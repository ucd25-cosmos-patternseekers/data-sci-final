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

        {/* Step 1: Preparing the Data */}
        <div className="mb-16 scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">1. Preparing the Data</CardTitle>
                  <CardDescription>Refining raw data into usable format</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Data Source
                  </h4>
                  <p className="text-muted-foreground">Dataset contains user ID, app name, and timestamps for prediction training.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filtering
                  </h4>
                  <p className="text-muted-foreground">Removed apps with &lt;50 uses to focus on common patterns.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4" /> Tokenization
                  </h4>
                  <p className="text-muted-foreground">Each app name mapped to unique integer token for model training.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Filtering Visualization */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">App Usage Frequency</h4>
                    <Button 
                      size="sm" 
                      variant={filterApplied ? "default" : "outline"}
                      onClick={() => setFilterApplied(!filterApplied)}
                    >
                      Apply 50-Use Filter
                    </Button>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={appData.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" hide />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Bar dataKey="count">
                        {appData.slice(0, 15).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={filterApplied && !entry.filtered ? "hsl(var(--muted))" : "hsl(var(--primary))"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tokenizer Table */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="font-semibold">App Tokenizer</h4>
                    <div className="relative flex-1 max-w-xs">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search app..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-0 text-sm">
                      <div className="font-semibold p-2 border-b bg-muted">App Name</div>
                      <div className="font-semibold p-2 border-b bg-muted">Token ID</div>
                      {filteredTokens.map((item, index) => (
                        <>
                          <div key={`${item.app}-name`} className="p-2 border-b">{item.app}</div>
                          <div key={`${item.app}-token`} className="p-2 border-b text-primary font-mono">{item.token}</div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 2: Creating Sequences */}
        <div className="mb-16 scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">2. Creating Sequences</CardTitle>
                  <CardDescription>Sliding window technique for LSTM training</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">The Sliding Window</h4>
                  <p className="text-muted-foreground">Transform long usage history into fixed-size sequences of 30 apps for model input.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Inputs and Targets</h4>
                  <p className="text-muted-foreground">Each sequence of 30 apps (X) predicts the next app (y), sliding one step at a time.</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Sliding Window Visualization</h4>
                  <Button 
                    size="sm" 
                    onClick={() => setWindowPosition((prev) => (prev + 1) % (userApps.length - 30))}
                  >
                    Slide Window
                  </Button>
                </div>
                <div className="flex gap-1 overflow-x-auto p-4 bg-muted/20 rounded-lg">
                  {userApps.map((app, index) => (
                    <div 
                      key={index}
                      className={`w-8 h-8 flex items-center justify-center text-lg rounded border-2 flex-shrink-0 transition-all ${
                        index >= windowPosition && index < windowPosition + 30 
                          ? 'bg-primary/20 border-primary scale-110' 
                          : index === windowPosition + 30 
                          ? 'bg-accent/20 border-accent scale-110' 
                          : 'bg-background border-border'
                      }`}
                    >
                      {app}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-8 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary/20 border-2 border-primary rounded"></div>
                    <span>Input Sequence (30 apps)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent/20 border-2 border-accent rounded"></div>
                    <span>Target (next app)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 3: Chronological Split */}
        <div className="mb-16 scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-2xl">3. Chronological Split</CardTitle>
                  <CardDescription>Time-based data split prevents data leakage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Why Random Split Fails</h4>
                  <p className="text-muted-foreground">Random shuffling would let the model "cheat" by learning from future data to predict the past.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Our Fair Method</h4>
                  <p className="text-muted-foreground">Chronological split: oldest 70% for training, middle 10% for validation, newest 20% for testing.</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Interactive Data Split</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Train Ratio: {trainRatio[0]}%</label>
                      <Slider
                        value={trainRatio}
                        onValueChange={setTrainRatio}
                        max={80}
                        min={50}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">Val Ratio: {valRatio[0]}%</label>
                      <Slider
                        value={valRatio}
                        onValueChange={setValRatio}
                        max={30}
                        min={5}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training ({trainRatio[0]}%)</span>
                      <span>Validation ({valRatio[0]}%)</span>
                      <span>Testing ({testRatio}%)</span>
                    </div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div 
                        className="bg-primary/80 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${trainRatio[0]}%` }}
                      >
                        Train
                      </div>
                      <div 
                        className="bg-secondary/80 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${valRatio[0]}%` }}
                      >
                        Val
                      </div>
                      <div 
                        className="bg-accent/80 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${testRatio}%` }}
                      >
                        Test
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      Timeline: Past → Present → Future
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 4: Building and Tuning */}
        <div className="mb-16 scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">4. Building & Tuning the Model</CardTitle>
                  <CardDescription>Neural network architecture and automated optimization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Model Architecture</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• <strong>Embedding:</strong> Dense app representations</li>
                    <li>• <strong>Bi-LSTM:</strong> Forward/backward context</li>
                    <li>• <strong>Dense:</strong> Final probability predictions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Optuna Tuning</h4>
                  <p className="text-muted-foreground">Automated hyperparameter search across 5 trials to find optimal model settings.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Neural Network Diagram */}
                <div>
                  <h4 className="font-semibold mb-4">Model Architecture Flow</h4>
                  <div className="flex flex-col items-center space-y-4 p-4 bg-muted/20 rounded-lg">
                    <div className="w-full text-center p-3 bg-primary/20 rounded border">
                      Input Sequence (30 tokens)
                    </div>
                    <div className="text-center text-xs text-muted-foreground">↓</div>
                    <div className="w-full text-center p-3 bg-secondary/20 rounded border">
                      Embedding Layer (emb=64)
                    </div>
                    <div className="text-center text-xs text-muted-foreground">↓</div>
                    <div className="w-full text-center p-3 bg-accent/20 rounded border">
                      Bi-LSTM (lstm=128)
                    </div>
                    <div className="text-center text-xs text-muted-foreground">↓</div>
                    <div className="w-full text-center p-3 bg-teal-500/20 rounded border">
                      Dense + Softmax (43 apps)
                    </div>
                  </div>
                </div>

                {/* Optuna Results */}
                <div>
                  <h4 className="font-semibold mb-4">Best Trial Results</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm">Learning Rate</span>
                      <span className="text-sm font-mono text-primary">0.001</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm">Batch Size</span>
                      <span className="text-sm font-mono text-primary">64</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm">LSTM Units</span>
                      <span className="text-sm font-mono text-primary">128</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm">Dropout</span>
                      <span className="text-sm font-mono text-primary">0.3</span>
                    </div>
                    <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/30">
                      <span className="text-sm font-semibold">Val Accuracy</span>
                      <span className="text-sm font-mono text-primary font-bold">74.17%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 5: Evaluation */}
        <div className="mb-16 scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">5. Evaluation & Results</CardTitle>
                  <CardDescription>Final performance on unseen test data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">74.17%</div>
                  <div className="text-sm font-semibold">Overall Accuracy</div>
                  <Progress value={74.17} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">72.0%</div>
                  <div className="text-sm font-semibold">Macro Precision</div>
                  <Progress value={72} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">0.92</div>
                  <div className="text-sm font-semibold">Final Loss</div>
                  <Progress value={8} className="mt-2" />
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Model retrained on full training + validation set, then evaluated on hold-out test data
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
          {/* Step 1 */}
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Preparing Data</CardTitle>
              <CardDescription className="text-sm">
                Filter and tokenize raw app usage data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• User ID, app name, timestamps</li>
                <li>• Filter apps with &lt;50 uses</li>
                <li>• Map apps to integer tokens</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
              </div>
              <CardTitle className="text-lg">Creating Sequences</CardTitle>
              <CardDescription className="text-sm">
                Sliding window technique for LSTM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 30 apps as input sequence</li>
                <li>• Next app as prediction target</li>
                <li>• Slide window across history</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-lg">Chronological Split</CardTitle>
              <CardDescription className="text-sm">
                Time-based split prevents leakage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 70% oldest for training</li>
                <li>• 10% middle for validation</li>
                <li>• 20% newest for testing</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-teal-600" />
              </div>
              <CardTitle className="text-lg">Building Model</CardTitle>
              <CardDescription className="text-sm">
                Bi-LSTM with automated tuning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Embedding + Bi-LSTM layers</li>
                <li>• Optuna hyperparameter search</li>
                <li>• 5 trials for optimization</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Final Evaluation</CardTitle>
              <CardDescription className="text-sm">
                Test on unseen future data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 74.17% overall accuracy</li>
                <li>• 72% macro precision</li>
                <li>• Robust performance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demonstrations */}
        <div className="space-y-16">
          {/* App Filtering Demo */}
          <div className="scroll-reveal">
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-primary" />
                  App Usage Filtering
                </CardTitle>
                <CardDescription>
                  Demonstration of how filtering improves model focus on common usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">Top 15 Apps by Usage Count</span>
                  <Button 
                    size="sm" 
                    variant={filterApplied ? "default" : "outline"}
                    onClick={() => setFilterApplied(!filterApplied)}
                  >
                    Apply 50-Use Filter
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={appData.slice(0, 15)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {appData.slice(0, 15).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={filterApplied && !entry.filtered ? "hsl(var(--muted))" : "hsl(var(--primary))"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-muted-foreground mt-4">
                  {filterApplied 
                    ? "Apps with fewer than 50 uses are filtered out (shown in gray)" 
                    : "All apps included - click filter to see which would be removed"
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sliding Window Demo */}
          <div className="scroll-reveal">
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  Sliding Window Technique
                </CardTitle>
                <CardDescription>
                  How we create training sequences from continuous app usage history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">User's App Usage Timeline</span>
                  <Button 
                    size="sm" 
                    onClick={() => setWindowPosition((prev) => (prev + 1) % (userApps.length - 30))}
                  >
                    Slide Window →
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
              </CardContent>
            </Card>
          </div>

          {/* Data Split Demo */}
          <div className="scroll-reveal">
            <Card className="data-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-accent" />
                  Chronological Data Split
                </CardTitle>
                <CardDescription>
                  Interactive demonstration of time-based data splitting to prevent data leakage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                    <div>
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
                    <div className="flex justify-between text-sm font-medium">
                      <span>Training ({trainRatio[0]}%)</span>
                      <span>Validation ({valRatio[0]}%)</span>
                      <span>Testing ({testRatio}%)</span>
                    </div>
                    <div className="flex h-12 rounded-lg overflow-hidden">
                      <div 
                        className="bg-primary flex items-center justify-center text-sm text-white font-medium"
                        style={{ width: `${trainRatio[0]}%` }}
                      >
                        Train
                      </div>
                      <div 
                        className="bg-secondary flex items-center justify-center text-sm text-white font-medium"
                        style={{ width: `${valRatio[0]}%` }}
                      >
                        Val
                      </div>
                      <div 
                        className="bg-accent flex items-center justify-center text-sm text-white font-medium"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
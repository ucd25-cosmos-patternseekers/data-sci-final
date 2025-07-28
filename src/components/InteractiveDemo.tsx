import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Play, RotateCcw } from 'lucide-react';

interface InteractiveDemoProps {
  demoType: string;
}

const InteractiveDemo = ({ demoType }: InteractiveDemoProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getDemoData = () => {
    switch (demoType) {
      case 'data-collection':
        return {
          title: 'Data Collection Simulation',
          description: 'Simulating the collection of 10,000 user app usage sessions',
          data: [
            { hour: '6AM', sessions: 120 },
            { hour: '9AM', sessions: 480 },
            { hour: '12PM', sessions: 350 },
            { hour: '3PM', sessions: 280 },
            { hour: '6PM', sessions: 420 },
            { hour: '9PM', sessions: 380 },
            { hour: '12AM', sessions: 180 }
          ]
        };
      case 'feature-engineering':
        return {
          title: 'Feature Importance Analysis',
          description: 'Showing the importance of different features in our model',
          data: [
            { name: 'Previous App', value: 35, color: 'hsl(var(--primary))' },
            { name: 'Time of Day', value: 28, color: 'hsl(var(--secondary))' },
            { name: 'Day of Week', value: 15, color: 'hsl(var(--accent))' },
            { name: 'Usage Duration', value: 12, color: 'hsl(var(--primary)/0.7)' },
            { name: 'App Category', value: 10, color: 'hsl(var(--secondary)/0.7)' }
          ]
        };
      case 'model-training':
        return {
          title: 'Model Training Progress',
          description: 'Real-time accuracy improvement during training',
          data: [
            { iteration: 1, accuracy: 45.2, loss: 2.8 },
            { iteration: 5, accuracy: 62.1, loss: 2.1 },
            { iteration: 10, accuracy: 73.8, loss: 1.6 },
            { iteration: 15, accuracy: 81.2, loss: 1.2 },
            { iteration: 20, accuracy: 85.6, loss: 0.9 },
            { iteration: 25, accuracy: 87.3, loss: 0.8 }
          ]
        };
      default:
        return { title: '', description: '', data: [] };
    }
  };

  const runDemo = () => {
    setIsRunning(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  const resetDemo = () => {
    setShowResults(false);
    setIsRunning(false);
  };

  const { title, description, data } = getDemoData();

  const renderChart = () => {
    if (demoType === 'data-collection') {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))' 
              }} 
            />
            <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (demoType === 'feature-engineering') {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="iteration" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))' 
              }} 
            />
            <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={3} />
            <Line type="monotone" dataKey="loss" stroke="hsl(var(--destructive))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <Card className="mt-4 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button 
            onClick={runDemo} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Demo'}
          </Button>
          {showResults && (
            <Button 
              onClick={resetDemo} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          )}
        </div>

        {isRunning && (
          <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Processing data...</p>
            </div>
          </div>
        )}

        {showResults && (
          <div className="animate-fade-in">
            {renderChart()}
            <div className="mt-4 p-4 bg-muted/20 rounded-lg">
              <h4 className="font-semibold mb-2">Demo Results:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {demoType === 'data-collection' && (
                  <>
                    <li>• Collected 2,210 total sessions</li>
                    <li>• Peak usage at 9AM (480 sessions)</li>
                    <li>• Lowest usage at 12AM (180 sessions)</li>
                  </>
                )}
                {demoType === 'feature-engineering' && (
                  <>
                    <li>• Previous app is most important feature (35%)</li>
                    <li>• Temporal features account for 43% of importance</li>
                    <li>• Context features provide additional 22% boost</li>
                  </>
                )}
                {demoType === 'model-training' && (
                  <>
                    <li>• Final accuracy: 87.3%</li>
                    <li>• Training converged after 25 iterations</li>
                    <li>• Loss reduced from 2.8 to 0.8</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveDemo;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MetricChartProps {
  metric: string;
  value: number;
  description: string;
}

const MetricChart = ({ metric, value, description }: MetricChartProps) => {
  const getChartData = () => {
    switch (metric) {
      case 'accuracy':
        return [
          { epoch: 1, value: 37.7 },
          { epoch: 5, value: 72.5 },
          { epoch: 10, value: 73.7 },
          { epoch: 15, value: 74.2 },
          { epoch: 20, value: 74.4 },
          { epoch: 25, value: 74.6 },
          { epoch: 30, value: 74.9 },
          { epoch: 36, value: 74.17 }
        ];
      case 'precision':
        return [
          { category: 'Communication', value: 85 },
          { category: 'Social Media', value: 71 },
          { category: 'Utilities', value: 55 },
          { category: 'Entertainment', value: 63 },
          { category: 'Productivity', value: 67 }
        ];
      case 'dataSize':
        return [
          { phase: 'Training', value: 58.3 },
          { phase: 'Validation', value: 14.6 },
          { phase: 'Total Analyzed', value: 72.9 }
        ];
      case 'loss':
        return [
          { epoch: 1, value: 2.94 },
          { epoch: 5, value: 1.04 },
          { epoch: 10, value: 0.95 },
          { epoch: 15, value: 0.94 },
          { epoch: 20, value: 0.93 },
          { epoch: 25, value: 0.93 },
          { epoch: 30, value: 0.92 },
          { epoch: 36, value: 0.92 }
        ];
      default:
        return [];
    }
  };

  const data = getChartData();

  const getChartColor = (metric: string) => {
    switch (metric) {
      case 'accuracy': return 'hsl(var(--primary))';
      case 'precision': return 'hsl(var(--secondary))';
      case 'dataSize': return 'hsl(var(--accent))';
      case 'loss': return 'hsl(var(--destructive))';
      default: return 'hsl(var(--primary))';
    }
  };

  const renderChart = () => {
    const color = getChartColor(metric);
    
    if (metric === 'accuracy' || metric === 'loss') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      const dataKey = metric === 'precision' ? 'category' : 'phase';
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={dataKey}
              stroke="hsl(var(--muted-foreground))" 
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              cursor={{ fill: 'transparent' }}
            />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="p-6 bg-background border border-border rounded-lg animate-fade-in">
      <h3 className="text-lg font-semibold mb-2 capitalize">
        {metric.replace(/([A-Z])/g, ' $1').trim()} Analysis
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="mb-4">
        {renderChart()}
      </div>
      <div className="text-center">
        <span className="text-2xl font-bold text-primary">
          {metric === 'loss' ? value : `${value}%`}
        </span>
        <p className="text-xs text-muted-foreground mt-1">
          {metric === 'loss' ? 'Final Training Loss' : 'Current Model Performance'}
        </p>
      </div>
    </div>
  );
};

export default MetricChart;
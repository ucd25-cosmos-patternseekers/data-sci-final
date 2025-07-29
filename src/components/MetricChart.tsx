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
          { epoch: 1, value: 65.2 },
          { epoch: 2, value: 72.1 },
          { epoch: 3, value: 78.9 },
          { epoch: 4, value: 82.3 },
          { epoch: 5, value: 85.1 },
          { epoch: 6, value: 86.8 },
          { epoch: 7, value: 87.3 }
        ];
      case 'precision':
        return [
          { category: 'Social', value: 89.2 },
          { category: 'Productivity', value: 82.1 },
          { category: 'Entertainment', value: 85.6 },
          { category: 'Shopping', value: 81.3 },
          { category: 'News', value: 86.9 }
        ];
      case 'recall':
        return [
          { timeOfDay: 'Morning', value: 92.1 },
          { timeOfDay: 'Afternoon', value: 85.6 },
          { timeOfDay: 'Evening', value: 91.3 },
          { timeOfDay: 'Night', value: 87.8 }
        ];
      case 'f1Score':
        return [
          { userType: 'Heavy Users', value: 91.2 },
          { userType: 'Regular Users', value: 86.8 },
          { userType: 'Light Users', value: 82.4 },
          { userType: 'New Users', value: 78.9 }
        ];
      default:
        return [];
    }
  };

  const data = getChartData();

  const renderChart = () => {
    if (metric === 'accuracy') {
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
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey={metric === 'precision' ? 'category' : metric === 'recall' ? 'timeOfDay' : 'userType'} 
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
              fill="hsl(var(--primary))" 
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
        <span className="text-2xl font-bold text-primary">{value}%</span>
        <p className="text-xs text-muted-foreground mt-1">Current Model Performance</p>
      </div>
    </div>
  );
};

export default MetricChart;
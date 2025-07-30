import { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart,
    ScatterChart, Scatter, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface AdvancedChartProps {
    title?: string;
    description?: string;
}

const AdvancedChart = ({ title = "Advanced Analytics Dashboard", description = "Interactive charts with real-time data visualization" }: AdvancedChartProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentData, setCurrentData] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("line");

    // Sample data for different chart types
    const lineData = [
        { time: '00:00', users: 120, sessions: 180, conversion: 2.1 },
        { time: '04:00', users: 80, sessions: 120, conversion: 1.8 },
        { time: '08:00', users: 350, sessions: 520, conversion: 3.2 },
        { time: '12:00', users: 480, sessions: 720, conversion: 4.1 },
        { time: '16:00', users: 520, sessions: 780, conversion: 4.5 },
        { time: '20:00', users: 380, sessions: 570, conversion: 3.8 },
        { time: '24:00', users: 150, sessions: 220, conversion: 2.3 }
    ];

    const barData = [
        { category: 'Social', value: 35, target: 40 },
        { category: 'Entertainment', value: 28, target: 30 },
        { category: 'Productivity', value: 42, target: 45 },
        { category: 'Communication', value: 38, target: 35 },
        { category: 'Utilities', value: 25, target: 25 }
    ];

    const pieData = [
        { name: 'Mobile', value: 65, color: 'hsl(var(--primary))' },
        { name: 'Desktop', value: 25, color: 'hsl(var(--secondary))' },
        { name: 'Tablet', value: 10, color: 'hsl(var(--accent))' }
    ];

    const scatterData = [
        { x: 10, y: 20, size: 5, category: 'A' },
        { x: 15, y: 35, size: 8, category: 'B' },
        { x: 20, y: 45, size: 12, category: 'A' },
        { x: 25, y: 60, size: 15, category: 'B' },
        { x: 30, y: 75, size: 18, category: 'A' },
        { x: 35, y: 85, size: 20, category: 'B' }
    ];

    useEffect(() => {
        setCurrentData(lineData);
    }, []);

    const startAnimation = () => {
        setIsAnimating(true);
        // Simulate real-time data updates
        const interval = setInterval(() => {
            setCurrentData(prev =>
                prev.map(item => ({
                    ...item,
                    users: item.users + Math.floor(Math.random() * 20 - 10),
                    sessions: item.sessions + Math.floor(Math.random() * 30 - 15),
                    conversion: Math.max(0, item.conversion + (Math.random() - 0.5) * 0.5)
                }))
            );
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setIsAnimating(false);
        }, 5000);
    };

    const stopAnimation = () => {
        setIsAnimating(false);
    };

    const resetData = () => {
        setCurrentData(lineData);
        setIsAnimating(false);
    };

    const renderLineChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="sessions"
                    fill="hsl(var(--primary)/0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                />
                <Line
                    type="monotone"
                    dataKey="conversion"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );

    const renderBarChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                />
                <Bar
                    dataKey="target"
                    fill="hsl(var(--secondary))"
                    radius={[4, 4, 0, 0]}
                    opacity={0.7}
                />
            </BarChart>
        </ResponsiveContainer>
    );

    const renderPieChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );

    const renderScatterChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" dataKey="x" name="Feature 1" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="number" dataKey="y" name="Feature 2" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Scatter
                    name="Category A"
                    dataKey="y"
                    fill="hsl(var(--primary))"
                    shape="circle"
                />
                <Scatter
                    name="Category B"
                    dataKey="y"
                    fill="hsl(var(--secondary))"
                    shape="triangle"
                />
            </ScatterChart>
        </ResponsiveContainer>
    );

    return (
        <Card className="w-full animate-fade-in">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Button
                        onClick={isAnimating ? stopAnimation : startAnimation}
                        variant={isAnimating ? "destructive" : "default"}
                        className="flex items-center gap-2"
                    >
                        {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isAnimating ? 'Stop Animation' : 'Start Animation'}
                    </Button>
                    <Button
                        onClick={resetData}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="line" className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Line
                        </TabsTrigger>
                        <TabsTrigger value="bar" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Bar
                        </TabsTrigger>
                        <TabsTrigger value="pie" className="flex items-center gap-2">
                            <PieChartIcon className="w-4 h-4" />
                            Pie
                        </TabsTrigger>
                        <TabsTrigger value="scatter" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Scatter
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="line" className="mt-4">
                        {renderLineChart()}
                    </TabsContent>

                    <TabsContent value="bar" className="mt-4">
                        {renderBarChart()}
                    </TabsContent>

                    <TabsContent value="pie" className="mt-4">
                        {renderPieChart()}
                    </TabsContent>

                    <TabsContent value="scatter" className="mt-4">
                        {renderScatterChart()}
                    </TabsContent>
                </Tabs>

                {isAnimating && (
                    <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            🔄 Real-time data simulation active - values are updating dynamically
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AdvancedChart; 
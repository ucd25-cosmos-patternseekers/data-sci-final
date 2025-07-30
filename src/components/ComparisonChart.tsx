import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, Radar, ComposedChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TrendingUp, BarChart3, Target } from 'lucide-react';

interface ComparisonChartProps {
    title?: string;
    description?: string;
}

const ComparisonChart = ({
    title = "Model Performance Comparison",
    description = "Compare different models and their performance metrics"
}: ComparisonChartProps) => {
    const [showTargets, setShowTargets] = useState(true);
    const [chartType, setChartType] = useState<'bar' | 'line' | 'radar'>('bar');

    const performanceData = [
        { model: 'Baseline', accuracy: 65, precision: 62, recall: 68, f1: 65 },
        { model: 'Random Forest', accuracy: 78, precision: 76, recall: 79, f1: 77 },
        { model: 'XGBoost', accuracy: 82, precision: 81, recall: 83, f1: 82 },
        { model: 'Neural Network', accuracy: 85, precision: 84, recall: 86, f1: 85 },
        { model: 'Ensemble', accuracy: 87, precision: 86, recall: 88, f1: 87 }
    ];

    const targetData = [
        { model: 'Baseline', accuracy: 70, precision: 70, recall: 70, f1: 70 },
        { model: 'Random Forest', accuracy: 80, precision: 80, recall: 80, f1: 80 },
        { model: 'XGBoost', accuracy: 85, precision: 85, recall: 85, f1: 85 },
        { model: 'Neural Network', accuracy: 90, precision: 90, recall: 90, f1: 90 },
        { model: 'Ensemble', accuracy: 92, precision: 92, recall: 92, f1: 92 }
    ];

    const radarData = performanceData.map(item => ({
        subject: item.model,
        A: item.accuracy,
        B: item.precision,
        C: item.recall,
        D: item.f1,
        fullMark: 100,
    }));

    const renderBarChart = () => (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" />
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
                    dataKey="accuracy"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Accuracy"
                />
                <Bar
                    dataKey="precision"
                    fill="hsl(var(--secondary))"
                    radius={[4, 4, 0, 0]}
                    name="Precision"
                />
                <Bar
                    dataKey="recall"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                    name="Recall"
                />
                <Bar
                    dataKey="f1"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                    name="F1 Score"
                />
                {showTargets && (
                    <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        data={targetData}
                        name="Target Accuracy"
                    />
                )}
            </ComposedChart>
        </ResponsiveContainer>
    );

    const renderLineChart = () => (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    name="Accuracy"
                />
                <Line
                    type="monotone"
                    dataKey="precision"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                    name="Precision"
                />
                <Line
                    type="monotone"
                    dataKey="recall"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                    name="Recall"
                />
                <Line
                    type="monotone"
                    dataKey="f1"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                    name="F1 Score"
                />
            </LineChart>
        </ResponsiveContainer>
    );

    const renderRadarChart = () => (
        <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Radar
                    name="Accuracy"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary)/0.1)"
                    fillOpacity={0.6}
                />
                <Radar
                    name="Precision"
                    dataKey="B"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary)/0.1)"
                    fillOpacity={0.6}
                />
                <Radar
                    name="Recall"
                    dataKey="C"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent)/0.1)"
                    fillOpacity={0.6}
                />
                <Radar
                    name="F1 Score"
                    dataKey="D"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive)/0.1)"
                    fillOpacity={0.6}
                />
                <Legend />
            </RadarChart>
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
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant={chartType === 'bar' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setChartType('bar')}
                            className="flex items-center gap-2"
                        >
                            <BarChart3 className="w-4 h-4" />
                            Bar
                        </Button>
                        <Button
                            variant={chartType === 'line' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setChartType('line')}
                            className="flex items-center gap-2"
                        >
                            <TrendingUp className="w-4 h-4" />
                            Line
                        </Button>
                        <Button
                            variant={chartType === 'radar' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setChartType('radar')}
                            className="flex items-center gap-2"
                        >
                            <Target className="w-4 h-4" />
                            Radar
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="show-targets"
                            checked={showTargets}
                            onCheckedChange={setShowTargets}
                        />
                        <Label htmlFor="show-targets">Show Target Values</Label>
                    </div>
                </div>

                {chartType === 'bar' && renderBarChart()}
                {chartType === 'line' && renderLineChart()}
                {chartType === 'radar' && renderRadarChart()}

                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Insights:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ensemble model shows the best overall performance</li>
                        <li>• Neural Network provides strong accuracy but higher complexity</li>
                        <li>• XGBoost offers good balance of performance and interpretability</li>
                        <li>• All models exceed baseline performance significantly</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default ComparisonChart; 
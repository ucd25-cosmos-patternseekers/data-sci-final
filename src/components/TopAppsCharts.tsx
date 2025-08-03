import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MousePointer } from 'lucide-react';

interface AppData {
    app_name: string;
    total_minutes?: number;
    total_interactions?: number;
}

const TopAppsCharts = () => {
    const [minutesData, setMinutesData] = useState<AppData[]>([]);
    const [interactionsData, setInteractionsData] = useState<AppData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [minutesResponse, interactionsResponse] = await Promise.all([
                    fetch('/top10_apps_by_minutes.json'),
                    fetch('/top10_apps_by_interactions.json')
                ]);

                const minutesJson = await minutesResponse.json();
                const interactionsJson = await interactionsResponse.json();

                setMinutesData(minutesJson);
                setInteractionsData(interactionsJson);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const formatMinutes = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);
        if (hours > 0) {
            return `${hours}h ${remainingMinutes}m`;
        }
        return `${remainingMinutes}m`;
    };

    const formatInteractions = (interactions: number) => {
        if (interactions >= 1000) {
            return `${(interactions / 1000).toFixed(1)}k`;
        }
        return interactions.toString();
    };

    const CustomTooltip = ({ active, payload, label, dataKey }: any) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const formattedValue = dataKey === 'total_minutes'
                ? formatMinutes(value)
                : formatInteractions(value);

            return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <p className="text-primary">
                        {dataKey === 'total_minutes' ? 'Total Time: ' : 'Total Interactions: '}
                        <span className="font-semibold">{formattedValue}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <div className="animate-pulse">
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 bg-muted rounded animate-pulse"></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="animate-pulse">
                            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 bg-muted rounded animate-pulse"></div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Top 10 Apps by Minutes */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Top 10 Apps by Usage Time
                    </CardTitle>
                    <CardDescription>
                        Total minutes spent across all users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={minutesData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis
                                    dataKey="app_name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    fontSize={12}
                                    interval={0}
                                />
                                <YAxis
                                    tickFormatter={formatMinutes}
                                    fontSize={12}
                                />
                                <Tooltip
                                    content={<CustomTooltip dataKey="total_minutes" />}
                                />
                                <Bar
                                    dataKey="total_minutes"
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Top 10 Apps by Interactions */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MousePointer className="h-5 w-5 text-secondary" />
                        Top 10 Apps by Interactions
                    </CardTitle>
                    <CardDescription>
                        Total number of user interactions across all users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={interactionsData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis
                                    dataKey="app_name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    fontSize={12}
                                    interval={0}
                                />
                                <YAxis
                                    tickFormatter={formatInteractions}
                                    fontSize={12}
                                />
                                <Tooltip
                                    content={<CustomTooltip dataKey="total_interactions" />}
                                />
                                <Bar
                                    dataKey="total_interactions"
                                    fill="hsl(var(--secondary))"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TopAppsCharts;
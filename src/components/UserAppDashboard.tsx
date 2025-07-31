import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PieChart, Users, Clock, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserAppData {
    [app: string]: number;
    _total_time: number;
}

interface UserData {
    [userId: string]: UserAppData;
}

const UserAppDashboard = () => {
    const [userData, setUserData] = useState<UserData>({});
    const [isExtended, setIsExtended] = useState(false);
    const [highlightedApp, setHighlightedApp] = useState<string | null>(null);
    const [selectedAppFilter, setSelectedAppFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalApps: 0,
        totalHours: 0
    });
    const [appColorMap, setAppColorMap] = useState<{ [app: string]: string }>({});

    // Color palette for apps (same as original)
    const colors = [
        '#FF6B6B', '#FF5252', '#FF1744', '#D50000', '#B71C1C',
        '#E91E63', '#C2185B', '#AD1457', '#880E4F', '#FF4081',
        '#9C27B0', '#7B1FA2', '#6A1B9A', '#4A148C', '#E1BEE7',
        '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#D1C4E9',
        '#3F51B5', '#3949AB', '#303F9F', '#283593', '#C5CAE9',
        '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#BBDEFB',
        '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#B3E5FC',
        '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#B2EBF2',
        '#009688', '#00897B', '#00796B', '#00695C', '#B2DFDB',
        '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#C8E6C9',
        '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#DCEDC8',
        '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#F0F4C3',
        '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#FFF9C4',
        '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FFECB3',
        '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#FFE0B2',
        '#FF5722', '#F4511E', '#E64A19', '#D84315', '#FFCCBC'
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch('/visualizations/user_app_usage.json');
            const data: UserData = await response.json();
            setUserData(data);

            // Calculate global stats and create app color mapping
            const totalUsers = Object.keys(data).length;
            const allApps = new Set<string>();
            let totalMinutes = 0;

            Object.values(data).forEach(userApps => {
                Object.keys(userApps).forEach(app => {
                    if (app !== '_total_time') {
                        allApps.add(app);
                    }
                });
                totalMinutes += userApps._total_time || 0;
            });

            // Create standardized color mapping for apps
            const sortedApps = Array.from(allApps).sort();
            const colorMapping: { [app: string]: string } = {};
            sortedApps.forEach((app, index) => {
                colorMapping[app] = colors[index % colors.length];
            });

            setAppColorMap(colorMapping);
            setStats({
                totalUsers,
                totalApps: allApps.size,
                totalHours: Math.round(totalMinutes / 60)
            });

            setIsLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setIsLoading(false);
        }
    };

    const getFilteredUsers = () => {
        let sortedUsers = Object.entries(userData);

        if (selectedAppFilter === 'all') {
            // Sort by total time
            sortedUsers = sortedUsers.sort(([, a], [, b]) => (b._total_time || 0) - (a._total_time || 0));
        } else {
            // Sort by specific app usage percentage
            sortedUsers = sortedUsers
                .filter(([, userApps]) => userApps[selectedAppFilter] && userApps[selectedAppFilter] > 0)
                .sort(([, a], [, b]) => {
                    const aPercentage = a[selectedAppFilter] && a._total_time ? (a[selectedAppFilter] / a._total_time) * 100 : 0;
                    const bPercentage = b[selectedAppFilter] && b._total_time ? (b[selectedAppFilter] / b._total_time) * 100 : 0;
                    return bPercentage - aPercentage;
                });
        }

        const userLimit = isExtended ? 200 : 50;
        return sortedUsers.slice(0, userLimit);
    };

    const getAllApps = () => {
        const allApps = new Set<string>();
        Object.values(userData).forEach(userApps => {
            Object.keys(userApps).forEach(app => {
                if (app !== '_total_time') {
                    allApps.add(app);
                }
            });
        });
        return Array.from(allApps).sort();
    };

    const createChartData = (userApps: UserAppData) => {
        const appData = Object.entries(userApps)
            .filter(([app, time]) => app !== '_total_time' && time > 0)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8); // Show top 8 apps

        const labels = appData.map(([app, time]) => `${app} (${Math.round(time)}m)`);
        const data = appData.map(([, time]) => time);
        const backgroundColor = appData.map(([app]) => {
            if (highlightedApp === null) {
                return appColorMap[app] || '#CCCCCC';
            } else if (app === highlightedApp) {
                return appColorMap[app] || '#CCCCCC';
            } else {
                return '#1a1a1a'; // Dark background color for non-highlighted apps
            }
        });

        return {
            labels,
            datasets: [{
                data,
                backgroundColor,
                borderWidth: 0
            }]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 200,
            easing: 'easeOutQuart' as const
        },
        hover: {
            mode: 'nearest' as const,
            intersect: true
        },
        interaction: {
            intersect: true,
            mode: 'nearest' as const
        },
        layout: {
            padding: 0
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label} (${percentage}%)`;
                    }
                }
            }
        },
        onHover: (event: any, elements: any[]) => {
            if (elements.length > 0) {
                const chart = event.chart;
                const elementIndex = elements[0].index;
                const appName = chart.data.labels[elementIndex].split(' (')[0];
                if (highlightedApp !== appName) {
                    setHighlightedApp(appName);
                }
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <PieChart className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading user data...</p>
                </div>
            </div>
        );
    }

    const filteredUsers = getFilteredUsers();

    return (
        <div className="w-full">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        User App Usage Dashboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                <span className="text-2xl font-bold text-blue-600">{stats.totalUsers}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Smartphone className="h-5 w-5 text-green-600" />
                                <span className="text-2xl font-bold text-green-600">{stats.totalApps}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Total Apps</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Clock className="h-5 w-5 text-purple-600" />
                                <span className="text-2xl font-bold text-purple-600">{stats.totalHours}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Total Hours</p>
                        </div>
                    </div>

                    {/* App Filter */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 justify-center">
                            <label className="text-sm font-medium">Filter by App:</label>
                            <Select value={selectedAppFilter} onValueChange={setSelectedAppFilter}>
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Select an app to filter by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Apps (by total usage)</SelectItem>
                                    {getAllApps().map((app) => (
                                        <SelectItem key={app} value={app}>
                                            {app}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedAppFilter !== 'all' && (
                            <p className="text-center text-sm text-muted-foreground mt-2">
                                Showing users sorted by <span className="font-medium">{selectedAppFilter}</span> usage percentage
                            </p>
                        )}
                    </div>

                    {/* Pie Charts Container */}
                    <div className="w-full border rounded-lg p-4 transition-all duration-500">
                        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-20 gap-x-2 gap-y-2">
                            {filteredUsers.map(([userId, userApps]) => {
                                const appData = Object.entries(userApps)
                                    .filter(([app, time]) => app !== '_total_time' && time > 0)
                                    .sort(([, a], [, b]) => b - a)
                                    .slice(0, 8);

                                if (appData.length === 0) return null;

                                return (
                                    <div
                                        key={userId}
                                        className="aspect-square w-full relative overflow-hidden"
                                        onMouseLeave={() => setHighlightedApp(null)}
                                    >
                                        <Pie
                                            data={createChartData(userApps)}
                                            options={chartOptions}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Extend Button */}
                    <div className="flex justify-center mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsExtended(!isExtended)}
                            className="transition-all duration-200 flex items-center gap-2"
                        >
                            {isExtended ? (
                                <>
                                    <ChevronUp className="h-4 w-4" />
                                    Show Less (50 Users)
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="h-4 w-4" />
                                    Show More (200 Users)
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Legend Info */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Each pie chart represents a user's app usage distribution.
                            Hover over charts to highlight apps across all visualizations.
                            {!isExtended && ' Click "Show More" to see additional users.'}
                        </p>
                        {highlightedApp && (
                            <p className="text-sm mt-2 font-medium text-primary">
                                Currently highlighting: <span className="font-bold">{highlightedApp}</span>
                            </p>
                        )}
                        <p className="text-xs mt-1 text-muted-foreground">
                            Currently showing: <span className="font-medium">{getFilteredUsers().length}</span> users
                            {selectedAppFilter !== 'all' && ` with ${selectedAppFilter} usage`}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserAppDashboard;
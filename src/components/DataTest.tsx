import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataTest = () => {
    const [dataStatus, setDataStatus] = useState<string>('Loading...');
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const testDataLoad = async () => {
            try {
                console.log('Testing data load...');
                const response = await fetch('/app_relationships_network.json');
                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();
                console.log('Data loaded successfully:', jsonData);

                setData(jsonData);
                setDataStatus(`✅ Data loaded successfully! Nodes: ${jsonData.nodes?.length || 0}, Edges: ${jsonData.edges?.length || 0}`);
            } catch (error) {
                console.error('Data load error:', error);
                setDataStatus(`❌ Error loading data: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        };

        testDataLoad();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Data Load Test</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                        <h3 className="font-semibold mb-2">Status:</h3>
                        <p className="text-sm">{dataStatus}</p>
                    </div>

                    {data && (
                        <div className="p-4 bg-muted/20 rounded-lg">
                            <h3 className="font-semibold mb-2">Data Preview:</h3>
                            <div className="text-xs space-y-1">
                                <div><strong>Nodes:</strong> {data.nodes?.length || 0}</div>
                                <div><strong>Edges:</strong> {data.edges?.length || 0}</div>
                                {data.nodes && data.nodes.length > 0 && (
                                    <div><strong>First Node:</strong> {JSON.stringify(data.nodes[0], null, 2)}</div>
                                )}
                                {data.edges && data.edges.length > 0 && (
                                    <div><strong>First Edge:</strong> {JSON.stringify(data.edges[0], null, 2)}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DataTest; 
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, Maximize2, Minimize2 } from 'lucide-react';

interface EmbeddedChartProps {
    title?: string;
    description?: string;
    htmlContent?: string;
    iframeSrc?: string;
    height?: number;
    showControls?: boolean;
}

const EmbeddedChart = ({
    title = "Embedded Chart",
    description = "Interactive chart embedded from HTML",
    htmlContent,
    iframeSrc,
    height = 600,
    showControls = true
}: EmbeddedChartProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (htmlContent && containerRef.current) {
            // Embed HTML content directly
            containerRef.current.innerHTML = htmlContent;
            setIsLoading(false);
        } else if (iframeSrc) {
            setIsLoading(false);
        }
    }, [htmlContent, iframeSrc]);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const downloadChart = () => {
        // Implementation for downloading chart as image or data
        console.log('Download chart functionality');
    };

    const openInNewTab = () => {
        if (iframeSrc) {
            window.open(iframeSrc, '_blank');
        }
    };

    return (
        <Card className={`w-full animate-fade-in ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            {title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    {showControls && (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleFullscreen}
                                className="flex items-center gap-2"
                            >
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                {isFullscreen ? 'Exit' : 'Fullscreen'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={downloadChart}
                                className="flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </Button>
                            {iframeSrc && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={openInNewTab}
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div
                    ref={containerRef}
                    className="border-2 border-border rounded-lg bg-background overflow-hidden"
                    style={{ height: isFullscreen ? 'calc(100vh - 120px)' : `${height}px` }}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Loading chart...</p>
                            </div>
                        </div>
                    ) : iframeSrc ? (
                        <iframe
                            src={iframeSrc}
                            className="w-full h-full border-0"
                            title={title}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    ) : (
                        <div className="w-full h-full">
                            {/* HTML content will be embedded here */}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default EmbeddedChart; 
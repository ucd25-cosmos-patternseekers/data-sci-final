import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Network, ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';

interface NetworkChartProps {
    title?: string;
    description?: string;
}

const NetworkChart = ({
    title = "App Relationships Network",
    description = "Interactive network visualization showing which apps are used together by the same users"
}: NetworkChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        nodeCount: 0,
        edgeCount: 0,
        maxWeight: 0,
        minWeight: 0
    });
    const [currentFilter, setCurrentFilter] = useState('all');
    const [controls, setControls] = useState({
        nodeSize: 1,
        linkOpacity: 1,
        linkWidth: 1,
        charge: -300
    });

    useEffect(() => {
        // Load D3.js dynamically
        const loadD3 = async () => {
            if (typeof window !== 'undefined' && !window.d3) {
                const script = document.createElement('script');
                script.src = 'https://d3js.org/d3.v7.min.js';
                script.onload = () => {
                    initializeNetwork();
                };
                script.onerror = (error) => {
                    console.error('Failed to load D3.js:', error);
                    setIsLoading(false);
                };
                document.head.appendChild(script);
            } else {
                initializeNetwork();
            }
        };

        loadD3();
    }, []);

    const initializeNetwork = async () => {
        if (typeof window === 'undefined' || !window.d3) return;

        const d3 = window.d3;
        setIsLoading(true);

        try {
            // Load the network data
            const response = await fetch('/app_relationships_network.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.nodes || !data.edges) {
                throw new Error('Invalid data structure: missing nodes or edges');
            }

            const nodes = data.nodes;
            const links = data.edges;

            // Update stats
            const weights = links.map((d: any) => d.weight);
            setStats({
                nodeCount: nodes.length,
                edgeCount: links.length,
                maxWeight: Math.max(...weights),
                minWeight: Math.min(...weights)
            });

            // Setup dimensions
            const width = containerRef.current?.clientWidth || 800;
            const height = 600;

            // Clear previous content
            if (svgRef.current) {
                svgRef.current.innerHTML = '';
            }

            // Make sure the SVG element exists
            if (!svgRef.current) {
                throw new Error('SVG element not found');
            }

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height);

            // Create zoom behavior
            const zoom = d3.zoom()
                .scaleExtent([0.1, 10])
                .on("zoom", (event: any) => {
                    container.attr("transform", event.transform);
                });

            svg.call(zoom as any);

            // Double-click to reset
            svg.on("dblclick", () => {
                svg.transition().duration(750).call(
                    zoom.transform as any,
                    d3.zoomIdentity
                );
            });

            const container = svg.append("g");

            // Create color scale for links
            const colorScale = d3.scaleSequential()
                .domain([Math.max(...weights), Math.min(...weights)])
                .interpolator(d3.interpolateViridis);

            // Create opacity scale for links
            const opacityScale = d3.scaleLinear()
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([0.2, 0.9]);

            // Create width scale for links
            const widthScale = d3.scaleLinear()
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([1, 6]);

            // Create size scale for nodes
            const sizeScale = d3.scaleSqrt()
                .domain([0, d3.max(nodes, (d: any) => d.size)])
                .range([8, 40]);

            // Create simulation
            const simulation = d3.forceSimulation(nodes as any)
                .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius((d: any) => sizeScale(d.size) + 10));

            // Create links
            const link = container.append("g")
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("class", "link")
                .style("stroke", (d: any) => colorScale(d.weight))
                .style("stroke-width", (d: any) => widthScale(d.weight))
                .style("stroke-opacity", (d: any) => opacityScale(d.weight));

            // Create nodes
            const node = container.append("g")
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("class", "node")
                .attr("r", (d: any) => sizeScale(d.size))
                .style("fill", "#69b3a2")
                .call(drag(simulation) as any);

            // Add labels
            const label = container.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .text((d: any) => d.id)
                .attr("font-size", "12px")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .style("pointer-events", "none")
                .style("fill", "#333");

            // Create tooltip
            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "rgba(0, 0, 0, 0.9)")
                .style("color", "white")
                .style("padding", "12px 16px")
                .style("border-radius", "8px")
                .style("font-size", "14px")
                .style("pointer-events", "none")
                .style("z-index", "1000")
                .style("display", "none");

            // Node interactions
            node.on("mouseover", function (event: any, d: any) {
                const appConnections = links.filter((l: any) => l.source.id === d.id || l.target.id === d.id);
                const strongestConnection = appConnections.reduce((max: any, link: any) =>
                    link.weight > max.weight ? link : max, appConnections[0]);

                tooltip.style("display", "block")
                    .html(`
            <strong>${d.id}</strong><br>
            Users: ${d.user_count.toLocaleString()}<br>
            Connections: ${appConnections.length}<br>
            <strong>Strongest Connection:</strong><br>
            → ${strongestConnection ? (strongestConnection.source.id === d.id ?
                            strongestConnection.target.id : strongestConnection.source.id) : 'None'}<br>
            Similarity: ${strongestConnection ? strongestConnection.weight.toFixed(3) : 'N/A'}
          `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");

                // Highlight connections
                link.style("stroke-opacity", function (l: any) {
                    return (l.source.id === d.id || l.target.id === d.id) ?
                        opacityScale(l.weight) : 0.1;
                })
                    .style("stroke", function (l: any) {
                        return (l.source.id === d.id || l.target.id === d.id) ?
                            colorScale(l.weight) : "#ccc";
                    });

                node.style("opacity", function (n: any) {
                    return (n.id === d.id ||
                        links.some((l: any) => (l.source.id === d.id && l.target.id === n.id) ||
                            (l.target.id === d.id && l.source.id === n.id))) ? 1 : 0.3;
                });

                label.style("opacity", function (n: any) {
                    return (n.id === d.id ||
                        links.some((l: any) => (l.source.id === d.id && l.target.id === n.id) ||
                            (l.target.id === d.id && l.source.id === n.id))) ? 1 : 0.3;
                });
            })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                    link.style("stroke-opacity", (d: any) => opacityScale(d.weight))
                        .style("stroke", (d: any) => colorScale(d.weight));
                    node.style("opacity", 1);
                    label.style("opacity", 1);
                });

            // Link interactions
            link.on("mouseover", function (event: any, d: any) {
                tooltip.style("display", "block")
                    .html(`
            <strong>${d.source.id} ↔ ${d.target.id}</strong><br>
            Similarity: ${d.weight.toFixed(3)}<br>
            Shared Users: ${d.shared_users.toLocaleString()}<br>
            Jaccard Index: ${d.weight.toFixed(3)}
          `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                });

            // Update positions on simulation tick
            simulation.on("tick", () => {
                link
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y)
                    .attr("x2", (d: any) => d.target.x)
                    .attr("y2", (d: any) => d.target.y);

                node
                    .attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y);

                label
                    .attr("x", (d: any) => d.x)
                    .attr("y", (d: any) => d.y);
            });

            // Drag behavior
            function drag(simulation: any) {
                function dragstarted(event: any, d: any) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(event: any, d: any) {
                    d.fx = event.x;
                    d.fy = event.y;
                }

                function dragended(event: any, d: any) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }

            setIsLoading(false);

        } catch (error) {
            console.error("Error loading network data:", error);
            setIsLoading(false);
        }
    };

    const handleFilter = (filterType: string) => {
        setCurrentFilter(filterType);
        // Filter logic would be implemented here
    };

    const handleControlChange = (control: string, value: number) => {
        setControls(prev => ({ ...prev, [control]: value }));
        // Control logic would be implemented here
    };

    return (
        <Card className="w-full animate-fade-in">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    {title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>
            <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-muted/20 rounded-lg">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.nodeCount}</div>
                        <div className="text-xs text-muted-foreground">Apps</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.edgeCount}</div>
                        <div className="text-xs text-muted-foreground">Relationships</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.maxWeight.toFixed(3)}</div>
                        <div className="text-xs text-muted-foreground">Max Similarity</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.minWeight.toFixed(3)}</div>
                        <div className="text-xs text-muted-foreground">Min Similarity</div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex justify-center gap-2 mb-6">
                    <Button
                        variant={currentFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilter('all')}
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        All Relationships
                    </Button>
                    <Button
                        variant={currentFilter === 'strong' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilter('strong')}
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Strong Relationships
                    </Button>
                    <Button
                        variant={currentFilter === 'weak' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilter('weak')}
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Weak Relationships
                    </Button>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="space-y-2">
                        <Label htmlFor="node-size" className="text-xs">Node Size</Label>
                        <Slider
                            id="node-size"
                            min={0.5}
                            max={3}
                            step={0.1}
                            value={[controls.nodeSize]}
                            onValueChange={(value) => handleControlChange('nodeSize', value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link-opacity" className="text-xs">Link Opacity</Label>
                        <Slider
                            id="link-opacity"
                            min={0.1}
                            max={2}
                            step={0.1}
                            value={[controls.linkOpacity]}
                            onValueChange={(value) => handleControlChange('linkOpacity', value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link-width" className="text-xs">Link Width</Label>
                        <Slider
                            id="link-width"
                            min={0.5}
                            max={3}
                            step={0.1}
                            value={[controls.linkWidth]}
                            onValueChange={(value) => handleControlChange('linkWidth', value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="charge" className="text-xs">Repulsion</Label>
                        <Slider
                            id="charge"
                            min={-1000}
                            max={-100}
                            step={50}
                            value={[Math.abs(controls.charge)]}
                            onValueChange={(value) => handleControlChange('charge', -value[0])}
                        />
                    </div>
                </div>

                {/* Network Visualization */}
                <div
                    ref={containerRef}
                    className="border-2 border-border rounded-lg bg-background overflow-hidden"
                    style={{ height: '600px' }}
                >
                    {isLoading && (
                        <div className="flex items-center justify-center h-full absolute inset-0 z-10 bg-background">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Loading network visualization...</p>
                            </div>
                        </div>
                    )}
                    <svg
                        ref={svgRef}
                        className="w-full h-full"
                        style={{
                            cursor: 'grab',
                            '--node-color': 'hsl(var(--primary))',
                            '--link-color': 'hsl(var(--secondary))'
                        } as React.CSSProperties}
                    >
                        <style>
                            {`
                  .node {
                    cursor: pointer;
                    stroke: #fff;
                    stroke-width: 3px;
                    transition: stroke-width 0.2s ease;
                  }
                  .node:hover {
                    stroke: hsl(var(--primary));
                    stroke-width: 4px;
                  }
                  .link {
                    stroke-opacity: 0.6;
                    cursor: pointer;
                    transition: stroke-opacity 0.2s ease, stroke-width 0.2s ease;
                  }
                  .link:hover {
                    stroke-opacity: 1;
                    stroke-width: 4px;
                  }
                `}
                        </style>
                    </svg>
                </div>

                {/* Legend */}
                <div className="flex justify-center items-center gap-8 mt-6 p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-1.5 bg-yellow-400 rounded"></div>
                        <span className="text-sm">High Similarity (Thick, Opaque)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-1 bg-teal-500 rounded"></div>
                        <span className="text-sm">Medium Similarity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-purple-800 rounded opacity-30"></div>
                        <span className="text-sm">Low Similarity (Thin, Transparent)</span>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">How to Use:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-muted-foreground">
                        <div><strong>Drag:</strong> Move apps around</div>
                        <div><strong>Scroll:</strong> Zoom in/out</div>
                        <div><strong>Hover:</strong> See app details</div>
                        <div><strong>Click:</strong> Focus on app</div>
                        <div><strong>Double-click:</strong> Reset view</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NetworkChart; 
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Network } from 'lucide-react';

interface TransitionChartProps {
    title?: string;
    description?: string;
}

const TransitionChart = ({
    title = "App Transition Network",
    description = "Visualizing app switching patterns between users"
}: TransitionChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [nodeCount, setNodeCount] = useState(20);
    const [showArrows, setShowArrows] = useState(false);

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
    }, [nodeCount, showArrows]);

    const initializeNetwork = async () => {
        if (typeof window === 'undefined' || !window.d3) return;

        const d3 = window.d3;
        setIsLoading(true);

        try {
            // Load both transition network data and genre mapping
            const [networkResponse, genreResponse] = await Promise.all([
                fetch('/app_transition_network.json'),
                fetch('/app_genre_mapping.json')
            ]);

            if (!networkResponse.ok || !genreResponse.ok) {
                throw new Error('Failed to load data files');
            }

            const networkData = await networkResponse.json();
            const genreMapping = await genreResponse.json();

            const nodes = networkData.nodes;
            const links = networkData.edges;

            // Add genre information to nodes
            nodes.forEach((node: any) => {
                // Try exact match first, then case-insensitive match
                node.genre = genreMapping[node.id] ||
                    genreMapping[Object.keys(genreMapping).find((key: string) =>
                        key.toLowerCase() === node.id.toLowerCase()
                    ) || ''] || "unknown";
            });

            // Sort nodes by size (total duration) and take top N initially
            nodes.sort((a: any, b: any) => b.size - a.size);
            const topNodes = nodes.slice(0, nodeCount);
            const topNodeIds = new Set(topNodes.map((n: any) => n.id));

            // Filter links to only include connections between top nodes
            const filteredLinks = links.filter((l: any) =>
                topNodeIds.has(l.source) && topNodeIds.has(l.target)
            );

            // Convert string references to object references for D3
            const processedLinks: any[] = [];
            const linkMap = new Map();

            if (showArrows) {
                // Create bidirectional links for arrows
                filteredLinks.forEach((l: any) => {
                    const sourceNode = topNodes.find((n: any) => n.id === l.source);
                    const targetNode = topNodes.find((n: any) => n.id === l.target);

                    if (sourceNode && targetNode) {
                        // Create a unique key for each pair (regardless of direction)
                        const key1 = `${l.source}-${l.target}`;
                        const key2 = `${l.target}-${l.source}`;

                        // Check if we've already seen this pair
                        if (!linkMap.has(key1) && !linkMap.has(key2)) {
                            // First direction
                            processedLinks.push({
                                ...l,
                                source: sourceNode,
                                target: targetNode,
                                id: key1
                            });

                            // Reverse direction (with potentially different weight)
                            const reverseLink = filteredLinks.find((rl: any) =>
                                rl.source === l.target && rl.target === l.source
                            );

                            processedLinks.push({
                                source: targetNode,
                                target: sourceNode,
                                weight: reverseLink ? reverseLink.weight : l.weight * 0.5, // Use reverse weight or half weight
                                raw_freq: reverseLink ? reverseLink.raw_freq : Math.floor(l.raw_freq * 0.5),
                                id: key2
                            });

                            linkMap.set(key1, true);
                            linkMap.set(key2, true);
                        }
                    }
                });
            } else {
                // Create single undirected links 
                filteredLinks.forEach((l: any) => {
                    const sourceNode = topNodes.find((n: any) => n.id === l.source);
                    const targetNode = topNodes.find((n: any) => n.id === l.target);

                    if (sourceNode && targetNode) {
                        // Create a unique key for each pair (use consistent ordering)
                        const key1 = `${l.source}-${l.target}`;
                        const key2 = `${l.target}-${l.source}`;
                        const uniqueKey = l.source < l.target ? key1 : key2;

                        // Check if we've already seen this pair
                        if (!linkMap.has(key1) && !linkMap.has(key2)) {
                            // Find the reverse link to combine weights
                            const reverseLink = filteredLinks.find((rl: any) =>
                                rl.source === l.target && rl.target === l.source
                            );

                            // Use the stronger connection weight
                            const combinedWeight = reverseLink ? Math.max(l.weight, reverseLink.weight) : l.weight;
                            const combinedFreq = reverseLink ? Math.max(l.raw_freq, reverseLink.raw_freq) : l.raw_freq;

                            processedLinks.push({
                                source: sourceNode,
                                target: targetNode,
                                weight: combinedWeight,
                                raw_freq: combinedFreq,
                                id: uniqueKey
                            });

                            linkMap.set(key1, true);
                            linkMap.set(key2, true);
                        }
                    }
                });
            }

            // Get nodes that actually have connections
            const connectedNodeIds = new Set();
            processedLinks.forEach((link: any) => {
                connectedNodeIds.add(link.source.id);
                connectedNodeIds.add(link.target.id);
            });

            // Filter nodes to only include those with connections
            const connectedNodes = topNodes.filter((node: any) => connectedNodeIds.has(node.id));

            // Setup dimensions
            const width = containerRef.current?.clientWidth || 800;
            const height = 500;

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

            // Get weights from processed links
            const weights = processedLinks.map((d: any) => d.weight);

            // Define arrow markers for different colors
            const defs = svg.append("defs");

            // Create arrow markers for the color range (viridis colors)
            const viridisColors = [
                "#440154", "#482777", "#3f4a8a", "#31678e", "#26838f",
                "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"
            ];

            // Create arrow markers for each color and opacity combination
            viridisColors.forEach((color, colorIndex) => {
                // Create multiple opacity levels for each color
                const opacityLevels = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
                opacityLevels.forEach((opacity, opacityIndex) => {
                    defs.append("marker")
                        .attr("id", `arrow-${colorIndex}-${opacityIndex}`)
                        .attr("viewBox", "0 -3 12 6")
                        .attr("refX", 10)
                        .attr("refY", 0)
                        .attr("markerWidth", 8)
                        .attr("markerHeight", 6)
                        .attr("orient", "auto")
                        .attr("markerUnits", "strokeWidth")
                        .append("path")
                        .attr("d", "M0,-2L12,0L0,2L3,0Z") // More pointed, skinny arrow
                        .attr("fill", color)
                        .attr("fill-opacity", opacity)
                        .attr("stroke", "none");
                });
            });

            // Create color scale for links using logarithmic scale
            const colorScale = d3.scaleSequential()
                .domain([Math.min(...weights), Math.max(...weights)])
                .interpolator(d3.interpolateViridis);

            // Create opacity scale for links using power scale
            let opacityExponent = nodeCount === 20 ? 0.4 : 0.4;
            const opacityScale = d3.scalePow()
                .exponent(opacityExponent)
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([0.01, 1]);

            // Create width scale for links
            const widthScale = d3.scaleLinear()
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([1, 6]);

            // Create size scale for nodes
            const sizeScale = d3.scaleSqrt()
                .domain([0, d3.max(nodes, (d: any) => d.size)])
                .range([6, 30]);

            // Create color scale for genres
            const genreColors = {
                "Social Media": "#E53E3E",
                "Communication": "#319795",
                "Entertainment": "#3182CE",
                "System": "#68D391",
                "Productivity": "#D69E2E",
                "Media & News": "#B794F6",
                "Lifestyle": "#4FD1C7",
                "Gaming": "#F6E05E",
                "Finance": "#9F7AEA",
                "Shopping": "#63B3ED",
                "Navigation": "#F6AD55",
                "Health & Fitness": "#68D391",
                "unknown": "#A0AEC0"
            };

            // Create simulation with higher repulsion in arrows mode
            const chargeStrength = showArrows ? -800 : -400;
            const simulation = d3.forceSimulation(connectedNodes as any)
                .force("link", d3.forceLink(processedLinks).id((d: any) => d.id).distance(120))
                .force("charge", d3.forceManyBody().strength(chargeStrength))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius((d: any) => sizeScale(d.size) + 10));

            // Create links - use paths for curves (arrows) or straight lines (no arrows)
            const link = container.append("g")
                .selectAll("path")
                .data(processedLinks)
                .join("path")
                .attr("class", "link")
                .style("stroke", (d: any) => colorScale(d.weight))
                .style("stroke-width", (d: any) => widthScale(d.weight))
                .style("stroke-opacity", (d: any) => opacityScale(d.weight))
                .style("fill", "none")
                .attr("marker-end", (d: any) => {
                    if (!showArrows) return "none";

                    // Map the weight to a color index
                    const normalizedWeight = (d.weight - Math.min(...weights)) / (Math.max(...weights) - Math.min(...weights));
                    const colorIndex = Math.floor(normalizedWeight * (viridisColors.length - 1));

                    // Map the opacity to an opacity index
                    const linkOpacity = opacityScale(d.weight);
                    const opacityIndex = Math.floor(linkOpacity * 9); // 0-9 for 10 opacity levels

                    return `url(#arrow-${colorIndex}-${opacityIndex})`;
                });

            // Create nodes
            const node = container.append("g")
                .selectAll("circle")
                .data(connectedNodes)
                .join("circle")
                .attr("class", "node")
                .attr("r", (d: any) => sizeScale(d.size))
                .style("fill", (d: any) => genreColors[d.genre] || "#A0AEC0")
                .call(drag(simulation) as any);

            // Add labels
            const label = container.append("g")
                .selectAll("text")
                .data(connectedNodes)
                .join("text")
                .text((d: any) => d.id)
                .attr("font-size", "12px")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .style("pointer-events", "none")
                .style("fill", "white");

            // Create tooltip
            const tooltip = d3.select(containerRef.current).append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("top", "20px")
                .style("left", "20px")
                .style("background", "rgba(0, 0, 0, 0.9)")
                .style("color", "white")
                .style("padding", "12px 16px")
                .style("border-radius", "8px")
                .style("font-size", "14px")
                .style("pointer-events", "none")
                .style("z-index", "1000")
                .style("display", "none")
                .style("max-width", "300px");

            // Node interactions
            node.on("mouseover", function (event: any, d: any) {
                // Find all connections for this app
                const appConnections = processedLinks.filter((l: any) => l.source.id === d.id || l.target.id === d.id);
                const strongestConnection = appConnections.reduce((max: any, link: any) =>
                    link.weight > max.weight ? link : max, appConnections[0]);

                // Show tooltip
                tooltip.style("display", "block")
                    .html(`
              <strong>${d.id}</strong><br>
              Genre: ${d.genre}<br>
              Size: ${d.size.toFixed(1)}<br>
              Raw Count: ${d.raw_count.toLocaleString()}<br>
              Connections: ${appConnections.length}<br>
              <strong>Strongest Connection:</strong><br>
              → ${strongestConnection ? (strongestConnection.source.id === d.id ?
                            strongestConnection.target.id : strongestConnection.source.id) : 'N/A'}<br>
              Weight: ${strongestConnection ? strongestConnection.weight.toFixed(3) : 'N/A'}
            `);

                // Create color scale based on the connections of this specific node
                const connectionWeights = appConnections.map((l: any) => l.weight);
                const nodeColorScale = d3.scaleSequential()
                    .domain([Math.min(...connectionWeights), Math.max(...connectionWeights)])
                    .interpolator(d3.interpolateViridis);

                // Create opacity scale based on the connections of this specific node
                const nodeOpacityScale = d3.scalePow()
                    .exponent(opacityExponent)
                    .domain([Math.min(...connectionWeights), Math.max(...connectionWeights)])
                    .range([0.4, 1]);

                // Focus on this node - highlight its connections and hide others
                link.style("stroke-opacity", function (l: any) {
                    return (l.source.id === d.id || l.target.id === d.id) ?
                        nodeOpacityScale(l.weight) : 0;
                })
                    .style("stroke", function (l: any) {
                        return (l.source.id === d.id || l.target.id === d.id) ?
                            nodeColorScale(l.weight) : "#ccc";
                    })
                    .attr("marker-end", function (l: any) {
                        if (!showArrows) return "none";

                        if (l.source.id === d.id || l.target.id === d.id) {
                            // Recalculate color and opacity for focused connections
                            const connectionWeights = appConnections.map((link: any) => link.weight);
                            const normalizedWeight = (l.weight - Math.min(...connectionWeights)) / (Math.max(...connectionWeights) - Math.min(...connectionWeights));
                            const colorIndex = Math.floor(normalizedWeight * (viridisColors.length - 1));

                            const linkOpacity = nodeOpacityScale(l.weight);
                            const opacityIndex = Math.floor(linkOpacity * 9);

                            return `url(#arrow-${colorIndex}-${opacityIndex})`;
                        } else {
                            // Hide arrows for non-connected links
                            return "none";
                        }
                    });

                // Highlight connected nodes with opacity based on connection strength
                node.style("opacity", function (n: any) {
                    if (n.id === d.id) return 1;

                    // Find the connection between this node and the hovered node
                    const connection = processedLinks.find((l: any) =>
                        (l.source.id === d.id && l.target.id === n.id) ||
                        (l.target.id === d.id && l.source.id === n.id)
                    );

                    if (connection) {
                        return nodeOpacityScale(connection.weight);
                    }

                    return 0.6; // Increased minimum opacity for unconnected nodes
                })
                    .style("fill", function (n: any) {
                        if (n.id === d.id) return genreColors[n.genre] || "#A0AEC0";

                        // Find the connection between this node and the hovered node
                        const connection = processedLinks.find((l: any) =>
                            (l.source.id === d.id && l.target.id === n.id) ||
                            (l.target.id === d.id && l.source.id === n.id)
                        );

                        if (connection) {
                            return genreColors[n.genre] || "#A0AEC0";
                        }

                        return "#CCCCCC"; // Grey for unconnected nodes
                    });

                // Highlight connected node labels with opacity based on connection strength
                label.style("opacity", function (n: any) {
                    if (n.id === d.id) return 1;

                    // Find the connection between this node and the hovered node
                    const connection = processedLinks.find((l: any) =>
                        (l.source.id === d.id && l.target.id === n.id) ||
                        (l.target.id === d.id && l.source.id === n.id)
                    );

                    if (connection) {
                        return nodeOpacityScale(connection.weight);
                    }

                    return 0.6; // Increased minimum opacity for unconnected nodes
                });
            })
                .on("mouseout", function () {
                    tooltip.style("display", "none");

                    // Reset all links to normal appearance with current opacity scale
                    const currentOpacityScale = d3.scalePow()
                        .exponent(opacityExponent)
                        .domain([Math.min(...processedLinks.map((d: any) => d.weight)), Math.max(...processedLinks.map((d: any) => d.weight))])
                        .range([0.01, 1]);

                    link.style("stroke-opacity", (d: any) => currentOpacityScale(d.weight))
                        .style("stroke", (d: any) => colorScale(d.weight))
                        .attr("marker-end", (d: any) => {
                            if (!showArrows) return "none";

                            // Restore original arrow markers
                            const normalizedWeight = (d.weight - Math.min(...weights)) / (Math.max(...weights) - Math.min(...weights));
                            const colorIndex = Math.floor(normalizedWeight * (viridisColors.length - 1));

                            const linkOpacity = currentOpacityScale(d.weight);
                            const opacityIndex = Math.floor(linkOpacity * 9);

                            return `url(#arrow-${colorIndex}-${opacityIndex})`;
                        });

                    // Reset all nodes to normal appearance
                    node.style("opacity", 1)
                        .style("fill", (d: any) => genreColors[d.genre] || "#A0AEC0");
                    label.style("opacity", 1);
                });

            // Link interactions
            link.on("mouseover", function (event: any, d: any) {
                tooltip.style("display", "block")
                    .html(`
              <strong>${d.source.id} → ${d.target.id}</strong><br>
              Weight: ${d.weight.toFixed(3)}<br>
              Raw Frequency: ${d.raw_freq.toLocaleString()}
            `);
            })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                });

            // Update positions on simulation tick
            simulation.on("tick", () => {
                link.attr("d", (d: any) => {
                    const dx = d.target.x - d.source.x;
                    const dy = d.target.y - d.source.y;
                    const length = Math.sqrt(dx * dx + dy * dy);

                    if (length === 0) return "M0,0L0,0";

                    // Calculate start and end points accounting for node radius
                    const sourceRadius = sizeScale(d.source.size) + 2;
                    const targetRadius = sizeScale(d.target.size) + (showArrows ? 8 : 2); // Extra space for arrows

                    const startX = d.source.x + (dx * sourceRadius) / length;
                    const startY = d.source.y + (dy * sourceRadius) / length;
                    const endX = d.target.x - (dx * targetRadius) / length;
                    const endY = d.target.y - (dy * targetRadius) / length;

                    if (showArrows) {
                        // Create curved paths for arrows to avoid overlap
                        const midX = (startX + endX) / 2;
                        const midY = (startY + endY) / 2;

                        // Determine curve direction based on link direction to avoid overlap
                        const sourceId = d.source.id;
                        const targetId = d.target.id;
                        const isFirstDirection = d.id && d.id.startsWith(sourceId);
                        const curveOffset = isFirstDirection ? 20 : -20; // Curve opposite directions

                        // Calculate perpendicular offset
                        const perpX = -dy / length * curveOffset;
                        const perpY = dx / length * curveOffset;

                        const controlX = midX + perpX;
                        const controlY = midY + perpY;

                        // Create quadratic curve path
                        return `M${startX},${startY}Q${controlX},${controlY} ${endX},${endY}`;
                    } else {
                        // Create straight line path for simple connections
                        return `M${startX},${startY}L${endX},${endY}`;
                    }
                });

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
            console.error("Error loading transition network data:", error);
            setIsLoading(false);
        }
    };

    const handleNodeCountChange = (count: number) => {
        setNodeCount(count);
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
                {/* Controls */}
                <div className="flex justify-center mb-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center gap-2">
                            <label className="text-sm font-medium">Number of Apps</label>
                            <div className="flex gap-2">
                                <Button
                                    variant={nodeCount === 20 ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleNodeCountChange(20)}
                                >
                                    20 Apps
                                </Button>
                                <Button
                                    variant={nodeCount === 60 ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleNodeCountChange(60)}
                                >
                                    60 Apps
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium">Connection Style</label>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Lines</span>
                                <Switch
                                    checked={showArrows}
                                    onCheckedChange={setShowArrows}
                                />
                                <span className="text-xs text-muted-foreground">Arrows</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Network Visualization */}
                <div
                    ref={containerRef}
                    className="border-2 border-border rounded-lg bg-background overflow-hidden relative"
                    style={{ height: '500px' }}
                >
                    {isLoading && (
                        <div className="flex items-center justify-center h-full absolute inset-0 z-10 bg-background">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Loading transition network visualization...</p>
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



            </CardContent>
        </Card>
    );
};

export default TransitionChart;
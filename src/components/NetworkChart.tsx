import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network } from 'lucide-react';

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
    const [nodeCount, setNodeCount] = useState(20);

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
    }, [nodeCount]);

    const initializeNetwork = async () => {
        if (typeof window === 'undefined' || !window.d3) return;

        const d3 = window.d3;
        setIsLoading(true);

        try {
            // Load both network data and genre mapping
            const [networkResponse, genreResponse] = await Promise.all([
                fetch('/app_relationships_network.json'),
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
                node.genre = genreMapping[node.id] || "unknown";
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
            const processedLinks = filteredLinks.map((l: any) => ({
                ...l,
                source: topNodes.find((n: any) => n.id === l.source),
                target: topNodes.find((n: any) => n.id === l.target)
            }));

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
            const height = 700;

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

            // Create color scale for links using theme colors
            const colorScale = d3.scaleSequential()
                .domain([Math.min(...weights), Math.max(...weights)])
                .interpolator(d3.interpolateRgb("hsl(217, 91%, 60%)", "hsl(174, 62%, 47%)"));

            // Create opacity scale for links using power scale
            let opacityExponent = nodeCount === 20 ? 0.8 : 1.6;
            const opacityScale = d3.scalePow()
                .exponent(opacityExponent)
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([0.2, 0.9]);

            // Create width scale for links
            const widthScale = d3.scaleLinear()
                .domain([Math.min(...weights), Math.max(...weights)])
                .range([1, 4]);

            // Create size scale for nodes
            const sizeScale = d3.scaleSqrt()
                .domain([0, d3.max(nodes, (d: any) => d.size)])
                .range([20, 50]);

            // Create color scale for genres using theme colors
            const genreColors = {
                "Social Media": "hsl(217, 91%, 60%)",
                "Communication": "hsl(174, 62%, 47%)",
                "Entertainment": "hsl(262, 83%, 58%)",
                "System": "hsl(174, 62%, 57%)",
                "Productivity": "hsl(217, 91%, 70%)",
                "Media & News": "hsl(262, 83%, 68%)",
                "Lifestyle": "hsl(174, 62%, 37%)",
                "Gaming": "hsl(217, 91%, 50%)",
                "Finance": "hsl(262, 83%, 48%)",
                "Shopping": "hsl(174, 62%, 67%)",
                "Navigation": "hsl(217, 91%, 80%)",
                "Health & Fitness": "hsl(174, 62%, 57%)",
                "unknown": "hsl(240, 4%, 65%)"
            };

            // Create simulation
            const simulation = d3.forceSimulation(connectedNodes as any)
                .force("link", d3.forceLink(processedLinks).id((d: any) => d.id).distance(120))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("collision", d3.forceCollide().radius((d: any) => sizeScale(d.size) + 10));

            // Create links
            const link = container.append("g")
                .selectAll("line")
                .data(processedLinks)
                .join("line")
                .attr("class", "link")
                .style("stroke", (d: any) => colorScale(d.weight))
                .style("stroke-width", (d: any) => widthScale(d.weight))
                .style("stroke-opacity", (d: any) => opacityScale(d.weight));

            // Create nodes
            const node = container.append("g")
                .selectAll("circle")
                .data(connectedNodes)
                .join("circle")
                .attr("class", "node")
                .attr("r", (d: any) => sizeScale(d.size))
                .style("fill", (d: any) => genreColors[d.genre] || "#CCCCCC")
                .call(drag(simulation) as any);

            // Add labels with smart text wrapping
            const label = container.append("g")
                .selectAll("text")
                .data(connectedNodes)
                .join("text")
                .each(function(d: any) {
                    const node = d3.select(this);
                    const radius = sizeScale(d.size);
                    const maxWidth = radius * 1.8;
                    const words = d.id.split(/\s+/);
                    let fontSize = Math.max(8, Math.min(12, radius / 3));
                    
                    // Adjust font size based on text length
                    if (d.id.length > 15) fontSize = Math.max(6, fontSize - 2);
                    if (d.id.length > 25) fontSize = Math.max(5, fontSize - 2);
                    
                    node.attr("font-size", `${fontSize}px`)
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .style("pointer-events", "none")
                        .style("fill", "hsl(0, 0%, 98%)")
                        .style("font-weight", "600")
                        .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.8)")
                        .style("font-family", "system-ui, -apple-system, sans-serif");
                    
                    // For single word or short text, just display it
                    if (words.length === 1 || d.id.length <= 12) {
                        node.text(d.id);
                    } else {
                        // Split into multiple lines for better readability
                        const lines = [];
                        let currentLine = "";
                        
                        for (const word of words) {
                            const testLine = currentLine ? `${currentLine} ${word}` : word;
                            if (testLine.length <= maxWidth / (fontSize * 0.6)) {
                                currentLine = testLine;
                            } else {
                                if (currentLine) lines.push(currentLine);
                                currentLine = word;
                            }
                        }
                        if (currentLine) lines.push(currentLine);
                        
                        // Limit to 2 lines max
                        const displayLines = lines.slice(0, 2);
                        if (lines.length > 2) {
                            displayLines[1] = displayLines[1].substring(0, 8) + "...";
                        }
                        
                        if (displayLines.length === 1) {
                            node.text(displayLines[0]);
                        } else {
                            node.selectAll("tspan").remove();
                            displayLines.forEach((line, i) => {
                                node.append("tspan")
                                    .attr("x", 0)
                                    .attr("dy", i === 0 ? "-0.2em" : "1em")
                                    .text(line);
                            });
                        }
                    }
                });

            // Create tooltip with modern design
            const tooltip = d3.select(containerRef.current).append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("top", "20px")
                .style("left", "20px")
                .style("background", "hsl(240, 10%, 3.9%)")
                .style("backdrop-filter", "blur(12px)")
                .style("border", "1px solid hsl(240, 5%, 15%)")
                .style("color", "hsl(0, 0%, 98%)")
                .style("padding", "16px 20px")
                .style("border-radius", "12px")
                .style("font-size", "14px")
                .style("font-family", "system-ui, -apple-system, sans-serif")
                .style("pointer-events", "none")
                .style("z-index", "1000")
                .style("display", "none")
                .style("max-width", "320px")
                .style("box-shadow", "0 25px 50px -12px hsl(217, 91%, 60%, 0.25)");

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
              Users: ${d.user_count.toLocaleString()}<br>
              Connections: ${appConnections.length}<br>
              <strong>Strongest Connection:</strong><br>
              → ${strongestConnection ? (strongestConnection.source.id === d.id ?
                            strongestConnection.target.id : strongestConnection.source.id) : 'N/A'}<br>
              Similarity: ${strongestConnection ? strongestConnection.weight.toFixed(3) : 'N/A'}
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
                        if (n.id === d.id) return genreColors[n.genre] || "#CCCCCC";

                        // Find the connection between this node and the hovered node
                        const connection = processedLinks.find((l: any) =>
                            (l.source.id === d.id && l.target.id === n.id) ||
                            (l.target.id === d.id && l.source.id === n.id)
                        );

                        if (connection) {
                            return genreColors[n.genre] || "#CCCCCC";
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
                        .style("stroke", (d: any) => colorScale(d.weight));

                    // Reset all nodes to normal appearance
                    node.style("opacity", 1)
                        .style("fill", (d: any) => genreColors[d.genre] || "#CCCCCC");
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
            `);
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
                </div>

                {/* Network Visualization */}
                <div
                    ref={containerRef}
                    className="chart-container overflow-hidden relative"
                    style={{ height: '700px' }}
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
                <div className="mt-6 p-6 chart-container">
                    <h4 className="text-center font-semibold mb-6 text-lg">App Genres</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { name: "Social Media", color: "hsl(217, 91%, 60%)" },
                            { name: "Communication", color: "hsl(174, 62%, 47%)" },
                            { name: "Entertainment", color: "hsl(262, 83%, 58%)" },
                            { name: "System", color: "hsl(174, 62%, 57%)" },
                            { name: "Productivity", color: "hsl(217, 91%, 70%)" },
                            { name: "Media & News", color: "hsl(262, 83%, 68%)" },
                            { name: "Lifestyle", color: "hsl(174, 62%, 37%)" },
                            { name: "Gaming", color: "hsl(217, 91%, 50%)" },
                            { name: "Finance", color: "hsl(262, 83%, 48%)" },
                            { name: "Shopping", color: "hsl(174, 62%, 67%)" },
                            { name: "Navigation", color: "hsl(217, 91%, 80%)" },
                            { name: "Health & Fitness", color: "hsl(174, 62%, 57%)" }
                        ].map((genre) => (
                            <div key={genre.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                                <div
                                    className="w-4 h-4 rounded-full border border-border/20"
                                    style={{ backgroundColor: genre.color }}
                                ></div>
                                <span className="text-sm font-medium">{genre.name}</span>
                            </div>
                        ))}
                    </div>
                </div>


            </CardContent>
        </Card>
    );
};

export default NetworkChart; 
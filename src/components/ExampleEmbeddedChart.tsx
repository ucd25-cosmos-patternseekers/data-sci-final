import EmbeddedChart from './EmbeddedChart';

const ExampleEmbeddedChart = () => {
    // Example of how to embed the original HTML file
    const originalHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App Relationships Network</title>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            .container {
                max-width: 1400px;
                margin: 0 auto;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                padding: 30px;
            }
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 10px;
                font-size: 2.5em;
            }
            .subtitle {
                text-align: center;
                color: #666;
                margin-bottom: 30px;
                font-size: 16px;
            }
            .controls {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-bottom: 30px;
                flex-wrap: wrap;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            .control-group {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            .control-group label {
                font-size: 14px;
                color: #555;
                font-weight: bold;
            }
            .control-group input {
                width: 120px;
            }
            .stats {
                display: flex;
                justify-content: space-around;
                margin-bottom: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                font-size: 16px;
            }
            .stat-item {
                text-align: center;
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
            }
            .stat-label {
                color: #666;
                font-size: 14px;
            }
            #network {
                border: 2px solid #ddd;
                border-radius: 10px;
                background: white;
                margin: 20px 0;
            }
            .node {
                cursor: pointer;
                stroke: #fff;
                stroke-width: 3px;
                transition: stroke-width 0.2s ease;
            }
            .node:hover {
                stroke: #667eea;
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
            .tooltip {
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 14px;
                pointer-events: none;
                z-index: 1000;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            .legend {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 30px;
                margin-top: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
            }
            .legend-color {
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
            .filter-controls {
                text-align: center;
                margin-bottom: 20px;
            }
            .filter-btn {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                margin: 0 5px;
                border-radius: 25px;
                cursor: pointer;
                transition: background 0.3s ease;
                font-size: 14px;
            }
            .filter-btn:hover {
                background: #5a6fd8;
            }
            .filter-btn.active {
                background: #5a6fd8;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔗 App Relationships Network</h1>
            <p class="subtitle">Visualizing which apps are used together by the same users</p>

            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value" id="node-count">-</div>
                    <div class="stat-label">Apps</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="edge-count">-</div>
                    <div class="stat-label">Relationships</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="max-weight">-</div>
                    <div class="stat-label">Max Similarity</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="min-weight">-</div>
                    <div class="stat-label">Min Similarity</div>
                </div>
            </div>

            <div class="filter-controls">
                <button class="filter-btn active" onclick="filterEdges('all')">All Relationships</button>
                <button class="filter-btn" onclick="filterEdges('strong')">Strong Relationships</button>
                <button class="filter-btn" onclick="filterEdges('weak')">Weak Relationships</button>
            </div>

            <div class="controls">
                <div class="control-group">
                    <label for="node-size">Node Size</label>
                    <input type="range" id="node-size" min="0.5" max="3" step="0.1" value="1">
                </div>
                <div class="control-group">
                    <label for="link-opacity">Link Opacity</label>
                    <input type="range" id="link-opacity" min="0.1" max="2" step="0.1" value="1">
                </div>
                <div class="control-group">
                    <label for="link-width">Link Width</label>
                    <input type="range" id="link-width" min="0.5" max="3" step="0.1" value="1">
                </div>
                <div class="control-group">
                    <label for="charge">Repulsion</label>
                    <input type="range" id="charge" min="-1000" max="-100" step="50" value="-300">
                </div>
            </div>

            <svg id="network" width="100%" height="700"></svg>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #fde725; width: 40px; height: 6px;"></div>
                    <span>High Similarity (Thick, Opaque)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #21918c; width: 25px; height: 3px;"></div>
                    <span>Medium Similarity</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #440154; width: 15px; height: 1px; opacity: 0.3;"></div>
                    <span>Low Similarity (Thin, Transparent)</span>
                </div>
            </div>
        </div>

        <div class="tooltip" id="tooltip" style="display: none;"></div>

        <script>
            // Note: This is a simplified version. The full D3.js implementation would go here.
            // For the actual implementation, you would need to include the complete JavaScript code
            // from the original HTML file.
            
            console.log('Network visualization loaded');
            
            // Placeholder for the actual D3.js implementation
            document.getElementById('node-count').textContent = 'Loading...';
            document.getElementById('edge-count').textContent = 'Loading...';
            document.getElementById('max-weight').textContent = 'Loading...';
            document.getElementById('min-weight').textContent = 'Loading...';
        </script>
    </body>
    </html>
  `;

    return (
        <EmbeddedChart
            title="Original HTML Network Visualization"
            description="Embedded version of the original D3.js network visualization"
            htmlContent={originalHtmlContent}
            height={800}
        />
    );
};

export default ExampleEmbeddedChart; 
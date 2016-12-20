import React from 'react';
import Chart from '../shared/components/chart';
import ChartDetails from '../shared/components/chart-details';
import Breadcrumbs from '../shared/components/breadcrumbs';
import Footer from '../shared/components/footer';
import addDragDrop from '../shared/util/dragdrop';
import readFile from '../shared/util/readFile';
import buildHierarchy from '../shared/buildHierarchy';


export default React.createClass({
    getInitialState() {
        return {
            needsUpload: true,
            dragging: false,
            chartData: null,
            hoverDetails: null,
            breadcrumbNodes: [],
            paddingDiff: 0
        };
    },
    
    componentDidMount() {
        addDragDrop({
            el: this.refs.ChartArea,
            callback: file => {
                readFile(file, this.handleFileUpload);
            },
            onDragStart: () => {
                this.setState({
                    dragging: true
                });
            },
            onDragEnd: () => {
                this.setState({
                    dragging: false
                });
            }
        });
    },
    
    chartAreaClick() {
        if (this.state.needsUpload) {
            this.refs.FileInput.click();
        }
    },
    
    onFileChange(ev) {
        readFile(ev.target.files[0], this.handleFileUpload);
    },
    
    handleFileUpload(jsonText) {
        let json = JSON.parse(jsonText);
        
        this.setState({
            needsUpload: false,
            chartData: buildHierarchy(json)
        });
    },
    
    loadDemo() {
        this.setState({
            demoLoading: true
        });
        
        let request = new XMLHttpRequest();
        request.open('GET', 'stats-demo.json', true);
        
        request.onload = () => {
            this.setState({
                demoLoading: false
            });
            
            if (request.status >= 200 && request.status < 400) {
                this.handleFileUpload(request.response);
            }
        };
        
        request.send();
    },
    
    onChartRender(details) {
        this.setState({
            paddingDiff: details.removedTopPadding
        });
    },
    
    onChartHover(details) {
        this.setState({
            hoverDetails: details,
            breadcrumbNodes: details.ancestorArray
        });
    },
    
    onChartUnhover() {
        this.setState({
            hoverDetails: null,
            breadcrumbNodes: []
        });
    },
    
    render() {
        let demoButton;
        let chartAreaClass = 'chart';
        
        if (this.state.dragging) {
            chartAreaClass += ' chart--dragging';
        }
        
        if (this.state.needsUpload) {
            chartAreaClass += ' chart--needsUpload';
            
            let demoClass = 'destyledButton';
            if (this.state.demoLoading) {
                demoClass += ' demoLoading';
            }
            
            demoButton = <button onClick={this.loadDemo} className={demoClass} style={{marginTop: '0.5em'}}>Try a Demo</button>;
        }
        
        if (this.state.chartData && this.state.chartData.maxDepth > 9) {
            chartAreaClass += ' chart--large';
        }
                
        return (
            <div>
                <h1>Webpack Visualizer</h1>
                
                <div ref="ChartArea" className={chartAreaClass} onClick={this.chartAreaClick}>
                    <div className="chart-uploadMessage">
                        <p>Drop JSON file here or click to choose.</p>
                        <small>Files won't be uploaded &mdash; your data stays in your browser.</small>
                    </div>
                    <ChartDetails details={this.state.hoverDetails} topMargin={this.state.paddingDiff} />
                    <Chart
                        data={this.state.chartData}
                        onHover={this.onChartHover}
                        onUnhover={this.onChartUnhover}
                        onRender={this.onChartRender}
                    />
                </div>
                
                <input
                    ref="FileInput"
                    type="file"
                    className="hiddenFileInput"
                    onChange={this.onFileChange}
                />
                {demoButton}
                
                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
                
                <Footer>
                    <h2>How do I get stats JSON from webpack?</h2>
                    <p><code>webpack --json > stats.json</code></p>
                    
                    <h2>Try the Plugin!</h2>
                    <p>This tool is also available as a webpack plugin:</p>
                    <p><code>npm install webpack-visualizer-plugin</code></p>
                </Footer>
            </div>
        );
    }
});

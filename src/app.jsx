import React from 'react';
import Chart from './components/chart';
import ChartDetails from './components/chart-details';
import Breadcrumbs from './components/breadcrumbs';
import addDragDrop from './util/dragdrop';
import readFile from './util/readFile';
import buildHierarchy from './buildHierarchy';


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
        var json = JSON.parse(jsonText);
        
        this.setState({
            needsUpload: false,
            chartData: buildHierarchy(json)
        });
    },
    
    loadDemo() {
        this.setState({
            demoLoading: true
        });
        
        var request = new XMLHttpRequest();
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
        var demoButton;
        var chartAreaClass = 'chart';
        
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
                        <small>Files won't be uploaded &mdash; your data stays in the browser.</small>
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
                
                <footer>
                    <h2>How do I get stats JSON from webpack?</h2>
                    <p><code>webpack --profile --json > stats.json</code></p>
                    <p>Or you can use <a href="https://www.npmjs.com/package/webpack-stats-plugin">webpack-stats-plugin</a></p>
                    
                    <h2>Disclaimer</h2>
                    <p> Webpack records the pre-minified size of each module (since minifying is done with a plugin rather than a loader). Since not all modules minify as efficiently as others, the perecentages displayed here can only be an approximation of the true, minfied numbers.</p>
                    
                    <h2>Contribute!</h2>
                    <p>This tool is still pretty new. Check it out on <a href="https://github.com/chrisbateman/webpack-visualizer">GitHub</a>, and please <a href="https://github.com/chrisbateman/webpack-visualizer/issues">report issues or request features</a>!</p>
                    
                    <h2>Acknowledgements</h2>
                    <p><a href="https://github.com/hughsk/disc">Disc</a> for Browserify did this first. Thanks also to <a href="https://gist.github.com/kerryrodden/7090426">this example</a> from the D3 gallery for demonstating how to create sunburst charts.</p>
                    
                    <h2>Comments, questions</h2>
                    <p>Let me know! <a href="https://twitter.com/batemanchris/">@batemanchris</a></p>
                </footer>
            </div>
        );
    }
});

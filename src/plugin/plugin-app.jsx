import React from 'react';
import Chart from '../shared/components/chart';
import ChartDetails from '../shared/components/chart-details';
import Breadcrumbs from '../shared/components/breadcrumbs';
import Footer from '../shared/components/footer';


export default React.createClass({
    propTypes: {
        chartData: React.PropTypes.object
    },
    
    getInitialState() {
        return {
            hoverDetails: null,
            breadcrumbNodes: [],
            paddingDiff: 0
        };
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
        let chartAreaClass = 'chart';
        
        if (this.props.chartData && this.props.chartData.maxDepth > 9) {
            chartAreaClass += ' chart--large';
        }
        
        return (
            <div>
                <h1>Webpack Visualizer</h1>
                
                <div ref="ChartArea" className={chartAreaClass} onClick={this.chartAreaClick}>
                    <ChartDetails details={this.state.hoverDetails} topMargin={this.state.paddingDiff} />
                    <Chart
                        data={this.props.chartData}
                        onHover={this.onChartHover}
                        onUnhover={this.onChartUnhover}
                        onRender={this.onChartRender}
                    />
                </div>
                
                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
                
                <Footer />
            </div>
        );
    }
});

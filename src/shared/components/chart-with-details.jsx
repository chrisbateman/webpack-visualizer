import React, {PropTypes} from 'react';
import Chart from './chart';
import ChartDetails from './chart-details';
import Breadcrumbs from './breadcrumbs';


export default class ChartWithDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breadcrumbNodes: [],
            hoverDetails: null,
            paddingDiff: 0
        };

        this.onChartHover = this.onChartHover.bind(this);
        this.onChartUnhover = this.onChartUnhover.bind(this);
        this.onChartRender = this.onChartRender.bind(this);
    }

    onChartHover(details) {
        this.setState({
            hoverDetails: details,
            breadcrumbNodes: details.ancestorArray
        });
    }

    onChartUnhover() {
        this.setState({
            hoverDetails: null,
            breadcrumbNodes: []
        });
    }

    onChartRender(details) {
        this.setState({
            paddingDiff: details.removedTopPadding
        });
    }

    render() {
        let chartAreaClass = 'chart';

        if (this.props.chartData && this.props.chartData.maxDepth > 9) {
            chartAreaClass += ' chart--large';
        }

        if (!this.props.bundleDetails || Object.keys(this.props.bundleDetails).length === 0) {
            return null;
        }

        return (
            <div className={chartAreaClass}>
                <ChartDetails bundleDetails={this.props.bundleDetails} details={this.state.hoverDetails} topMargin={0} />
                <Chart
                    data={this.props.chartData}
                    onHover={this.onChartHover}
                    onUnhover={this.onChartUnhover}
                    onRender={this.onChartRender}
                />
                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
            </div>
        );
    }
}

ChartWithDetails.propTypes = {
    breadcrumbNodes: PropTypes.array,
    bundleDetails: PropTypes.object,
    chartData: PropTypes.object
};

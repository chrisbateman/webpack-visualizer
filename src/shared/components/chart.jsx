import React, {PropTypes} from 'react';
import createVisualization from '../createVisualization';


export default React.createClass({
    propTypes: {
        data: PropTypes.object,
        onHover: PropTypes.func,
        onRender: PropTypes.func,
        onUnhover: PropTypes.func
    },
    
    componentDidMount() {
        if (this.props.data) {
            this.createChart(this.props.data);
        }
    },
    
    componentDidUpdate(prevProps) {
        let shouldUpdate = this.props.data && (
            this.props.data !== prevProps.data ||
            this.props.labels !== prevProps.labels
        );
        if (shouldUpdate) {
            this.createChart(this.props.data);
        }
    },
    
    createChart(root) {
        let details = createVisualization({
            svgElement: this.refs.svg,
            root,
            onHover: this.props.onHover,
            onUnhover: this.props.onUnhover,
            labels: this.props.labels
        });
        
        if (this.props.onRender) {
            this.props.onRender(details);
        }
    },
    
    render() {
        if (!this.props.data) {
            return null;
        }
        
        return <svg ref="svg" />;
    }
});

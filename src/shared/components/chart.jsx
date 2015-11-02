import React from 'react';
import createVisualization from '../createVisualization';


const pt = React.PropTypes;


export default React.createClass({
    propTypes: {
        data: pt.object,
        onHover: pt.func,
        onRender: pt.func,
        onUnhover: pt.func
    },
    
    componentDidMount() {
        if (this.props.data) {
            this.createChart(this.props.data);
        }
    },
    
    componentDidUpdate(prevProps) {
        if (this.props.data && this.props.data !== prevProps.data) {
            this.createChart(this.props.data);
        }
    },
    
    createChart(root) {
        var details = createVisualization({
            svgElement: this.refs.svg,
            root,
            onHover: this.props.onHover,
            onUnhover: this.props.onUnhover
        });
        
        if (this.props.onRender) {
            this.props.onRender(details);
        }
    },
    
    render() {
        if (!this.props.data) {
            return null;
        }
        
        return (
            <svg ref="svg" />
        );
    }
});

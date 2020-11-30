import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import createVisualization from '../createVisualization';

export default class Chart extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        onHover: PropTypes.func,
        onRender: PropTypes.func,
        onUnhover: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.svg = createRef();
    }

    componentDidMount() {
        if (this.props.data) {
            this.createChart(this.props.data);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data && this.props.data !== prevProps.data) {
            this.createChart(this.props.data);
        }
    }

    createChart = (root) => {
        let details = createVisualization({
            svgElement: this.svg.current,
            root,
            onHover: this.props.onHover,
            onUnhover: this.props.onUnhover,
        });

        if (this.props.onRender) {
            this.props.onRender(details);
        }
    };

    render() {
        if (!this.props.data) {
            return null;
        }

        return <svg ref={this.svg} />;
    }
}

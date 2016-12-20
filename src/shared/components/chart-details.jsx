import React, {PropTypes} from 'react';


let ChartDetails = props => {
    let {details} = props;
    
    if (!details) {
        return <div className="details" />;
    }
    
    return (
        <div className="details" style={{marginTop: `-${props.topMargin}`}}>
            <span className="details-name">{details.name}</span>
            <div className="details-percentage">{details.percentage}</div>
            of bundle size
            <div className="details-size">{details.size}</div>
        </div>
    );
};

ChartDetails.propTypes = {
    details: PropTypes.object,
    topMargin: PropTypes.number
};

export default ChartDetails;

import React from 'react';


export default props => {
    var {details} = props;
    
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
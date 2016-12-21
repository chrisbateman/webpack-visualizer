import React, {PropTypes} from 'react';
import formatSize from '../util/formatSize';


export default function ChartDetails(props) {
    let title, bigText, sizeText;
    let {bundleDetails, details} = props;

    if (details) {
        let rawSize = formatSize(details.size);

        if (bundleDetails.actual) {
            let actualSize = formatSize(bundleDetails.actual * details.percentage.replace('%', '') * .01, 0);
            sizeText = `${actualSize} actual | ${rawSize} raw`;
        } else {
            sizeText = `${rawSize} raw`;
        }

        title = details.name;
        bigText = details.percentage;

    } else if (bundleDetails.assetName) {
        title = bundleDetails.assetName;
        if (bundleDetails.type === 'collection') {
            bigText = <span>&nbsp;</span>;
            sizeText = '';
        } else {
            let rawSize = formatSize(bundleDetails.raw);
            let actualSize = formatSize(bundleDetails.actual);

            bigText = <span>&nbsp;</span>;
            sizeText = `${actualSize} actual | ${rawSize} raw`;
        }
    } else {
        return <div className="details" />;
    }

    return (
        <div className="details" style={{marginTop: `-${props.topMargin}`}}>
            <span className="details-name">{title}</span>
            <div className="details-percentage">{bigText}</div>
            {sizeText && <div className="details-size">{sizeText}</div>}
        </div>
    );
}

ChartDetails.propTypes = {
    bundleDetails: PropTypes.object,
    details: PropTypes.object,
    topMargin: PropTypes.number
};

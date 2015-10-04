import d3 from 'd3';
import prettySize from 'prettysize';
import appData from './appData';
import {setDomDetails, updateBreadcrumbs, hideDetails} from './dom';
import {getAllChildren, getAncestors} from './partitionedDataUtils';


const fadeOpacity = 0.5;


export function mouseover(object) {
    
    var childrenArray = getAllChildren(object);
    var ancestorArray = getAncestors(object);
    
    // Fade all the segments.
    d3.selectAll('path').style({
        'opacity': fadeOpacity,
        'stroke-width': fadeOpacity
    });
    
    // Highlight only those that are children of the current segment.
    appData.vis.selectAll('path')
        .filter(node => childrenArray.indexOf(node) >= 0)
        .style({
            'stroke-width': 2,
            'opacity': 1
        });
    
    
    var percentage = (100 * object.value / appData.totalSize).toPrecision(2);
    var percentageString = percentage + '%';
    if (percentage < 0.1) {
        percentageString = '< 0.1%';
    }
    
    setDomDetails({
        name: object.name,
        size: prettySize(object.value, true, true),
        percentage: percentageString
    });
    
    updateBreadcrumbs(ancestorArray);
}


export function mouseleave() {
    d3.selectAll('path').style({
        'opacity': 1,
        'stroke-width': 1
    });
    
    hideDetails();
}

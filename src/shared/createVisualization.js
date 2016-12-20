import d3 from 'd3';
import {getColor} from './colors';
import {markDuplicates, getAllChildren, getAncestors} from './partitionedDataUtils';
import prettySize from 'prettysize';


const fadeOpacity = 0.5;
var paths, vis, totalSize;


export default function createVisualization({svgElement, root, onHover, onUnhover}) {
    
    var chartSize = (root.maxDepth > 9) ? 950 : 750;
    var radius = Math.min(chartSize, chartSize) / 2;
    
    
    var partition = d3.layout.partition()
        .size([2 * Math.PI, radius * radius])
        .value(d => d.size);
    
    
    var arc = d3.svg.arc()
        .startAngle(d => d.x)
        .endAngle(d => d.x + d.dx)
        //.innerRadius(d => d.y / 400 + 60)
        //.outerRadius(d => (d.y + d.dy) / 400 + 60);
        .innerRadius(d => Math.sqrt(d.y))
        .outerRadius(d => Math.sqrt(d.y + d.dy));
    
    
    if (vis) {
        svgElement.innerHTML = '';
    }
    
    
    // Filter out very small nodes
    var nodes = partition.nodes(root).filter(d => d.dx > 0.005); // 0.005 radians
    
    markDuplicates(nodes);
    
    
    vis = d3.select(svgElement)
        .attr('width', chartSize)
        .attr('height', chartSize)
        .append('svg:g')
        .attr('id', 'svgWrapper')
        .attr('transform', `translate(${chartSize / 2}, ${chartSize / 2})`);
    
    
    paths = vis.data([root]).selectAll('path')
        .data(nodes)
        .enter()
        .append('svg:path')
        .attr('display', d => (d.depth ? null : 'none'))
        .attr('d', arc)
        .attr('fill-rule', 'evenodd')
        .style('stroke', d => (d.duplicate) ? '#000' : '')
        .style('fill', d => getColor(d))
        .style('opacity', 1)
        .on('mouseover', object => {
            mouseover(object, onHover);
        });
    
    totalSize = paths.node().__data__.value;
    
    
    var svgWrapper = vis[0][0];
    
    var visHeight = svgWrapper.getBoundingClientRect().height;
    
    var topPadding = (svgWrapper.getBoundingClientRect().top + window.scrollY) - (d3.select('.chart')[0][0].getBoundingClientRect().top + window.scrollY);
    
    d3.select(svgElement).attr('height', visHeight);
    vis.attr('transform', `translate(${chartSize / 2}, ${(chartSize / 2) - topPadding})`);
    d3.select('.details').style('margin-top', `-${topPadding}px`);
    
    
    d3.select(svgWrapper).on('mouseleave', object => {
        mouseleave(object, onUnhover);
    });
    
    return {
        removedTopPadding: topPadding,
        vis
    };
}


function mouseover(object, callback) {
    
    var childrenArray = getAllChildren(object);
    var ancestorArray = getAncestors(object);
    
    // Fade all the segments.
    paths.style({
        'opacity': fadeOpacity,
        'stroke-width': fadeOpacity
    });
    
    // Highlight only those that are children of the current segment.
    paths.filter(node => childrenArray.indexOf(node) >= 0)
        .style({
            'stroke-width': 2,
            'opacity': 1
        });
    
    var percentage = (100 * object.value / totalSize).toFixed(1);
    var percentageString = percentage + '%';
    if (percentage < 0.1) {
        percentageString = '< 0.1%';
    }
    
    callback({
        ancestorArray,
        name: object.name,
        size: prettySize(object.value, true, true),
        percentage: percentageString
    });
}

function mouseleave(object, callback) {
    paths.style({
        'opacity': 1,
        'stroke-width': 1
    });
    
    callback();
}

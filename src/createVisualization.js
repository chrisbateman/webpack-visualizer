import d3 from 'd3';
import appData from './appData';
import {mouseover, mouseleave} from './mouse';
import {getColor} from './colors';
import {markDuplicates} from './partitionedDataUtils';


export default function createVisualization(root, elementSelector) {
    
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
    
    
    if (appData.vis) {
        var chart = document.querySelector(`${elementSelector} > svg`);
        chart.parentNode.removeChild(chart);
    }
    
    
    // Filter out very small nodes
    var nodes = partition.nodes(root).filter(d => d.dx > 0.005); // 0.005 radians
    
    markDuplicates(nodes);
    
    appData.vis = d3.select(elementSelector)
        .classed('chart--large', chartSize === 950)
        .append('svg:svg')
        .attr('width', chartSize)
        .attr('height', chartSize)
        .append('svg:g')
        .attr('id', 'svgWrapper')
        .attr('transform', `translate(${chartSize / 2}, ${chartSize / 2})`);
    
    
    var path = appData.vis.data([root]).selectAll('path')
        .data(nodes)
        .enter()
        .append('svg:path')
        .attr('display', d => (d.depth ? null : 'none'))
        .attr('d', arc)
        .attr('fill-rule', 'evenodd')
        .style('stroke', d => (d.duplicate) ? '#000' : '')
        .style('fill', d => getColor(d))
        .style('opacity', 1)
        .on('mouseover', mouseover);
    
    appData.totalSize = path.node().__data__.value;
    
    
    var svgWrapper = appData.vis[0][0];
    var visHeight = svgWrapper.getBoundingClientRect().height;
    
    var topPadding = (svgWrapper.getBoundingClientRect().top + window.scrollY) - (svgWrapper.offsetParent.getBoundingClientRect().top + window.scrollY);
    
    d3.select(`${elementSelector} > svg`).attr('height', visHeight);
    appData.vis.attr('transform', `translate(${chartSize / 2}, ${(chartSize / 2) - topPadding})`);
    d3.select('.details').style('margin-top', `-${topPadding}px`);
    
    
    d3.select(svgWrapper).on('mouseleave', mouseleave);
    
    return appData.vis;
}

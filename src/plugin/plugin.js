import path from 'path';
import fs from 'fs';
import buildHierarchy from './buildHierarchy';
var cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
var jsString = fs.readFileSync(path.join(__dirname, './pluginmain.js'), 'utf8');


export default class VisualizerPlugin {
    constructor(opts) {
        opts = opts || {};
        this.opts = {};
        this.opts.filename = opts.filename || 'stats.html';
    }
    
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            var stats = compilation.getStats().toJson();
            var nodes = buildHierarchy(stats);
            
            var html = `<!doctype html>
                <title>Webpack Visualizer</title>
                <style>${cssString}</style>
                <div id="App"></div>
                <script>window.nodesData = JSON.parse('${JSON.stringify(nodes)}');</script>
                <script>${jsString}</script>
            `;
            
            compilation.assets[this.opts.filename] = {
                source: function () {
                    return html;
                },
                size: function () {
                    return html.length;
                }
            };
            
            callback();
        });
    }
}

import path from 'path';
import fs from 'fs';
import buildHierarchy from './buildHierarchy';
let cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
let jsString = fs.readFileSync(path.join(__dirname, './pluginmain.js'), 'utf8');


export default class VisualizerPlugin {
    constructor(opts) {
        opts = opts || {};
        this.opts = {};
        this.opts.filename = opts.filename || 'stats.html';
    }
    
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            let stats = compilation.getStats().toJson();
            let html = `<!doctype html>
                <title>Webpack Visualizer</title>
                <style>${cssString}</style>
                <div id="App"></div>
                <script>window.nodesData = ${JSON.stringify(buildHierarchy(stats))};</script>
                <script>${jsString}</script>
            `;
            
            compilation.assets[this.opts.filename] = {
                source() {
                    return html;
                },
                size() {
                    return html.length;
                }
            };
            
            callback();
        });
    }
}

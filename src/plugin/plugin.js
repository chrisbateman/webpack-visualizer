import path from 'path';
import fs from 'fs';
let cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
let jsString = fs.readFileSync(path.join(__dirname, './pluginmain.js'), 'utf8');


export default class VisualizerPlugin {
    constructor(opts = {filename: 'stats.html'}) {
        this.opts = opts;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            let stats = compilation.getStats().toJson({chunkModules: true});
            let stringifiedStats = JSON.stringify(stats);
            stringifiedStats = stringifiedStats.replace(/</g, '&lt;').replace(/</g, '&gt;');

            let html = `<!doctype html>
                <meta charset="UTF-8">
                <title>Webpack Visualizer</title>
                <style>${cssString}</style>
                <div id="App"></div>
                <script>window.stats = ${stringifiedStats};</script>
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

import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

let cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
let jsString = fs.readFileSync(path.join(__dirname, './main.js'), 'utf8');

module.exports = class VisualizerPlugin {
    constructor(opts = { filename: 'stats.html' }) {
        this.opts = opts;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('Visualizer', (compilation, callback) => {
            let stats = compilation.getStats().toJson({ chunkModules: true });
            let stringifiedStats = JSON.stringify(stats).replace(/</g, '&lt;').replace(/>/g, '&gt;');

            let html = `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Webpack Visualizer</title>
                        <style>${cssString}</style>
                    </head>
                    <body>
                        <div id="App"></div>
                        <script>window.stats = ${stringifiedStats};</script>
                        <script>${jsString}</script>
                    </body>
                </html>
            `;

            let outputFile = path.join(compilation.outputOptions.path, this.opts.filename);

            mkdirp(path.dirname(outputFile), (mkdirpErr) => {
                if (mkdirpErr) {
                    console.log('webpack-visualizer-plugin: error writing stats file');
                }

                fs.writeFile(outputFile, html, (err) => {
                    if (err) {
                        console.log('webpack-visualizer-plugin: error writing stats file');
                    }

                    callback();
                });
            });
        });
    }
};

import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

let cssString = fs.readFileSync(path.join(__dirname, './style.css'), 'utf8');
let jsString = fs.readFileSync(path.join(__dirname, './main.js'), 'utf8');

module.exports = class VisualizerPlugin {
    constructor(opts = {}) {
        this.opts = {
            filename: 'stats.html',
            throwOnError: true,
            ...opts,
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('Visualizer', (compilation, callback) => {
            let html;

            try {
                let stats = compilation.getStats().toJson({ chunkModules: true });
                let stringifiedStats = JSON.stringify(stats).replace(/</g, '&lt;').replace(/>/g, '&gt;');

                html = `
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
            } catch (error) {
                console.error('webpack-visualizer-plugin: error creating stats file');
                if (this.opts.throwOnError) {
                    return callback(error);
                } else {
                    console.error(error);
                    return callback();
                }
            }

            let outputFile = path.join(compilation.outputOptions.path, this.opts.filename);

            mkdirp(path.dirname(outputFile), (mkdirpErr) => {
                if (mkdirpErr) {
                    console.error('webpack-visualizer-plugin: error writing stats file');
                    if (this.opts.throwOnError) {
                        return callback(mkdirpErr);
                    } else {
                        return callback();
                    }
                }

                fs.writeFile(outputFile, html, (err) => {
                    if (err) {
                        console.error('webpack-visualizer-plugin: error writing stats file');
                        if (this.opts.throwOnError) {
                            return callback(err);
                        }
                    }

                    callback();
                });
            });
        });
    }
};

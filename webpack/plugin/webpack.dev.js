const merge = require('webpack-merge').merge;
const HtmlWebpackPlugin = require('html-webpack-plugin');
var common = require('./webpack.common.js');
const demoStats = require('../../demo_stats/stats-demo.json');
const stringifiedStats = JSON.stringify(demoStats).replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Webpack Visualizer</title>
                        <link rel="stylesheet" href="style.css">
                    </head>
                    <body>
                        <div id="App"></div>
                        <script>window.stats = ${stringifiedStats};</script>
                    </body>
                </html>
            `,
            minify: false,
            inject: true,
        }),
    ],
    devServer: {
        inline: true,
        host: process.env.IP || 'localhost',
        port: process.env.PORT || '3000',
        open: true,
    },
});

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge').merge;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', '..', 'src', 'site', 'index.ejs'),
            minify: false,
            inject: true,
        }),
    ],
    devServer: {
        inline: true,
        contentBase: 'dist-site',
        host: process.env.IP || 'localhost',
        port: process.env.PORT || '3000',
        open: true,
    },
});

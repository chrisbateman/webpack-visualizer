const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge').merge;
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist-site'),
        filename: 'build.js',
    },

    plugins: [
        new CleanWebpackPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', '..', 'src', 'site', 'index.ejs'),
            minify: true,
            inject: true,
        }),
    ],
});

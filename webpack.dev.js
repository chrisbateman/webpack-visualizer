'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');

var baseConfig = require('./webpack.base.js');

var devConfig = {
    entry: './src/site/main',
    output: {
        filename: 'build.js'
    },
    devtool: 'source-map', // @see http://webpack.github.io/docs/configuration.html#devtool
    devServer: {
        inline: true,
        contentBase: 'dist-site',
        host: process.env.IP,
        port: process.env.PORT
    }
};


module.exports = merge({}, baseConfig, devConfig);

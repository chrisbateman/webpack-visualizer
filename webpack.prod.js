'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');

var baseConfig = require('./webpack.base.js');


var config = merge(true, baseConfig);

if (!config.plugins) config.plugins = [];

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.NoErrorsPlugin()
]);

module.exports = config;

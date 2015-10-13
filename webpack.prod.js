'use strict';

var path = require('path');
var webpack = require('webpack');
var merge = require('merge');

var baseConfig = require('./webpack.base.js');


var prodConfig = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = merge({}, baseConfig, prodConfig);
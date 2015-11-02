'use strict';

var path = require('path');
var webpack = require('webpack');


module.exports = {
    context: __dirname,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

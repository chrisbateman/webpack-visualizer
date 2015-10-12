'use strict';

var path = require('path');
var webpack = require('webpack');


module.exports = {
    context: __dirname,
    entry: './src/browser',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

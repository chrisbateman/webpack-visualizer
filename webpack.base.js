'use strict';

var path = require('path');
var webpack = require('webpack');


module.exports = {
    context: __dirname,
    entry: './src/main',
    output: {
        //path: path.join(__dirname, 'dist'),
        path: __dirname,
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        
    ],
    resolve: {
        extensions: ['', '.js']
    }
};

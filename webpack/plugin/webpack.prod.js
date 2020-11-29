const path = require('path');
const merge = require('webpack-merge').merge;
var common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '..', '..', 'lib'),
        filename: 'main.js',
    },
});

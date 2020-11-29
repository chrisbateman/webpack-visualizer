const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                comments: false,
                sourceMaps: true,
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    [
                        '@babel/plugin-proposal-class-properties',
                        {
                            loose: true,
                        },
                    ],
                ],
            },
        },
    },
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
];

module.exports = {
    entry: {
        main: path.resolve(__dirname, '..', '..', 'src', 'plugin', 'main.jsx'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: { rules },
    plugins: [
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
};

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                comments: true,
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
        use: ['style-loader', 'css-loader'],
    },
];

module.exports = {
    entry: [path.resolve(__dirname, '..', '..', 'src', 'site', 'main.jsx')],
    module: { rules },
    plugins: [
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

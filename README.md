# Webpack Visualizer 2

This is a working fork of the unmaintained [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer)

It works with webpack 5.x

## Installation

```
npm i -D webpack-visualizer-plugin2
```

## Usage in webpack configuration
This will generate the statistics page in /stats/ folder
NOTE: "filename" points to the webpack output path, not the project root path

```js
const Visualizer = require('webpack-visualizer-plugin2');

module.exports = {
    plugins: [
        new Visualizer({
            filename: path.join('..', 'stats', 'statistics.html'),
            throwOnError: true
        }),
    ],
}

```

![](https://cloud.githubusercontent.com/assets/1145857/10471320/5b284d60-71da-11e5-8d35-7d1d4c58843a.png)

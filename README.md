# Webpack Visualizer
Visualize and analyze your Webpack bundle to see which modules are taking up space and which might be duplicates.

This tool is still pretty new, so please submit issues or feature requests!

You can use the visualizer via a website or a webpack plugin:

## Site

Upload your stats JSON file to the site: [chrisbateman.github.io/webpack-visualizer/](http://chrisbateman.github.io/webpack-visualizer/)

## Plugin

```
npm install webpack-visualizer-plugin
```
```javascript
var Visualizer = require('webpack-visualizer-plugin');

//...
plugins: [new Visualizer()],
//...
```
This will output a file named `stats.html` in your output directory. You can modify the name/location by passing a `filename` parameter into the constructor.

![](https://cloud.githubusercontent.com/assets/1145857/10471320/5b284d60-71da-11e5-8d35-7d1d4c58843a.png)

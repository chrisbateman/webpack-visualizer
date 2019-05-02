# Webpack Visualizer
Visualize and analyze your Webpack bundle to see which modules are taking up space and which might be duplicates.

This tool is still pretty new, so please submit issues or feature requests!


## Site Usage

Upload your stats JSON file to the site: [chrisbateman.github.io/webpack-visualizer/](http://chrisbateman.github.io/webpack-visualizer/)

## Plugin Usage

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

```javascript
var Visualizer = require('webpack-visualizer-plugin');

//...
plugins: [new Visualizer({
  filename: './statistics.html'
})],
//...
```

---

![](https://cloud.githubusercontent.com/assets/1145857/10471320/5b284d60-71da-11e5-8d35-7d1d4c58843a.png)


## FAQ

**Q: How to avoid "file.js + 143 modules" issue, which groups many input files into one large piece in the graph?**

A: You need to disable `ModuleConcatenationPlugin`. With webpack 4, you can do this by passing the following to the config:

```
      ...
      optimization: {
        concatenateModules: false,
      },
```

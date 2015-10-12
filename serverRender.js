import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './src/app';


var pageHTML = `
<!doctype html>
<head>
    <meta charset="utf-8">
    <title>Webpack Visualizer</title>
    <meta name="description" content="Visualize and analyze your Webpack bundle to see which modules are taking up space and which might be duplicates." />
    <meta name="viewport" content="width=750, initial-scale=1"/>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <div id="App">${ReactDOM.renderToString(<App/>)}</div>
    <script src="build.js"></script>
</body>
`;


fs.writeFile('build/index.html', pageHTML);

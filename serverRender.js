import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './src/app';
import createHTMLString from './src/index.html.js';


var pageHTML = createHTMLString({
    appHTML: ReactDOM.renderToString(<App/>)
});

fs.writeFile('build/index.html', pageHTML);

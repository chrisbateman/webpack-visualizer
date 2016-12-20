import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './app';
import createHTMLString from './index.html.js';


let pageHTML = createHTMLString({
    appHTML: ReactDOM.renderToString(<App/>)
});

fs.writeFile('dist-site/index.html', pageHTML);

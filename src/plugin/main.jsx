import React from 'react';
import ReactDOM from 'react-dom';
import App from './plugin-app';


ReactDOM.render(<App stats={window.stats} />, document.getElementById('App'));

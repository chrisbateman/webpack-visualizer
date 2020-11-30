import React from 'react';
import ReactDOM from 'react-dom';
import App from './plugin-app';

import '../shared/style.css';

ReactDOM.render(<App stats={window.stats} />, document.getElementById('App'));

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import muiTheme from './muiTheme';

injectTapEventPlugin();


ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <App />
    </MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: 'https://7e1f1190f76a4f70acc7ba73412ee11b@sentry.io/2217835',
});

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();

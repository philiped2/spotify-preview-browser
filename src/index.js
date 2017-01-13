import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import './index.css';

ReactGA.initialize('UA-67282727-2');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

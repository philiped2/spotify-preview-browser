import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import './index.css';

const ga = ReactGA.initialize('UA-67282727-2');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

render(
  <Router basename={baseUrl}>
    <App />
  </Router>,
  rootElement);
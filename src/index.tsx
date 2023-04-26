import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './App';
import { ThemeProvider } from './components/ThemeContext';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

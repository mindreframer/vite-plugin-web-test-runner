import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import 'windi.css'; // <--- THIS fails with snowpack test integration for web-test-runner

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

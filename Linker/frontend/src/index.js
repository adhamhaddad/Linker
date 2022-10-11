import React from 'react';
import ReactDOM from 'react-dom/client';
import { WindowSize } from './store/windowSize';
import { Authentication } from './utils/authentication';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authentication>
    <BrowserRouter>
      <WindowSize>
        <App />
      </WindowSize>
    </BrowserRouter>
  </Authentication>
);

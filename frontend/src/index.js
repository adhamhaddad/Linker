import React from 'react';
import ReactDOM from 'react-dom/client';
import { WindowSize } from './store/windowSize';
import { Authentication } from './utils/authentication';
import { BrowserRouter } from 'react-router-dom';
import { ApiURL } from './utils/api-urls';
import App from './components/App';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './css/index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApiURL>
    <Authentication>
      <BrowserRouter>
        <WindowSize>
          <App />
        </WindowSize>
      </BrowserRouter>
    </Authentication>
  </ApiURL>
);

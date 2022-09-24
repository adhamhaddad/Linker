import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authentication } from './Authentication/auth';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authentication>
    <App />
  </Authentication>
);

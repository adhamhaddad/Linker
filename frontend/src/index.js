import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authentication } from './utils/authentication';
import { BrowserRouter } from 'react-router-dom';
import { ApiURL } from './utils/api-urls';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import App from './App';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    detection: {
      order: [
        'cookie',
        'localStorage',
        'sessionStorage',
        'querystring',
        'navigator',
        'htmlTag',
        'path',
        'subdomain'
      ]
    },
    caches: ['cookie'],
    backend: { loadPath: '/locales/{{lng}}/translation.json' },
    react: { useSuspense: false }
  });

root.render(
  <ApiURL>
    <Authentication>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Authentication>
  </ApiURL>
);

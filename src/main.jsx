import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { DesignProvider } from './design.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DesignProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DesignProvider>
  </React.StrictMode>
);

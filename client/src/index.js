import React from 'react';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "./context/auth";

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

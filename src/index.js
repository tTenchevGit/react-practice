// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // new
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import './firebaseConfig';

const container = document.getElementById('root');
const root = createRoot(container); // new

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

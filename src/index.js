import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { ClienteProvider } from './context/ClienteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ClienteProvider>
        <App />
        </ClienteProvider>
      </AuthProvider>
    </ThemeProvider>

  </React.StrictMode>
);



import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './shared/theme';
import { GlobalStyle } from './shared/GlobalStyle';
import ModalTemplate from './shared/ModalTemplate';
import AlertTemplate from './shared/AlertTemplate';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
    <ModalTemplate />
    <AlertTemplate />
  </React.StrictMode>
);

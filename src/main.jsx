//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreProvider.jsx';
import NotificationProvider from './context/NotificationProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </StoreContextProvider>
  </BrowserRouter>
)

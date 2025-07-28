import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </CartProvider>
  </StrictMode>,
)

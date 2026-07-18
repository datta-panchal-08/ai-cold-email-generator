
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <RouterProvider router={router}>
    <ToastContainer position='top-right' />
    <App />
  </RouterProvider>
 </AuthProvider>
)

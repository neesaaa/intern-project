import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Signup.jsx'
import Signup from './pages/Login.jsx'
import MainLayout from './MainLayout.jsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />,        // layout route
    children: [
      {
        path: '/',                 // nested under MainLayout
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

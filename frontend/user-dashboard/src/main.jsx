import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)

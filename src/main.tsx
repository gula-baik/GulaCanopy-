import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/profile/:id',
    element: <App />,
  },
  {
    path: '/create',
    element: <App />,
  },
  {
    path: '/search',
    element: <App />,
  },
  {
    path: '/notifications',
    element: <App />,
  },
  {
    path: '/settings',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

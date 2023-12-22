import { Navigate, createBrowserRouter } from 'react-router-dom';

import RootLayout from 'layouts/RootLayout';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Registration from 'pages/Registration';

export const createRouter = (isAuth: boolean) => {
  return createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/profile',
              element: <Profile />,
            },
            {
              path: '/auth',
              children: [
                {
                  path: '/auth',
                  element: <Navigate to="/auth/login" />,
                },
                {
                  path: '/auth/login',
                  element: <Login />,
                },
                {
                  path: '/auth/registration',
                  element: <Registration />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
};

import React, { Suspense } from 'react';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './scss/style.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-toastify/dist/ReactToastify.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/pages/Login'));

const router = createBrowserRouter([
  {
    exact: true,
    path: "/login",
    name: 'Login Page',
    element: <Login />,
  },
  {
    path: "*",
    name: 'Home',
    element: <DefaultLayout />,
  },
]);

function App() {
  return (
    <Suspense fallback={loading}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
}

export default App;

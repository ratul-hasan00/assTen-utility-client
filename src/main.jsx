import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import Bills from './Components/Bills.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Forgot from './Components/Forgot.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from "react-hot-toast";
import Profile from './Components/Navbar/Profile.jsx';
import EditProfile from './Components/EditProfile.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import MyPayBills from './Components/MyPayBills.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/bills',
        element: <Bills></Bills>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/forgot',
        element: <Forgot></Forgot>
      },
      {
        path: '/profile',
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      },
      {
        path: '/editProfile',
        element: <PrivateRoute>
          <EditProfile></EditProfile>
        </PrivateRoute>
      },
      {
        path: '/mypaybills',
        element: <PrivateRoute>
          <MyPayBills></MyPayBills>
        </PrivateRoute>
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" />
    </AuthProvider>
  </StrictMode>,
)

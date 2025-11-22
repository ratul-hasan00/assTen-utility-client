import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import Bills from './Components/Bills.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Forgot from './Components/Forgot.jsx';


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
        path:'/bills',
        element: <Bills></Bills>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path:'/register',
        element: <Register></Register>
      },
      {
        path: '/forgot',
        element: <Forgot></Forgot>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import DashBoard from "../Pages/DashBoard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashBoard /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    }
])
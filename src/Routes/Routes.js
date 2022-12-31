import { createBrowserRouter } from "react-router-dom";
import Authentication from "../Layout/Authentication";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import Home from "../Pages/Home/Home/Home";
import News from "../Pages/News/News";
import NewsDetails from "../Pages/News/NewsDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        loader:()=>fetch('http://localhost:5000/catagory'),
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/news',
                // loader:()=>fetch(`http://localhost:5000/catagory/08`),
                element: <News></News>,
                
            },
            {
                path: '/catagoryNews/:id',
                loader:({params})=>fetch(`http://localhost:5000/catagory/${params.id}`),
                element:<News></News>
            },
            {
                path: '/news/:id',
                loader:({params})=>fetch(`http://localhost:5000/news/${params.id}`),
                element:<NewsDetails></NewsDetails>
            },
            {
                path: '/authentication',
                element:<Login></Login>
            }
        ]

    },
    {
        path: '/auth',
        element: <Authentication></Authentication>,
        children: [
            {
                path: "/auth/login",
                element:<Login></Login>
            }
        ]
    }
])
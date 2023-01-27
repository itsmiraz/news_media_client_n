import { createBrowserRouter } from "react-router-dom";
import Authentication from "../Layout/Authentication";
import Main from "../Layout/Main";
import LogAndReg from "../Pages/Authentication/LogAndReg";
import Login from "../Pages/Authentication/Login";
import BecomeAReporter from "../Pages/BecomeAReporter/BecomeAReporter";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home/Home";
import News from "../Pages/News/News";
import NewsDetails from "../Pages/News/NewsDetails";
import ReporterDashboard from "../Pages/ReporterDashBoard/ReporterDashboard";
import UserProfile from "../Pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        loader: () => fetch('https://new-media-server.vercel.app/catagory'),
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/news',
                element: <News></News>,

            },
            {
                path: '/userprofile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/becomeaReporter',
                element: <BecomeAReporter></BecomeAReporter>
            },
            {
                path: '/reporterdashboard',
                element:<ReporterDashboard></ReporterDashboard>
            },
            {
                path: '/news/:id',
                loader: ({ params }) => fetch(`https://new-media-server.vercel.app/news/${params.id}`),
                element: <NewsDetails></NewsDetails>
            },
            {
                path: '/authentication',
                element: <Login></Login>
            }
        ]

    },
    {
        path: '/auth',
        element: <Authentication></Authentication>,
        children: [
            {
                path: "/auth",
                element: <LogAndReg></LogAndReg>
            }
        ]
    },
    {
        path: '*',
        element: <Error></Error>
    }

])
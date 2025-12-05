import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login";
import Edit from "../Components/Edit";
import Profile from "../Components/Profile";
import Body from "../Components/Body";
import Search from "../Components/Search";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Body
            },
            {
                path: "/profile",
                Component: Profile
            }
        ]
    },
    {
        path: "/Login",
        Component: Login
    }
])

export default router;
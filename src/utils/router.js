import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import Body from "../Components/Body";
import profileLoader from "./profileLoader";

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
                path: "/profile/:id",
                loader: profileLoader,
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
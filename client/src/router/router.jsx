import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Intro from "../components/Intro";
import Signup from "../pages/Signup";
import OtpVerification from "../pages/OtpVerification";
import ProtectedRoutes from "./ProtectedRoutes";
import ChatDetails from "../pages/ChatDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "verify",
        element: <OtpVerification />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path:"details/:id",
        element:(
          <ProtectedRoutes>
            <ChatDetails/>
          </ProtectedRoutes>
        )
      }
    ],
  },
]);

export default router;
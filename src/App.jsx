import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "./components/signIn";
import Layout from "./components/Layout";
import "./css/App.css";
import "./css/signIn.css";
import "./css/chatroom.css";
import "./css/updateProfile.css";
const UpdateProfile = lazy(() => import("./components/updateProfile"));
const Chatroom = lazy(() => import("./components/chatroom/chatroom"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/chatroom",
        element: <Chatroom />,
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/updateProfile", element: <UpdateProfile /> },
    ],
  },
]);

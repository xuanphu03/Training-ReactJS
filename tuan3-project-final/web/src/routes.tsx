import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import Chatbox from "./pages/home/Chatbox";
import { AuthRequire, CheckNoAuth } from "./stores/check-auth";
import HomePage from "./pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />,
        loader: CheckNoAuth,
      },
      {
        path: "register",
        element: <RegisterPage />,
        loader: CheckNoAuth,
      },
      {
        path: "chat-box",
        element: <Chatbox />,
        loader: AuthRequire,
      },
    ],
  },
]);

export default router;

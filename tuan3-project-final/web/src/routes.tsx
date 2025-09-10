import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/auth/loginPage';
import RegisterPage from './pages/auth/registerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ],
  },
]);

export default router;

import AuthLayout from '../components/layouts/AuthLayout';
import SignIn from "../components/Auth/login/SignIn";
import SignUp from "../components/Auth/register/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import EmailSentSuccess from "../components/Auth/EmailSentSuccess";
import { Outlet } from 'react-router-dom';
 
const AuthRoutes = () => {
  
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const authRoutes = [
  { index: true, element: <SignIn /> },
  { path: "signin", element: <SignIn /> },
  { path: "signup", element: <SignUp /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "email-sent-success", element: <EmailSentSuccess /> },
];

export default AuthRoutes;
import AuthLayout from "../components/layouts/AuthLayout";
import SignIn from "../components/Auth/login/SignIn";
import SignUp from "../components/Auth/register/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import EmailSentSuccess from "../components/Auth/EmailSentSuccess";
import ResetPassword from "../components/Auth/ResetPassword";
import NotFound from "../components/NotFound";
import { Outlet, Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const AuthRoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRoutes />}>
        <Route index element={<SignIn />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="email-sent-success" element={<EmailSentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutesWrapper;

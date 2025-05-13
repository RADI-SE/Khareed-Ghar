import { Link } from "react-router-dom";

function EmailSentSuccess() {
  return (
    <div className="auth-container d-flex flex-column align-items-center">
      <h2 className="auth-title">Email Sent Successfully</h2>
      <p className="auth-subtitle">
        Please check your email for the verification code.
      </p>
      <Link to="/auth/signin" className="text-[#FFD700] no-underline">
        Go to Login
      </Link>
    </div>
  );
}

export default EmailSentSuccess;

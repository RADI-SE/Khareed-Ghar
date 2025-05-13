import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRPassword } from "../../hooks/Auth/useRPassword";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: resetPassword } = useRPassword();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPassword({token, password, confirmPassword});
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className="auth-container d-flex flex-column align-items-center">
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-subtitle">Please enter your new password.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button type="submit" className="w-full p-2 rounded text-white bg-[#10C8B8] hover:bg-[#0eb2a6]">Reset Password</button>
      </form>
      <Link to="/auth/signin" className="text-[#FFD700] no-underline">
        Go to Login
      </Link>
    </div>
  );
}

export default ResetPassword;

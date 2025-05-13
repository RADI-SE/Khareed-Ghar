import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Common/InputFields";
import "./style.css"; 
import { useResetPassword } from "../../hooks/Auth/useResetPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: resetPassword } = useResetPassword({
    onSuccess: () => {
      setSuccessMessage("Verification email sent successfully. Please check your email.");
      setTimeout(() => {
        navigate("/email-sent-success"); // Navigate to a success page
      }, 2000); // Redirect after 2 seconds
    },
    onError: (err) => {
      setError(err.message);
      setTimeout(() => setError(""), 2000); // Clear the error after 2 seconds
    },
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    resetPassword(email);
  };

  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Forgot Password</h2>

        {successMessage ? (
          <div className="alert alert-success">{successMessage}</div>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error-message text-danger">{`${error}`}</p>}
            <button type="submit" className="w-full p-2 rounded text-white bg-[#10C8B8] hover:bg-[#0eb2a6]">
              Reset Password
            </button>
            <p className="text-center mt-3">
              <Link to="/auth/signin" className="text-[#FFD700] no-underline">
                Login
              </Link>
            </p>
          </form>
        )}
      </div>
      <div className="image-section col-12 col-md-6 d-none d-md-block">
        <h3>What is Lorem Ipsum?</h3>
        <p>
          An auction seller lists items for bidding, aiming to get the best possible price.
              Buyers place competitive bids, hoping to win the item at a favorable rate. 
              The highest bidder wins once the auction ends, creating a fair selling process.
              Both parties benefit through transparent, market-driven transactions.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

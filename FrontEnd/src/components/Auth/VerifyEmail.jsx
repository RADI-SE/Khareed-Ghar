import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputFields";
import { useAuthService } from "../../services/authService";
import { useVerifyEmail } from "../../hooks/Auth/useVerifyEmail";
import { useResendVerificationCode } from "../../hooks/Auth/useResendVerificationCode";

function VerifyEmail() {
  const [verificationToken, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, errorMessage, setError, clearError } = useAuthService();
  const userEmail = user?.email;

  const { mutate: verifyEmail, isLoading: verifying } = useVerifyEmail({
    onSuccess: () => {
      setSuccessMessage("Email verified successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    },
    onError: (err) => {
      setError(err.message);
      setTimeout(() => clearError(), 2000);
    },
  });

  const { mutate: resendVerificationCode, isLoading: resending } =
    useResendVerificationCode({
      onSuccess: () => {
        setSuccessMessage("Verification code resent to your email.");
        setTimeout(() => setSuccessMessage(""), 2000); 
      },
      onError: (err) => {
        setError(err.message);
        setTimeout(() => clearError(), 2000);
      },
    });

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!verificationToken.trim()) {
      setError("Verification code cannot be empty.");
      setTimeout(() => clearError(), 2000);
      return;
    }

    try {
      verifyEmail(verificationToken);
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      resendVerificationCode(userEmail);
    } catch (error) {
      console.error("Resend failed", error);
    }
  };

  return (
    <div className="auth-container d-flex flex-column flex-md-row align-items-center">
      <div className="form-section col-12 col-md-6 p-4">
        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-subtitle">
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleVerify}>
          <div className="d-flex justify-content-center">
            <InputField
              type="text"
              placeholder="######"
              value={verificationToken}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <button
            type="submit"
            className="w-full p-2 rounded text-white bg-[#10C8B8] hover:bg-[#0eb2a6]"
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>
          <p className="text-center mt-3">
            Didn't receive the code?{" "}
            <span
              className="text-[#FFD700] no-underline"
              style={{ cursor: "pointer" }}
              onClick={handleResendCode}
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend"}
            </span>
          </p>
        </form>
      </div>

      <div className="image-section col-12 col-md-6 d-none d-md-block">
        <h3>  Verify Your Email </h3>
        <p>
       
We've sent a verification link to your email address.
Click the link to confirm your account and get started.

Didn’t get the email? Check your spam or junk folder, or resend the email..
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;

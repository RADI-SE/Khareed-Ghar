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
            className="btn btn-primary w-100"
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>
          <p className="text-center mt-3">
            Didn't receive the code?{" "}
            <span
              className="text-link"
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
        <h3>What is Lorem Ipsum?</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;

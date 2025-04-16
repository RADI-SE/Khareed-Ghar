import React, { useState, useEffect } from "react";
import InputField from "../../Common/InputFields";
import "../style.css";
import { Link, Navigate } from "react-router-dom";
import { useSignInUser } from "../../../hooks/Auth/useSignIn";
import { useAuthService } from "../../../services/authService";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage, setError, clearError, isError } = useAuthService();
  const { mutate: signInUser, isLoading: isSigning } = useSignInUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (isError) {
      setError(errorMessage);
      const timer = setTimeout(() => clearError(), 1000);
      return () => clearTimeout(timer);  
    }
  }, [isError, errorMessage, setError, clearError]);
  
  const handleSignIn = (e) => {
    e.preventDefault();
    signInUser(
      { email, password },
      {
        onSuccess: (data) => {
          setIsAuthenticated(true);
          sessionStorage.setItem("token", data?.token);
          sessionStorage.setItem("id", data?._id);
          localStorage.setItem("userRole", data?.role);
          localStorage.setItem("isVerified", data?.isVerified);
        },
        onError: (err) => {
          console.error("Sign-in error:", err);
           const message = err?.response?.data?.message || "Sign-in failed. Please try again.";
          setError(message);
        },
      }
    );
  };

  if (isAuthenticated) {
    const userRole = localStorage.getItem("userRole");
    const isVerified = localStorage.getItem("isVerified");

    if (!isVerified) {
      return <Navigate to="/auth/verify-email" />;
    }

    switch (userRole) {
      case "admin":
        return <Navigate to="/admin" />;
      case "seller":
        return <Navigate to="/seller" />;
      case "buyer":
        return <Navigate to="/buyer" />;
   
    }
  }

return ( 
   <div className="d-flex justify-content-center align-items-center  min-vh-100 bg-light">
    <div className="w-100" style={{ maxWidth: "70%" }}>
      <div className="row g-0 shadow rounded-4 overflow-hidden bg-white" style={{ minHeight: "500px" }}>
        
        {/* Left: Form Section */}
        <div className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center">
          <div>
            <h2 className="auth-title mb-3">Sign In</h2>
            <p className="auth-subtitle mb-4">Welcome back! Please enter your details.</p>

            <form onSubmit={handleSignIn}>
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="text-end mb-3">
                <Link to="/auth/forgot-password" className="text-link">
                  Forgot your password?
                </Link>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSigning}
              >
                {isSigning ? "Loading..." : "Sign In"}
              </button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-link">
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="col-12 col-md-6 p-5 bg-light d-flex flex-column justify-content-center">
          <div>
            <h3 className="fw-bold mb-3">Auction, Seller and Buyer</h3>
            <p className="text-muted">
              An auction seller lists items for bidding, aiming to get the best possible price.
              Buyers place competitive bids, hoping to win the item at a favorable rate. 
              The highest bidder wins once the auction ends, creating a fair selling process.
              Both parties benefit through transparent, market-driven transactions.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
);







}

export default SignIn;

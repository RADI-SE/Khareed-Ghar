import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import InputField from "../../Common/InputFields";
import "../style.css";
import { useCreateUser } from "../../../hooks/Auth/useSignUp";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAgreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    mutate: createUser,
    isLoading: isCreating,
    isError: creationError,
    error: creationErrorMessage,
  } = useCreateUser();

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedRole) setRole(savedRole);

    return () => setError("");
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!name) return setError("User Name is required");
    if (!email) return setError("User Email is required");
    if (!password) return setError("Password is required");
    if (password.length < 8)
      return setError("Password should be at least 8 characters long");
    if (!confirmPassword) return setError("Confirm Password is required");
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (!isAgreeToTerms)
      return setError("Please agree to the terms and conditions");
    if (!role) return setError("Please select a role");

    setError("");

    createUser(
      { name, email, password, confirmPassword, role, isAgreeToTerms },
      {
        onSuccess: (data) => {
          setIsRegistered(true);
          localStorage.setItem("isVerified", data?.isVerified);
        },
        onError: (err) => {
          console.error("Sign-up error:", err);
          setError("Sign-up failed. Please try again.");
        },
      }
    );
  };

  if (isRegistered) {
    const isVerified = localStorage.getItem("isVerified") === "true";
    if (!isVerified) {
      return <Navigate to="/auth/verify-email/" />;
    }
  }
 
 
return (
  <div className="d-flex justify-content-center align-items-start min-vh-100 bg-light pt-5">
    <div className="container px-3 px-md-0" style={{ maxWidth: "70%" }}>
      <div className="row g-0 shadow rounded-4 overflow-hidden bg-white" style={{ minHeight: "500px" }}>
        
        {/* Left: Form Section */}
        <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
          <div>
            <h2 className="auth-title mb-3">Sign Up</h2>
            <p className="auth-subtitle mb-4">Create an account to get started!</p>

            <form onSubmit={handleSignUp}>
              <InputField
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="mb-3">
                <label className="form-label d-block">Role:</label>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="sellerRole"
                    name="role"
                    value="seller"
                    checked={role === "seller"}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="sellerRole" className="form-check-label">
                    Seller
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="buyerRole"
                    name="role"
                    value="buyer"
                    checked={role === "buyer"}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="buyerRole" className="form-check-label">
                    Buyer
                  </label>
                </div>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {creationError && (
                <div className="alert alert-danger">
                  {creationErrorMessage?.message || "Error creating account"}
                </div>
              )}

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={isAgreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I agree to the{" "}
                  <Link to="/auth/terms" className="text-link">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={isCreating}
              >
                {isCreating ? "Loading..." : "Sign Up"}
              </button>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/auth/signin" className="text-link">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="col-12 col-md-6 p-4 p-md-5 bg-light d-flex flex-column justify-content-center">
          <div>
            <h3 className="fw-bold mb-4">Join Our Auction Platform Where Sellers Meet Buyers in a Thriving Marketplace.</h3>
            <p className="text-muted">
            
At " Khareed Ghar ", create an account to experience competitive auctions and transparent transactions. Sellers can list items and get the best price from eager buyers. Buyers place bids, track in real-time, and secure items at great rates. Our process is fair and transparent, ensuring the highest bidder wins. Sign up now and be part of a dynamic, trust-driven marketplace!
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
);

  

}

export default SignUp;

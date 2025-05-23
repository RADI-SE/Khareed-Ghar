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
  const [isSeller, setIsSeller] = useState(false);
  const [isConsignee, setIsConsignee] = useState(false);

    const [sellerDetails, setSellerDetails] = useState({
      storeName: '',
      businessType: '',
      physicalStoreAddress: '',
      storeTagline: '',
      phoneNumber: '',
      bankName: '',
      bankAccountNumber: '',
    });

        const [consigneeDetails, setConsigneeDetails] = useState({
      storeName: '',
      businessType: '',
      physicalStoreAddress: '',
      storeTagline: '',
      phoneNumber: '',
      bankName: '',
      bankAccountNumber: '',
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setSellerDetails(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    };

      const handleConsigneeChange = (e) => {
      const { name, value, files } = e.target;
      setConsigneeDetails(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    };

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
    setError("");

    if(isSeller){
      createUser(
        { name, email, password, confirmPassword, role, isAgreeToTerms, storeName: sellerDetails.storeName, businessType: sellerDetails.businessType, storeTagline:  sellerDetails.storeTagline, physicalStoreAddress: sellerDetails.physicalStoreAddress, phoneNumber: sellerDetails.phoneNumber, bankAccountNumber: sellerDetails.bankAccountNumber, bankName: sellerDetails.bankName },
        {
          onSuccess: (data) => {
            setIsRegistered(true);
            localStorage.setItem("isVerified", data?.isVerified);
          },
          onError: (err) => {
            console.error("Sign-up error:", err);
            if (!err.response) {
              setError("Network error: Please check your internet connection");
            } else if (err.response.status === 500) {
              setError("Server error: Please try again later");
            } else {
              setError(err.response?.data?.message || "Sign-up failed. Please try again.");
            }
          },
        }
      );}
    else if(isConsignee){
      createUser(
        { name, email, password, confirmPassword, role, isAgreeToTerms, storeName: consigneeDetails.storeName, businessType: consigneeDetails.businessType, storeTagline:  consigneeDetails.storeTagline, physicalStoreAddress: consigneeDetails.physicalStoreAddress, phoneNumber: consigneeDetails.phoneNumber, bankAccountNumber: consigneeDetails.bankAccountNumber, bankName: consigneeDetails.bankName },
        {
          onSuccess: (data) => {
            setIsRegistered(true);
            localStorage.setItem("isVerified", data?.isVerified);
          },
          onError: (err) => {
            console.error("Sign-up error:", err);
            if (!err.response) {
              setError("Network error: Please check your internet connection");
            } else if (err.response.status === 500) {
              setError("Server error: Please try again later");
            } else {
              setError(err.response?.data?.message || "Sign-up failed. Please try again.");
            }
          },
        }
      );
    }
  };

  const handleSellerToggle = (e) => {
    setIsSeller(e.target.checked);

    if(e.target.checked) {
      setRole("seller");
      setIsConsignee(false); // Uncheck consignee if seller is checked
    } else {
      setIsSeller("");
    }
  };

  const handleConsigneeToggle = (e) => {
    setIsConsignee(e.target.checked);

    if (e.target.checked) {
      setRole("consignee");
      setIsSeller(false); // Uncheck seller if consignee is checked
    } else {
      setRole(""); // or set to null/undefined if preferred
    }
  };

  const handleSellerDetailsChange = (e) => {
    setSellerDetails({
      ...sellerDetails,
      [e.target.name]: e.target.value,
    });
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
                    type="checkbox"
                    id="sellerRole"
                    name="isSeller"
                    checked={isSeller}
                    value="seller"
                    // onChange={(e) => setRole(e.target.value)}
                    onChange={handleSellerToggle}
                    className="form-check-input"
                  />
                  <label htmlFor="sellerRole" className="form-check-label">
                    Seller
                  </label>
                </div>
                {/* Consignee */}
                  { !isSeller && (
                    <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    id="consigneeRole"
                    name="isConsignee"
                    checked={isConsignee}
                    value="consignee"
                    // onChange={(e) => setRole(e.target.value)}
                    onChange={handleConsigneeToggle}
                    className="form-check-input"
                  />
                  <label htmlFor="consigneeRole" className="form-check-label">
                    Consignee
                  </label>
                </div>
                  )
                  }
                  
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}
           

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input bg-green-500 text-green-500"
                  id="termsCheckbox"
                  checked={isAgreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheckbox">
                  I agree to the{" "}
                  <Link to="/auth/terms" className="text-[#FFD700] no-underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
 

              {isSeller && (
                  <div className="bg-gray-100 p-4 rounded-lg space-y-4 mt-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name *
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={sellerDetails.storeName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type *
                    </label>
                    <input
                      type="text"
                      name="businessType"
                      value={sellerDetails.businessType}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Physical Address *
                    </label>
                    <input
                      type="text"
                      name="physicalStoreAddress"
                      value={sellerDetails.physicalStoreAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Tagline *
                      </label>
                      <input
                        type="text"
                        name="storeTagline"
                        value={sellerDetails.storeTagline}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={sellerDetails.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="bankName"
                        name="bankName"
                        value={sellerDetails.bankName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Account Number *
                      </label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        value={sellerDetails.bankAccountNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
                      />
                    </div>

                  </div>
                ) 
                }
                {/* Consignee Store Form */}
                {isConsignee && (
                  <div className="bg-gray-100 p-4 rounded-lg space-y-4 mt-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name *
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={consigneeDetails.storeName}
                      onChange={handleConsigneeChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type *
                    </label>
                    <input
                      type="text"
                      name="businessType"
                      value={consigneeDetails.businessType}
                      onChange={handleConsigneeChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Physical Address *
                    </label>
                    <input
                      type="text"
                      name="physicalStoreAddress"
                      value={consigneeDetails.physicalStoreAddress}
                      onChange={handleConsigneeChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Tagline *
                      </label>
                      <input
                        type="text"
                        name="storeTagline"
                        value={consigneeDetails.storeTagline}
                        onChange={handleConsigneeChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={consigneeDetails.phoneNumber}
                        onChange={handleConsigneeChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="bankName"
                        name="bankName"
                        value={consigneeDetails.bankName}
                        onChange={handleConsigneeChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Account Number *
                      </label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        value={consigneeDetails.bankAccountNumber}
                        onChange={handleConsigneeChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
                      />
                    </div>

                  </div>
                )

                }

              <button
                type="submit"
                className="border p-2 w-full rounded mr-2 bg-[#10C8B8] hover:bg-[#0eb2a6] text-white"
                disabled={isCreating}
              >
                {isCreating ? "Loading..." : "Sign Up"}
              </button>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/auth/signin" className="text-[#FFD700] no-underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="col-12 col-md-6 p-4 p-md-5 bg-light d-flex flex-column justify-content-center d-none d-md-block">
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

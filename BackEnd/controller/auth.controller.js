import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../model/user.model.js";
import { generatTokenAndSetCookies } from "../Utils/generatTokenAndSetCookies.js";
import { sendEmail } from "../nodemailer/send.Email.js";

// script
// export const del = async (req, res)=>{
//   try {
//     const user = await User.deleteMany({role: 'buyer'});

//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, role, isAgreeToTerms } = req.body;

  console.log("signup", req.body);
  try {
    // Validation checks
    if (!name) {
      return res.status(400).json({ success: false, message: "User Name is required" });
    }

    if (!email) {
      return res.status(400).json({ success: false, message: "User Email is required" });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: "User Password is required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password should be at least 8 characters long" });
    }

    if (!confirmPassword) {
      return res.status(400).json({ success: false, message: "Confirm Password is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (!isAgreeToTerms) {
      return res.status(400).json({ success: false, message: "Please agree to the terms and conditions" });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    } 

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role,
      isAgreeToTerms,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });


    const message = `verification code is ${verificationToken}`;   
    try {
      await sendEmail({
        email: email,
        subject: "Verify your email",
        message: message,
      });
      generatTokenAndSetCookies(res, user._id)
      await user.save();
    
      res.status(201).json({
        success: true,
        message: "User created successfully. Please check your email for verification code.",
        user: {
          ...user._doc,
          password: undefined,
          confirmPassword: undefined,
        },
        
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // If email fails, still create user but return a warning
      res.status(201).json({
        success: true,
        message: "User created successfully but verification email could not be sent",
        user: {
          ...user._doc,
          password: undefined,
          confirmPassword: undefined,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
       .status(404)
       .json({ success: false, message: "User with this email does not exist" });
    }
    if (user.isVerified) {
      return res
       .status(400)
       .json({ success: false, message: "User is already verified" });
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    const message = `verification code is ${verificationToken}`;   
    try {
      await sendEmail({
        email: email,
        subject: "Verify your email",
        message: message,
      });

      res.status(200).json({ success: true, message: "Verification code sent successfully" });
    } catch (error) {
      console.error("Email sending error:", error);
    }
   } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  console.log("verifyEmail", code);
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
        confirmPassword: undefined,
      },
    });
  } catch (error) {
     res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(email === ""){
      return res
       .status(404)
       .json({ success: false, message: "Email is required" });
    }
    if(password === ""){
      return res
       .status(400)
       .json({ success: false, message: "Password is required" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: " Invalid credentials" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    const token = generatTokenAndSetCookies(res, user._id );
    await user.save();
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        token,
        isVerified: user.isVerified  

      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("error in login ", error);
  }
};


export const logout = async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("guestId");

  console.log("logout");
  return res.status(200).json({
    success: true,
    message: "User logged out",
  });
  
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("forgotPassword", email);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    const resetToken = crypto.randomBytes(10).toString("hex");
    const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
     generatTokenAndSetCookies(res, user._id);

 const resetPasswordUrl = `${process.env.CLIENT_URL}auth/reset-password/${resetToken}`;
  const message = `Click on the following link to reset your password: ${resetPasswordUrl}`;
  try {
    await sendEmail({
      email: email,
      subject: "Reset Password Request",
      message: message,
    });


      res.status(200).json({ success: true, message: "Reset password link sent to your email" });
    } catch (error) {
      console.error("Email sending error:", error);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("error in forgotPassword ", error);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  console.log("resetPassword", token, password, confirmPassword);
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired reset password token",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    user.password = hashedPassword;
    user.confirmPassword = hashedConfirmPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
   generatTokenAndSetCookies(res, user.id);

    const message = `Password reset successfully`;
    try {
      await sendEmail({
        email: email,
        subject: "Password Reset Success",
        message: message,
      });  
        res.status(200).json({ success: true, message: "Password reset successfully" }); 
      } catch (error) {
        console.error("Email sending error:", error);
      }

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("error in resetPassword ", error);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
        confirmPassword: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("error in checkAuth ", error);
  }
};

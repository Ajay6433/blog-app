"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

const GoogleLoginButton = () => {
  const handleSuccess = async (response: any) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/googleLogin",
        {
          credential: response.credential, // Send Google token to backend
        }
      );

      toast.success("Login Successful!");
      console.log("Server Response:", res.data);

      // Store token in localStorage or context (optional)
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
};

export default GoogleLoginButton;

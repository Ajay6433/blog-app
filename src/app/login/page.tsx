"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Normal Login
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/login", data);
      toast.success("Login successful!");
      console.log("Response:", res.data);

      // Store token & redirect
      localStorage.setItem("token", res.data.data.token);
      router.push("/allBlogs");
    } catch (error) {
      const errorMessage =
      (error as any)?.response?.data?.message || "Failed to Login.";
      console.error("Error:", error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async (response: any) => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/googleLogin", {
        credential: response.credential,
      });
      toast.success("Google Login Successful!");
      console.log("Google Login Response:", res.data);

      // Store token & redirect
      localStorage.setItem("token", res.data.token);
      router.push("/allBlogs");
    } catch (error) {
      toast.error("Google login failed.");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google login failed")} />
        </div>
      </div>
    </div>
  );
}

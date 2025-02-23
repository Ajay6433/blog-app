"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Normal Registration
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + `/auth/register`, data);
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error:any) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Register/Login
  const handleGoogleLogin = async (response: any) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/auth/googleLogin`, {
        credential: response.credential,
      });
      toast.success("Google Login Successful!");
       // Store token & redirect
       localStorage.setItem("token", res.data.token);
       router.push("/allBlogs");
    } catch (error) {
      toast.error("Google login failed.");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="h-[550px] flex items-center justify-center">
      <div className="w-full max-w-md p-8 ">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: true })}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
             pattern=".{8,}"
    title="Password must be at least 8 characters long"
            {...register("password", { required: true })}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3  hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Google Register/Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google login failed")} />
        </div>
      </div>
    </div>
  );
}

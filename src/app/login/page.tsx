"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      // Make a request to your server to handle login
      const response = await axios.post("/api/users/login", credentials);
      console.log("User logged in successfully:", response.data);
      toast.success("Login success");
      // Optionally, redirect the user to the dashboard or another page
      router.push("/profile");
    } catch (error: any) {
      console.error("Error logging in:", error);
      // Handle errors (e.g., display error messages to the user)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(credentials.email.length > 0 && credentials.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [credentials, loading]);

  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image src="/MeeP.png" alt="Login Image" width={800} height={600} />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-gray-600">
              Please sign in to your account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onLogin}>
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
            <button
                type="submit"
                className={`w-full px-4 py-3 font-bold text-white rounded-md ${
                  buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700`}
                disabled={buttonDisabled || loading}
              >
                {loading ? "Processing..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="tc-grey t-center">
            Don't have an account?{" "}
            <Link className="link font-bold" href={`/signup`}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Sign up successful!");
      router.push("/login"); // Ensure this route exists
    } catch (error: any) {
      console.error("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      !loading
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image src="/MeeP.png" alt="Sign Up Image" width={800} height={600} />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Join us!</h1>
            <p className="mt-2 text-gray-600">
              Please sign up to create your account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSignup}>
            <div>
              <label htmlFor="name" className="block font-bold text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            {/* Additional sign-up fields can be added here */}
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
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="tc-grey t-center">
            Already have an account?{" "}
            <Link className="link font-bold" href={`/login`}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

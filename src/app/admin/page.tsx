"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AdminProfile({ params }: any) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>This is a Admin</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {data._id}
        </span>
      </p>

      {isLoading ? (
        <p>Loading user details...</p>
      ) : (
        <>
          <p>Name: {data.username}</p>
          <p>Email: {data.email}</p>
          <p>Role: {data.role}</p>
        </>
      )}

      {/* Button to add video */}
      <Link href="/add-video">
        <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Video
        </button>
      </Link>

      {/* Logout Button */}
      <Link href="/login" onClick={logout}>
        <button className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </Link>
    </div>
  );
}

"use client"
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfileAdminPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserData(response.data.data); // Assuming data structure
      } catch (error) {
        console.error(error);
        toast.error("Error fetching user details");
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to fetch data only once on component mount

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  // Implement edit profile functionality (optional)
  const handleEditProfile = () => {
    toast.info("Edit profile functionality coming soon!");
  };

  if (!userData) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="profile-container flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <header className="profile-header flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold">this is an admin Profile page </h1>
        <hr className="w-full border-gray-200 mt-4" />
      </header>

      <section className="profile-info flex flex-col gap-4">
        <p>
          <b>Username:</b> {userData.username}
        </p>
        <p>
          <b>Email:</b> {userData.email}
        </p>
        {/* Add more user details as needed */}
      </section>

      <section className="profile-actions flex justify-between mt-8">
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Logout
        </button>

        <button
          onClick={handleEditProfile}
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Edit Profile
        </button>
      </section>
    </div>
  );
};

export default ProfileAdminPage;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddVideo() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [creatorId, setCreatorId] = useState(""); // Assuming you have a way to get the logged-in user's ID
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      description,
      videoUrl,
      creatorId, // Include the creator ID in the data
    };

    try {
      const res = await axios.post("/api/users/videos", data);
      toast.success("Video uploaded successfully!");

      // Redirect to the appropriate route based on the creator's role
      router.push("/admin"); // Redirect to a videos list or confirmation page
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title.length > 0 && description.length > 0 && videoUrl.length > 0 && creatorId.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [title, description, videoUrl, creatorId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Add Video</h1>
      <hr className="border-gray-300" />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="title" className="text-gray-700">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="description" className="text-gray-700">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-2 py-1 h-24 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="videoUrl" className="text-gray-700">Video URL:</label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="creatorId" className="text-gray-700">Creator ID:</label>
        <input
          type="text"
          id="creatorId"
          value={creatorId}
          onChange={(e) => setCreatorId(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            buttonDisabled || loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Processing..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

// Import necessary dependencies and models
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoSchema";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description, videoUrl, creatorId } = reqBody;

    // Check if the creator (user) exists
    const creator = await User.findById(creatorId);
    if (!creator) {
      return NextResponse.json(
        { error: "Creator not found" },
        { status: 400 }
      );
    }

    // Create a new video
    const newVideo = new Video({
      title,
      description,
      url: videoUrl,
      creator: creatorId,
    });

    const savedVideo = await newVideo.save();
    console.log(savedVideo);

    return NextResponse.json({
      message: "Video created successfully",
      success: true,
      savedVideo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

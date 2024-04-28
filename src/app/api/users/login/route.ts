import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database (replace with your connection logic)
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Check for isAdmin property in the user object
    const isAdmin = user.isAdmin; // Modify your user model if needed

    // Create JWT token data
    const tokenData = {
      id: user._id,
      username: user.username, // Include username if needed
      email: user.email,
      isAdmin, // Include isAdmin flag
    };

    // Generate JWT token with secret and expiry (replace with your secret)
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d", // Set expiry time as desired (e.g., 1 day)
    });

    // Create response and set cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true, // Set httpOnly flag for security
      // Consider additional cookie settings like SameSite: 'strict'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

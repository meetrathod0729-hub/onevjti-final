import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    const res = await cloudinary.uploader.upload(
      "C:/Users/Administrator/Downloads/meet_photo5.jpg", // <-- REAL IMAGE PATH
      { resource_type: "image" }
    );
    console.log("SUCCESS:", res.secure_url);
  } catch (err) {
    console.error("CLOUDINARY ERROR:", err.message);
  }
}

test();
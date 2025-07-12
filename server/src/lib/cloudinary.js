import { v2 as cloudinary } from "cloudinary"; // You use this to upload and manage media.

import { config } from "dotenv";
config(); //Load your .env file so you can use your Cloudinary credentials securely from process.env.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Goal of this code:
// To connect your app to Cloudinary using your secret credentials, so you can upload and manage images/videos from your backend (Node.js).

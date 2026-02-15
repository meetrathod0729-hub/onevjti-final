// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     // 🔥 CONFIGURE CLOUDINARY AT RUNTIME (KEY FIX)
//     // cloudinary.config({
//     //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     //   api_key: process.env.CLOUDINARY_API_KEY,
//     //   api_secret: process.env.CLOUDINARY_API_SECRET,
//     // });

//     if (!process.env.CLOUDINARY_API_KEY) {
//       throw new Error("Cloudinary API key missing from env");
//     }

//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "image",
//     });

//     fs.unlinkSync(localFilePath);
//     return response;

//   } catch (error) {
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }
//     throw error; // let Express handle it
//   }
// };

// export { uploadOnCloudinary };






import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });    
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    // ✅ Delete only if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result;

  } catch (error) {

    console.error("CLOUDINARY ERROR:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null; 
  }
};

export { uploadOnCloudinary };

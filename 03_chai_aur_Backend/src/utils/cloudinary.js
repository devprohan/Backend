import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary resorce detect automaticaly file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been succefully upload
    console.log("File is Uploaded On Cloudinary !!!", response.url);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temprory file as upload opern got failed
    return null
  }
};


export {uploadOnCloudinary} ;
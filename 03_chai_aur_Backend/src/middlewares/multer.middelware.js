// Import the multer package to handle file uploads
import multer from "multer";

// Define the storage configuration for multer
const storage = multer.diskStorage({
  
  // Define the folder where uploaded files will be temporarily saved
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Save files to ./public/temp folder
  },

  // Define how the uploaded file should be named when saved
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with its original name
    // Example: profile.png stays profile.png
  },
});

// Create and export the multer upload middleware
export const upload = multer({
  storage, // Use the custom diskStorage configuration above
});

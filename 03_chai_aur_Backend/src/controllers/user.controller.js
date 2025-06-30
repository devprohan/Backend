import asyncHandeler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User, user } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/*
## Algorithm :-
1. Get user details from frontend req.body postmen
2. validation user data - not empty
3. Check if user alredy exist using unique data like username or email
4. Check for images, check for avtar
5. upload them to cloudinary - udhr se url milega and some check
6. Hashed Password
7. Create user object - create entry in db
8. Remove password and refresh token field from response
9. Check for user Creation
10. Return response

|File Handeling Steps| :-
1. Import multer in user Router
2. post request ke baad aur registeruser jane se phle multer middelware pe milke jana upload.fields
3. fields method accepts array
4. hame 2 fields chahiye avtar and cover img so create 2 objects usme name maxCount set krde
*/
const registerUser = asyncHandeler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  console.log("email", email);

  // All fields ek saath check ho gye
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fullname is required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already Exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avtar File Is Required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalpath);

  if (!avatar) {
    throw new ApiError(400, "Avtar File Is Required");
  }

  const user = await User.create({
    fullName,
    avtar: avatar.url,
    coverImage: coverImage?.url || "", // Coverimg h to lelo nh h to empty rhne do
    email,
    password,
    username: username.toLowerCase(), // username lowercase me hona
  });

  // MongoDB Apne aap he id create kr deta h so usse hm check kr skte h user create hua ya nh
  // .select dekr jo field nh chahiye user send krne ke liye use string me minus sign ke saath add krdo
  const createdUser = User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something Went Wrong ! While registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd Succesfully"));
});

export { registerUser };

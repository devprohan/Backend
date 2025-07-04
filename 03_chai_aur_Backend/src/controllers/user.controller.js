import asyncHandeler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyjwt } from "../middlewares/auth.middelware.js"

// Generate Access And Refresh Token:
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something Went Wrong While generating refresh and access tokens"
    );
  }
};

/* register
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
  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

/* Login
## Algorithm :-
1. Get email & password from request body.
2. Validate that both fields exist.
3. Check if the user exists in the DB.
4. Compare provided password with stored hash.
5. Generate JWT access (and optionally refresh) token.
6. Set tokens in cookie or return via response. send cookie
7. Send sanitized user data and token back.
*/

const loginUser = asyncHandeler(async (req, res) => {
  // get data from user
  const { username, email, password } = req.body;

  // validate data
  if (!(username || email)) {
    throw new ApiError(400, "username or password is required");
  }
  // mongodb Operators
  // Check if it exist or not
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Compare Password : check password is correct or not
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  // get access and refresh token and destructre it..
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // sanitize data := which donot send to user back in response
  const loggedInUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  );

  //  design cookies options:
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, // this is status code in api res
        {
          user: loggedInUser, // This data field in api res
          accessToken,
          refreshToken,
        },
        "user logged In Succefully" //this is msg in api res
      )
    );
});

/* logout
## Algorithm :-
purpose: - Jab koi user logout karta hai, to hum uska refresh token database se hata dete hai.
        - Isse future me wo refresh token use karke new access token nahi bana sakta.
1. Refresh Token ko Db Se Gayb Krna hai
2. clear access token and refresh token from user cookies
*/

const logoutUser = asyncHandeler(async (req, res) => {
  // ➡️ Hum database me user ka record dhoond rahe hai using user ki ID
  // ➡️ req.user._id ka matlab: wo user jo currently logged in hai (ye verifyjwt middleware ke through mila hai).
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, // user ka refreshtoken empty kr diya he
      },
    },
    {
      new: true, // this is one of mongoDB Option mtlb updated doc return kre
    }
  );

  // design cookies options:
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User LoggedOut Succesfully !!"));
});

export { registerUser, loginUser, logoutUser };

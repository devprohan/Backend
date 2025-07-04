import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
// idhr response ka use nh so we can write _  ye production me use hota h
// Purpose :- To Find Out User Is Verified Or Not
export const verifyjwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken || // Try to get token from cookie
      req.header("Authorization")?.replace("Bearer", ""); // Or from Authorization header

    // Agar token nahi mila to samajh jao user login nahi hai, to error throw kar diya — 401 Unauthorized
    if (!token) {
      throw new ApiError(401, "unauthorized Request !!");
    }
    // ➡️ Token mil gaya? Ab JWT ka verify() use karke check karo:
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ➡️ Token me jo user ID mili thi, usse database se actual user nikaala.
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    // req.user me user ki detail store kar di (taaki aage ke controllers use kar sake)
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid Access Token");
  }
});

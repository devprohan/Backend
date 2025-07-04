import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import { verifyjwt } from "../middlewares/auth.middelware.js";

const router = Router();

// Register Route With Multer Middeware
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Login Router with auth middelware
router.route("/login").post(verifyjwt, loginUser);

// logout Router auth middelware
router.route("/logout").post(verifyjwt, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router;

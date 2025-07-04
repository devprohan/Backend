import { Router } from "express";
import {
  loginUser,
  logoutUser,
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

// logout Router
router.route("/logout").post(verifyjwt, logoutUser);

export default router;

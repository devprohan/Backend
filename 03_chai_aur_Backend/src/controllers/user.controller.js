import asyncHandeler from "../utils/asyncHandler.js";

const registerUser = asyncHandeler(async (req, res) => {
 return res.status(200).json({
    success: true,
    message: "Ok post request Chl rhi he",
  });
});


export {registerUser}
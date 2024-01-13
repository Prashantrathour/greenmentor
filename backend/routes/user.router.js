const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/user.controller");
const { auth } = require("../middleware/Auth.middleware");
const { profileControllers } = require("../controllers/Profilecontrollers");
const userRouter = express.Router();

userRouter.post("/register", registerController.registerUser);
userRouter.post("/login", loginController.loginUser);
userRouter.post("/logout",auth,logoutController.logoutUser);
userRouter.get("/profile",auth,profileControllers.getUserProfile);
userRouter.put("/profile",auth,profileControllers.editUserProfile);

module.exports = {
  userRouter
};
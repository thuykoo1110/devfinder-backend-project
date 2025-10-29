import { Router } from "express";
import * as userController from "../controller/user.controller"
import * as userValidate from "../validate/user.validate"
import multer from 'multer'
import { storage } from "../helpers/cloudinary.helper";
import * as authMiddleware from "../middleware/auth.middleware"

const router = Router()

const upload = multer({ storage: storage})

router.post("/register", userValidate.registerPost, userController.registerPost)

router.post("/login", userValidate.loginPost, userController.loginPost)

router.patch(
  "/profile", 
  authMiddleware.verifyTokenUser,
  upload.single("avatar"),
  userController.profilePatch
)
export default router
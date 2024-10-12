import {Router} from "express";
import {registerUser,loginUser, getUser,logoutUser} from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-user").get(verifyJwt,getUser)
router.route("/logout-user").get(verifyJwt,logoutUser)

export default router;
import {Router} from "express";
import {registerUser,loginUser, getUser} from "../controllers/user.controller.js"
import { verifyJwt } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-user").get(verifyJwt,getUser)

export default router;
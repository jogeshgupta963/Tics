import express from "express";
import { signupValidation } from "../utils/auth";
import { signup } from "../controllers/auth";
const router = express.Router();

router.route("/signup").post(signupValidation, signup);

export { router as authRouter };

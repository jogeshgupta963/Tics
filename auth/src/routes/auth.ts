import express from "express";
import { signupValidation, signinValidation } from "../utils/auth";
import { signup, signin, currentUser, signout } from "../controllers/auth";
import { authenticated, currentUserMiddleware,validateRequest } from "@jogeshgupta-microservices/common";
const router = express.Router();

router.route("/signup").post(signupValidation, validateRequest, signup);
router.route("/signin").post(signinValidation, validateRequest, signin);
router
  .route("/currentuser")
  .get(currentUserMiddleware, authenticated, currentUser);
router.route("/signout").delete(signout);
export { router as authRouter };

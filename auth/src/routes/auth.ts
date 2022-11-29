import express from "express";

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../utils/database-error";
import { RequestValidationError } from "../utils/request-validation-error";

import { signupValidation } from "../utils/auth";
import { signup } from "../controllers/auth";
const router = express.Router();

router.route("/signup").post(signupValidation, signup);
// router
//   .route("/api/users/signup")
//   .post(signupValidation, (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       throw new RequestValidationError(errors.array());
//     }

//     console.log("creating user");
//     throw new DatabaseConnectionError();
//     res.status(200).json("creating");
//   });

export { router as authRouter };

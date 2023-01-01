import {
  authenticated,
  validateRequest,
} from "@jogeshgupta-microservices/common";
import { Router } from "express";
import { paymentArgs } from "../utils/validators";
import { payments } from "../controller/payment";
const router = Router();

router.route("/").post(authenticated, paymentArgs, validateRequest, payments);

export { router as payment };

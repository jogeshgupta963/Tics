import { body } from "express-validator";
export const paymentArgs = [
  body("token").not().isEmpty().withMessage("ticket id must be provided"),
  body("orderId").not().isEmpty(),
];

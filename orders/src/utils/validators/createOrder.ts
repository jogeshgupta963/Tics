import { body } from "express-validator";
import mongoose from "mongoose";
export const createOrderArgs = [
  body("ticketId")
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("ticket id must be provided"),
];

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../utils/database-error";
import { RequestValidationError } from "../utils/request-validation-error";
async function signup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  console.log("creating user");
  throw new DatabaseConnectionError();
  res.status(200).json("creati");
}

export { signup };

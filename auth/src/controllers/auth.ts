import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { BadRequestError } from "../utils/errors/bad-request-err";
import { RequestValidationError } from "../utils/errors/request-validation-error";

async function signup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (isUser) {
    console.log("Email in use");
    throw new BadRequestError("Email in use");
  }
  const user = User.buildUser({ email, password });
  await user.save();

  // generate jwt
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!
  );

  //store in session
  req.session = {
    jwt: userJwt,
  };

  res.status(201).json(user);
}

export { signup };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { BadRequestError } from "@jogeshgupta-microservices/common";
import { Password } from "../utils/password";

async function signup(req: Request, res: Response) {
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
  console.log(user);
  
  res.status(201).json(user);
}
async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  const passMatch = await Password.compare(user.password, password);
  if (!passMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

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
  res.status(200).json(user);
}

async function currentUser(req: Request, res: Response) {
  res.json({ currentUser: req.user || null });
}
async function signout(req: Request, res: Response) {
  req.session = null;
  res.json({});
}
export { signup, signin, currentUser, signout };

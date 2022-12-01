import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorisedError } from "../utils/errors/not-authorized-error";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

async function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;

    req.user = payload;
  } catch (err: any) {
    console.log(err.message);
  }
  next();
}

async function authenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new NotAuthorisedError();
  }

  next();
}
export { currentUser as currentUserMiddleware, authenticated };

import { ValidationError } from "express-validator";
import { CustomError } from "./customErr";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request Params");

    //Due to inheritance
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    const newError = this.errors.map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });
    return newError;
  }
}

// throw new RequestValidationError(errors);

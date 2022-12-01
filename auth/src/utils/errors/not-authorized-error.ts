import { CustomError } from "./customErr";

export class NotAuthorisedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorised");
    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serializeError() {
    return [
      {
        message: "Not Authorised",
      },
    ];
  }
}

import { CustomError } from "./customErr";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public reason: string) {
    super(reason);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

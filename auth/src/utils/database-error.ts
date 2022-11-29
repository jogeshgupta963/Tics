import { isObjectLiteralExpression } from "typescript";
import { CustomError } from "./customErr";

export class DatabaseConnectionError extends CustomError {
  reason = "Error Connecting to Database";
  statusCode = 500;
  constructor() {
    super("Error Connecting to Database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

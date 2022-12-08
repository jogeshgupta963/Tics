import { updateRestTypeNode } from "typescript";
import { CustomError } from "./customErr";

export class Page404 extends CustomError {
  statusCode = 404;

  constructor() {
    super("Page not found");
    Object.setPrototypeOf(this, Page404.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: "Page not found",
      },
    ];
  }
}

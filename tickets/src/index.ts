import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { connectDb } from "./database/db";
import { errorHandler,Page404 } from "@jogeshgupta-microservices/common";

import methodOverride from "method-override";
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.Router());
app.use(methodOverride());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);


app.all("*", () => {
  throw new Page404();
});

(async function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await connectDb("mongodb://auth-mongo-srv:27017/auth");
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000...");
  });
})();

app.use(errorHandler);
// app.use(((err, req, res, next) => {}) as ErrorRequestHandler); // ok

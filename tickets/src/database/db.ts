import mongoose from "mongoose";
export const connectDb = async (url: string) => {
  mongoose.set("strictQuery", true);

  return mongoose.connect(url);
};

import mongoose from "mongoose";
export const connectDb = async (url: string) => {
  return mongoose.connect(url);
};

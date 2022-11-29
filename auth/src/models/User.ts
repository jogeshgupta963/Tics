import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Password } from "../utils/password";
//userInfo
interface user {
  email: string;
  password: string;
}
//user model
interface UserModel extends mongoose.Model<UserDocument> {
  buildUser(userData: user): UserDocument;
}
//single user
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.buildUser = (userData: user) => {
  return new User(userData);
};

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.password);
    this.password = hashed;
  }
  done();
});
// UserSchema.pre("save", async function (done) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt();
//     const hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
//   }
//   done();
// });

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
export default User;

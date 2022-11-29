import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedString = await bcrypt.hash(password, salt);
    return hashedString;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
    return isMatch;
  }
}

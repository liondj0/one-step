import * as crypto from "node:crypto";

export const hashUtil = {
  generateRandomString: (length: number) => {
    return crypto.randomBytes(length).toString("hex");
  }
}

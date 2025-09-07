import * as crypto from "node:crypto";
import { hashSync, compareSync } from "bcryptjs";

export const hashUtil = {
  generateRandomString: (length: number) => {
    return crypto.randomBytes(length).toString("hex");
  },
  hash: async (value: string, rounds = 10) => {
    return hashSync(value, rounds);
  },
  compare: async (value: string, hash: string) => {
    return compareSync(value, hash);
  },
};

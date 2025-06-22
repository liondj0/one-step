import jwt from "jsonwebtoken";

export const jwtUtil = {
  sign: (data: { user: { email: string } }) => {
    jwt.sign(data, "pasdkpaosdkaspodk");
  },
};

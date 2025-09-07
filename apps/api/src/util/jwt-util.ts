import * as jwt from "jsonwebtoken";
import { env } from "./env";
import { AccessTokenPayload } from "../../../../packages/common/types/auth/access-token-payload";

export const jwtUtil = {
  createToken: (payload: AccessTokenPayload, expiresIn = 1000000) => {
    return jwt.sign(payload, env.token.secret, { expiresIn });
  },
  verifyAndDecodeToken: (token: string) => {
    return jwt.verify(token, env.token.secret) as AccessTokenPayload;
  },
};

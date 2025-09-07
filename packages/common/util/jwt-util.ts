import {jwtDecode} from "jwt-decode";
import {AccessTokenPayload} from "../types/auth/access-token-payload";

export const jwtUtil = {
  decode: (token: string) => {
    return jwtDecode(token) as AccessTokenPayload;
  },
};

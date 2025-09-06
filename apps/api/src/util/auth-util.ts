import {Context, Next} from "hono";
import {ServerEnv} from "../types/server";
import {jwtUtil} from "./jwt-util";
import {startSessionContext} from "./session-util";
import {userRepo} from "../repo/user-repo";


export const authMiddleware = async (context: Context<ServerEnv>, next: Next) => {
  const authHeader = context.req.header('authorization');
  if(!authHeader) throw new Error('No authorization header found');
  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    throw new Error('No token found');
  }
  try {
    const payload = jwtUtil.verifyAndDecodeToken(token);
    const user = await userRepo().findOne({id: payload.user.id})
    return await startSessionContext({user})(context, next)
  } catch (e) {
    throw new Error('Invalid token');
  }
}

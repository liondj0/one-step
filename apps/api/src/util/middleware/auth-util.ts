import { Context, Next } from "hono";
import { ServerEnv } from "../../types/server";
import { jwtUtil } from "../jwt-util";
import { startSessionContext } from "../session-util";
import { userRepo } from "../../repo/user-repo";
import { UnauthorizedError } from "../error";
import { UserEntity } from "../../entity/user-entity";

export const authMiddleware = async (
  context: Context<ServerEnv>,
  next: Next,
) => {
  const authHeader = context.req.header("authorization");
  if (!authHeader) throw new UnauthorizedError("No authorization header found");
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new UnauthorizedError("No token found");
  }
  let user: UserEntity;
  try {
    const payload = jwtUtil.verifyAndDecodeToken(token);
    user = await userRepo().findOne({ id: payload.user.id });
  } catch (e) {
    throw new UnauthorizedError("Invalid token");
  }
  if (!user) throw new UnauthorizedError("Invalid token");
  return await startSessionContext({ user })(context, next);
};

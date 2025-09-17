import { User } from "@one-step/common/types/models/user";
import { RefreshTokenEntity } from "../../entity/refresh-token-entity";
import { hashUtil } from "../../util/hash-util";
import { dateUtil } from "@one-step/common/util/date";
import { refreshTokenRepo } from "../../repo/refresh-token-repo";
import { UserEntity } from "../../entity/user-entity";
import { jwtUtil } from "../../util/jwt-util";
import { UnauthorizedError } from "../../util/error";

export const createRefreshToken = (user: User) => {
  const refreshToken = new RefreshTokenEntity();
  refreshToken.user = user as UserEntity;
  refreshToken.userId = user.id;
  ((refreshToken.token = hashUtil.generateRandomString(40)),
    (refreshToken.expiresAt = dateUtil.addDays(new Date(), 7)));

  refreshTokenRepo().save(refreshToken);
  return refreshToken.token;
};

export const createTokens = async (user: User) => {
  return {
    refreshToken: createRefreshToken(user),
    accessToken: jwtUtil.createToken({ user }),
  };
};

export const refreshAccessToken = async (currentRefreshToken: string) => {
  const refreshToken = await refreshTokenRepo().findOne({
    token: currentRefreshToken,
  });
  if (!refreshToken) throw new UnauthorizedError("Invalid refresh token");
  refreshTokenRepo().delete(refreshToken);
  return createTokens(refreshToken.user);
};

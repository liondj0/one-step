import {User} from "../../../../../packages/common/types/models/user";
import * as jwt from "jsonwebtoken"
import {env} from "../../util/env";
import {RefreshTokenEntity} from "../../entity/refresh-token-entity";
import {hashUtil} from "../../util/hash-util";
import {dateUtil} from "../../../../../packages/common/util/date";
import {refreshTokenRepo} from "../../repo/refresh-token-repo";
import {UserEntity} from "../../entity/user-entity";

export const createAccessToken = (user: User) => {
  return jwt.sign({user}, env.token.secret, {expiresIn: 1000000});
}

export const createRefreshToken = (user: User) => {
  const refreshToken = new RefreshTokenEntity();
  refreshToken.user  = user as UserEntity;
  refreshToken.userId = user.id;
  refreshToken.token = hashUtil.generateRandomString(40),
  refreshToken.expiresAt = dateUtil.addDays(new Date(), 7);

  refreshTokenRepo().save(refreshToken);
  return refreshToken.token;
}

export const createTokens = async (user: User) => {
  return {
    refreshToken: createRefreshToken(user),
    accessToken: createAccessToken(user),
  }
}

export const refreshAccessToken = async (currentRefreshToken: string) => {
  const refreshToken = await refreshTokenRepo().findOne({token: currentRefreshToken});
  if(!refreshToken) throw new Error("Invalid refresh token");
  refreshTokenRepo().delete(refreshToken);
  return createTokens(refreshToken.user);
}


import {User} from "../../../../../packages/common/types/models/user";
import * as jwt from "jsonwebtoken"
import {env} from "../../util/env";
import {RefreshTokenEntity} from "../../entity/refresh-token-entity";
import {hashUtil} from "../../util/hash-util";
import {dateUtil} from "../../../../../packages/common/util/date";
import {refreshTokenRepo} from "../../repo/refresh-token-repo";

export const createAccessToken = (user: User) => {
  return jwt.sign({user}, env.token.secret, {expiresIn: 1000000});
}

export const createRefreshToken = (user: User) => {
  return  new RefreshTokenEntity({
    userId: user.id,
    token: hashUtil.generateRandomString(40),
    expiresAt: dateUtil.addDays(new Date(), 7),
  })
}

export const createTokens = async (user: User) => {
  return {
    refreshToken: createRefreshToken(user),
    accessToken: createAccessToken(user),
  }
}

const refreshAccessToken = async (currentRefreshToken: string) => {
  const refreshToken = await refreshTokenRepo().findOne({token: currentRefreshToken});
  if(!refreshToken) throw new Error("Invalid refresh token");
  refreshTokenRepo().delete(refreshToken);
  return createAccessToken(refreshToken.user);
}


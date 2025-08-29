import {SignupData} from "../../../../../packages/common/dto/auth/signup-data";
import {UserEntity} from "../../entity/user-entity";
import {AuthType} from "../../enum/auth-type";
import {createAccessToken, createRefreshToken, createTokens} from "./token-service";


export const signup = async (data: SignupData)=> {
  const user = new UserEntity({...data, authType: AuthType.password});
  return createTokens(user);
}

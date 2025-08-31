import {UserEntity} from "../../entity/user-entity";
import {AuthType} from "../../enum/auth-type";
import {createTokens} from "./token-service";
import {SignupData} from "@one-step/common/dto/auth/signup-data";



export const signup = async (data: SignupData)=> {
  const user = new UserEntity({...data, authType: AuthType.password});
  return createTokens(user);
}

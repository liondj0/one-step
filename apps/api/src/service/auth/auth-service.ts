import {UserEntity} from "../../entity/user-entity";
import {AuthType} from "../../enum/auth-type";
import {createTokens} from "./token-service";
import {SignupData} from "@one-step/common/dto/auth/signup-data";
import {userRepo} from "../../repo/user-repo";
import {hashUtil} from "../../util/hash-util";
import {UnauthorizedError, UnprocessableEntityError} from "../../util/error";



export const signup = async (data: SignupData)=> {
  const existingUser = await userRepo().findOne({email: data.email});
  if (existingUser) {
    throw new UnprocessableEntityError('Email already registered');
  }
  const user = new UserEntity({...data, authType: AuthType.password});
  user.password = await hashUtil.hash(data.password, 10);
  user.email = data.email.toLowerCase();
  user.firstName = data.firstName;
  user.lastName = data.lastName;

  userRepo().save(user);
  return createTokens(user);
}

export const login = async (email: string, password: string) => {
  const existingUser = await userRepo().findOne({email});
  if (!existingUser) {
    throw new UnauthorizedError('Invalid email or password');
  }
  const isPasswordValid = await hashUtil.compare(password, password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }
  return createTokens(existingUser);
}



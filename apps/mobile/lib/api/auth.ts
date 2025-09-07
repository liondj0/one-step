import { httpClientBuilder } from "@/util/http-util";
import { SignupData } from "@one-step/common/dto/auth/signup-data";
import { SignInData } from "@one-step/common/dto/auth/signin-data";
import { Tokens } from "@one-step/common/types/auth/tokens";

export const auth = {
  httpClient: httpClientBuilder(`${process.env.EXPO_PUBLIC_SERVER_URL}/auth`),
  signup: (signupData: SignupData) => {
    return auth.httpClient.post<Tokens, SignupData>(`/signup`, signupData);
  },
  signIn: (signInData: SignInData) => {
    return auth.httpClient.post<Tokens, SignInData>(`/login`, signInData);
  },
};

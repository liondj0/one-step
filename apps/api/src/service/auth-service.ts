import { insertUser } from "../db/repo/user-repo";

export type PasswordSignupParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authType: "password";
};
export const signUp = async (params: PasswordSignupParams) => {
  const user = await insertUser(params);
};

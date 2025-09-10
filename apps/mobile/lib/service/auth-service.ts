import { SignupData } from "@one-step/common/dto/auth/signup-data";
import { SignInData } from "@one-step/common/dto/auth/signin-data";
import { auth } from "@/lib/api/auth";
import { storage, StorageKeys } from "@/lib/storage";

export const authService = {
  signup: async (data: SignupData) => {
    const { accessToken, refreshToken } = await auth.signup(data);
    await storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
    await storage.set(StorageKeys.REFRESH_TOKEN, refreshToken);
  },
  signIn: async (data: SignInData) => {
    const { accessToken, refreshToken } = await auth.signIn(data);
    await storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
    await storage.set(StorageKeys.REFRESH_TOKEN, refreshToken);
  },
  signOut: async () => {
    await storage.remove(StorageKeys.ACCESS_TOKEN);
    await storage.remove(StorageKeys.REFRESH_TOKEN);
  },
};

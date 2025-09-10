import { useCallback, useEffect, useState } from "react";
import { storage, StorageKeys } from "@/lib/storage";
import { User } from "@one-step/common/types/models/user";
import { jwtUtil } from "@one-step/common/util/jwt-util";

export function useSession() {
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User>();

  const load = useCallback(async () => {
    console.log(`load called`);
    const onboarding = !!(await storage.get(StorageKeys.ONBOARDING_COMPLETED));
    setOnboardingCompleted(onboarding);

    const token = await storage.get(StorageKeys.ACCESS_TOKEN);
    if (!token) {
      setAccessToken(undefined);
      setUser(undefined);
      return;
    }

    try {
      const payload = jwtUtil.decode(token);
      if (payload.user) {
        setAccessToken(token);
        setUser(payload.user);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    load().finally(() => setIsSessionReady(true));
    const unsub = storage.subscribe(() => load());
    return () => unsub();
  }, [load]);

  return {
    isSessionReady,
    onboardingCompleted,
    accessToken,
    user,
  };
}

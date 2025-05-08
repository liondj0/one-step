import {useEffect, useState} from "react";
import {storage, StorageKeys} from "@/lib/storage";


export function useSession() {
  const [isSessionReady, setIsSessionReady] = useState(false);
  // const [accessToken, setAccessToken] = useState(null);
  // const [refreshToken, setRefreshToken] = useState(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      setOnboardingCompleted(!!(await storage.get(StorageKeys.ONBOARDING_COMPLETED)));
      setIsSessionReady(true);
    }
    loadState()
  })

  return {
    isSessionReady,
    onboardingCompleted
  }
}

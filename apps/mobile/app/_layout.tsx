import { Stack, SplashScreen} from "expo-router";
import '../global.css'
import { useEffect, useState} from "react";
import {storage, StorageKeys} from "@/lib/storage";
import Onboarding from "@/app/(onboarding)";
import Main from "@/app/(main)";
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [appReady, setAppReady] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState({loaded: false, value: false});

  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        if(!fontsLoaded) return;
        setOnboardingCompleted({loaded: true, value: !! (await storage.get(StorageKeys.ONBOARDING_COMPLETED))});
        SplashScreen.hide();
      } catch (e) {
        console.warn(e);
        setOnboardingCompleted({loaded: true, value: false});
      } finally {
        // Tell the application to render
        setAppReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!appReady || !onboardingCompleted.loaded) {
    return null;
  }

  return onboardingCompleted ? <Onboarding/> : <Main/>


  return <Stack screenOptions={{ headerShown: false }} ></Stack>
}

import { Stack, SplashScreen } from "expo-router";
import "../global.css";
import {StrictMode, useEffect, useState} from "react";
import {
  useFonts,
  LibreBaskerville_400Regular,
  LibreBaskerville_700Bold,
} from "@expo-google-fonts/libre-baskerville";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_300Light,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useSession } from "@/lib/useSession";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const { isSessionReady, onboardingCompleted, user, accessToken } = useSession();

  const [queryClient] = useState(() => new QueryClient());

  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_300Light,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      if (!isSessionReady || !fontsLoaded) return;
      setAppReady(true);
      await SplashScreen.hideAsync();
    }

    prepare();
    console.log('called')
  }, [fontsLoaded, isSessionReady]);

  if (!appReady || !isSessionReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={onboardingCompleted} >
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
        <Stack.Protected guard={(!!accessToken && !!user)}>
          <Stack.Screen name="main" />
        </Stack.Protected>
        <Stack.Screen name="auth" />
      </Stack>
    </QueryClientProvider>
  );
}

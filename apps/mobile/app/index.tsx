import { useSession } from "@/lib/useSession";
import { Redirect } from "expo-router";
import Main from "@/app/(main)";

export default function Index() {
  const { onboardingCompleted, isSessionReady, accessToken } = useSession();
  if (!isSessionReady) return null;
  if (accessToken) return <Redirect href={"/(main)"} />;
  if (!onboardingCompleted) return <Redirect href={`/onboarding`} />;
  return <Redirect href={`/auth`} />;
}

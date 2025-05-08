import {useSession} from "@/lib/useSession";
import {Redirect} from "expo-router";

export default function Index() {

  const {onboardingCompleted} = useSession()

  if(!onboardingCompleted) return <Redirect href={`/onboarding`}/>

  return <Redirect href={`/auth`}/>
}

import { Text, View } from "react-native";
import {useEffect, useState} from "react";
import {storage, StorageKeys} from "@/lib/storage";
import {Redirect} from "expo-router";

export default function Index() {

  const [onboardingCompleted, setOnboardingCompleted] = useState({loaded: false, value: false});


  useEffect(() => {
    async function prepare() {
      try {
        console.log(`called`)
        setOnboardingCompleted({loaded: true, value: !! (await storage.get(StorageKeys.ONBOARDING_COMPLETED))});
      } catch (e) {
        console.warn(e);
        setOnboardingCompleted({loaded: true, value: false});
      }
    }

    prepare();
  }, []);

  if(!onboardingCompleted.loaded) return null;
  if(!onboardingCompleted.value && onboardingCompleted.loaded) return <Redirect href={"/(onboarding)"} />;

  return (
    <View className="flex-1 bg-forest flex-col items-center justify-center">
      <Text className="text-sunbeam font-bold text-xl">
        Edit `app/index.tsx` to edit this screen.
      </Text>
    </View>
  );
}

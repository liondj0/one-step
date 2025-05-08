import {View} from "react-native";
import FirstScreen from "@/components/onboarding/first-screen";
import {useState} from "react";
import SecondScreen from "@/components/onboarding/second-screen";
import Button from "@/components/ui/button";
import ThirdScreen from "@/components/onboarding/third-screen";
import {useRouter} from "expo-router";
import {storage, StorageKeys} from "@/lib/storage";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const navigateToSignup = async () => {
    await storage.set(StorageKeys.ONBOARDING_COMPLETED, true);
    router.replace("/auth");
  };

  return (
    <View className="flex-1 flex-col items-center pb-12 pt-20 bg-soft">
      <View
        className={`flex flex-col items-center justify-evenly flex-1 w-full`}
      >
        {step === 1 && <FirstScreen />}
        {step === 2 && <SecondScreen />}
        {step === 3 && <ThirdScreen />}
      </View>
      <View
        className={`flex flex-row w-32 justify-evenly items-center mb-6 mt-6`}
      >
        <View
          className={`h-4 w-4 rounded-[0.5rem] ${step === 1 ? "bg-forest" : "bg-button"}`}
        />
        <View
          className={`h-4 w-4 rounded-[0.5rem] ${step === 2 ? "bg-forest" : "bg-button"}`}
        />
        <View
          className={`h-4 w-4 rounded-[0.5rem] ${step === 3 ? "bg-forest" : "bg-button"}`}
        />
      </View>
      {step < 3 && (
        <Button className={`mt-0`} onPress={() => setStep(step + 1)}>
          Continue
        </Button>
      )}
      {step === 3 && (
        <Button className={`mt-0`} onPress={() => navigateToSignup()}>
          Sign up
        </Button>
      )}
    </View>
  );
}

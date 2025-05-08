import {View} from "react-native";
import FirstScreen from "@/components/onboarding/first-screen";
import {useState} from "react";
import SecondScreen from "@/components/onboarding/second-screen";
import Button from "@/components/ui/button";

export default function Onboarding() {

  const [step, setStep] = useState(1);

  return (
    <View className="flex-1 flex-col items-center justify-between py-20 bg-soft">
      {step === 1 && <FirstScreen/>}
      {step === 2 && <SecondScreen/>}
      <View className={`flex flex-row w-32 justify-evenly items-center mb-4 mt-4`}>
        <View className={`h-4 w-4 rounded-[0.5rem] ${step === 1 ? 'bg-forest' : 'bg-button'}`}/>
        <View className={`h-4 w-4 rounded-[0.5rem] ${step === 2 ? 'bg-forest' : 'bg-button'}`}/>
        <View className={`h-4 w-4 rounded-[0.5rem] ${step === 3 ? 'bg-forest' : 'bg-button'}`}/>
      </View>
      <Button onPress={() => setStep(step + 1)}>Continue</Button>
    </View>
  );
}

import {Pressable, Text, View} from "react-native";
import {forwardRef, Ref} from "react";

type ButtonProps = {
  onPress: () => void;
  children: string;
  className?: string;
}

const Button = function ({onPress, children, className }: ButtonProps, ref: Ref<View>)  {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-button py-2 px-12 rounded-3xl ${className ?? ""}`}
      ref={ref}
    >
      <Text className={`text-forest text-3xl font-nunito font-semibold`}>
        {children}
      </Text>
    </Pressable>
  );
}

export default forwardRef(Button);

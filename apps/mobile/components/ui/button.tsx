import { Pressable, Text, View } from "react-native";
import { forwardRef, Ref } from "react";

type ButtonProps = {
  onPress: () => void;
  children: string | React.ReactNode;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
};

const Button = function (
  { onPress, children, className, textClassName, disabled }: ButtonProps,
  ref: Ref<View>,
) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-button py-2 px-12 rounded-3xl ${className ?? ""}`}
      ref={ref}
      disabled={disabled}
    >
      <Text
        className={`text-forest text-2xl font-nunito font-semibold ${textClassName ?? ""}`}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default forwardRef(Button);

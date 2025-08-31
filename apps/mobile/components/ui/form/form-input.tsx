import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';

type Props = TextInputProps & { name: string; className?: string };

export default function FormInput({ name, ...props }: Props) {
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <View className={`w-full`}>
      <TextInput
        value={value ?? ''}
        onChangeText={onChange}
        onBlur={onBlur}
        autoCapitalize="none"
        {...props}
      />
      {!!error && <Text style={{ color: 'red' }} className={`mb-2`}>{error.message}</Text>}
    </View>
  );
}

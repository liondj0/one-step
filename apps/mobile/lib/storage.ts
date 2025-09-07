import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
  ONBOARDING_COMPLETED = "onboarding-completed",
  ONBOARDING_STEP = "onboarding-step",
  ACCESS_TOKEN = "access-token",
  REFRESH_TOKEN = "refresh-token",
}

type ValueType<Key> = Key extends StorageKeys.ONBOARDING_COMPLETED
  ? boolean
  : Key extends StorageKeys.ONBOARDING_STEP
    ? number
    : Key extends StorageKeys.ACCESS_TOKEN
      ? string
      : Key extends StorageKeys.REFRESH_TOKEN
        ? string
        : never;

export const storage = {
  get: async <Key extends StorageKeys>(
    key: Key,
  ): Promise<ValueType<Key> | undefined> => {
    const value = await AsyncStorage.getItem(key);
    if (!value) return undefined;
    return JSON.parse(value).value as ValueType<Key>;
  },

  set: async <Key extends StorageKeys>(key: Key, value: ValueType<Key>) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({ value }));
    } catch (e) {
      console.log(e);
    }
  },
};

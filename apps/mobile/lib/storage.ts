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

type Listener = (key: StorageKeys) => void;
const listeners = new Set<Listener>();

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
      listeners.forEach((l) => l(key));
    } catch (e) {
      console.log(e);
    }
  },
  remove: async (key: StorageKeys) => {
    try {
      await AsyncStorage.removeItem(key);
      listeners.forEach((l) => l(key));
    } catch (e) {
      console.log(e)
    }
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener)
    };
  },
};

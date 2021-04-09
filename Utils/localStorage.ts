import AsyncStorage from "@react-native-async-storage/async-storage";

export default (function () {
  const create = async (key: string, value: any) => {
    try {
      const stringified = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringified);
    } catch (error) {}
  };
  const read = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      const parsed = JSON.parse(value);
      console.log(parsed);
      return parsed;
    } else {
      return null;
    }
  };
  return { create, read };
})();

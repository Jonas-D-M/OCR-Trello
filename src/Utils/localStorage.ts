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
      return parsed;
    } else {
      return undefined;
    }
  };
  const update = async () => {};
  const deleteItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
  };
  const deleteAll = async () => {
    await AsyncStorage.clear();
  };
  return { create, read, deleteItem, deleteAll };
})();

import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = () => {
  const getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    getItem,
  };
};

export default useAsyncStorage;
